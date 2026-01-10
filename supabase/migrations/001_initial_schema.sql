-- PropLib Database Schema
-- This schema supports scalable component storage with full-text search and analytics

-- ============================================================================
-- COMPONENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS components (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  code TEXT NOT NULL,
  dependencies TEXT[] NOT NULL DEFAULT '{}',
  integration TEXT NOT NULL,
  smart_prompt TEXT,
  preview_component_path TEXT NOT NULL,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  view_count INTEGER DEFAULT 0,
  copy_count INTEGER DEFAULT 0,

  -- Full-text search column (updated by trigger)
  search_vector tsvector,

  -- Constraint for valid categories
  CONSTRAINT valid_category CHECK (
    category IN ('headers', 'search', 'navigation', 'cards', 'forms', 'animations')
  )
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_components_category ON components(category);
CREATE INDEX IF NOT EXISTS idx_components_tags ON components USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_components_search ON components USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS idx_components_updated ON components(updated_at DESC);

-- ============================================================================
-- ANALYTICS EVENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS analytics_events (
  id BIGSERIAL PRIMARY KEY,
  component_id TEXT REFERENCES components(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraint for valid event types
  CONSTRAINT valid_event_type CHECK (
    event_type IN ('view', 'copy', 'search')
  )
);

-- Indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_analytics_component ON analytics_events(component_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_type ON analytics_events(event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics_events(created_at DESC);

-- ============================================================================
-- SEARCH QUERIES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS search_queries (
  id BIGSERIAL PRIMARY KEY,
  query TEXT NOT NULL,
  results_count INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_search_queries_created ON search_queries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_search_queries_query ON search_queries(query);

-- ============================================================================
-- MATERIALIZED VIEW: Popular Components
-- ============================================================================
CREATE MATERIALIZED VIEW IF NOT EXISTS popular_components AS
SELECT
  c.id,
  c.name,
  c.category,
  c.view_count,
  c.copy_count,
  (c.view_count + c.copy_count * 3) AS popularity_score
FROM components c
ORDER BY popularity_score DESC
LIMIT 50;

-- Index for materialized view
CREATE UNIQUE INDEX IF NOT EXISTS idx_popular_components_id ON popular_components(id);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_components_updated_at ON components;
CREATE TRIGGER update_components_updated_at
  BEFORE UPDATE ON components
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to update search_vector
CREATE OR REPLACE FUNCTION update_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', NEW.name), 'A') ||
    setweight(to_tsvector('english', NEW.description), 'B') ||
    setweight(to_tsvector('english', array_to_string(NEW.tags, ' ')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update search_vector
DROP TRIGGER IF EXISTS update_components_search_vector ON components;
CREATE TRIGGER update_components_search_vector
  BEFORE INSERT OR UPDATE ON components
  FOR EACH ROW
  EXECUTE FUNCTION update_search_vector();

-- Function to refresh popular components materialized view
CREATE OR REPLACE FUNCTION refresh_popular_components()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY popular_components;
END;
$$ LANGUAGE plpgsql;

-- Function to increment view count (atomic)
CREATE OR REPLACE FUNCTION increment_view_count(component_id TEXT)
RETURNS void AS $$
BEGIN
  UPDATE components
  SET view_count = view_count + 1
  WHERE id = component_id;
END;
$$ LANGUAGE plpgsql;

-- Function to increment copy count (atomic)
CREATE OR REPLACE FUNCTION increment_copy_count(component_id TEXT)
RETURNS void AS $$
BEGIN
  UPDATE components
  SET copy_count = copy_count + 1
  WHERE id = component_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on tables
ALTER TABLE components ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_queries ENABLE ROW LEVEL SECURITY;

-- Public read access for components
CREATE POLICY "Public can read components"
  ON components FOR SELECT
  USING (true);

-- Admin-only write access for components
-- (Will be enforced via API key in application layer)

-- Public can insert analytics events
CREATE POLICY "Public can insert analytics"
  ON analytics_events FOR INSERT
  WITH CHECK (true);

-- Public can read analytics (for dashboard)
CREATE POLICY "Public can read analytics"
  ON analytics_events FOR SELECT
  USING (true);

-- Public can insert search queries
CREATE POLICY "Public can insert search queries"
  ON search_queries FOR INSERT
  WITH CHECK (true);

-- Public can read search queries (for trends)
CREATE POLICY "Public can read search queries"
  ON search_queries FOR SELECT
  USING (true);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE components IS 'Stores all component library items with metadata and code';
COMMENT ON TABLE analytics_events IS 'Tracks user interactions (views, copies, searches)';
COMMENT ON TABLE search_queries IS 'Stores search queries for analytics and trend analysis';
COMMENT ON MATERIALIZED VIEW popular_components IS 'Pre-computed popular components ranked by engagement';

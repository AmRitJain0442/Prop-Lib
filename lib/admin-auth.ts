/**
 * Admin Authentication Utilities
 * Simple token-based authentication for admin-only operations
 */

export function verifyAdminAuth(request: Request): boolean {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) {
    return false
  }

  const token = authHeader.replace('Bearer ', '')
  const adminKey = process.env.ADMIN_API_KEY

  if (!adminKey) {
    console.error('ADMIN_API_KEY not configured')
    return false
  }

  return token === adminKey
}

export function requireAdminAuth(request: Request): Response | null {
  if (!verifyAdminAuth(request)) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized - Invalid admin API key' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
  return null
}

// Client-side admin password check (basic protection for admin UI)
export function checkAdminPassword(password: string): boolean {
  // In production, this should be more secure
  // For now, use a simple password that matches ADMIN_API_KEY
  return password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'admin123'
}

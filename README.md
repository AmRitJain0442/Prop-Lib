# PropLib - AI-Native UI Platform

A comprehensive AI-Native UI Platform that hosts a curated collection of high-fidelity, interactive frontend components built with the "Golden Standard" stack: **React**, **Tailwind CSS**, and **Framer Motion**.

## Features

### Smart Prompts
For every component, we generate a specialized "Smart Prompt" that encapsulates:
- Complete source code
- Dependency installation instructions
- Integration logic
- Customization guide
- AI adaptation prompts

Users can paste these directly into an LLM to seamlessly adapt the design to their specific project.

### Sandboxed Live Preview
- Secure isolated preview using Sandpack
- Pop-up window for physical interaction with components
- Test responsiveness in real-time
- Feel animation physics before downloading
- Side-by-side code and preview

### Design System
- Minimalistic, futuristic, clean aesthetic
- Glassmorphism (glassy look) with slightly rounded edges
- Black theme with duotone gradients
- Smooth animations and transitions
- Responsive and accessible

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Prop-Lib
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Sandpack** - Live code preview
- **Lucide React** - Icon library

## Project Structure

```
Prop-Lib/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI primitives
│   │   ├── GlassCard.tsx
│   │   └── Button.tsx
│   ├── ComponentCard.tsx  # Component display card
│   └── PreviewModal.tsx   # Sandpack preview modal
├── lib/                   # Utilities and data
│   ├── types.ts          # TypeScript types
│   ├── components-data.ts # Component library data
│   └── smart-prompt-generator.ts # Smart Prompt system
└── public/               # Static assets
```

## Using Components

### Option 1: Smart Prompt (Recommended)
1. Click "Smart Prompt" on any component card
2. The AI-ready prompt is automatically copied to clipboard
3. Paste it into your favorite LLM (Claude, ChatGPT, etc.)
4. Ask the AI to adapt it to your project

### Option 2: Manual Copy
1. Click "Preview" to open the live preview
2. Interact with the component
3. Copy the code from the Sandpack editor
4. Install dependencies and integrate manually

## Adding New Components

1. Create your component following the Golden Standard stack
2. Add component data to `lib/components-data.ts`:

```typescript
{
  id: 'your-component-id',
  name: 'Your Component Name',
  description: 'Description',
  category: 'headers', // or search, navigation, etc.
  tags: ['animation', 'interactive'],
  preview: '/previews/your-component.tsx',
  code: `// Your component code here`,
  dependencies: ['framer-motion', 'lucide-react'],
  integration: `// Integration instructions`,
}
```

3. The Smart Prompt is automatically generated!

## Customization

### Theme Colors
Edit `tailwind.config.ts` to customize:
- Glass opacity levels
- Gradient colors
- Dark theme shades
- Animation timings

### Global Styles
Modify `app/globals.css` for:
- Scrollbar styling
- Glass utilities
- Text gradients
- Glow effects

## Building for Production

```bash
npm run build
npm start
```

## Contributing

We welcome contributions! Please:
1. Follow the Golden Standard stack (React, Tailwind, Framer Motion)
2. Maintain the glassmorphic design aesthetic
3. Provide complete Smart Prompts
4. Test in the Sandpack preview

## License

MIT License - feel free to use in your projects!

## Support

For issues and questions, please open an issue on GitHub.

---

Built with love for the AI-native development era ✨

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PropLib - AI-Native UI Components',
  description: 'Curated collection of high-fidelity, interactive frontend components with AI-ready Smart Prompts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="fixed inset-0 bg-black -z-10" />
        {children}
      </body>
    </html>
  )
}

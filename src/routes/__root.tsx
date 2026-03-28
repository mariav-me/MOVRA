import {
  createRootRoute,
  Outlet,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { BottomNav } from '../components/BottomNav'
import { LogActivityModal } from '../components/LogActivityModal'
import { AccessibilityMenu } from '../components/AccessibilityMenu'
import { useStore } from '@tanstack/react-store'
import { store, actions } from '../store'
import { Settings } from 'lucide-react'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover',
      },
      { title: 'MovRA — Move. Ride. Achieve.' },
      { name: 'theme-color', content: '#0f172a' },
      {
        name: 'description',
        content: 'Track your sports, horseback riding, and achievements with MovRA',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
    ],
  }),

  component: () => (
    <RootDocument>
      <Outlet />
    </RootDocument>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const accessibility = useStore(store, s => s.accessibility)

  const textSizeClass =
    accessibility.textSize === 'large'
      ? 'text-lg'
      : accessibility.textSize === 'xlarge'
        ? 'text-xl'
        : ''
  const contrastClass = accessibility.highContrast ? 'high-contrast' : ''
  const colorblindClass = accessibility.colorblindMode ? 'colorblind-friendly' : ''

  return (
    <html className={`${textSizeClass} ${contrastClass} ${colorblindClass}`}>
      <head>
        <HeadContent />
      </head>
      <body className="bg-slate-950 text-white antialiased">
        <div className="max-w-lg mx-auto relative min-h-screen">
          {/* Accessibility Button */}
          <button
            onClick={() => actions.toggleAccessibility(true)}
            className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-slate-800/90 backdrop-blur-sm border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            aria-label="Accessibility Settings"
          >
            <Settings className="w-5 h-5" />
          </button>

          {children}
          <BottomNav />
          <LogActivityModal />
          <AccessibilityMenu />
        </div>
        <Scripts />
      </body>
    </html>
  )
}

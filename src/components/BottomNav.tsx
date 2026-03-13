import { Link, useRouterState } from '@tanstack/react-router'
import { LayoutDashboard, Trophy, TrendingUp, MessageCircle } from 'lucide-react'
import { useStore } from '@tanstack/react-store'
import { store, selectors } from '../store'

export function BottomNav() {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname
  const unreadCount = useStore(store, s => selectors.getUnreadCount(s))

  const tabs = [
    { path: '/' as const, label: 'Dashboard', icon: LayoutDashboard },
    { path: '/sports' as const, label: 'My Sports', icon: Trophy },
    { path: '/progress' as const, label: 'Progress', icon: TrendingUp },
    { path: '/feedback' as const, label: 'Coach', icon: MessageCircle },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-t border-white/10">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {tabs.map(tab => {
          const isActive = currentPath === tab.path
          const Icon = tab.icon
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center flex-1 py-2 px-1 transition-all duration-200 ${
                isActive
                  ? 'text-cyan-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 ${isActive ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]' : ''}`} />
                {tab.path === '/feedback' && unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                )}
              </div>
              <span className={`text-[11px] mt-1 font-medium ${isActive ? 'text-cyan-400' : ''}`}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

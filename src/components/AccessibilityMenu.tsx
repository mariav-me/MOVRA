import { X, Eye, Type, Palette } from 'lucide-react'
import { useStore } from '@tanstack/react-store'
import { store, actions } from '../store'

export function AccessibilityMenu() {
  const showAccessibility = useStore(store, s => s.showAccessibility)
  const accessibility = useStore(store, s => s.accessibility)

  if (!showAccessibility) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => actions.toggleAccessibility(false)}
      />
      <div className="relative w-full max-w-sm bg-slate-800 border border-white/10 rounded-2xl p-6 z-10 mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Accessibility</h2>
          <button
            onClick={() => actions.toggleAccessibility(false)}
            className="p-2 text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          {/* High Contrast */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-white font-medium">High Contrast</span>
            </div>
            <button
              onClick={() => actions.setAccessibility('highContrast', !accessibility.highContrast)}
              className={`relative w-12 h-6 rounded-full transition-colors ${accessibility.highContrast ? 'bg-cyan-500' : 'bg-slate-600'}`}
              aria-label="Toggle high contrast mode"
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${accessibility.highContrast ? 'translate-x-6' : ''}`} />
            </button>
          </div>

          {/* Text Size */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Type className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-white font-medium">Text Size</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['normal', 'large', 'xlarge'] as const).map(size => (
                <button
                  key={size}
                  onClick={() => actions.setAccessibility('textSize', size)}
                  className={`py-2 px-3 rounded-xl border text-sm font-medium capitalize transition-all ${
                    accessibility.textSize === size
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20'
                  }`}
                >
                  {size === 'xlarge' ? 'X-Large' : size}
                </button>
              ))}
            </div>
          </div>

          {/* Colorblind Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-white font-medium">Colorblind-Friendly</span>
            </div>
            <button
              onClick={() => actions.setAccessibility('colorblindMode', !accessibility.colorblindMode)}
              className={`relative w-12 h-6 rounded-full transition-colors ${accessibility.colorblindMode ? 'bg-cyan-500' : 'bg-slate-600'}`}
              aria-label="Toggle colorblind-friendly mode"
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${accessibility.colorblindMode ? 'translate-x-6' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { X, Clock, Flame, FileText } from 'lucide-react'
import { useStore } from '@tanstack/react-store'
import { store, actions } from '../store'

export function LogActivityModal() {
  const showLogModal = useStore(store, s => s.showLogModal)
  const selectedSportId = useStore(store, s => s.selectedSportId)
  const sports = useStore(store, s => s.sports)

  const [sportId, setSportId] = useState('')
  const [duration, setDuration] = useState(30)
  const [intensity, setIntensity] = useState<'light' | 'moderate' | 'intense'>('moderate')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (selectedSportId) setSportId(selectedSportId)
    else if (sports.length > 0) setSportId(sports[0].id)
  }, [selectedSportId, sports])

  if (!showLogModal) return null

  const handleSubmit = () => {
    actions.logActivity({
      sportId,
      date: new Date().toISOString().split('T')[0],
      duration,
      notes,
      intensity,
    })
    actions.toggleLogModal(false)
    setDuration(30)
    setIntensity('moderate')
    setNotes('')
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => actions.toggleLogModal(false)}
      />
      <div className="relative w-full max-w-md bg-slate-800 border border-white/10 rounded-t-3xl sm:rounded-2xl p-6 pb-8 z-10 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Log Activity</h2>
          <button
            onClick={() => actions.toggleLogModal(false)}
            className="p-2 text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sport Selection */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-300 mb-2">Sport</label>
          <div className="grid grid-cols-2 gap-2">
            {sports.map(sport => (
              <button
                key={sport.id}
                onClick={() => setSportId(sport.id)}
                className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                  sportId === sport.id
                    ? 'border-cyan-500 bg-cyan-500/10 text-white'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                }`}
              >
                <span className="text-lg">{sport.emoji}</span>
                <span className="text-sm font-medium">{sport.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <Clock className="w-4 h-4 inline mr-1" /> Duration: {duration} min
          </label>
          <input
            type="range"
            min={5}
            max={180}
            step={5}
            value={duration}
            onChange={e => setDuration(Number(e.target.value))}
            className="w-full accent-cyan-500"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>5 min</span>
            <span>3 hours</span>
          </div>
        </div>

        {/* Intensity */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <Flame className="w-4 h-4 inline mr-1" /> Intensity
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['light', 'moderate', 'intense'] as const).map(level => (
              <button
                key={level}
                onClick={() => setIntensity(level)}
                className={`py-2.5 px-3 rounded-xl border text-sm font-medium capitalize transition-all ${
                  intensity === level
                    ? level === 'light'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                      : level === 'moderate'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                        : 'border-rose-500 bg-rose-500/10 text-rose-400'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <FileText className="w-4 h-4 inline mr-1" /> Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="How did it go?"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm resize-none focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
            rows={2}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold text-base hover:from-cyan-400 hover:to-teal-400 transition-all active:scale-[0.98] shadow-lg shadow-cyan-500/20"
        >
          Log Activity
        </button>
      </div>
    </div>
  )
}

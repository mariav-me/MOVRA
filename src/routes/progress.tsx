import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { store, selectors } from '../store'
import { Award, Lock } from 'lucide-react'

function Progress() {
  const state = useStore(store, s => s)
  const weeklyMinutes = selectors.getWeeklyMinutes(state)
  const todayMinutes = selectors.getTodayMinutes(state)

  const earnedBadges = state.badges.filter(b => b.earned)
  const lockedBadges = state.badges.filter(b => !b.earned)

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const weeklyData = [45, 30, 60, 0, 90, 55, todayMinutes]
  const maxMinutes = Math.max(...weeklyData, 1)

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 px-5 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-white mb-1">See Your Stats</h1>
        <p className="text-slate-400 text-sm">Track Progress and earn badges</p>
      </div>

      <div className="px-5 space-y-5 mt-5">
        {/* Streak Card */}
        <div className="bg-gradient-to-br from-orange-500/10 to-rose-500/10 border border-orange-500/20 rounded-2xl p-5 text-center">
          <div className="text-5xl mb-2 animate-bounce-slow">{'\u{1F525}'}</div>
          <p className="text-3xl font-black text-white mb-1">{state.streak} Days</p>
          <p className="text-orange-300 text-sm font-medium">Current Streak — Keep it going!</p>
          <div className="flex justify-center gap-1 mt-3">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                  i < state.streak % 7 || state.streak >= 7
                    ? 'bg-orange-500/30 text-orange-300'
                    : 'bg-slate-800 text-slate-600'
                }`}
              >
                {i < state.streak % 7 || state.streak >= 7 ? '\u{1F525}' : days[i].charAt(0)}
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Overview */}
        <div className="bg-slate-800/80 border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white">This Week</h2>
            <span className="text-cyan-400 text-sm font-semibold">{weeklyMinutes} min total</span>
          </div>
          <div className="flex items-end justify-between gap-2 h-32">
            {days.map((day, i) => {
              const height =
                weeklyData[i] > 0 ? Math.max(10, (weeklyData[i] / maxMinutes) * 100) : 4
              const isToday =
                i === new Date().getDay() - 1 || (i === 6 && new Date().getDay() === 0)
              return (
                <div key={day} className="flex flex-col items-center gap-1 flex-1">
                  <span className="text-[10px] text-slate-400 font-medium">
                    {weeklyData[i] > 0 ? `${weeklyData[i]}m` : ''}
                  </span>
                  <div className="w-full flex justify-center">
                    <div
                      className={`w-full max-w-[28px] rounded-lg transition-all ${
                        weeklyData[i] > 0
                          ? isToday
                            ? 'bg-gradient-to-t from-cyan-500 to-cyan-400 shadow-lg shadow-cyan-500/30'
                            : 'bg-gradient-to-t from-slate-600 to-slate-500'
                          : 'bg-slate-700/50'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-medium ${isToday ? 'text-cyan-400' : 'text-slate-500'}`}
                  >
                    {day}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Goals */}
        <div>
          <h2 className="text-lg font-bold text-white mb-3">Goals Progress</h2>
          <div className="space-y-3">
            {state.goals.map(goal => {
              const percent = Math.min(100, Math.round((goal.current / goal.target) * 100))
              const isComplete = goal.current >= goal.target
              return (
                <div key={goal.id} className="bg-slate-800/80 border border-white/5 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{goal.title}</span>
                    {isComplete && (
                      <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-medium">
                        Done!
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mb-2">
                    {goal.current} / {goal.target} {goal.unit}
                  </p>
                  <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isComplete
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                          : percent > 75
                            ? 'bg-gradient-to-r from-cyan-500 to-teal-400'
                            : percent > 40
                              ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                              : 'bg-gradient-to-r from-rose-500 to-pink-400'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Badges Earned */}
        <div>
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" /> Badges Earned
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {earnedBadges.map(badge => (
              <div
                key={badge.id}
                className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-4 text-center"
              >
                <span className="text-3xl block mb-2">{badge.emoji}</span>
                <p className="text-white font-semibold text-sm">{badge.name}</p>
                <p className="text-slate-400 text-xs mt-1">{badge.description}</p>
                <p className="text-amber-400/60 text-[10px] mt-2">{badge.earnedDate}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Badges Locked */}
        <div>
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-slate-500" /> Up Next
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {lockedBadges.map(badge => (
              <div
                key={badge.id}
                className="bg-slate-800/50 border border-white/5 rounded-2xl p-4 text-center opacity-60"
              >
                <span className="text-3xl block mb-2 grayscale">{badge.emoji}</span>
                <p className="text-slate-300 font-semibold text-sm">{badge.name}</p>
                <p className="text-slate-500 text-xs mt-1">{badge.description}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Lock className="w-3 h-3 text-slate-600" />
                  <span className="text-slate-600 text-[10px]">Keep going!</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/progress')({
  component: Progress,
})

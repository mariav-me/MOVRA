import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { store, selectors, actions, sportSubActivities } from '../store'
import { Plus, Flame, Clock, Target, Sparkles } from 'lucide-react'

function getSubActivityLabel(sportId: string, subActivityId: string): string {
  const subs = sportSubActivities[sportId]
  if (!subs) return subActivityId
  const found = subs.find(s => s.id === subActivityId)
  return found ? found.label : subActivityId
}

const motivationalMessages = [
  "You crushed it today!",
  "Keep going, you're on fire!",
  "Every session counts — you've got this!",
  "Champion mindset, champion results!",
  "Your dedication is inspiring!",
]

function Dashboard() {
  const state = useStore(store, s => s)
  const todayActivities = selectors.getTodayActivities(state)
  const todayMinutes = selectors.getTodayMinutes(state)
  const weeklyMinutes = selectors.getWeeklyMinutes(state)
  const motivMessage = motivationalMessages[Math.floor(Date.now() / 86400000) % motivationalMessages.length]

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 px-5 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-slate-400 text-sm">Welcome back,</p>
            <h1 className="text-2xl font-bold text-white">{state.userName}</h1>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-rose-500/20 border border-orange-500/30 rounded-full px-4 py-2">
            <Flame className="w-5 h-5 text-orange-400" />
            <span className="text-orange-300 font-bold text-sm">{state.streak} day streak</span>
          </div>
        </div>

        {/* Motivational Banner */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-4 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-cyan-400 flex-shrink-0" />
          <p className="text-cyan-200 text-sm font-medium">{motivMessage}</p>
        </div>
      </div>

      <div className="px-5 space-y-5">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="bg-slate-800/80 backdrop-blur-sm border border-white/5 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-slate-400 font-medium">Today</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {todayMinutes}<span className="text-sm text-slate-400 ml-1">min</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">{todayActivities.length} activities</p>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-sm border border-white/5 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-slate-400 font-medium">This Week</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {weeklyMinutes}<span className="text-sm text-slate-400 ml-1">min</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">{state.sports.length} sports active</p>
          </div>
        </div>

        {/* Log Activity Button */}
        <button
          onClick={() => actions.toggleLogModal(true)}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold text-base flex items-center justify-center gap-2 hover:from-cyan-400 hover:to-teal-400 transition-all active:scale-[0.98] shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-5 h-5" />
          Log Activity
        </button>

        {/* Goals Progress */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-white">Your Goals</h2>
            <span className="text-xs text-slate-400">
              {state.goals.filter(g => g.current >= g.target).length}/{state.goals.length} complete
            </span>
          </div>
          <div className="space-y-3">
            {state.goals.slice(0, 3).map(goal => {
              const percent = Math.min(100, Math.round((goal.current / goal.target) * 100))
              const isComplete = goal.current >= goal.target
              return (
                <div key={goal.id} className="bg-slate-800/80 backdrop-blur-sm border border-white/5 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{goal.title}</span>
                    <span className={`text-xs font-bold ${isComplete ? 'text-emerald-400' : 'text-cyan-400'}`}>
                      {percent}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isComplete
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                          : 'bg-gradient-to-r from-cyan-500 to-teal-400'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Today's Activities */}
        <div>
          <h2 className="text-lg font-bold text-white mb-3">Today's Activities</h2>
          {todayActivities.length > 0 ? (
            <div className="space-y-2">
              {todayActivities.map(activity => {
                const sport = state.sports.find(s => s.id === activity.sportId)
                return (
                  <div
                    key={activity.id}
                    className="bg-slate-800/80 backdrop-blur-sm border border-white/5 rounded-2xl p-4 flex items-center gap-4"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sport?.bgGradient || 'from-slate-600 to-slate-700'} flex items-center justify-center text-xl`}
                    >
                      {sport?.emoji}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{sport?.name}</p>
                      {activity.subActivity && (
                        <p className="text-cyan-400 text-xs font-medium">
                          {getSubActivityLabel(activity.sportId, activity.subActivity)}
                        </p>
                      )}
                      <p className="text-slate-400 text-xs">{activity.notes}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-sm">{activity.duration}m</p>
                      <p
                        className={`text-xs capitalize ${
                          activity.intensity === 'light'
                            ? 'text-emerald-400'
                            : activity.intensity === 'moderate'
                              ? 'text-amber-400'
                              : 'text-rose-400'
                        }`}
                      >
                        {activity.intensity}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="bg-slate-800/80 border border-white/5 rounded-2xl p-8 text-center">
              <p className="text-slate-400 text-sm">No activities yet today</p>
              <p className="text-slate-500 text-xs mt-1">Tap "Log Activity" to get started!</p>
            </div>
          )}
        </div>

        {/* Recent Activity Feed */}
        <div>
          <h2 className="text-lg font-bold text-white mb-3">Recent Activity</h2>
          <div className="space-y-2">
            {state.activities.slice(0, 5).map(activity => {
              const sport = state.sports.find(s => s.id === activity.sportId)
              return (
                <div
                  key={activity.id}
                  className="bg-slate-800/50 border border-white/5 rounded-xl p-3 flex items-center gap-3"
                >
                  <span className="text-lg">{sport?.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{activity.notes}</p>
                    <div className="flex items-center gap-2">
                      {activity.subActivity && (
                        <span className="text-cyan-400 text-xs font-medium">
                          {getSubActivityLabel(activity.sportId, activity.subActivity)}
                        </span>
                      )}
                      <span className="text-slate-500 text-xs">{activity.date}</span>
                    </div>
                  </div>
                  <span className="text-slate-400 text-xs font-medium">{activity.duration}m</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Dashboard,
})

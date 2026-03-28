import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { store, actions, sportSubActivities } from '../store'
import { Plus, Clock, Calendar } from 'lucide-react'

function getSubActivityLabel(sportId: string, subActivityId: string): string {
  const subs = sportSubActivities[sportId]
  if (!subs) return subActivityId
  const found = subs.find(s => s.id === subActivityId)
  return found ? found.label : subActivityId
}

function MySports() {
  const sports = useStore(store, s => s.sports)
  const activities = useStore(store, s => s.activities)

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950 px-5 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-white mb-1">My Sports</h1>
        <p className="text-slate-400 text-sm">Track your favorite activities</p>
      </div>

      <div className="px-5 space-y-4 mt-5">
        {/* Sport Cards */}
        {sports.map(sport => {
          const sportActivities = activities.filter(a => a.sportId === sport.id)
          const recentActivities = sportActivities.slice(0, 3)
          const hours = Math.floor(sport.totalMinutes / 60)
          const mins = sport.totalMinutes % 60

          return (
            <div
              key={sport.id}
              className="bg-slate-800/80 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden"
            >
              {/* Sport Header */}
              <div className={`bg-gradient-to-r ${sport.bgGradient} p-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{sport.emoji}</span>
                  <div>
                    <h3 className="text-white font-bold text-lg">{sport.name}</h3>
                    <p className="text-white/70 text-xs">{sport.sessionsCount} sessions logged</p>
                  </div>
                </div>
                <button
                  onClick={() => actions.toggleLogModal(true, sport.id)}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2.5 rounded-xl transition-all active:scale-95"
                  aria-label={`Log ${sport.name} activity`}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Sport Stats */}
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {hours}h {mins}m
                      </p>
                      <p className="text-slate-500 text-xs">Total time</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-white font-semibold text-sm">{sport.sessionsCount}</p>
                      <p className="text-slate-500 text-xs">Sessions</p>
                    </div>
                  </div>
                </div>

                {/* Recent Activities */}
                {recentActivities.length > 0 && (
                  <div>
                    <p className="text-xs text-slate-400 font-medium mb-2">Recent</p>
                    <div className="space-y-1.5">
                      {recentActivities.map(activity => (
                        <div
                          key={activity.id}
                          className="flex items-center justify-between bg-slate-700/30 rounded-xl px-3 py-2"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-white text-xs truncate">{activity.notes}</p>
                            <div className="flex items-center gap-2">
                              {activity.subActivity && (
                                <span className="text-cyan-400 text-[10px] font-medium">
                                  {getSubActivityLabel(activity.sportId, activity.subActivity)}
                                </span>
                              )}
                              <span className="text-slate-500 text-[10px]">{activity.date}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-2">
                            <span
                              className={`text-[10px] capitalize font-medium ${
                                activity.intensity === 'light'
                                  ? 'text-emerald-400'
                                  : activity.intensity === 'moderate'
                                    ? 'text-amber-400'
                                    : 'text-rose-400'
                              }`}
                            >
                              {activity.intensity}
                            </span>
                            <span className="text-slate-400 text-xs">{activity.duration}m</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {/* Log Activity Button */}
        <button
          onClick={() => actions.toggleLogModal(true)}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-700 text-slate-400 font-medium text-sm flex items-center justify-center gap-2 hover:border-cyan-500/30 hover:text-cyan-400 transition-all"
        >
          <Plus className="w-5 h-5" />
          Log Activity
        </button>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/sports')({
  component: MySports,
})

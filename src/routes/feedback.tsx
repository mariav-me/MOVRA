import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { store, actions } from '../store'
import { MessageCircle, Lightbulb, Heart, CheckCheck } from 'lucide-react'

function Feedback() {
  const coachMessages = useStore(store, s => s.coachMessages)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feedback':
        return <MessageCircle className="w-3.5 h-3.5" />
      case 'tip':
        return <Lightbulb className="w-3.5 h-3.5" />
      case 'encouragement':
        return <Heart className="w-3.5 h-3.5" />
      default:
        return <MessageCircle className="w-3.5 h-3.5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feedback':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
      case 'tip':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20'
      case 'encouragement':
        return 'text-pink-400 bg-pink-500/10 border-pink-500/20'
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/20'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'feedback':
        return 'Feedback'
      case 'tip':
        return 'Pro Tip'
      case 'encouragement':
        return 'Kudos'
      default:
        return 'Message'
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-pink-950 px-5 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Coach Feedback</h1>
        <p className="text-slate-400 text-sm">Messages and tips from your coaches</p>
      </div>

      <div className="px-5 space-y-3 mt-5">
        {coachMessages.map(message => (
          <button
            key={message.id}
            onClick={() => actions.markMessageRead(message.id)}
            className={`w-full text-left bg-slate-800/80 backdrop-blur-sm border rounded-2xl p-4 transition-all ${
              message.read ? 'border-white/5' : 'border-cyan-500/30 bg-slate-800'
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {message.from
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-semibold text-sm">{message.from}</span>
                  <div className="flex items-center gap-2">
                    {message.read && <CheckCheck className="w-3.5 h-3.5 text-cyan-500" />}
                    {!message.read && (
                      <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    )}
                  </div>
                </div>

                {/* Type Badge */}
                <div
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold mb-2 ${getTypeColor(message.type)}`}
                >
                  {getTypeIcon(message.type)}
                  {getTypeLabel(message.type)}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">{message.content}</p>
                <p className="text-slate-500 text-xs mt-2">{message.date}</p>
              </div>
            </div>
          </button>
        ))}

        {coachMessages.length === 0 && (
          <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-8 text-center">
            <MessageCircle className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No messages yet</p>
            <p className="text-slate-500 text-xs mt-1">Your coaches will leave feedback here</p>
          </div>
        )}
      </div>
    </div>
  )
}

export const Route = createFileRoute('/feedback')({
  component: Feedback,
})

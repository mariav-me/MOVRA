import { Store } from '@tanstack/store'

export interface Activity {
  id: string
  sportId: string
  subActivity: string
  date: string
  duration: number
  notes: string
  intensity: 'light' | 'moderate' | 'intense'
}

export interface SubActivity {
  id: string
  label: string
}

export const sportSubActivities: Record<string, SubActivity[]> = {
  football: [
    { id: 'practice', label: 'Practice' },
    { id: 'scrimmage', label: 'Scrimmage' },
    { id: 'game', label: 'Game' },
    { id: 'passing-drills', label: 'Passing Drills' },
    { id: 'rushing-drills', label: 'Rushing Drills' },
    { id: 'weightlifting', label: 'Weightlifting' },
    { id: 'film-study', label: 'Film Study' },
    { id: 'conditioning', label: 'Conditioning' },
    { id: 'other', label: 'Other' },
  ],
  basketball: [
    { id: 'practice', label: 'Practice' },
    { id: 'scrimmage', label: 'Scrimmage' },
    { id: 'game', label: 'Game' },
    { id: 'shooting-drills', label: 'Shooting Drills' },
    { id: 'free-throws', label: 'Free Throws' },
    { id: 'dribbling-drills', label: 'Dribbling Drills' },
    { id: 'conditioning', label: 'Conditioning' },
    { id: 'weightlifting', label: 'Weightlifting' },
    { id: 'other', label: 'Other' },
  ],
  baseball: [
    { id: 'batting-practice', label: 'Batting Practice' },
    { id: 'fielding-drills', label: 'Fielding Drills' },
    { id: 'pitching-practice', label: 'Pitching Practice' },
    { id: 'catching-drills', label: 'Catching Drills' },
    { id: 'game', label: 'Game' },
    { id: 'scrimmage', label: 'Scrimmage' },
    { id: 'base-running', label: 'Base Running' },
    { id: 'conditioning', label: 'Conditioning' },
    { id: 'other', label: 'Other' },
  ],
  soccer: [
    { id: 'practice', label: 'Practice' },
    { id: 'scrimmage', label: 'Scrimmage' },
    { id: 'game', label: 'Game' },
    { id: 'dribbling-drills', label: 'Dribbling Drills' },
    { id: 'passing-drills', label: 'Passing Drills' },
    { id: 'shooting-practice', label: 'Shooting Practice' },
    { id: 'goalkeeping', label: 'Goalkeeping' },
    { id: 'conditioning', label: 'Conditioning' },
    { id: 'other', label: 'Other' },
  ],
  volleyball: [
    { id: 'practice', label: 'Practice' },
    { id: 'scrimmage', label: 'Scrimmage' },
    { id: 'game', label: 'Game' },
    { id: 'serving-drills', label: 'Serving Drills' },
    { id: 'setting-drills', label: 'Setting Drills' },
    { id: 'spiking', label: 'Spiking / Hitting' },
    { id: 'blocking-drills', label: 'Blocking Drills' },
    { id: 'conditioning', label: 'Conditioning' },
    { id: 'other', label: 'Other' },
  ],
  track: [
    { id: 'sprints', label: 'Sprints' },
    { id: 'distance-running', label: 'Distance Running' },
    { id: 'hurdles', label: 'Hurdles' },
    { id: 'shot-put', label: 'Shot Put' },
    { id: 'discus', label: 'Discus' },
    { id: 'javelin', label: 'Javelin' },
    { id: 'long-jump', label: 'Long Jump' },
    { id: 'high-jump', label: 'High Jump' },
    { id: 'pole-vault', label: 'Pole Vault' },
    { id: 'relay-practice', label: 'Relay Practice' },
    { id: 'meet', label: 'Track Meet' },
    { id: 'other', label: 'Other' },
  ],
  crosscountry: [
    { id: 'distance-run', label: 'Distance Run' },
    { id: 'tempo-run', label: 'Tempo Run' },
    { id: 'interval-training', label: 'Interval Training' },
    { id: 'hill-training', label: 'Hill Training' },
    { id: 'fartlek', label: 'Fartlek' },
    { id: 'race', label: 'Race' },
    { id: 'recovery-run', label: 'Recovery Run' },
    { id: 'conditioning', label: 'Conditioning' },
    { id: 'other', label: 'Other' },
  ],
  swimming: [
    { id: 'freestyle', label: 'Freestyle' },
    { id: 'backstroke', label: 'Backstroke' },
    { id: 'breaststroke', label: 'Breaststroke' },
    { id: 'butterfly', label: 'Butterfly' },
    { id: 'medley', label: 'Individual Medley' },
    { id: 'diving', label: 'Diving' },
    { id: 'sprint-training', label: 'Sprint Training' },
    { id: 'distance-training', label: 'Distance Training' },
    { id: 'drills', label: 'Technique Drills' },
    { id: 'meet', label: 'Swim Meet' },
    { id: 'other', label: 'Other' },
  ],
  tennis: [
    { id: 'singles-match', label: 'Singles Match' },
    { id: 'doubles-match', label: 'Doubles Match' },
    { id: 'serve-practice', label: 'Serve Practice' },
    { id: 'groundstrokes', label: 'Rally / Groundstrokes' },
    { id: 'volleys', label: 'Volleys' },
    { id: 'lessons', label: 'Lessons' },
    { id: 'conditioning', label: 'Conditioning' },
    { id: 'tournament', label: 'Tournament' },
    { id: 'other', label: 'Other' },
  ],
  golf: [
    { id: 'driving-range', label: 'Driving Range' },
    { id: 'putting-practice', label: 'Putting Practice' },
    { id: 'chipping', label: 'Chipping / Short Game' },
    { id: 'full-round', label: 'Full Round (18)' },
    { id: 'half-round', label: 'Half Round (9)' },
    { id: 'lessons', label: 'Lessons' },
    { id: 'tournament', label: 'Tournament' },
    { id: 'simulator', label: 'Simulator / Indoor' },
    { id: 'other', label: 'Other' },
  ],
  cheerleading: [
    { id: 'stunting', label: 'Stunting' },
    { id: 'tumbling', label: 'Tumbling' },
    { id: 'dance', label: 'Dance / Choreography' },
    { id: 'cheer-routines', label: 'Cheer Routines' },
    { id: 'competition', label: 'Competition' },
    { id: 'flexibility', label: 'Flexibility / Stretching' },
    { id: 'conditioning', label: 'Conditioning' },
    { id: 'jumps', label: 'Jumps' },
    { id: 'other', label: 'Other' },
  ],
  lacrosse: [
    { id: 'practice', label: 'Practice' },
    { id: 'scrimmage', label: 'Scrimmage' },
    { id: 'game', label: 'Game' },
    { id: 'shooting-drills', label: 'Shooting Drills' },
    { id: 'passing-catching', label: 'Passing / Catching' },
    { id: 'ground-balls', label: 'Ground Balls' },
    { id: 'face-offs', label: 'Face-offs' },
    { id: 'conditioning', label: 'Conditioning' },
    { id: 'wall-ball', label: 'Wall Ball' },
    { id: 'other', label: 'Other' },
  ],
  horseback: [
    { id: 'jumping', label: 'Jumping' },
    { id: 'flatwork', label: 'Flatwork' },
    { id: 'dressage', label: 'Dressage' },
    { id: 'lessons', label: 'Lessons' },
    { id: 'trail-ride', label: 'Trail Ride' },
    { id: 'endurance-ride', label: 'Endurance Ride' },
    { id: 'groundwork', label: 'Groundwork' },
    { id: 'lunging', label: 'Lunging' },
    { id: 'show-competition', label: 'Show / Competition' },
    { id: 'other', label: 'Other' },
  ],
}

export interface Sport {
  id: string
  name: string
  emoji: string
  color: string
  bgGradient: string
  totalMinutes: number
  sessionsCount: number
}

export interface Badge {
  id: string
  name: string
  description: string
  emoji: string
  earned: boolean
  earnedDate?: string
}

export interface Goal {
  id: string
  title: string
  target: number
  current: number
  unit: string
  sportId?: string
}

export interface CoachMessage {
  id: string
  from: string
  content: string
  date: string
  read: boolean
  type: 'feedback' | 'tip' | 'encouragement'
}

export interface AppState {
  activities: Activity[]
  sports: Sport[]
  badges: Badge[]
  goals: Goal[]
  coachMessages: CoachMessage[]
  streak: number
  userName: string
  accessibility: {
    highContrast: boolean
    textSize: 'normal' | 'large' | 'xlarge'
    colorblindMode: boolean
  }
  showLogModal: boolean
  selectedSportId: string | null
  showAccessibility: boolean
}

const initialState: AppState = {
  userName: 'Alex',
  streak: 7,
  showLogModal: false,
  selectedSportId: null,
  showAccessibility: false,
  accessibility: {
    highContrast: false,
    textSize: 'normal',
    colorblindMode: false,
  },
  sports: [
    { id: 'football', name: 'Football', emoji: '\u{1F3C8}', color: '#92400e', bgGradient: 'from-amber-700 to-amber-900', totalMinutes: 0, sessionsCount: 0 },
    { id: 'basketball', name: 'Basketball', emoji: '\u{1F3C0}', color: '#ea580c', bgGradient: 'from-orange-500 to-orange-700', totalMinutes: 0, sessionsCount: 0 },
    { id: 'baseball', name: 'Baseball / Softball', emoji: '\u26BE', color: '#dc2626', bgGradient: 'from-red-500 to-red-700', totalMinutes: 0, sessionsCount: 0 },
    { id: 'soccer', name: 'Soccer', emoji: '\u26BD', color: '#10b981', bgGradient: 'from-emerald-500 to-green-600', totalMinutes: 360, sessionsCount: 10 },
    { id: 'volleyball', name: 'Volleyball', emoji: '\u{1F3D0}', color: '#eab308', bgGradient: 'from-yellow-500 to-amber-500', totalMinutes: 0, sessionsCount: 0 },
    { id: 'track', name: 'Track & Field', emoji: '\u{1F3C3}', color: '#06b6d4', bgGradient: 'from-cyan-500 to-teal-600', totalMinutes: 0, sessionsCount: 0 },
    { id: 'crosscountry', name: 'Cross Country', emoji: '\u{1F332}', color: '#16a34a', bgGradient: 'from-green-600 to-emerald-700', totalMinutes: 0, sessionsCount: 0 },
    { id: 'swimming', name: 'Swimming', emoji: '\u{1F3CA}', color: '#3b82f6', bgGradient: 'from-blue-500 to-indigo-600', totalMinutes: 200, sessionsCount: 8 },
    { id: 'tennis', name: 'Tennis', emoji: '\u{1F3BE}', color: '#84cc16', bgGradient: 'from-lime-500 to-green-500', totalMinutes: 0, sessionsCount: 0 },
    { id: 'golf', name: 'Golf', emoji: '\u26F3', color: '#22c55e', bgGradient: 'from-green-500 to-teal-600', totalMinutes: 0, sessionsCount: 0 },
    { id: 'cheerleading', name: 'Cheerleading', emoji: '\u{1F4E3}', color: '#ec4899', bgGradient: 'from-pink-500 to-rose-600', totalMinutes: 0, sessionsCount: 0 },
    { id: 'lacrosse', name: 'Lacrosse', emoji: '\u{1F94D}', color: '#6366f1', bgGradient: 'from-indigo-500 to-violet-600', totalMinutes: 0, sessionsCount: 0 },
    { id: 'horseback', name: 'Horseback Riding', emoji: '\u{1F434}', color: '#8b5cf6', bgGradient: 'from-violet-500 to-purple-600', totalMinutes: 480, sessionsCount: 12 },
  ],
  activities: [
    { id: '1', sportId: 'horseback', subActivity: 'trail-ride', date: '2026-03-13', duration: 45, notes: 'Trail ride with Luna', intensity: 'moderate' },
    { id: '2', sportId: 'track', subActivity: 'sprints', date: '2026-03-13', duration: 30, notes: 'Morning sprint session', intensity: 'light' },
    { id: '3', sportId: 'horseback', subActivity: 'dressage', date: '2026-03-12', duration: 60, notes: 'Dressage practice', intensity: 'intense' },
    { id: '4', sportId: 'swimming', subActivity: 'freestyle', date: '2026-03-12', duration: 40, notes: 'Laps at the pool', intensity: 'moderate' },
    { id: '5', sportId: 'soccer', subActivity: 'practice', date: '2026-03-11', duration: 90, notes: 'Team practice', intensity: 'intense' },
    { id: '6', sportId: 'track', subActivity: 'distance-running', date: '2026-03-11', duration: 25, notes: 'Quick distance run', intensity: 'intense' },
    { id: '7', sportId: 'horseback', subActivity: 'jumping', date: '2026-03-10', duration: 50, notes: 'Jump training with Scout', intensity: 'intense' },
  ],
  badges: [
    { id: 'b1', name: 'First Ride', description: 'Complete your first horseback riding session', emoji: '\u{1F3C7}', earned: true, earnedDate: '2026-02-15' },
    { id: 'b2', name: '7-Day Streak', description: 'Work out 7 days in a row', emoji: '\u{1F525}', earned: true, earnedDate: '2026-03-13' },
    { id: 'b3', name: 'Early Bird', description: 'Log an activity before 7 AM', emoji: '\u{1F305}', earned: true, earnedDate: '2026-03-01' },
    { id: 'b4', name: 'Multi-Sport', description: 'Try 3 different sports', emoji: '\u{1F3C5}', earned: true, earnedDate: '2026-02-28' },
    { id: 'b5', name: 'Marathon Rider', description: 'Reach 500 minutes of horseback riding', emoji: '\u{1F40E}', earned: false },
    { id: 'b6', name: '30-Day Streak', description: 'Work out 30 days in a row', emoji: '\u{1F48E}', earned: false },
    { id: 'b7', name: 'Speed Demon', description: 'Complete 5 intense sessions in a week', emoji: '\u26A1', earned: false },
    { id: 'b8', name: 'Social Star', description: 'Share your progress 10 times', emoji: '\u2B50', earned: false },
  ],
  goals: [
    { id: 'g1', title: 'Ride 10 hours this month', target: 600, current: 480, unit: 'min', sportId: 'horseback' },
    { id: 'g2', title: 'Run 20 sessions', target: 20, current: 16, unit: 'sessions', sportId: 'track' },
    { id: 'g3', title: 'Stay active 5 days/week', target: 5, current: 4, unit: 'days' },
    { id: 'g4', title: 'Try a new sport', target: 1, current: 0, unit: 'sports' },
  ],
  coachMessages: [
    { id: 'c1', from: 'Coach Sarah', content: 'Great progress on your dressage this week! Your posture has improved a lot. Keep focusing on keeping your heels down during turns.', date: '2026-03-13', read: false, type: 'feedback' },
    { id: 'c2', from: 'Coach Mike', content: 'Your running pace is improving steadily. Try adding interval sprints to your next session for an extra challenge!', date: '2026-03-12', read: false, type: 'tip' },
    { id: 'c3', from: 'Coach Sarah', content: 'You crushed it today! That trail ride was your best one yet. Luna responds well to your cues now.', date: '2026-03-11', read: true, type: 'encouragement' },
    { id: 'c4', from: 'Coach Mike', content: 'Remember to stretch after your intense sessions. Your body will thank you! Here are some good cool-down exercises for after riding.', date: '2026-03-10', read: true, type: 'tip' },
    { id: 'c5', from: 'Coach Sarah', content: 'I noticed you have been consistent with your schedule — 7-day streak! That kind of discipline will take you far.', date: '2026-03-09', read: true, type: 'encouragement' },
  ],
}

export const store = new Store<AppState>(initialState)

export const actions = {
  logActivity: (activity: Omit<Activity, 'id'>) => {
    store.setState(state => ({
      ...state,
      activities: [{ ...activity, id: Date.now().toString() }, ...state.activities],
      sports: state.sports.map(s =>
        s.id === activity.sportId
          ? { ...s, totalMinutes: s.totalMinutes + activity.duration, sessionsCount: s.sessionsCount + 1 }
          : s
      ),
    }))
  },

  toggleLogModal: (show: boolean, sportId?: string) => {
    store.setState(state => ({
      ...state,
      showLogModal: show,
      selectedSportId: sportId || null,
    }))
  },

  markMessageRead: (id: string) => {
    store.setState(state => ({
      ...state,
      coachMessages: state.coachMessages.map(m =>
        m.id === id ? { ...m, read: true } : m
      ),
    }))
  },

  setAccessibility: (key: keyof AppState['accessibility'], value: boolean | string) => {
    store.setState(state => ({
      ...state,
      accessibility: { ...state.accessibility, [key]: value },
    }))
  },

  toggleAccessibility: (show: boolean) => {
    store.setState(state => ({ ...state, showAccessibility: show }))
  },
}

export const selectors = {
  getTodayActivities: (state: AppState) => {
    const today = new Date().toISOString().split('T')[0]
    return state.activities.filter(a => a.date === today)
  },
  getTodayMinutes: (state: AppState) => {
    const today = new Date().toISOString().split('T')[0]
    return state.activities.filter(a => a.date === today).reduce((sum, a) => sum + a.duration, 0)
  },
  getWeeklyMinutes: (state: AppState) => {
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    return state.activities.filter(a => a.date >= weekAgo).reduce((sum, a) => sum + a.duration, 0)
  },
  getUnreadCount: (state: AppState) => state.coachMessages.filter(m => !m.read).length,
}

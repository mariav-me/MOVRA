import { useStore } from '@tanstack/react-store'
import { store, selectors } from './store'

export function useMovRA() {
  const state = useStore(store, s => s)
  return {
    ...state,
    todayActivities: selectors.getTodayActivities(state),
    todayMinutes: selectors.getTodayMinutes(state),
    weeklyMinutes: selectors.getWeeklyMinutes(state),
    unreadCount: selectors.getUnreadCount(state),
  }
}

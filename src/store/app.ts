// Utilities
import type { RoomInfo, UserInfo } from '@/types'
import { defineStore } from 'pinia'

interface AppState {
  roomsList: RoomInfo[];
  user: UserInfo | null;
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    roomsList: [
      { title: 'My Files', subtitle: 'My Files', avatar: 'https://randomuser.me/api/portraits/women/8.jpg', },
      { title: 'Shared with me', subtitle: 'Shared with me', avatar: 'https://randomuser.me/api/portraits/women/8.jpg', },
      { title: 'Starred', subtitle: 'Starred', avatar: 'https://randomuser.me/api/portraits/women/8.jpg', },
      { title: 'Recent', subtitle: 'Recent', avatar: 'https://randomuser.me/api/portraits/women/8.jpg', },
      { title: 'Offline', subtitle: 'Offline', avatar: 'https://randomuser.me/api/portraits/women/8.jpg', },
      { title: 'Uploads', subtitle: 'Uploads', avatar: 'https://randomuser.me/api/portraits/women/8.jpg', },
      { title: 'Backups', subtitle: 'Backups', avatar: 'https://randomuser.me/api/portraits/women/8.jpg', },
    ], // loaded rooms
    user: null, // currently acting user
  }),
  getters: {
    rooms: (state) =>  state.roomsList,
  },
})

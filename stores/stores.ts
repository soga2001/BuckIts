// store/filters.ts
import { defineStore } from 'pinia'
import type { User, UserMetaData } from '~/assets/interface/user';

export const useStore = defineStore({
  id: 'auth-store',
  state: () => {
    return {
      authenticated: false,
      user: {} as User,
      desktop: true,
      dark: true,
      error: '',
    }
  },
  actions: {
    changeAuthenticated(value: boolean) {
      this.authenticated = value;
    },
    setUser(value: User) {
        this.user = value
    },
    setUserMetaData(value: UserMetaData) {
        this.user.user_metadata = value

    },
    toggleDark() {
        this.dark = !this.dark
    },
    removeUser() {
        this.user = {} as User
    },
    changeDevice(value: boolean) {
        this.desktop = value
    },
    changeError(value: string) {
        this.error = value
    }
  },
  getters: {
    isAuthenticated: (state) => state.authenticated,
    getUser: (state) => state.user,
    getUserMetaData: (state) => state.user.user_metadata,
    isDesktop: (state) => state.desktop,
    getTheme: (state) => state.dark,
    getError: (state) => state.error,
  },
})
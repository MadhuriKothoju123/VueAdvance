import { defineStore } from 'pinia';

interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuthStore = defineStore('userAuth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
  }),

  getters: {
    userName(state): string {
      return state.user?.name ?? 'Guest';
    },
  },

  actions: {
    login(userData: User) {
      this.user = userData;
      this.isAuthenticated = true;
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});

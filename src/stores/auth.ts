import { defineStore } from 'pinia';

interface UserInfo {
  name: string;
  age: number;
  email: string;
  password: string;
  role: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as UserInfo | null,
  }),

  getters: {
    name: (state) => state.user?.name,
  },
  actions: {
    increment() {
      ('');
    },
  },
});

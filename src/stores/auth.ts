import { defineStore } from 'pinia';
import { userLogin } from '../services/apiAuthRequests';

interface UserInfo {
  _id: string;
  name: string;
  age: number;
  email: string;
  role: string[];
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as UserInfo | null,
  }),

  getters: {
    name: (state) => state.user?.name,
  },
  actions: {
    async login(email: string | null, password: string | null) {
      try {
        const res = await userLogin(email, password);
        const user = res.data.data.user;
        this.user = user;
        // this.$patch(user) por qué no funciona
      } catch (error) {
        console.log(error);
      }
    },
  },
});

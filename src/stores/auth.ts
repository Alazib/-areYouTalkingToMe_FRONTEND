import { defineStore } from 'pinia';
import { userLogin } from '../services/apiAuthRequests';

interface UserInfo {
  _id: string;
  name: string;
  age: number;
  email: string;
  role: string[];
}

const initUser: UserInfo = {
  _id: '',
  name: '',
  age: 0,
  email: '',
  role: [],
};
const initToken = '';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: initUser,
    token: initToken,
  }),
  persist: { key: 'auth-ayttm' },
  getters: {
    userName(): string {
      return this.user.name;
    },

    isLoggedIn(): boolean {
      console.log(this);
      return !!this.token;
    },
  },
  actions: {
    async login(email: string | null, password: string | null) {
      try {
        const res = await userLogin(email, password);
        const user = res.data.data.user;
        this.user = user;
        this.token = res.data.data.token;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

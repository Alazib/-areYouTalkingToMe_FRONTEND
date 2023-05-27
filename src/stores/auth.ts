import { defineStore } from 'pinia';
import { userLogin } from '../services/apiAuthRequests';
import httpErrorHandler from 'src/util/httpErrorHandler';

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
      return !!this.token;
    },
  },
  actions: {
    async login(email: string | null, password: string | null) {
      try {
        const res = await userLogin(email, password);
        console.log(res);
        const user = res.data.data.user;
        this.user = user;
        this.token = res.data.data.token;
      } catch (error: unknown) {
        const errorMessage = httpErrorHandler(
          error as Record<string, unknown>
        ) as string;

        return errorMessage;
      }
    },
  },
});

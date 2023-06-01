import { defineStore } from 'pinia';
import { userLogin } from '../services/apiAuthRequests';
import httpErrorHandler from 'src/util/httpErrorHandler';
// import JWT from 'jsonwebtoken';

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
    tokenHasExpired(): any {
      //1) Using 'jsonwebtoken'package throws CONSOLE ERROR --> util.inherits is not a function
      //2) so I tried with 'jose' package but when installing throws this another error --> "EPERM: operation not permitted, unlink 'C:\\Users\\Alberto\\Desktop\\Are you talking
      // to me\\Proyecto\\front\\node_modules\\vite\\node_modules\\esbuild-windows-64\\esbuild.exe'".
      //TODO
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

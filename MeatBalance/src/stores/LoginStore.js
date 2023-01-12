import { defineStore } from "pinia";
import axios from "axios";
const devRuta = import.meta.env.VITE_APP_RUTA_API;
import router from "@/router";
export const useLoginStore = defineStore("LoginStore", {
  state: () => {
    return {
      authUser: null,
    };
  },
  getters: {
    userToken: (state) => state.authUser,
  },
  actions: {
    async vLogin(payload) {
      const data = await axios.post(devRuta + "/login", payload);
      this.authUser = data.data.token
    },
    logout(alert) {
      this.authUser = null
      if (this.authUser === null) {
        alert()
        setTimeout(() => {
          router.push('/');
        }, 2000)
      }
    },
  },
  persist: true,
});

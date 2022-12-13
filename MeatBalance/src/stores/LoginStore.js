import { defineStore } from "pinia";
import axios from "axios";

export const useLoginStore = defineStore("LoginStore", {
  state: () =>{
    return{
        authUser:null,
    }
  },
  getters: {
    userToken: (state) => state.authUser,
  },
  actions: {
    async vLogin(payload) {
      const data = await axios.post("/login", payload)
      this.authUser = data.data.token
    },
  },
  persist:true
});

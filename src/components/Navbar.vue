<template>
  <v-container v-if="onExit" class="fill-height d-flex align-center bg-newPrimaryBlue">
    <v-img contain lazy-src="https://res.cloudinary.com/djdxi88e0/image/upload/v1687549212/login_logo_mfrg0n.svg"
      max-height="60" max-width="79" class="mx-5"
      src="https://res.cloudinary.com/djdxi88e0/image/upload/v1687549212/login_logo_mfrg0n.svg"></v-img>
    <v-btn color="#3abff8" v-for="link in links" :key="link.title" v-on:click="goToRoute(link.route)" variant="text">
      {{ link.title }}
    </v-btn>
  </v-container>
  <v-btn v-if="isOpen === 'Caja Abierta'" class="text-red">{{ isOpen }}</v-btn>
  <v-btn v-if="onExit" @click="cerrarSesion()" style="background-color:white;color:#3abff8;">Salir</v-btn>
</template>

<script>
import { useLoginStore } from "@/stores/LoginStore";
import axios from "axios";
const devRuta = import.meta.env.VITE_APP_RUTA_API;
export default {
  setup() {
    const authStore = useLoginStore();
    return { authStore };
  },
  computed: {
    onExit() {
      return this.authStore.authUser != null
    }
  },
  data: () => ({
    links: [
      { title: "Pedidos", route: "/Pedidos" },
      { title: "Proveedores", route: "/Proveedores" },
      { title: "Productos", route: "/Productos" },
      { title: "Monetarios", route: "/Monetarios" },
      { title: "Caja Fuerte", route: "/CajaFuerte" }
    ],
    status: "",
    isOpen:""
  }),
  methods: {
    goToRoute(route) {
      this.$router.push(route);
    },
    showAlert() {
      this.$swal({
        icon: "success",
        title: "Cerrando sesion, espere unos segundos",
        showConfirmButton: false,
        timer: 2000,
      });
    },
    cerrarSesion() {
      this.authStore.logout(this.showAlert)
    },
    getInfoCaja() {
      axios
        .get(devRuta + "/infoCaja")
        .then((response) => {
          this.status = response.data.status
          if(this.status===true){
            this.isOpen = "Caja Abierta"
          }else{
            this.isOpen = "Caja Cerrada"
          }
        })
        .catch((t) => console.log(t));
    },
  },
  mounted() {
    setInterval(() => {
      this.getInfoCaja();
    }, 5000);
  },
};
</script>
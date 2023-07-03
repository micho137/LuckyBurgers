<template>
    <v-card class="mx-auto" max-width="450" min-width="450">
      <v-img
        lazy-src="https://res.cloudinary.com/djdxi88e0/image/upload/v1687549212/logo_negro_juwemi.svg"
        src="https://res.cloudinary.com/djdxi88e0/image/upload/v1687549212/logo_negro_juwemi.svg"
        height="200px"
        cover
      ></v-img>
  
      <v-card-title> Balance </v-card-title>
  
      <v-card-subtitle>
        Balance de la aplicacion Lucky Burgers
      </v-card-subtitle>
  
      <v-card-actions>
        <v-btn @click="redirect" color="white border bg-black" variant="text"> Ingresar </v-btn>
  
        <v-spacer></v-spacer>
  
        <v-btn
          :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show = !show"
        ></v-btn>
      </v-card-actions>
  
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
  
          <v-card-text>
            Seccion cuya funcion es mostrar el Ingreso vs Egreso registrados dentro del
            aplicativo Lucky Burgers
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </template>
  
    <script>
  export default {
    data: () => ({
      show: false,
    }),
    methods: {
      redirect() {
        this.$router.push("/Balance");
      },
    },
  };
  </script>
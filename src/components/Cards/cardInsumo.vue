<template>
  <v-card class="mx-auto" max-width="450" min-width="450">
    <v-img
      lazy-src="https://res.cloudinary.com/djdxi88e0/image/upload/v1687549212/logo_nnbssa.svg"
      src="https://res.cloudinary.com/djdxi88e0/image/upload/v1687549212/logo_nnbssa.svg"
      height="200px"
      cover
    ></v-img>

    <v-card-title> Compra de insumos </v-card-title>

    <v-card-subtitle>
      Seccion de compra de insumos para el negocio
    </v-card-subtitle>

    <v-card-actions>
      <v-btn @click="redirect" color="white border bg-red" variant="text"> Ingresar </v-btn>

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
          Seccion cuya funcion es permitir al usuario registrar y llevar control de los insumos ingresados al negocio
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
      this.$router.push("/CompraInsumo");
    },
  },
};
</script>
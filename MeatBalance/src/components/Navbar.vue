<template>
  <v-container class="fill-height d-flex align-center">
    <!-- <v-avatar class="mr-10 ml-4" color="grey-darken-1" size="32"></v-avatar> -->
    <v-img
      contain
      lazy-src="https://scontent.fuio25-1.fna.fbcdn.net/v/t39.30808-6/285014452_603167801200149_2922894799813028479_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeE73fcLK1p_2wupK8pAt3JwdpsI8ipm6QB2mwjyKmbpAOdv_rFf9Qgw9goMvesxzd7mxIWaEbL1NQuMCNOxiIJs&_nc_ohc=YLCsM1SBBeUAX_Dt9M8&_nc_oc=AQm0WdswrYxWw9U1tFFRK8IQ64D54a4SNiQMZGgcZz7dyH8S1R0h818zaXT8GyuAqQY&_nc_ht=scontent.fuio25-1.fna&oh=00_AfAwJHrRiwDy1_gsO_P7Gr4k6m5JlpwSNuxtDEMeWwelGw&oe=6389A492"
      max-height="75"
      max-width="79"
      class="mx-5"
      src="https://scontent.fuio25-1.fna.fbcdn.net/v/t39.30808-6/285014452_603167801200149_2922894799813028479_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeE73fcLK1p_2wupK8pAt3JwdpsI8ipm6QB2mwjyKmbpAOdv_rFf9Qgw9goMvesxzd7mxIWaEbL1NQuMCNOxiIJs&_nc_ohc=YLCsM1SBBeUAX_Dt9M8&_nc_oc=AQm0WdswrYxWw9U1tFFRK8IQ64D54a4SNiQMZGgcZz7dyH8S1R0h818zaXT8GyuAqQY&_nc_ht=scontent.fuio25-1.fna&oh=00_AfAwJHrRiwDy1_gsO_P7Gr4k6m5JlpwSNuxtDEMeWwelGw&oe=6389A492"
    ></v-img>
    <v-btn
      v-for="link in links"
      :key="link.title"
      v-on:click="goToRoute(link.route)"
      variant="text"
    >
      {{ link.title }}
    </v-btn>

    <v-spacer></v-spacer>

    <v-responsive max-width="260">
      <v-text-field
        density="compact"
        hide-details
        variant="solo"
      ></v-text-field>
    </v-responsive>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    links: [
      { title: "Pedidos", route: "/" },
      { title: "Proveedores", route: "/Proveedores" },
      { title: "Productos", route: "/Productos" },
      { title: "Monetarios", route: "/Monetarios" },
    ],
  }),
  methods: {
    goToRoute(route) {
      this.$router.push(route);
    },
  },
};
</script>
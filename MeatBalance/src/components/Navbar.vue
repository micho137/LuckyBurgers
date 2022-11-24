<template>
  <v-container class="fill-height d-flex align-center">
    <v-avatar class="mr-10 ml-4" color="grey-darken-1" size="32"></v-avatar>

    <v-btn v-for="link in links" :key="link.title" v-on:click="goToRoute(link.route)" variant="text">
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
      { title: "Productos", route: "/" },
      { title: "Monetarios", route: "/" },
    ],
  }),
  methods:{
    goToRoute(route){
      this.$router.push(route);
    }
  }
  
};
</script>
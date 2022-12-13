<template>
  <v-container class="fill-height d-flex align-center">
    <!-- <v-avatar class="mr-10 ml-4" color="grey-darken-1" size="32"></v-avatar> -->
    <v-img
      contain
      lazy-src="https://res.cloudinary.com/djdxi88e0/image/upload/v1670184495/meatbalance_lqntpv.png"
      max-height="75"
      max-width="79"
      class="mx-5"
      src="https://res.cloudinary.com/djdxi88e0/image/upload/v1670184495/meatbalance_lqntpv.png"
    ></v-img>
    <v-btn
      color="#F3F3E3"
      v-for="link in links"
      :key="link.title"
      v-on:click="goToRoute(link.route)"
      variant="text"
    >
      {{ link.title }}
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    links: [
      { title: "Pedidos", route: "/Pedidos" },
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
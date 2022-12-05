<template>
  <v-app>
    <v-app-bar color="comoNaranja">
      <NavbarVue/>
    </v-app-bar>
    <v-main class="bg-grisOpaco">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
import NavbarVue from './components/Navbar.vue';
</script>

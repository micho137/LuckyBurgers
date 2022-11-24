<template>
  <v-app>
    <v-app-bar>
      <NavbarVue/>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
import NavbarVue from './components/Navbar.vue';
</script>

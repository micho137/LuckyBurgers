<template>
  <v-app>
    <v-app-bar color="newPrimaryBlue">
      <NavbarVue/>
    </v-app-bar>
    <v-main class="bg-newPrimaryBg">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
import NavbarVue from './components/Navbar.vue';
import { useLoginStore } from './stores/LoginStore';
useLoginStore()
</script>

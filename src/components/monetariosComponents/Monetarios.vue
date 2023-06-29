<template>
  <v-main class="h-100">
    <v-container>
      <v-row>
        <v-col class="">
          <v-sheet
            color="newPrimaryBlue"
            min-height="70vh"
            rounded="lg"
            class="pa-5 justify-center align-center d-flex"
          >
            <cardInsumoVue class="border pa-5" />
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet
            color="newPrimaryBlue"
            min-height="70vh"
            rounded="lg"
            class="pa-5 justify-center align-center d-flex"
          >
            <cardEgresoVue class="border pa-5" />
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet
            color="newPrimaryBlue"
            min-height="70vh"
            rounded="lg"
            class="pa-5 justify-center align-center d-flex"
          >
            <cardComparationVue class="border pa-5" />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
import cardInsumoVue from "../Cards/cardInsumo.vue";
import cardComparationVue from "../Cards/cardComparation.vue";
import cardEgresoVue from "../Cards/cardEgreso.vue";
export default {
  components: {
    cardInsumoVue,
    cardComparationVue,
    cardEgresoVue,
  },
};
</script>
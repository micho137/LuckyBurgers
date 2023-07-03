<template>
  <v-main class="h-100">
    <v-container>
      <v-row>
        <v-col>
          <v-sheet
            height="70vh"
            rounded="lg"
            color="newPrimaryBlue"
            class="pa-5 justify-center align-center d-flex flex-column"
          >
            <table-insumo class="pa-5" />
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet
            height="70vh"
            color="newPrimaryBlue"
            rounded="lg"
            class="pa-5 justify-center align-center d-flex flex-column"
          >
            <tableEgresoVue class="border pa-5" />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import TableInsumo from "./tableInsumo.vue";
import tableEgresoVue from "./tableEgreso.vue";
export default {
  components: {
    TableInsumo,
    tableEgresoVue,
  },
};
</script>
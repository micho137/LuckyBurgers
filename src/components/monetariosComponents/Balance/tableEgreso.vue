<template>
  <v-sheet color="newPrimaryBlue" class="text-button font-weight-bold">
    Total Egreso: ${{ calcEgreso() }}
  </v-sheet>
  <v-table fixed-header height="60vh" class="border rounded-lg">
    <thead>
      <tr>
        <th class="text-center text-button">Total</th>
        <th class="text-center text-button">Descripcion</th>
        <th class="text-center text-button">Fecha</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="{ totalEgreso, descripcionEgreso, fechaEgreso, uid } in Egresos" :key="uid" class="text-center">
        <td>${{ totalEgreso }}</td>

        <td>{{ descripcionEgreso }}</td>

        <td>
          {{ new Date(fechaEgreso).toLocaleDateString() }} -
          {{ new Date(fechaEgreso).toLocaleTimeString() }}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
  
<script>
import axios from "axios";
const devRuta = import.meta.env.VITE_APP_RUTA_API
export default {
  data() {
    return {
      Egresos: null,
      arTotal: []
    };
  },
  methods: {
    async getIngresos() {
      await axios
        .get(devRuta + "/egresos")
        .then((response) => {
          console.log(response);
          this.Egresos = response.data["resp"][1];
          this.arTotal = this.Egresos
        })
        .catch((t) => console.log(t));
    },
    calcEgreso() {
      let totalV = 0;
      this.arTotal.forEach((e) => {
        totalV += e.totalEgreso;
      });
      return totalV;
    },
  },
  mounted() {
    this.getIngresos();
  },
};
</script>
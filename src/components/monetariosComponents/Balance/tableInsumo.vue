<template>
  <v-sheet class="text-button font-weight-bold">
    Total de Ingresos: ${{ calcInsumo() }}
  </v-sheet>
  <v-table fixed-header height="500px" class="border rounded-lg">
    <thead>
      <tr>
        <th class="text-center text-button">Total</th>
        <th class="text-center text-button">Descripcion</th>
        <th class="text-center text-button">Fecha</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="{
          totalIngreso,
          descripcionIngreso,
          fechaIngreso,
          uid,
        } in Ingresos"
        :key="uid"
        class="text-center"
      >
        <td>${{ totalIngreso }}</td>

        <td>{{ descripcionIngreso }}</td>

        <td>
          {{ new Date(fechaIngreso).toLocaleDateString() }} -
          {{ new Date(fechaIngreso).toLocaleTimeString() }}
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
      Ingresos: null,
      arTotal: [],
    };
  },
  methods: {
    async getIngresos() {
      await axios
        .get(devRuta+"/ingresos")
        .then((response) => {
          console.log(response);
          this.Ingresos = response.data["resp"][1];
          this.arTotal=this.Ingresos
        })
        .catch((t) => console.log(t));
    },
    calcInsumo() {
      let totalV = 0;
      this.arTotal.forEach((e) => {
        totalV += e.totalIngreso;
      });
      return totalV;
    },
  },
  mounted() {
    this.getIngresos();
  },
};
</script>

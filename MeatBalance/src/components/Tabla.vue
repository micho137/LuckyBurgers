<template>
  <v-table fixed-header height="auto">
    <thead>
      <tr>
        <th class="text-left text-button">Descripcion</th>
        <th class="text-left text-button">Tipo Pedido</th>
        <th class="text-left text-button">Total</th>
        <th class="text-left text-button">Fecha Ingreso</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="{
          descripcionIngreso,
          uid,
          venta,
          totalIngreso,
          fechaIngreso,
        } in Pedidos"
        :key="uid"
      >
        <td>{{ descripcionIngreso }}</td>
        <td>{{ venta.tipoPedido }}</td>
        <td>${{ totalIngreso }}</td>
        <td>{{ new Date(fechaIngreso).toLocaleDateString() }} - {{new Date(fechaIngreso).toLocaleTimeString()}}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      Pedidos: null,
    };
  },
  methods: {
    getPedidos() {
      axios
        .get("http://localhost:4000/obtenerPedidos")
        .then((response) => {
          console.log(response);
          this.Pedidos = response.data["ingresos"]
        })
        .catch((t) => console.log(t));
    },
  },
  mounted() {
    this.getPedidos();
  },
};
</script>
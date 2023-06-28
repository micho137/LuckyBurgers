<template>
  <v-table fixed-header height="50vh" class="border rounded-lg">
    <thead>
      <tr>
        <th class="text-center text-button">Producto</th>
        <th class="text-center text-button">Cantidad</th>
        <th class="text-center text-button">Descripcion</th>
        <th class="text-center text-button">Adiciones</th>
        <th class="text-center text-button">Precio</th>
        <th class="text-center text-button">X</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(
          { producto, cantidad, precio, descripcion, adicion }, index
        ) in Productos"
        :key="index"
        class="text-center"
      >
        <td>{{ producto }}</td>

        <td>{{ cantidad }}</td>

        <td>{{ descripcion.filter(Boolean).join(", ") }}</td>

        <td>{{ getAdicionesNombres(adicion) }}</td>

        <td>${{ precio }}</td>
        <td>
          <div class="d-flex justify-center">
            <v-btn color="red" @click="onDeletes(index)"> X</v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    Productos: [],
    onDeletes: Function,
  },
  methods: {
    getAdicionesNombres(adicion) {
      if (adicion && Array.isArray(adicion)) {
        const nombres = adicion
          .filter(
            (item) => item.nombreProducto && item.nombreProducto.trim() !== ""
          )
          .map((item) => item.nombreProducto);
        return nombres.join(", ");
      }
      return "";
    },
  },
};
</script>

<template>
  <v-table fixed-header height="50vh" class="border rounded-lg">
    <thead>
      <tr>
        <th class="text-center text-button">Producto</th>
        <th class="text-center text-button">Cantidad</th>
        <th class="text-center text-button">Precio</th>
        <th class="text-center text-button">Accion</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="({ producto, cantidad, precio }, index) in Productos"
        :key="index"
        class="text-center"
      >
        <td>{{ producto }}</td>

        <td>{{ cantidad }}</td>

        <td>${{ precio }}</td>
        <td>
          <div class="d-flex justify-center">
            <v-btn color="red" @click="onDeletes(index)"> Eliminar </v-btn>
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
  methods: {},
};
</script>
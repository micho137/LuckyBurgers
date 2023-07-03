<template>
  <v-table fixed-header height="50vh" class="border rounded-lg">
    <thead>
      <tr>
        <th class="text-center text-button">Producto</th>
        <th class="text-center text-button">Cantidad</th>
        <th class="text-center text-button">Precio</th>
        <th class="text-center text-button">Proveedor</th>
        <th class="text-center text-button">Accion</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="{ producto, cantidad, precioCompra, proveedor, uid, uidProveedor } in Proveedores" :key="uid"
        class="text-center">
        <td>{{ producto }}</td>

        <td>{{ cantidad }}</td>

        <td>${{ precioCompra }}</td>

        <td>{{ proveedor }}</td>
        <td>
          <div class="d-flex justify-center">
            <v-btn color="red" @click="deletes(uid)"> Eliminar </v-btn>
          </div>
        </td>
        <td v-if="off">{{ uidProveedor }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
  
<script>
export default {
  data() {
    return {
      off: false
    }
  },
  props: {
    Proveedores: [],
    Check: Function
  },
  methods: {
    deletes(uid) {
      this.Proveedores.splice(uid, 1)
      this.Check()
    }
  }
}
</script>
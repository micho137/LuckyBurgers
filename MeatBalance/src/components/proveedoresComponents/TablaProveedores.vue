<template>
  <v-table fixed-header height="700px" class="text-center overflow-auto">
    <thead>
      <tr>
        <th class="text-center text-button">Proveedor</th>
        <th class="text-center text-button">Descripcion</th>
        <th class="text-center text-button">NIT</th>
        <th class="text-center text-button">Direccion</th>
        <th class="text-center text-button">Contacto</th>
        <th class="text-center text-button">Accion</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="proveedor in Proveedores" :key="proveedor.uid">
        <td>{{ proveedor.nombreProveedor }}</td>
        <td>{{ proveedor.descripcion }}</td>
        <td>{{ proveedor.NIT }}</td>
        <td>{{ proveedor.direccionProveedor }}</td>
        <td>{{ proveedor.contacto }}</td>
        <td>
          <div class="d-flex justify-center">
            <v-btn color="comoNaranja" class="mr-4" @click="goEdit">
              Editar
            </v-btn>
            <v-btn
              color="grey"
              class=""
              @click="showDeleteAlert(proveedor.uid)"
            >
              Eliminar
            </v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      Proveedores: null,
    };
  },
  methods: {
    goEdit() {
      this.$router.push("EditarProveedor");
    },
    getProveedores() {
      axios
        .get("http://localhost:4000/proveedores")
        .then((response) => {
          this.Proveedores = response.data["resp"][1];
        })
        .catch((e) => console.log(e));
    },
    async deleteProveedor(id) {
      await axios
        .delete("http://localhost:4000/delete/proveedor/" + id)
        .then((response) => {
          console.log(response);
          this.getProveedores();
        });
    },
    showDeleteAlert(id) {
      this.$swal({
        title: "¿Estás seguro de hacerlo?",
        text: "No podrás revertirlo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, quiero borrarlo!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteProveedor(id);
          this.$swal("Eliminado!", "El registro ha sido borrado", "success");
        }
      });
    },
  },
  mounted() {
    this.getProveedores();
  },
};
</script>

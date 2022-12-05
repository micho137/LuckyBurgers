<template>
  <v-table fixed-header height="700px" class="text-center overflow-auto">
    <thead>
      <tr>
        <th class="text-center text-button">Producto</th>
        <th class="text-center text-button">Descripcion</th>
        <th class="text-center text-button">Stock</th>
        <th class="text-center text-button">Categoria</th>
        <th class="text-center text-button">Precio</th>
        <th class="text-center text-button">Imagen</th>
        <th class="text-center text-button">Accion</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="{
          nombreProducto,
          descripcionProducto,
          stock,
          categoria,
          precio,
          imgProducto,
          uid
        } in Productos"
        :key="nombreProducto"
      >
        <td>{{ nombreProducto }}</td>
        <td>{{ descripcionProducto }}</td>
        <td>{{ stock }}</td>
        <td>{{ categoria.nombreCategoria }}</td>
        <td>{{ precio }}</td>
        <td><v-img lazy-src="https://res.cloudinary.com/djdxi88e0/image/upload/v1670184495/meatbalance_lqntpv.png" :src="imgProducto"> </v-img></td>
        <td>
          <div class="d-flex justify-center">
            <v-btn color="comoNaranja" class="mr-4" @click="goEdit()">
              Editar
            </v-btn>
            <v-btn color="grey" @click="showDeleteAlert(uid)"> Eliminar </v-btn>
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
      Productos: null,
    };
  },
  methods: {
    goEdit() {
      this.$router.push("EditarProducto");
    },
    getProductos() {
      axios
        .get("http://localhost:4000/productos")
        .then((response) => {
          this.Productos = response.data["resp"][1];
        })
        .catch((t) => console.log(t));
    },
    async deleteProducto(id) {
      await axios
        .delete("http://localhost:4000/delete/productos/" + id)
        .then((response) => {
          console.log(response);
          this.getProductos();
        });
    },
    showDeleteAlert(id) {
      this.$swal({
        title: "¿Estás seguro de hacerlo?",
        text: "No podrás revertirlo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FC6C4C",
        cancelButtonColor: "#a2a2a2",
        confirmButtonText: "Sí, quiero borrarlo!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteProducto(id);
          this.$swal("Eliminado!", "El producto ha sido eliminado", "success");
        }
      });
    },
  },
  mounted() {
    this.getProductos();
  },
};
</script>
  
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
      <tr v-for="proveedor in Proveedores" :key="proveedor.id">
        <td>{{ proveedor.nombreProveedor[1] }}</td>
        <td>{{ proveedor.descripcion }}</td>
        <td>{{ proveedor.NIT }}</td>
        <td>{{ proveedor.direccionProveedor }}</td>
        <td>{{ proveedor.contacto }}</td>
        <td>
          <div class="d-flex justify-center">
            <v-btn color="blue-grey" class="mr-4">
              Editar
            </v-btn>
            <v-btn color="grey" class=""> Eliminar </v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      Proveedores:null,
      /* desserts: [
        {
          nombreProveedor: "Leal",
          descripcion: "trae chorizo",
          nit: 24500123,
          direccion: "Cra Cantaclaro",
          contacto: 123123123,
        },
      ], */
    }
  },
  methods:{
    getProveedores() {
      axios
        .get("http://localhost:4000/proveedores")
        .then((response) => {
          console.log(response);
          this.Proveedores = response.data["resp"][1];
        })
        .catch((e) => console.log(e));
    },
  },
  mounted(){
    this.getProveedores();
  }
};
</script>

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
        <tr v-for="item in desserts" :key="item.nombreProveedor">
          <td>{{ item.nombreProveedor }}</td>
          <td>{{ item.descripcion }}</td>
          <td>{{ item.nit }}</td>
          <td>{{ item.direccion }}</td>
          <td>{{ item.contacto }}</td>
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
  export default {
    data() {
      return {
        desserts: [
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
          {
            nombreProveedor: "Leal",
            descripcion: "trae chorizo",
            nit: 24500123,
            direccion: "Cra Cantaclaro",
            contacto: 123123123,
          },
        ],
      };
    },
  };
  </script>
  
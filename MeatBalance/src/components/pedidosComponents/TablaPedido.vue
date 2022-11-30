<template>
    <v-table fixed-header height="500px" class="border rounded-lg">
      <thead>
        <tr>
          <th class="text-center text-button">Producto</th>
          <th class="text-center text-button">Cantidad</th>
          <th class="text-center text-button">Precio</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cuenta" :key="item.producto" class="text-center">
          <td>{{ item.producto }}</td>
          
          <td>{{ item.cantidad }}</td>
          
          <td>{{ item.precio }}</td>
        </tr>
      </tbody>
    </v-table>
  </template>
  
  <script>
  export default{
      data () {
        return {
          cuenta: [
            {
              producto: 'Frozen Yogurt',
              cantidad: 159,
              precio:4000
            },
          ],
        }
      },
  }
  </script>
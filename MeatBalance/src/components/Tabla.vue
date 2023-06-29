<template>
  <v-table fixed-header height="auto" class="text-center">
    <thead>
      <tr>
        <th class="text-center text-button">Descripcion</th>
        <th class="text-center text-button">T.Pedido</th>
        <th class="text-center text-button">Mesa</th>
        <th class="text-center text-button">Total</th>
        <th class="text-center text-button">Fecha</th>
        <th class="text-center text-button">Accion</th>
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
        <td>{{ venta.mesa }}</td>
        <td>${{ totalIngreso }}</td>
        <td>
          {{ new Date(fechaIngreso).toLocaleDateString() }} -
          {{ new Date(fechaIngreso).toLocaleTimeString() }}
        </td>
        <td>
          <div class="d-flex justify-center">
            <v-btn color="newSecondayBlue" class="mr-4" @click="goEdit(venta._id)">
              Editar
            </v-btn>
            <v-btn color="red" @click="showDeleteAlert(venta._id)">
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
const devRuta = import.meta.env.VITE_APP_RUTA_API
export default {
  data() {
    return {
      Pedidos: null,
    };
  },
  methods: {
    getPedidos() {
      axios
        .get(devRuta+"/obtenerPedidos")
        .then((response) => {
          this.Pedidos = response.data["ingresos"];
        })
        .catch((t) => console.log(t));
    },
    async deletePedido(uid) {
      await axios
        .delete(devRuta+"/borrar/venta/" + uid)
        .then(() => this.getPedidos())
        .catch((t) => this.failed());
    },
    failed() {
      this.$swal({
        icon: "error",
        title: "Oops...",
        text: "Algo salio mal",
        confirmButtonColor:"#0f172a",
        showConfirmButton: true,
      });
    },
    showDeleteAlert(uid) {
      this.$swal({
        title: "¿Estás seguro de hacerlo?",
        text: "No podrás revertirlo!",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "#a2a2a2",
        confirmButtonText: "Sí, quiero borrarlo!",
      })
        .then((result) => {
          if (result.isConfirmed) {
            this.deletePedido(uid);
            this.$swal("Eliminado!", "El registro ha sido borrado", "success");
          }
        })
        .catch((t) => this.failed());
    },
    goEdit(id) {
      const pedidoId = id;
      this.$router.push(`/EditarPedido/${pedidoId}`);
      localStorage.setItem("idPedido", pedidoId);
    },
  },
  mounted() {
    this.getPedidos();
  },
};
</script>
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
      <tr
        v-for="{
          nombreProveedor,
          descripcion,
          NIT,
          uidProveedor,
          direccionProveedor,
          contacto,
        } in Proveedores"
        :key="uidProveedor"
      >
        <td>{{ nombreProveedor }}</td>
        <td>{{ descripcion }}</td>
        <td>{{ NIT }}</td>
        <td>{{ direccionProveedor }}</td>
        <td>{{ contacto }}</td>
        <td>
          <div class="d-flex justify-center">
            <v-btn
              color="comoNaranja"
              class="mr-4"
              @click="
                showEditAlert(
                  uidProveedor,
                  nombreProveedor,
                  descripcion,
                  NIT,
                  direccionProveedor,
                  contacto
                )
              "
            >
              Editar
            </v-btn>
            <v-btn color="grey" class="" @click="showDeleteAlert(uidProveedor)">
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
          this.getProveedores();
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
          this.deleteProveedor(id);
          this.$swal("Eliminado!", "El registro ha sido borrado", "success");
        }
      });
    },
    showDone() {
      this.$swal({
        icon: "success",
        title: "Proveedor editado con exito",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
    },
    failed() {
      this.$swal({
        icon: "error",
        title: "Oops...",
        text: "Debes llenar todos los datos",
        showConfirmButton: true,
      });
    },
    showEditAlert(
      uidProveedor,
      nombreProveedor,
      descripcion,
      NIT,
      direccionProveedor,
      contacto
    ) {
      const data = {
        uidProveedor,
        nombreProveedor,
        descripcion,
        NIT,
        direccionProveedor,
        contacto,
      };
      this.$swal({
        title: "Editar proveedor",
        html:
          `<div style="display:flex;justify-content:center;flex-direction:column;margin-bottom: 10px"><label><strong>Proveedor</strong></label><input style="text-align:center" value='${data.nombreProveedor}' placeholder="Nombre Proveedor" id="swal-input1" class="swal2-input"></div>` +
          `<div style="display:flex;justify-content:center;flex-direction:column;margin-bottom: 10px"><label><strong>Descripcion</strong></label><input style="text-align:center" value='${data.descripcion}' placeholder="Descripcion" id="swal-input2" class="swal2-input"></div>` +
          `<div style="display:flex;justify-content:center;flex-direction:column;margin-bottom: 10px"><label><strong>NIT</strong></label><input style="text-align:center" value='${data.NIT}' placeholder="NIT" id="swal-input3" class="swal2-input"></div>` +
          `<div style="display:flex;justify-content:center;flex-direction:column;margin-bottom: 10px"><label><strong>Direccion</strong></label><input style="text-align:center" value='${data.direccionProveedor}' placeholder="Direccion" id="swal-input4" class="swal2-input"></div>` +
          `<div style="display:flex;justify-content:center;flex-direction:column;margin-bottom: 10px"><label><strong>Contacto</strong></label><input style="text-align:center" value='${data.contacto}' placeholder="Contacto" id="swal-input5" class="swal2-input"></div>`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "Editar",
        confirmButtonColor: "#FC6C4C",
        preConfirm: () => {
          if (
            document.getElementById("swal-input1").value === "" ||
            document.getElementById("swal-input2").value === "" ||
            document.getElementById("swal-input3").value === "" ||
            document.getElementById("swal-input4").value === "" ||
            document.getElementById("swal-input5").value === ""
          ) {
            this.failed();
          } else {
            return [
              (data.nombreProveedor =
                document.getElementById("swal-input1").value),
              (data.descripcion = document.getElementById("swal-input2").value),
              (data.NIT = document.getElementById("swal-input3").value),
              (data.direccionProveedor =
                document.getElementById("swal-input4").value),
              (data.contacto = document.getElementById("swal-input5").value),
              axios
                .put(`/editar/proveedores/` + uidProveedor, {
                  nombreProveedor: data.nombreProveedor,
                  descripcion: data.descripcion,
                  NIT: data.NIT,
                  direccionProveedor: data.direccionProveedor,
                  contacto: data.contacto,
                })
                .then(() => {
                  this.showDone();
                  setTimeout(() => {
                    location.reload();
                  }, 1000);
                })
                .catch((e) => {
                  this.failed();
                }),
            ];
          }
        },
      });
    },
  },
  mounted() {
    this.getProveedores();
  },
};
</script>

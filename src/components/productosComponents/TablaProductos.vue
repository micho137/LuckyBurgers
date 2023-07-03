<template>
  <v-table fixed-header height="70vh" class="text-center overflow-y-hidden">
    <thead>
      <tr>
        <th class="text-center text-button">Producto</th>
        <th class="text-center text-button">Descripcion</th>
        <th class="text-center text-button">Categoria</th>
        <th class="text-center text-button">Precio</th>
        <th class="text-center text-button">Accion</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="{
          nombreProducto,
          descripcionProducto,
          categoria,
          precio,
          uid,
        } in Productos"
        :key="nombreProducto"
      >
        <td>{{ nombreProducto }}</td>
        <td>{{ descripcionProducto }}</td>
        <td>{{ categoria.nombreCategoria }}</td>
        <td>${{ precio }}</td>
        <td>
          <div class="d-flex justify-center">
            <v-btn
              color="newSecondayBlue"
              class="mr-4"
              @click="
                showEditAlert(
                  nombreProducto,
                  descripcionProducto,
                  categoria,
                  precio,
                  uid
                )
              "
            >
              Editar
            </v-btn>
            <v-btn color="red" @click="showDeleteAlert(uid)"> Eliminar </v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import axios from "axios";
const devRuta = import.meta.env.VITE_APP_RUTA_API;
export default {
  data() {
    return {
      Category: [],
      Productos: null,
    };
  },
  methods: {
    goEdit() {
      this.$router.push("EditarProducto");
    },
    prueba() {
      var select = document.getElementById("selectCategory");

      for (var i = 0; i < this.Category.length; i++) {
        var opt = this.Category[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.append(el);
      }
      return;
    },
    getProductos() {
      axios
        .get(devRuta + "/productos")
        .then((response) => {
          this.Productos = response.data["resp"][1];
        })
        .catch((t) => console.log(t));
    },
    async deleteProducto(id) {
      await axios
        .delete(devRuta + "/delete/productos/" + id)
        .then((response) => {
          this.getProductos();
        });
    },
    showDone() {
      this.$swal({
        icon: "success",
        title: "Producto editado con exito",
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
    async showEditAlert(
      nombreProducto,
      descripcionProducto,
      categoria,
      precio,
      uid
    ) {
      const data = {
        nombreProducto,
        descripcionProducto,
        categoria,
        precio,
        uid,
      };
      const categoriaArray = JSON.parse(JSON.stringify(this.Category));
      this.$swal({
        title: "Editar producto",
        html:
          `<div style="display:flex;justify-content:center;flex-direction:column;margin-bottom: 10px"><label><strong>Nombre del Producto</strong></label><input style="text-align:center" value='${data.nombreProducto}' placeholder="Nombre del Producto" id="swal-input1" class="swal2-input"></div>` +
          `<div style="display:flex;justify-content:center;flex-direction:column;margin-bottom: 10px"><label><strong>Descripcion</strong></label><input style="text-align:center" value='${data.descripcionProducto}' placeholder="Descripcion" id="swal-input2" class="swal2-input"></div>` +
          `<div style="display:flex;justify-content:center;flex-direction:column;margin-bottom: 10px"><label><strong>Categoria</strong></label>
            <select id="swal-input3" class="swal2-input">` +
          categoriaArray.map(
            (categoria) =>
              `<option value="${categoria.uid}">${categoria.nombreCategoria}</option>`
          ) +
          `</select>` +
          `<div style="display:flex;justify-content:center;flex-direction:column;margin-bottom: 10px"><label><strong>Precio</strong></label><input style="text-align:center" value='${data.precio}' placeholder="Precio" id="swal-input5" class="swal2-input"></div>`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "Editar",
        confirmButtonColor: "#3abff8",
        cancelButtonColor:"red",
        preConfirm: () => {
          if (
            document.getElementById("swal-input1").value === "" ||
            document.getElementById("swal-input2").value === "" ||
            document.getElementById("swal-input3").value === "" ||
            document.getElementById("swal-input5").value === ""
          ) {
            this.failed();
          } else {
            return [
              (data.nombreProducto =
                document.getElementById("swal-input1").value),
              (data.descripcionProducto =
                document.getElementById("swal-input2").value),
                (data.categoria =
                document.getElementById("swal-input3").value),
              (data.precio = document.getElementById("swal-input5").value),
              axios
                .put(`${devRuta}/editar/productos/` + uid, {
                  nombreProducto: data.nombreProducto,
                  descripcionProducto: data.descripcionProducto,
                  categoria: data.categoria,
                  precio: data.precio,
                })
                .then((Response) => {
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
    showDeleteAlert(id) {
      this.$swal({
        title: "¿Estás seguro de hacerlo?",
        text: "No podrás revertirlo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3abff8",
        cancelButtonColor:"red",
        confirmButtonText: "Sí, quiero borrarlo!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteProducto(id);
          this.$swal("Eliminado!", "El producto ha sido eliminado", "success");
        }
      });
    },
    async getCategorias() {
      try {
        const response = await axios.get(devRuta + "/categorias");
        this.Category = response.data["resp"][1].map((obj) => {
          return {
            uid: obj["uid"],
            nombreCategoria: obj["nombreCategoria"],
          };
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getProductos();
    this.getCategorias();
    setInterval(() => {
      this.getProductos()
      this.getCategorias()
    }, 5000);
  },
};
</script>

<template>
  <v-form ref="form" class="" v-model="valid" lazy-validation>
    <v-container>
      <v-row class="d-flex flex-column align-center">
        <v-col cols="12" md="4">
          <v-text-field v-model="nombreProducto" :rules="nameRules" color="newSecondayBlue" label="Nombre del producto"
            required></v-text-field>
          <v-text-field v-model="descripcion" color="newSecondayBlue" :rules="descripcionRules" label="Descripcion"
            required></v-text-field>
          <v-text-field v-model="precio" color="newSecondayBlue" :rules="precioRules" label="Precio" prefix="$"
            required></v-text-field>
          <v-select v-model="categoriaProducto" color="newSecondayBlue" :rules="precioRules" item-value="uid"
            item-title="nombreCategoria" :items="Category" label="Categoria" required>
          </v-select>
        </v-col>
      </v-row>
      <div class="d-flex justify-center mt-6">
        <v-btn color="newSecondayBlue" class="mr-4" @click="validate">
          Registrar
        </v-btn>
        <v-btn color="red" class="mr-4" @click="reset"> Reset Form </v-btn>
      </div>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";
const devRuta = import.meta.env.VITE_APP_RUTA_API
export default {
  data: () => ({
    Category: [],
    tProducto: ["Inventario", "Venta"],
    categoriaProducto: "",
    archivo: "",
    nombreProducto: "",
    descripcion: "",
    precio: "",
    valid: true,
    nameRules: [(v) => !!v || "El nombre es requerido"],
    tipoRules: [(v) => !!v || "El tipo de producto es requerido"],
    descripcionRules: [(v) => !!v || "La descripcion es requerida"],
    precioRules: [(v) => !!v || "El precio es requerido"],
  }),
  methods: {
    failed() {
      this.$swal({
        icon: "error",
        title: "Oops...",
        text: "Algo no ha salido bien",
      });
    },
    showRegisterAlert() {
      this.$swal({
        position: "top-end",
        icon: "success",
        title: "Producto registrado exitosamente",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    async validate() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        let data = {
          nombreProducto: this.nombreProducto,
          descripcionProducto: this.descripcion,
          precio: this.precio,
          categoria: this.categoriaProducto,
          /* tipoProducto: this.tipoProducto, */
        }
        /* let data = new FormData();
        var file = this.archivo[0]
        data.append("nombreProducto", this.nombreProducto);
        data.append("descripcionProducto", this.descripcion);
        data.append("precio", this.precio);
        data.append("archivo",file);
        data.append("categoria", this.categoriaProducto);
        data.append("tipoProducto",this.tipoProducto) */
        await axios
          /* .post("http://localhost:4000/crear/productos", data, {
              headers: {
                "accept": "application/json",
                "Content-Type": `multipart/form-data`,
              },
            }) */
          .post(devRuta + "/crear/productos", data)
          .then((response) => {
            this.showRegisterAlert();
            this.reset();
          })
          .catch((e) => this.failed());
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    /* async selectImage(a) {
      const file = a.target.files[0];
      if (!file) return;
      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(f);
        });
      const data = await readData(file);
      this.archivoPreview = data;
    },
    async imageClear() {
      this.archivoPreview = "";
    }, */
    getCategorias() {
      axios
        .get(devRuta + "/categorias")
        .then((response) => {
          this.Category = response.data["resp"][1].map((obj) => {
            return {
              uid: obj["uid"],
              nombreCategoria: obj["nombreCategoria"],
            };
          });
        })
        .catch((t) => console.log(t));
    },
  },
  mounted() {
    this.getCategorias();
  },
};
</script>

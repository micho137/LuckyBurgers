<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row class="d-flex flex-column align-center">
        <v-col cols="12" md="4">
          <v-text-field
            v-model="nombreProducto"
            :rules="nameRules"
            label="Nombre del producto"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="descripcion"
            :rules="descripcionRules"
            label="Descripcion"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="precio"
            :rules="precioRules"
            label="Precio"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" class="">
          <v-file-input
            persistent-hint
            hint="Formatos permitidos: .png .jpeg .bmp"
            accept="image/png, image/jpeg, image/bmp"
            chips
            clearable
            label="Seleccione la imagen del producto"
          ></v-file-input>
        </v-col>
      </v-row>
      <div class="d-flex justify-center mt-6">
        <v-btn color="blue-grey" class="mr-4" @click="validate">
          Registrar
        </v-btn>

        <v-btn color="grey" class="mr-4" @click="reset"> Reset Form </v-btn>
      </div>
    </v-container>
  </v-form>
</template>
  
  <script>
export default {
  data: () => ({
    valid: true,
    nombreProducto: "",
    nameRules: [(v) => !!v || "El nombre es requerido"],
    descripcion: "",
    descripcionRules: [(v) => !!v || "La descripcion es requerida"],
    precio: "",
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
        this.showRegisterAlert();
        this.reset();
      } else {
        this.failed();
      }
      /* if (valid) alert("Proveedor registrado"); */
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
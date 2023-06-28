<template>
  <v-form ref="form" class="mt-10" v-model="valid" lazy-validation>
    <v-container>
      <v-row class="d-flex flex-column align-center">
        <v-col cols="12" md="4">
          <v-text-field
            color="newSecondayBlue"
            v-model="nombreCategoria"
            :rules="categoriaRules"
            label="Nombre de la categoria"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-textarea
            color="newSecondayBlue"
            no-resize=""
            v-model="descripcion"
            :rules="descripcionRules"
            label="Descripcion"
            required
          >
          </v-textarea>
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
    valid: true,
    nombreCategoria: "",
    categoriaRules: [(v) => !!v || "La categoria es requerida"],
    descripcion: "",
    descripcionRules: [(v) => !!v || "La descripcion es requerida"],
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
        title: "Categoria registrada exitosamente",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    async validate() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        await axios
          .post(devRuta+"/crear/categorias", {
            nombreCategoria: this.nombreCategoria,
            descripcion: this.descripcion,
          })
          .then(() => {
            this.showRegisterAlert();
            this.reset();
          }).catch((e)=>console.log(e));
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row class="d-flex flex-column align-center">
        <v-col cols="12" md="4">
          <v-text-field
            v-model="nombreProveedor"
            :rules="nameRules"
            label="Nombre del proveedor"
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
            v-model="nit"
            :rules="nitRules"
            label="NIT"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="direccion"
            :rules="direccionRules"
            label="Direccion"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="contacto"
            :rules="contactoRules"
            label="Contacto"
            required
          ></v-text-field>
        </v-col>
        <div class="d-flex justify-center">
          <v-btn color="blue-grey" class="mr-4" @click="validate">
            Registrar
          </v-btn>

          <v-btn color="grey" class="mr-4" @click="reset"> Reset Form </v-btn>
        </div>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    nombreProveedor: "",
    nameRules: [(v) => !!v || "El nombre es requerido"],
    descripcion: "",
    descripcionRules: [(v) => !!v || "La descripcion es requerida"],
    nit: "",
    nitRules: [(v) => !!v || "El NIT es requerido"],
    direccion: "",
    direccionRules: [(v) => !!v || "El direccion es requerida"],
    contacto: "",
    contactoRules: [(v) => !!v || "El contacto es requerido"],
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
        title: "Proveedor registrado exitosamente",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    async validate() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.showRegisterAlert();
        this.reset()
      } else {
        this.failed()
      }
      /* if (valid) alert("Proveedor registrado"); */
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
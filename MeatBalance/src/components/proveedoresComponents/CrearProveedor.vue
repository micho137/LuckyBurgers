<template>
  <v-form class="mt-10" ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row class="d-flex flex-column align-center">
        <v-col cols="12" md="4">
          <v-text-field
            v-model="nombreProveedor"
            :rules="nameRules"
            color="comoNaranja"
            label="Nombre del proveedor"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="descripcion"
            color="comoNaranja"
            :rules="descripcionRules"
            label="Descripcion"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="nit"
            color="comoNaranja"
            :rules="nitRules"
            label="NIT"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="direccion"
            color="comoNaranja"
            :rules="direccionRules"
            label="Direccion"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="contacto"
            color="comoNaranja"
            :rules="contactoRules"
            label="Contacto"
            required
          ></v-text-field>
        </v-col>
        <div class="d-flex justify-center">
          <v-btn color="comoNaranja" class="mr-4" @click="validate">
            Registrar
          </v-btn>

          <v-btn color="grey" class="mr-4" @click="reset"> Reset Form </v-btn>
        </div>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    Proveedores: null,
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
        text: "Debes llenar todos los datos",
        timer: 1500,
        showConfirmButton: false,
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
        await axios
          .post(`http://localhost:4000/crear/proveedores`, {
            nombreProveedor: this.nombreProveedor,
            descripcion: this.descripcion,
            NIT: this.nit,
            direccionProveedor: this.direccion,
            contacto: this.contacto,
          })
          .then((Response) => {
            this.showRegisterAlert();
            this.reset();
          })
          .catch((e) => {
            this.failed();
          });
      }
      /* if (valid) alert("Proveedor registrado"); */
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
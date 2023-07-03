<template>
  <v-main class="h-100">
    <v-container>
      <v-sheet height="70vh" rounded="lg" color="newPrimaryBlue">
        <v-col>
          <v-form ref="form" v-model="valid" lazy-validation class="d-flex flex-column align-center mt-5">
            <v-col md="5">
              <v-text-field
                v-model="monto"
                color="newSecondayBlue"
                :rules="valorRules"
                label="Monto"
                type="number"
                prefix="$"
                required
              ></v-text-field>
            </v-col>
            <v-col md="5">
              <v-textarea
                no-resize
                color="newSecondayBlue"
                v-model="descripcion"
                :rules="descripcionRules"
                label="Descripcion"
                required
              >
              </v-textarea>
            </v-col>
            <div class="d-flex justify-center mt-6">
              <v-btn color="newSecondayBlue" class="mr-4" @click="validate">
                Registrar
              </v-btn>
              <v-btn color="red" class="mr-4" @click="reset">
                Reset Form
              </v-btn>
              <v-btn class="mr-4 text-black" @click="getBack">
                Cancelar
              </v-btn>
            </div>
          </v-form>
        </v-col>
      </v-sheet>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
const devRuta = import.meta.env.VITE_APP_RUTA_API
export default {
  data: () => ({
    valid: true,
    monto: "",
    descripcion: "",
    valorRules: [(v) => !!v || "El monto es requerido"],
    descripcionRules: [(v) => !!v || "La descripcion es requerida"],
  }),
  computed: {},
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
        title: "Egreso registrado",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    async validate() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        await axios
          .post(devRuta+"/crear/egreso", {
            totalEgreso: this.monto,
            descripcionEgreso: this.descripcion,
          })
          .then(() => {
            this.showRegisterAlert();
            this.reset();
          })
          .catch(() => {
            this.failed();
          });
      }
    },
    getBack() {
      this.$router.push("/Monetarios");
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

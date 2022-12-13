<template>
  <v-main class="h-100">
    <v-container>
      <v-sheet min-height="70vh" max-height="" rounded="lg" class="pa-5">
        <v-col>
          <v-form ref="form" v-model="valid" lazy-validation class="d-flex flex-column align-center">
            <v-col md="5">
              <v-text-field
                v-model="monto"
                :rules="valorRules"
                label="Monto"
                type="number"
                prefix="$"
                required
              ></v-text-field>
            </v-col>
            <v-col md="5">
              <v-textarea
                no-resize=""
                v-model="descripcion"
                :rules="descripcionRules"
                label="Descripcion"
                required
              >
              </v-textarea>
            </v-col>
            <div class="d-flex justify-center mt-6">
              <v-btn color="blue-grey" class="mr-4" @click="validate">
                Registrar
              </v-btn>
              <v-btn color="grey" class="mr-4" @click="reset">
                Reset Form
              </v-btn>
              <v-btn color="danger" class="mr-4" @click="getBack">
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
          .post("http://localhost:4000/crear/egreso", {
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

<template>
  <v-main class="h-100">
    <v-container>
      <v-row>
        <v-col>
          <v-sheet
            min-height="70vh"
            rounded="lg"
            class="pa-5 justify-center align-center d-flex"
          >
            <v-card
              class="mx-auto px-6 py-8 bg-comoNaranja"
              min-width="350"
              max-width="400"
            >
              <v-sheet
                rounded="lg"
                class="d-flex justify-center bg-grisOpaco mb-5 pa-2"
              >
                <v-img
                  max-height="70"
                  max-width="70"
                  src="https://res.cloudinary.com/djdxi88e0/image/upload/v1670184495/meatbalance_lqntpv.png"
                ></v-img>
              </v-sheet>
              <v-form v-model="form" @submit.prevent="onSubmit()">
                <v-text-field
                  v-model="email"
                  :readonly="loading"
                  :rules="[required]"
                  type="email"
                  variant="outlined"
                  class="mb-2"
                  clearable
                  label="Correo"
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :readonly="loading"
                  :rules="[required]"
                  :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append-inner="show1 = !show1"
                  label="Contraseña"
                  variant="outlined"
                  placeholder="Ingresa la contraseña"
                ></v-text-field>

                <br />

                <v-btn
                  :disabled="!form"
                  :loading="loading"
                  block
                  color="comoRosado"
                  size="large"
                  type="submit"
                  variant="elevated"
                >
                  Iniciar Sesion
                </v-btn>
              </v-form>
            </v-card>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { useLoginStore } from "@/stores/LoginStore";
export default {
  setup() {
    const authStore = useLoginStore();
    return { authStore };
  },
  data: () => ({
    show1: false,
    form: true,
    email: "",
    password: "",
    loading: false,
  }),
  methods: {
    onSubmit() {
      var payload = {
        correo: this.email,
        password: this.password,
      };
      this.loading = true;
      this.authStore.vLogin(payload).then(() => {
        setTimeout(
          ((this.loading = false), this.$router.push("/Pedidos")),
          2000
        );
      });
    },
    required(v) {
      return !!v || "Este campo es requerido";
    },
  },
};
</script>
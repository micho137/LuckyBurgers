<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet>
          <v-form ref="form" v-model="valid" lazy-validation class="">
            <div class="d-flex flex-column">
              <v-autocomplete
                transition="scroll-x-transition"
                v-model="select"
                :items="items"
                label="Selecionar Producto"
                :rules="[(v) => !!v || 'El producto es requerido']"
                required
              ></v-autocomplete>

              <v-text-field
                v-model="number"
                :rules="numberRules"
                label="Cantidad"
                required
                min="1"
                type="number"
              ></v-text-field>
            </div>

            <div class="mt-4 d-flex justify-center">
              <v-btn class="mr-2" color="primary" @click="validate">
                Agregar
                <v-icon end icon="mdi-plus-box"></v-icon>
              </v-btn>

              <v-btn color="red" @click="reset">
                Limpiar
                <v-icon end icon="mdi-delete"></v-icon>
              </v-btn>
            </div>
          </v-form>
        </v-sheet>
      </v-col>
      <v-col>
        <!-- ESPACIO -->
        <v-sheet>
          <tabla-vue />
        </v-sheet>
        <!-- ESPACIO -->
        <v-col class="d-flex justify-space-around border rounded-lg pa-2 mt-4">
          <div class="d-flex">
            <v-btn color="success" class="mr-4" @click="prueba()">
              Enviar Pedido
            </v-btn>
            <!-- <v-btn color="error"> Cancelar </v-btn> -->
          </div>
          <div class="">
            <v-sheet class="text-button font-weight-bold">
              Total: {{ items[1] }}
            </v-sheet>
          </div>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>
import TablaVue from "../pedidosComponents/TablaPedido.vue";
export default {
  data: () => ({
    valid: true,
    number: "",
    numberRules: [(v) => !!v || "Cantidad es requerida"],
    select: "",
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    
  }),

  methods: {
    async prueba() {
      const { value: pedido } = await this.$swal({
        title: "Select field validation",
        input: "select",
        inputOptions: {
          Fruits: {
            apples: "Apples",
            bananas: "Bananas",
            grapes: "Grapes",
            oranges: "Oranges",
          },
        },
        inputPlaceholder: "Seleccione el tipo de pedido",
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === "oranges") {
              resolve();
            } else {
              resolve("You need to select oranges :)");
            }
          });
        },
      });

      if (pedido) {
        this.$swal(`You selected: ${pedido}`);
      }
    },
    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) alert("Pedido registrado");
    },
    reset() {
      this.$refs.form.reset();
    },
  },
  components: {
    TablaVue,
  },
};
</script>
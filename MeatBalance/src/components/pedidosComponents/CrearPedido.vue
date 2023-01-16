<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet>
          <v-form ref="form" v-model="valid" lazy-validation class="">
            <div class="d-flex flex-column">
              <v-autocomplete
                color="comoNaranja"
                v-model="select"
                :items="Productos"
                item-value="[precio, nombreProducto, uid]"
                item-title="nombreProducto"
                label="Selecionar Producto"
                :rules="[(v) => !!v || 'El producto es requerido']"
                required
                return-object
              ></v-autocomplete>

              <v-text-field
                color="comoNaranja"
                v-model="number"
                :rules="numberRules"
                label="Cantidad"
                required
                min="1"
                type="number"
              ></v-text-field>

              <div class="d-flex flex-column justify-center">
                <v-autocomplete
                  color="comoNaranja"
                  v-model="select"
                  :items="Productos"
                  item-value="[precio, nombreProducto, uid]"
                  item-title="precio"
                  label="Precio por unidad"
                  disabled
                  return-object
                ></v-autocomplete>
              </div>
            </div>

            <div class="mt-4 d-flex justify-center">
              <v-btn class="mr-2" color="comoNaranja" @click="add">
                Agregar
              </v-btn>

              <v-btn color="grisButton" @click="reset"> Limpiar </v-btn>
            </div>
          </v-form>
        </v-sheet>
      </v-col>
      <v-col>
        <!-- ESPACIO -->
        <v-sheet>
          <tabla-vue :onDeletes="deletes" :Productos="pedidos" />
        </v-sheet>
        <!-- ESPACIO -->
        <v-col class="d-flex justify-space-around border rounded-lg pa-2 mt-4">
          <div v-if="onSuccess" class="d-flex">
            <v-btn color="comoNaranja" class="mr-4" @click="prueba()">
              Enviar Pedido
            </v-btn>
            <v-btn @click="cleanTable" color="grisButton">
              Limpiar Tabla
            </v-btn>
          </div>
          <div class="">
            <v-sheet class="text-button font-weight-bold">
              Total: ${{ getTotal }}
            </v-sheet>
          </div>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>
import axios from "axios";
import TablaVue from "../pedidosComponents/TablaPedido.vue";
const devRuta = import.meta.env.VITE_APP_RUTA_API;
export default {
  computed: {
    getTotal() {
      let total = 0;
      this.pedidos.forEach((e) => {
        total += e.precio;
      });
      return total;
    },
  },
  data: () => ({
    valid: true,
    onSuccess: false,
    onClean: false,
    datos: [],
    Productos: [],
    pedidos: [],
    mesas: [
      "Mesa 1",
      "Mesa 2",
      "Mesa 3",
      "Mesa 4",
      "Mesa 5",
      "Mesa 6",
      "Mesa 7",
      "Mesa 8",
      "Mesa 9",
      "Mesa 10",
      "Mesa 11",
      "Mesa 12",
      "Mesa 13",
      "Mesa 14",
      "Mesa 15",
    ],
    number: "",
    numberRules: [(v) => !!v || "Cantidad es requerida"],
    select: "",
  }),
  methods: {
    cleanTable() {
      this.pedidos = [];
      if ((this.onSuccess = true)) {
        this.onSuccess = false;
      }
    },
    activate() {
      if (this.pedidos.length > 0) {
        this.onSuccess = true;
      } else {
        this.onSuccess = false;
      }
    },
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
        title: "Pedido registrado exitosamente",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    async selectMesa(table) {
      await this.$swal({
        title: "Seleccione la mesa que ordenó el pedido",
        input: "select",
        inputOptions: this.mesas,
        inputPlaceholder: "Selecciona una mesa",
        confirmButtonColor: "#FC6C4C",
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value) {
              const valorArray = this.mesas[value];
              resolve(this.validate(table, valorArray));
            } else {
              resolve("Debes seleccionar una mesa valida");
            }
          });
        },
      });
    },
    async prueba() {
      await this.$swal({
        title: "Selecciona el tipo de pedido",
        input: "select",
        inputOptions: {
          Local: "Local",
          Domicilio: "Domicilio",
        },
        inputPlaceholder: "Tipo de pedido",
        confirmButtonColor: "#FC6C4C",
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === "Local") {
              resolve(this.selectMesa(value));
            } else if (value === "Domicilio") {
              resolve(this.validate(value, "Domicilio"));
            } else {
              resolve("Debes seleccionar una opcion valida");
            }
          });
        },
      });
    },
    async validate(value, table) {
      axios
        .post(devRuta + "/crearPedido", {
          pedido: [
            {
              total: this.getTotal,
              tipoPedido: value,
              mesa: table,
            },
            this.pedidos.map((pedido) => {
              return {
                producto: pedido.uid,
                precioDetalle: pedido.precio,
                cantidad: pedido.cantidad,
              };
            }),
          ],
        })
        .then(() => {
          this.showRegisterAlert();
          this.cleanTable();
        })
        .catch((e) => {
          this.failed();
        });
    },
    getProductos() {
      axios
        .get(devRuta + "/productos")
        .then((response) => {
          this.Productos = response.data["resp"][1];
        })
        .catch((t) => console.log(t));
    },
    async add() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.pedidos.push({
          producto: this.select.nombreProducto,
          cantidad: this.number,
          precio: this.select.precio * this.number,
          uid: this.select.uid,
        });
        this.reset();
        this.activate();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    deletes(index) {
      this.pedidos = this.pedidos.filter(
        (producto, pIndex) => pIndex !== index
      );
      this.activate();
    },
  },
  components: {
    TablaVue,
  },
  mounted() {
    this.getProductos();
  },
};
</script>
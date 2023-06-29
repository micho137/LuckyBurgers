<template>
  <v-main class="h-100">
    <v-container>
      <v-row>
        <v-col>
          <v-sheet
            min-height="70vh"
            max-height=""
            rounded="lg"
            class="pa-5 d-flex justify-center align-center"
          >
            <v-col>
              <v-sheet>
                <v-form ref="form" v-model="valid" lazy-validation class="">
                  <div class="d-flex flex-column">
                    <v-autocomplete
                      transition="scroll-x-transition"
                      v-model="select"
                      color="comoNaranja"
                      :items="Productos"
                      item-value="[nombreProducto, uid]"
                      item-title="nombreProducto"
                      label="Selecionar Producto"
                      :rules="[(v) => !!v || 'El producto es requerido']"
                      required
                      return-object
                    ></v-autocomplete>

                    <v-text-field
                      v-model="number"
                      color="comoNaranja"
                      :rules="numberRules"
                      label="Cantidad"
                      required
                      min="1"
                      type="number"
                    ></v-text-field>

                    <v-text-field
                      v-model="precioCompra"
                      color="comoNaranja"
                      :rules="compraRules"
                      label="Precio de Compra"
                      required
                      min="1"
                      type="number"
                      prefix="$"
                    ></v-text-field>

                    <v-autocomplete
                      transition="scroll-x-transition"
                      v-model="selectProveedor"
                      color="comoNaranja"
                      :items="Proveedores"
                      item-value="[nombreProveedor, uidProveedor]"
                      item-title="nombreProveedor"
                      label="Selecionar Proveedor"
                      :rules="[(v) => !!v || 'Debe seleccionar al proveedor']"
                      required
                      return-object
                    ></v-autocomplete>
                  </div>

                  <div class="mt-4 d-flex justify-center">
                    <v-btn class="mr-2" color="comoNaranja" @click="add">
                      Agregar
                    </v-btn>

                    <v-btn class="mr-2" color="grisButton" @click="reset">
                      Limpiar
                    </v-btn>

                    <v-btn @click="getBack" color="danger"> Cancelar </v-btn>
                  </div>
                </v-form>
              </v-sheet>
            </v-col>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet
            min-height="70vh"
            max-height=""
            rounded="lg"
            class="pa-5 d-flex justify-center align-center"
          >
            <v-col>
              <!-- ESPACIO -->
              <v-sheet>
                <tabla-insumo :Check="activate" :Proveedores="proveedores" />
              </v-sheet>
              <!-- ESPACIO -->
              <v-col
                class="d-flex justify-space-around border rounded-lg pa-2 mt-4"
              >
                <div v-if="onSuccess" class="d-flex">
                  <v-btn color="comoNaranja" class="mr-4" @click="validate()">
                    Registrar Compra
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
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
    
  <script>
import axios from "axios";
import TablaInsumo from "../Insumo/TablaInsumo.vue";
const devRuta = import.meta.env.VITE_APP_RUTA_API
export default {
  computed: {
    getTotal() {
      let total = 0;
      this.proveedores.forEach((e) => {
        total += e.precioCompra;
      });
      return total;
    },
  },
  data: () => ({
    valid: true,
    onSuccess: false,
    datos: [],
    Productos: [],
    proveedores: [],
    number: "",
    compraRules: [(v) => !!v || "El precio de compra es requerido"],
    precioCompra: "",
    numberRules: [(v) => !!v || "Cantidad es requerida"],
    select: "",
    selectProveedor: "",
  }),
  methods: {
    cleanTable() {
      this.proveedores = [];
      if ((this.onSuccess = true)) {
        this.onSuccess = false;
      }
    },
    activate() {
      if (this.proveedores.length > 0) {
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
    existingId() {
      this.$swal({
        icon: "warning",
        title: "Cuidado!",
        text: "El producto ya ha sido seleccionado para una compra",
      });
    },
    showRegisterAlert() {
      this.$swal({
        position: "top-end",
        icon: "success",
        title: "Compra registrada exitosamente",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    async validate() {
      await axios
        .post(devRuta+"/crearCompra", {
          compra: [
            {
              totalCompra: this.getTotal,
            },
            this.proveedores.map((insumo) => {
              return {
                producto: insumo.uid,
                precioCompra: insumo.precioCompra,
                cantidad: insumo.cantidad,
                proveedor: insumo.uidProveedor,
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
        .get(devRuta+"/productos")
        .then((response) => {
          this.Productos = response.data["resp"][1];
        })
        .catch((t) => console.log(t));
    },
    getProveedores() {
      axios
        .get(devRuta+"/proveedores")
        .then((response) => {
          this.Proveedores = response.data["resp"][1];
        })
        .catch((t) => console.log(t));
    },
    async add() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        let validate = this.proveedores.map((e) => {
          let { uid } = e;
          return uid;
        });
        if (validate.includes(this.select.uid)) {
          this.existingId();
        } else {
          this.proveedores.push({
            producto: this.select.nombreProducto,
            cantidad: this.number,
            precioCompra: this.precioCompra * this.number,
            uid: this.select.uid,
            proveedor: this.selectProveedor.nombreProveedor,
            uidProveedor: this.selectProveedor.uidProveedor,
          });
          this.reset();
          this.activate();
        }
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    getBack() {
      this.$router.push("/Monetarios");
    },
  },
  components: {
    TablaInsumo,
  },
  mounted() {
    this.getProductos();
    this.getProveedores();
  },
};
</script>
<template>
  <v-main class="h-100">
    <v-container>
      <v-row>
        <v-col>
          <v-sheet
            min-height="70vh"
            rounded="lg"
            class="pa-5 d-flex justify-center align-center"
          >
            <v-col>
              <v-container>
                <v-row>
                  <v-col class="d-flex flex-column justify-center">
                    <div v-if="Pedidos.length>0" style="text-transform: uppercase;" class="d-flex justify-center mb-2">
                      <label class="text-center mr-10">Tipo Pedido: <strong>{{ Pedidos[0].venta.tipoPedido }}</strong></label>
                      <label class="text-center ">Mesa: <strong>{{ Pedidos[0].venta.mesa }}</strong></label>
                    </div>
                    <!-- ESPACIO -->
                    <v-sheet>
                      <v-table
                        fixed-header
                        height="500px"
                        class="border rounded-lg"
                      >
                        <thead>
                          <tr>
                            <th class="text-center text-button">Producto</th>
                            <th class="text-center text-button">Cantidad</th>
                            <th class="text-center text-button">Precio</th>
                            <th class="text-center text-button">Accion</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(
                              { producto, cantidad, precioDetalle, venta },
                              index
                            ) in Pedidos"
                            :key="index"
                            class="text-center"
                          >
                            <td>{{ producto.nombreProducto }}</td>

                            <td>{{ cantidad }}</td>

                            <td>${{ precioDetalle }}</td>
                            <td>
                              <div class="d-flex justify-center">
                                <v-btn
                                  @click="
                                    passDatatoEdit(
                                      producto.nombreProducto,
                                      cantidad,
                                      precioDetalle,
                                      venta.tipoPedido,
                                      venta.mesa
                                    )
                                  "
                                  class="mr-2"
                                  color="comoNaranja"
                                >
                                  Editar
                                </v-btn>
                                <v-btn color="grey" @click="deletes(index)">
                                  Eliminar
                                </v-btn>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </v-table>
                    </v-sheet>
                    <!-- ESPACIO -->
                    <v-col
                      class="
                        d-flex
                        justify-space-around
                        border
                        rounded-lg
                        pa-2
                        mt-4
                      "
                    >
                      <!-- <div class="d-flex">
                        <v-btn color="comoNaranja" class="mr-4" @click="prueba">
                          Enviar Pedido
                        </v-btn>
                        <v-btn color="grisButton"> Limpiar Tabla </v-btn>
                      </div> -->
                      <div class="">
                        <v-sheet class="text-button font-weight-bold">
                          Total: ${{ getTotal }}
                        </v-sheet>
                      </div>
                    </v-col>
                  </v-col>

                  <v-col>
                    <v-sheet>
                      <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                          <v-row class="d-flex flex-column align-center">
                            <v-col cols="12" md="8">
                              <v-autocomplete
                                color="comoNaranja"
                                v-model="select"
                                :items="Productos"
                                item-value="[precio, nombreProducto, uid]"
                                item-title="nombreProducto"
                                label="Producto"
                                :rules="[
                                  (v) => !!v || 'El producto es requerido',
                                ]"
                                required
                                return-object
                              ></v-autocomplete>
                            </v-col>

                            <v-col cols="12" md="8">
                              <v-text-field
                                color="comoNaranja"
                                v-model="number"
                                label="Cantidad"
                                required
                                min="1"
                                type="number"
                              ></v-text-field>
                            </v-col>

                            <v-col class="hola" cols="12" md="8">
                              <v-autocomplete
                                color="comoNaranja"
                                v-model="precio"
                                :items="Productos"
                                item-value="[precio, nombreProducto, uid]"
                                item-title="precio"
                                label="Precio por unidad"
                                disabled
                                return-object
                              ></v-autocomplete>
                            </v-col>
                          </v-row>
                          <div class="d-flex justify-center mt-6">
                            <v-btn
                              color="comoNaranja"
                              class="mr-4"
                            >
                              Editar Producto
                            </v-btn>
                            <v-btn color="grey" class="mr-4" @click="add()">
                              Agregar
                            </v-btn>
                          </div>
                          <div class="d-flex justify-center mt-6">
                            <v-btn
                              color="comoNaranja"
                              class="mr-4"
                              @click="prueba()"
                            >
                              Actualizar Pedido
                            </v-btn>
                            <v-btn color="grey" class="mr-4" @click="reset()">
                              Reset Form
                            </v-btn>
                          </div>
                        </v-container>
                      </v-form>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
const devRuta = import.meta.env.VITE_APP_RUTA_API;
export default {
  computed: {
    getTotal() {
      let total = 0;
      this.Pedidos.forEach((e) => {
        total += e.precioDetalle;
      });
      return total;
    },
  },
  data() {
    return {
      Pedidos: [],
      Productos: [],
      tipo: ["Local", "Domicilio"],
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
      precio: "",
      number: "",
      select: "",
    };
  },
  methods: {
    failed() {
      this.$swal({
        icon: "error",
        title: "Oops...",
        text: "Algo no ha salido bien",
      });
    },
    showEditAlert() {
      this.$swal({
        position: "top-end",
        icon: "success",
        title: "Pedido Editado exitosamente",
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
      const idPedido = localStorage.getItem("idPedido");
      axios
        .post(`${devRuta}/editarPedidoCompleto/${idPedido}`, {
          pedido: [
            {
              total: this.getTotal,
              tipoPedido: value,
              mesa: table,
            },
            this.Pedidos.map((pedido) => {
              return {
                producto: pedido.uid,
                precioDetalle: pedido.precio,
                cantidad: pedido.cantidad,
              };
            }),
          ],
        })
        .then(() => {
          this.showEditAlertAlert();
        })
        .catch((e) => {
          this.failed();
        });
    },
    async getPedidos() {
      const idPedido = localStorage.getItem("idPedido");
      await axios
        .get(`${devRuta}/infoTablaEditar/${idPedido}`)
        .then((response) => {
          this.Pedidos = response.data["tabla"];
        })
        .catch((t) => console.log(t));
    },
    getProductos() {
      axios
        .get(devRuta + "/productos")
        .then((response) => {
          this.Productos = response.data["resp"][1];
        })
        .catch((t) => console.log(t));
    },
    passDatatoEdit(p, c) {
      const data = {
        p,
        c,
      };
      this.select = data.p;
      this.number = data.c;
    },
    add(){
      this.Pedidos.push({
          producto: {
            nombreProducto:this.select.nombreProducto
          },
          cantidad: this.number,
          precioDetalle: this.select.precio * this.number,
          uid: this.select.uid
        })
        this.reset()
    },
    deletes(index) {
      this.Pedidos = this.Pedidos.filter(
        (producto, pIndex) => pIndex !== index
      );
    },
    reset() {
      this.$refs.form.reset();
    },
  },
  mounted() {
    this.getPedidos();
    this.getProductos()
  },
};
</script>


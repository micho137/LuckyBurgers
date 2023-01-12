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
                  <v-col>
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
                            <!-- <th class="text-center text-button">Tipo Pedido</th>
                            <th class="text-center text-button">Mesa</th> -->
                            <th class="text-center text-button">Accion</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(
                              { producto, cantidad, precioDetalle}, index
                            ) in Productos"
                            :key="index"
                            class="text-center"
                          >
                            <td>{{ producto.nombreProducto }}</td>

                            <td>{{ cantidad }}</td>

                            <td>${{ precioDetalle }}</td>
                            <td>
                              <div class="d-flex justify-center">
                                <v-btn class="mr-2" color="comoNaranja">
                                  Editar
                                </v-btn>
                                <v-btn color="grey" @click="deletes(index)"> Eliminar </v-btn>
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
                          Total: ${{getTotal}}
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
                                label="Selecionar Producto"
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
                                :rules="numberRules"
                                label="Cantidad"
                                required
                                min="1"
                                type="number"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="8">
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
                            </v-col>

                            <v-col cols="12" md="8">
                              <v-select
                                v-model="mesa"
                                color="comoNaranja"
                                :rules="precioRules"
                                :items="mesas"
                                label="Mesa"
                                required
                              >
                              </v-select>
                            </v-col>
                          </v-row>
                          <div class="d-flex justify-center mt-6">
                            <v-btn
                              color="comoNaranja"
                              class="mr-4"
                              @click="validate"
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
const devRuta = import.meta.env.VITE_APP_RUTA_API
export default {
  computed: {
    getTotal() {
      let total = 0;
      this.Productos.forEach((e) => {
        total += e.precioDetalle;
      });
      return total;
    },
  },
  data() {
    return {
      Productos: [],
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
    mesa:''
    };
  },
  methods: {
    async getPedidos() {
      const idPedido = localStorage.getItem("idPedido");
      await axios
        .get(`${devRuta}/productos/pedido/${idPedido}`)
        .then((response) => {
          this.Productos = response.data;
        })
        .catch((t) => console.log(t));
    },
    deletes(index) {
      this.Productos = this.Productos.filter(
        (producto, pIndex) => pIndex !== index
      );
    },
    reset() {
      this.$refs.form.reset();
    },
  },
  mounted() {
    this.getPedidos();
  },
};
</script>


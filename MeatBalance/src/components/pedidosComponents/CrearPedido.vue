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
                :items="Productos"
                item-value="[precio, nombreProducto, uid]"
                item-title="nombreProducto"
                label="Selecionar Producto"
                :rules="[(v) => !!v || 'El producto es requerido']"
                required
                return-object
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
              <v-btn class="mr-2" color="primary" @click="add">
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
          <tabla-vue :Check="activate" :Productos="pedidos" />
        </v-sheet>
        <!-- ESPACIO -->
        <v-col class="d-flex justify-space-around border rounded-lg pa-2 mt-4">
          <div v-if="onSuccess" class="d-flex">
            <v-btn color="success" class="mr-4" @click="prueba()">
              Enviar Pedido
            </v-btn>
            <v-btn @click="cleanTable" color="error"> Limpiar Tabla </v-btn>
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
    onSuccess:false,
    onClean:false,
    datos:[],
    Productos: [],
    pedidos: [],
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
      }else{
        this.onSuccess=false
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
    async prueba() {
        await this.$swal({
        title: "Selecciona el tipo de pedido",
        input: "select",
        inputOptions: {
          Local: "Local",
          Domicilio: "Domicilio",
        },
        inputPlaceholder: "Tipo de pedido",
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === "Local") {
              resolve(
                this.validate(value)
              );
            } else {
              value = "Domicilio";
              this.validate(value);
            }
          });
        },
      });
    },
    async validate(value) {
      axios
        .post("http://localhost:4000/crearPedido", {
          pedido:[
            {
              total:this.getTotal,
              tipoPedido:value
            },
            this.pedidos.map((pedido)=>{
              return {
                producto:pedido.uid,
                precio:pedido.precio,
                cantidad:pedido.cantidad
              }
            })
          ]
        })
        .then(() => {
          this.showRegisterAlert();
          this.cleanTable()
        })
        .catch((e) => {
          this.failed()
        });
    },
    getProductos() {
      axios
        .get("http://localhost:4000/productos")
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
          uid:this.select.uid
        });
        this.reset();
        this.activate()
      }
    },
    reset() {
      this.$refs.form.reset();
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
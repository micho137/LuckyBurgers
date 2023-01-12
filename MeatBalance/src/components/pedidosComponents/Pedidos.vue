<template>
  <v-main class="h-100">
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-sheet rounded="lg">
            <v-list rounded="lg">
              <v-list-item
                v-for="opcion in Opciones"
                :key="opcion"
                v-on:click="changeCurrent(opcion.component)"
                link
              >
                <v-list-item-title>
                  {{ opcion.title }}
                </v-list-item-title>
              </v-list-item>

              <v-divider class="my-2"></v-divider>

              <v-list-item link>
                <v-list-item-title @click="reload"> Refresh </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet min-height="70vh" rounded="lg" class="pa-5">
            <!--  -->
            <keep-alive>
              <component :is="current"></component>
            </keep-alive>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
  
<script>
import TablaVue from "../Tabla.vue";
import CrearPedidoVue from "../pedidosComponents/CrearPedido.vue";
export default {
  data: () => ({
    Opciones: [
      { title: "Crear Pedido", component: "CrearPedidoVue" },
      { title: "Listar Pedidos", component: "TablaVue" },
    ],
    current: "TablaVue",
  }),
  methods: {
    changeCurrent(component) {
      this.current = component;
      if (component === "TablaVue") {
        this.reload();
      }
    },
    reload() {
      this.$router.go()
    },
  },
  components: {
    TablaVue,
    CrearPedidoVue,
  },
};
</script>
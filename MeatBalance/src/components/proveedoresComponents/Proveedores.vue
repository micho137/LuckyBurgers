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

              <v-list-item v-on:click="reload()" link color="grey-lighten-4">
                <v-list-item-title> Refresh </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet min-height="70vh" rounded="lg" class="d-flex flex-column pa-5">
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
import TablaProveedoresVue from "./TablaProveedores.vue";
import CrearProveedorVue from "../proveedoresComponents/CrearProveedor.vue";
export default {
  data: () => ({
    Opciones: [
      { title: "Registrar Proveedor", component: "CrearProveedorVue" },
      { title: "Listar Proveedores", component: "TablaProveedoresVue" },
    ],
    current: "TablaProveedoresVue",
  }),
  methods: {
    changeCurrent(component) {
      this.current = component;
      if(component==="TablaProveedoresVue"){
        this.reload()
      }
    },
    reload(){
      this.$router.go()
    }
  },
  components: {
    TablaProveedoresVue,
    CrearProveedorVue,
  },
};
</script>
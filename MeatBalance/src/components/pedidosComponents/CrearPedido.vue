<template>
    <v-form ref="form" v-model="valid" lazy-validation class="">

        <div class="d-flex ">
            <v-select
            v-model="select"
            :items="items"
            :rules="[(v) => !!v || 'El producto es requerido']"
            label="Selecionar Producto"
            required
          ></v-select>
    
          <v-text-field
            v-model="number"
            :rules="numberRules"
            label="Cantidad"
            required
            min="1"
            type="number"
            class="ml-5"
          ></v-text-field>
        </div>

      <v-btn color="success" class="mr-4" @click="validate"> Validate </v-btn>
  
      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
    </v-form>
  </template>
  
  <script>
  export default {
    data: () => ({
      valid: true,
      number: "",
      numberRules: [
        (v) => !!v || "Cantidad es requerida"
      ],
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    }),
  
    methods: {
      async validate() {
        const { valid } = await this.$refs.form.validate();
  
        if (valid) alert("Pedido registrado");
      },
      reset() {
        this.$refs.form.reset();
      }
    },
  };
  </script>
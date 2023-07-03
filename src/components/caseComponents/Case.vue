<template>
  <v-main class="h-100">
    <v-container class="d-flex flex-column align-center justify-center">
      <v-sheet
        color="newPrimaryBlue"
        height="20vh"
        rounded="lg"
        class="pa-5 mb-5 flex-column align-center"
      >
        <label for="inputField" class="mb-2"
          >Número de veces que se ha abierto la caja hoy:</label
        >
        <v-text-field
          id="inputField"
          v-model="numAperturas"
          disabled
        ></v-text-field>
      </v-sheet>
      <div class="d-flex">
          <v-sheet
            color="newPrimaryBlue"
            height="20vh"
            rounded="lg"
            class="pa-5 flex-column align-center mr-5"
          >
            <label for="inputField" class="mb-2 pa-10"
              >Status de la caja</label
            >
            <v-text-field
              id="inputField"
              v-model="status"
              disabled
            ></v-text-field>
          </v-sheet>
          <v-sheet
            color="newPrimaryBlue"
            height="20vh"
            rounded="lg"
            class="pa-5 d-flex flex-column align-center"
          >
            <label for="inputField" class="mb-5"
              >Cambiar PASS</label
            >
            <v-btn color="newSecondayBlue" @click="showEditAlert()" >****</v-btn>
          </v-sheet>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
const devRuta = import.meta.env.VITE_APP_RUTA_API;
export default {
  data() {
    return {
      numAperturas: "",
      status:"",
    };
  },
  methods: {
    getInfoCaja() {
      axios
        .get(devRuta + "/infoCaja")
        .then((response) => {
          this.numAperturas = response.data.vecesAbierta;
          this.status=response.data.status
          if(this.status===true){
            this.status = "Caja Abierta"
          }else{
            this.status = "Caja Cerrada"
          }
        })
        .catch((t) => console.log(t));
    },
    showDone() {
      this.$swal({
        icon: "success",
        title: "PASS editada con exito",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
    },
    failed() {
      this.$swal({
        icon: "error",
        title: "Oops...",
        text: "Debes llenar todos los datos",
        showConfirmButton: true,
      });
    },
    async showEditAlert() {
        const data = {
            c1:0,
            c2:0,
            c3:0,
            c4:0
        }
      this.$swal({
        title: "Ingrese los nuevos digitos",
        html:
          `<div style="display:flex;justify-content:center;flex-direction:column;margin-bottom: 10px"><label><strong>Digito #1</strong></label><input type="number" style="text-align:center" placeholder="Primer digito" id="swal-input1" class="swal2-input"></div>` +
          `<div style="display:flex;justify-content:center;flex-direction:column;margin-bottom: 10px"><label><strong>Digito #2</strong></label><input type="number" style="text-align:center" placeholder="Segundo digito" id="swal-input2" class="swal2-input"></div>` +
          `<div style="display:flex;justify-content:center;flex-direction:column;margin-bottom: 10px"><label><strong>Digito #3</strong></label><input type="number" style="text-align:center" placeholder="Tercer digito" id="swal-input3" class="swal2-input"></div>`+
          `<div style="display:flex;justify-content:center;flex-direction:column;margin-bottom: 10px"><label><strong>Digito #4</strong></label><input type="number" style="text-align:center" placeholder="Cuarto digito" id="swal-input4" class="swal2-input"></div>`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "Editar",
        confirmButtonColor: "#3abff8",
        cancelButtonColor:"red",
        preConfirm: () => {
          if (
            document.getElementById("swal-input1").value.charAt(0) === "" ||
            document.getElementById("swal-input2").value.charAt(0) === "" ||
            document.getElementById("swal-input3").value.charAt(0) === "" ||
            document.getElementById("swal-input4").value.charAt(0) === ""
          ) {
            this.failed();
          } else {
            return [
              (data.c1 =
                document.getElementById("swal-input1").value),
              (data.c2 =
                document.getElementById("swal-input2").value),
                (data.c3 =
                document.getElementById("swal-input3").value),
                (data.c4 =
                document.getElementById("swal-input4").value),
              axios
                .put(`${devRuta}/contra`, {
                  c1: data.c1,
                  c2: data.c2,
                  c3: data.c3,
                  c4: data.c4,
                })
                .then((Response) => {
                  this.showDone();
                })
                .catch((e) => {
                  this.failed();
                }),
            ];
          }
        },
      });
    },
  },
  mounted() {
    setInterval(() => {
      this.getInfoCaja();
    }, 5000);
  },
};
</script>

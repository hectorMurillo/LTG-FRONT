<template>
  <div>
    <!-- <base-header type="gradient-green" class="pb-6 pb-8 pt-5 pt-md-8">
      <div class="row"></div>
    </base-header> -->
    <h1>EN DESARROLLO</h1>
  </div>
</template>

<script>
import { getLista, getPDF, getByNombre } from "../../services/cotizaciones";
import Alertas from "../../services/Alertas";
export default {
  name: "ListaCotizaciones",

  data() {
    return {
      busqueda: "",
      cotizaciones: [],
      pagina: 1,
      totalPaginas: 1
    };
  },
  methods: {
    crearCliente() {
      this.$router.push({
        name: "agregar-cliente"
      });
    },
    editar(id) {
      this.$router.push({
        name: "agregar-cliente",
        params: { id: id }
      });
    },
    listado() {
      getLista().then(res => (this.cotizaciones = res));
    },
    filtrado() {
      if (this.busqueda == "") {
        this.listado();
      } else {
        getByNombre(this.busqueda)
          .then(res => {
            this.cotizaciones = res;
          })
          .catch(() => {
            Alertas.toast("No hay resultados", "error");
            this.cotizaciones = {};
          });
      }
    },
    descargar(id) {
      getPDF(id)
        .then(() => {
          Alertas.toast("Abriendo PDF", "success");
          window.open(
            "http://localhost:3000/cotizaciones/cotizacion.pdf",
            "_blank"
          );
        })
        .catch(() => {
          Alertas.toast("Algo salio mal", "error");
        });
    }
  },
  mounted() {
    this.listado();
  }
};
</script>

<style>
.page-item.active .page-link {
  background-color: #2dce89;
}
</style>

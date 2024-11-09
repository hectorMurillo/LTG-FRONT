<template>
  <div class="table-responsive">
    <card shadow type="secondary" class="mb-5">
      <div slot="header" class="bg-white border-0">
        <div class="row align-items-center">
          <div class="col-5">
            <h3 class="mb-0">Total</h3>
          </div>
        </div>
      </div>
      <form>
        <div class="row">
          <div class="col-5 mb-0">
            <h6 class="heading-small text-muted mb-0">Productos:</h6>
          </div>
          <div class="col-7" style="text-align: center">
            <h1 class="mb-0">{{ total.totalProductos }}</h1>
          </div>
        </div>
        <hr class="my-4" />
        <div class="row">
          <div class="col-5 mb-0">
            <h6 class="heading-small text-muted mb-0">A pagar:</h6>
          </div>
          <div class="col-7" style="text-align: center">
            <h1 class="mb-0">{{ total.totalPagar | currency }}</h1>
          </div>
        </div>
        <hr class="my-4" />
        <div class="row">
          <div class="col-12" style="text-align: right">
            <base-button
              v-on:click="openModal(totalV.totalPagando)"
              type="success"
              >Guardar
            </base-button>
          </div>
        </div>
      </form>
    </card>
    <!-- Modal final -->
    <div>
      <div class="col-md-12">
        <modal
          :show.sync="modals.modal"
          body-classes="p-0"
          modal-classes="modal-dialog-centered modal-md"
        >
          <card
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-4 py-lg-4"
            class="border-0"
          >
            <template>
              <div class="text-left text-muted mb-4">
                Guardando Cotización <br />
              </div>
              <form role="form">
                <div class="row">
                  <div class="col-12">
                    <label for="" class="text-left">Cliente:</label>
                    <h2 class="mb-0">
                      {{ clienteCotizacion.nombre }}
                      {{ clienteCotizacion.apellidoP }}
                      {{ clienteCotizacion.apellidoS }}
                    </h2>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <label for="" class="text-left">Total:</label>
                    <h1 class="mb-0">{{ total.totalPagar | currency }}</h1>
                  </div>
                </div>
                <div class="row">
                  <div class="col-9 text-right pt-4"></div>
                  <div class="col-2 text-right mt-3">
                    <base-button type="success" v-on:click="finVenta"
                      >Finalizar</base-button
                    >
                  </div>
                </div>
              </form>
            </template>
          </card>
        </modal>
      </div>
    </div>
  </div>
</template>

<script>
import Alertas from "../../services/Alertas";
import { createCotizacion, getPDF } from "../../services/cotizaciones";
import storageSession from "../../services/storage";

export default {
  name: "totalCotizacion",
  props: {
    total: {
      type: Object,
    },
    detalle: {
      type: Array,
    },
    clienteCotizacion: {
      type: Object,
    },
  },
  data() {
    let sesion = storageSession.getObject("sesion");
    return {
      inventarios: [
        {
          nombre: "hola",
          id: 1
        }
      ],
      sesion,
      facturaCheck: false,
      ticket: {
        idCliente: "",
        totalPagar: "",
        totalProductos: "",
        totalPagando: "",
        cambio: "",
        detalles: [],
      },
      totalV: {
        totalPagando: "",
        totalCambio: "",
      },
      modals: {
        modal: false,
      },
    };
  },
  methods: {
    openModal() {
      this.modals.modal = true;
    },
    crearCliente() {
      this.$router.push({
        name: "Agregar Cliente",
      });
    },
    irLista(){

    },
    finVenta() {
      Alertas.toast("Guardado", "success");
      
      this.ticket.idCliente = this.clienteCotizacion.id;
      this.ticket.totalPagar = this.total.totalPagar;
      this.ticket.totalProductos = this.total.totalProductos;
      this.ticket.detalles = this.detalle;
      this.ticket.totalPagando = 0;
      this.ticket.cambio = 0;
      this.ticket.idUsuario = this.sesion.id;

      createCotizacion(this.ticket).then((res) => {
        getPDF(res.id)
          .then(() => {
            Alertas.toast("Abriendo PDF", "success");
            window.open("http://18.222.139.92/cotizaciones/cotizacion.pdf", "_blank");
          })
          .catch(() => {
            Alertas.toast("Algo salio mal", "error");
          });
        /*this.totalV.totalPagando = "";
        this.modals.modal = false;
        this.$parent.borrarVenta();*/
      })
      /*.catch(() => {
        Alertas.toast("Algo salio mal", "error");
      })*/
      this.totalV.totalPagando = "";
        this.modals.modal = false;
        this.$parent.borrarVenta();
    },
  },
};
</script>

<style></style>

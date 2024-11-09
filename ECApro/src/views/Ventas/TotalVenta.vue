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
          <div class="col-5 mb-0">
            <h6 class="heading-small text-muted mb-0">Pagando:</h6>
          </div>
          <div class="col-7 mb-0">
            <base-input
              alternative=""
              placeholder="Pago"
              input-classes="form-control-alternative"
              type="number"
              class="mb-0"
              v-model="totalV.totalPagando"
            />
          </div>
        </div>
        <hr class="my-4" />
        <div class="row">
          <div class="col-12" style="text-align: right">
            <base-button
              v-on:click="
                openModal(totalV.totalPagando), getCambio(totalV.totalPagando)
              "
              type="success"
              >Pagar
            </base-button>
          </div>
        </div>
      </form>
    </card>
    <!-- Modal Venta -->
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
              <div class="text-left text-muted mb-4">Pagando <br /></div>
              <form role="form">
                <div class="row">
                  <div class="col-12">
                    <label for="" class="text-left">Total de la Venta:</label>
                    <h1 class="mb-0">{{ total.totalPagar | currency }}</h1>
                  </div>
                  <div class="col-12">
                    <label for="" class="text-left">Pagado:</label>
                    <h1 class="mb-0">{{ totalV.totalPagando | currency }}</h1>
                  </div>
                </div>
                <hr class="my-4" />
                <div class="row">
                  <div class="col-12">
                    <label for="" class="text-left">Regresar cambio:</label>
                    <h1 class="mb-0">{{ totalV.totalCambio | currency }}</h1>
                  </div>
                </div>
                <div class="row">
                  <!-- <div class="col-9 text-right pt-4">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="facturaCheck"
                      v-model="facturaCheck"
                    />
                    <label class="form-check-label" for="facturaCheck">
                      Factura
                    </label>
                  </div> -->
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
import { create } from "../../services/ventas";
import storageSession from "../../services/storage";

export default {
  name: "totalVenta",
  props: {
    total: {
      type: Object
    },
    detalle: {
      type: Array
    },
    cliente: {
      type: Number
    }
  },
  data() {
    let sesion = storageSession.getObject("sesion");
    return {
      sesion,
      facturaCheck: false,
      ticket: {
        idCliente: "",
        totalPagar: "",
        totalProductos: "",
        totalPagando: "",
        cambio: "",
        detalles: []
      },
      totalV: {
        totalPagando: "",
        totalCambio: ""
      },
      modals: {
        modal: false
      }
    };
  },
  methods: {
    openModal(pagado) {
      if (pagado < this.total.totalPagar || pagado == undefined) {
        Alertas.toast("Valor no valido", "error");
      } else {
        this.modals.modal = true;
      }
    },
    crearCliente() {
      this.$router.push({
        name: "Agregar Cliente"
      });
    },
    getCambio(pagado) {
      this.totalV.totalCambio = pagado - this.total.totalPagar;
    },
    finVenta() {
      // if (this.facturaCheck == true) {
        Alertas.toast("Guardado", "success");

        this.ticket.idUsuario = this.sesion.id;
        this.ticket.idCliente = this.cliente;
        this.ticket.totalPagar = this.total.totalPagar;
        this.ticket.totalProductos = this.total.totalProductos;
        this.ticket.totalPagando = parseInt(this.totalV.totalPagando);
        this.ticket.cambio = this.totalV.totalCambio;
        this.ticket.detalles = this.detalle;

        console.log("ticket:");
        console.log(this.ticket);
        create(this.ticket).then((res) => {
          console.log(res);
        })

        this.totalV.totalPagando = "";
        this.modals.modal = false;
        this.$parent.borrarVenta();

      // } else {
      //   Alertas.toast("Guardado sin Factura", "info");
      //   this.totalV.totalPagando = "";
      //   this.modals.modal = false;
      //   this.$parent.borrarVenta();
      // }
    }
  }
};
</script>

<style></style>

<template>
  <div>
    <base-header type="gradient-green" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- if want cards like dashboard -->
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-md-4">
          <div class="card shadow">
            <div class="card-header  mb-3">
              <div class="row container">
                <div class="col-12">
                  <h3 class="mb-4">Detalles del Ticket</h3>
                </div>
              </div>
              <form role="form">
                <div class="row">
                  <div class="col-12">
                    <label for="" class="text-left text-muted"
                      >Numero del ticket:
                    </label>
                    <base-input
                      v-model="venta.id"
                      placeholder="Codigo del ticket"
                      type="text"
                      disabled
                    ></base-input>
                  </div>
                  <div class="col-12">
                    <label for="" class="text-left text-muted">Ciente: </label>
                    <base-input
                      v-model="venta.idCliente"
                      placeholder="Codigo del ticket"
                      type="text"
                      disabled
                    ></base-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <label for="" class="text-left text-muted"
                      >Total venta:
                    </label>
                    <base-input
                      v-model="venta.totalPagar"
                      placeholder="Codigo del ticket"
                      type="text"
                      disabled
                    ></base-input>
                  </div>
                  <div class="col-12">
                    <label for="" class="text-left text-muted"
                      >Total pagado:
                    </label>
                    <base-input
                      v-model="venta.totalPagando"
                      placeholder="Codigo del ticket"
                      type="text"
                      disabled
                    ></base-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <label for="" class="text-left text-muted">Cambio: </label>
                    <base-input
                      v-model="venta.cambio"
                      placeholder="Codigo del ticket"
                      type="text"
                      disabled
                    ></base-input>
                  </div>
                  <div class="col-12">
                    <label for="" class="text-left text-muted"
                      >Cantidad Productos:
                    </label>
                    <base-input
                      v-model="venta.totalProductos"
                      placeholder="Codigo del ticket"
                      type="text"
                      disabled
                    ></base-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 text-right">
                    <base-button v-on:click="bajaParcial" type="default"
                      >Parcial</base-button
                    >
                    <base-button v-on:click="openModal" type="danger"
                      >Total</base-button
                    >
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
          <div class="col-md-8" v-if="mostrar.detalles">
          <div class="card shadow">
            <div class="card-header border-0 mb-3">
              <div class="row container">
                <div class="col-12 col-md-5 text-left">
                  <h3 class="mb-4">Detalles de los productos</h3>
                </div>
              </div>
            </div>
            <div class="table-responsive table-striped table-hover">
              <base-table
                class="table align-items-center table-flush"
                tbody-classes="list"
                :data="venta.detalles"
              >
                <template slot="columns">
                  <th scope="col">Id</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Devolucion</th>
                </template>
                <template slot-scope="{ row }">
                  <td class="text-sm">{{ row.id }}</td>
                  <th scope="row">
                    <div class="media align-items-center">
                      <div class="media-body">
                        <span class="name mb-0 text-sm">
                          {{ row.productoNombre }}
                        </span>
                      </div>
                    </div>
                  </th>
                  <td class="budget">
                    {{ row.cantidad }}
                  </td>

                  <td class="budget">${{ row.precio }}</td>

                  <td class="text-left">
                    <div class="col-6 cursor" v-on:click="eliminar(row)">
                      <i class="fas fa-minus-circle text-red"></i>
                    </div>
                  </td>
                </template>
              </base-table>
            </div>
            <div class="row">
            <div class="col-11 text-right mb-4 mt-4">
              <base-button v-on:click="guardar">
                Guardar
              </base-button>
            </div>
          </div>
          </div>

        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="col-md-12">
      <modal
        :show.sync="modals.borrar"
        body-classes="p-0"
        modal-classes="modal-dialog-centered modal-sm"
      >
        <card
          shadow
          header-classes="bg-white pb-5"
          body-classes="px-lg-4 py-lg-4"
          class="border-0"
        >
          <template>
            <h3>ATENCIÓN</h3>
            <div class="text-left text-muted mb-4">
              ¿Seguro que quieres eliminar esta venta? <br />
              Esta accion no se podrá deshacer.
            </div>
            <form role="form">
              <div class="row">
                <div class="col-12 text-right">
                  <base-button v-on:click="bajaCompleta()" type="success">
                    Aceptar
                  </base-button>
                  <base-button type="danger">
                    Cancelar
                  </base-button>
                </div>
              </div>
            </form>
          </template>
        </card>
      </modal>
    </div>
  </div>
</template>

<script>
import Card from '../../components/Card.vue';
import alerta from "../../services/Alertas";
import sessionStorage from "../../services/storage";
import { getDetallesVenta, bajaVenta, update } from "../../services/ventas";

export default {
  components: { Card },
  name: "Devoluciones",
  props: {
    ventaProp: Object
  },
  data() {
    return {
      mostrar: {
        detalles: false
      },
      modals: {
        borrar: false
      },
      venta: {
        detalles: {}
      },
      model: {
        busqueda: ""
      }
    };
  },
  mounted() {
    if (this.ventaProp) {
      sessionStorage.setObject("Devolucion", this.ventaProp);
      this.venta = this.ventaProp;
    } else if (this.ventaProp == undefined) {
      this.venta = sessionStorage.getObject("Devolucion");
    }
  },
  methods: {
    openModal() {
      this.modals.borrar = true;
    },
    bajaParcial() {
      let idVenta = this.venta.id;
      getDetallesVenta(idVenta).then(res => {
        this.venta.detalles = res;
        this.mostrar.detalles = true;
      });
    },
    bajaCompleta() {
      bajaVenta(this.venta.id).then(() => {
        alerta.toast("Venta eliminada correctamente", "success");
      });
      this.$router.push("/puntoventa");
    },
    eliminar(row){
      let index = this.venta.detalles.indexOf(row);
      this.venta.detalles.splice(index, 1);
    },
    guardar(){
      update(this.venta.id, this.venta).then(() => {
        alerta.toast("Guardado correctamente", "success");
        this.$router.push("/listaDevoluciones")
      })
    }
  }
};
</script>

<style></style>


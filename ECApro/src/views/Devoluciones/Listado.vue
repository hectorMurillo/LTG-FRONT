<template>
  <div>
    <base-header type="gradient-green" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- if want cards like dashboard -->
      <base-button type="white" v-on:click="regresar">
        Punto de Venta
      </base-button>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-md-12">
          <div class="card shadow">
            <div class="card-header border-0 mb-3">
              <div class="row container">
                <div class="col-12 col-md-5 text-left">
                  <h3 class="mb-0">Listado Devoluciones</h3>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-md-5">
                  <div class="mt-3"></div>
                  <base-input
                    placeholder="Busqueda"
                    addon-right-icon="fa fa-search"
                    v-upper-case
                    v-model="model.busqueda"
                  />
                </div>
                <div class="col-12 col-md-3 ">
                  <div class="mt-3"></div>
                  <base-button v-on:click="crearDevolucion()" type="success"
                    >Nueva Devolucion</base-button
                  >
                </div>
              </div>
            </div>
            <div class="table-responsive table-striped table-hover">
              <base-table
                class="table align-items-center table-flush"
                tbody-classes="list"
                :data="devoluciones"
              >
                <template slot="columns">
                  <th scope="col">Id</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Productos</th>
                  <th scope="col">Total</th>
                  <th scope="col">Pagado</th>
                  <th scope="col">Cambio</th>
                  <th scope="col">Status</th>
                  <th scope="col"></th>
                </template>
                <template slot-scope="{ row }">
                  <td class="text-sm">{{ row.id }}</td>
                  <th scope="row">
                    <div class="media align-items-center">
                      <div class="media-body">
                        <span class="name mb-0 text-sm">
                          {{ row.idCliente }}
                        </span>
                      </div>
                    </div>
                  </th>
                  <td class="budget">{{ row.totalProductos }}</td>

                  <td class="budget">${{ row.totalPagar }}</td>

                  <td class="budget">${{ row.totalPagando }}</td>

                  <td class="budget">${{ row.cambio }}</td>

                  <td class="budget">{{ row.status }}</td>

                  <td class="text-left">
                    <b-dropdown
                      size="sm"
                      toggle-class="text-decoration-none"
                      block
                      variant="secondary"
                      no-caret
                    >
                      <b-dropdown-item v-on:click="editar(row.idCliente)"
                        ><i class="fas fa-info"></i>Detalles</b-dropdown-item
                      >
                      <b-dropdown-item v-on:click="editar(row.idCliente)"
                        ><i class="fas fa-print"></i>Imprimir</b-dropdown-item
                      >
                    </b-dropdown>
                  </td>
                </template>
              </base-table>
            </div>
            <div class="card-footer d-flex justify-content-end">
              <!-- <base-pagination
                :page-count="totalPaginas"
                v-model="pagina"
                @input="nextPage"
              ></base-pagination> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="col-md-12">
      <modal
        :show.sync="modals.modal"
        body-classes="p-0"
        modal-classes="modal-dialog-centered modal-lg"
      >
        <card
          shadow
          header-classes="bg-white pb-5"
          body-classes="px-lg-4 py-lg-4"
          class="border-0"
        >
          <template>
            <div class="text-left text-muted mb-4">
              Ingresa el codigo del ticket para hacer la devolucion <br />
            </div>
            <form role="form">
              <div class="row">
                <div class="col-12">
                  <label for="" class="text-left">Codigo: </label>
                  <base-input
                    v-model="ticket"
                    v-on:keyup="buscarTicket(ticket)"
                    placeholder="Codigo del ticket"
                    type="number"
                  ></base-input>
                </div>
              </div>
              <div
                class="table-responsive table-striped table-hover"
                v-if="tabla"
              >
                <base-table
                  class="table align-items-center table-flush"
                  tbody-classes="list"
                  :data="ventas"
                >
                  <template slot="columns">
                    <th scope="col">Id</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Total</th>
                    <th scope="col">Productos</th>
                    <th scope="col">Pagado</th>
                    <th scope="col">Seleccion</th>
                  </template>
                  <template slot-scope="{ row }">
                    <td class="text-sm">{{ row.id }}</td>
                    <th scope="row">
                      <div class="media align-items-center">
                        <div class="media-body">
                          <span class="name mb-0 text-sm">
                            {{ row.idCliente }}
                          </span>
                        </div>
                      </div>
                    </th>
                    <td class="budget">$ {{ row.totalPagar }}</td>
                    <td class="budget">{{ row.totalProductos }}</td>
                    <td class="budget">$ {{ row.totalPagando }}</td>
                    <td class="budget">
                      <div
                        class="col-6 cursor"
                        v-on:click="seleccionarVenta(row)"
                      >
                        <i class="fas fa-check text-green"></i>
                      </div>
                    </td>
                  </template>
                </base-table>
              </div>
            </form>
          </template>
        </card>
      </modal>
    </div>
  </div>
</template>

<script>
// import alerta from '../../services/Alertas';
import { listarDevoluciones, ventaById } from "../../services/ventas";
import sessionStorage from "../../services/storage";
import alerta from '../../services/Alertas';
export default {
  name: "listaDevoluciones",
  data() {
    return {
      model: {
        busqueda: ""
      },
      modals: {
        modal: false
      },
      ticket: "",
      tabla: false,
      devoluciones: [],
      ventas: [
        {
          id: "",
          idCliente: "",
          totalPagar: "",
          status: "",
          totalProductos: "",
          totalPagando: "",
          cambio: ""
        }
      ],
      buscarVenta: []
    };
  },
  mounted() {
    this.getDevoluciones();
    sessionStorage.setObject("Devolucion", "");
  },
  methods: {
    getDevoluciones() {
      listarDevoluciones().then(res => {
        this.devoluciones = res;
      });
    },
    crearDevolucion() {
      this.modals.modal = true;
    },
    buscarTicket(idTicket) {
      console.log(idTicket);
      if (idTicket == 0 || idTicket == "") {
        this.tabla = false;
      } else {
        ventaById(idTicket)
          .then(res => {
            this.tabla = true;
            this.ventas = [];
            this.ventas.push(res);
          })
          .catch(() => {
            alerta.toast("Ticket no encontrado", "error")
            this.tabla = false;
          });
      }
    },
    seleccionarVenta(venta) {
      console.log(venta);
      this.$router.push({
        params: { ventaProp: venta },
        name: "Devoluciones"
      });
    },
    regresar(){
      this.$router.push("/puntoventa");
    }
  }
};
</script>

<style></style>

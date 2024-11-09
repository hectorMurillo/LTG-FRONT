<template>
  <div>
    <base-header type="gradient-green" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- if want cards like dashboard -->
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-md-12">
          <div class="card shadow">
            <div class="card-header border-0 mb-3">
              <div class="row container">
                <div class="col-12 col-md-5 text-left">
                  <h3 class="mb-0">Listado Ventas</h3>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-md-5">
                  <div class="mt-3"></div>
                  <base-input
                    placeholder="Busqueda"
                    addon-right-icon="fa fa-search"
                    v-upper-case
                    v-model="busqueda"
                    v-on:keyup="buscar"
                  />
                </div>
                <div class="col-12 col-md-3 ">
                  <div class="mt-3"></div>
                  <base-button v-on:click="addVenta" type="success"
                    >Agregar</base-button
                  >
                </div>
              </div>
            </div>
            <div class="table-responsive table-striped table-hover">
              <base-table
                class="table align-items-center table-flush"
                tbody-classes="list"
                :data="ventas"
              >
                <template slot="columns">
                  <th scope="col">Id</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                  <th scope="col">Productos</th>
                  <th scope="col">Pago</th>
                  <th scope="col">Cambio</th>
                  <th scope="col"> </th>
                </template>
                <template slot-scope="{ row }">
                  <td class="text-sm">{{ row.uid }}</td>
                  <th scope="row">
                    <div class="media align-items-center">
                      <div class="media-body">
                        <span class="name mb-0 text-sm">
                          {{ row.cliente }}
                        </span>
                      </div>
                    </div>
                  </th>
                  <td class="budget">
                    {{ row.fecha | formatDate }}
                  </td>
                  <td class="budget">
                    ${{ row.totalPagar }}
                  </td>

                  <td class="budget">
                    {{ row.status }}
                  </td>

                  <td class="budget">
                    {{ row.totalProductos }}
                  </td>

                  <td class="budget">
                    $ {{ row.totalPagando }}
                  </td>

                  <td class="budget">
                    $ {{ row.cambio }}
                  </td>

                  <td class="text-left">
                    <b-dropdown
                      size="sm"
                      toggle-class="text-decoration-none"
                      block
                      variant="secondary"
                      no-caret
                    >
                      <b-dropdown-item
                        ><i class="fas fa-print"></i>Imprimir</b-dropdown-item
                      >
                    </b-dropdown>
                  </td>
                </template>
              </base-table>
            </div>
            <div class="card-footer d-flex justify-content-end">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
  </div>
</template>

<script>
import { listar, ventaById } from "../../services/ventas";
import Alertas from "../../services/Alertas";
export default {
  name: "listaVentas",
  data() {
    return {
      busqueda:"",
      ventas: []
    };
  },
  mounted() {
    this.getListado();
  },
  methods: {
    getListado() {
      listar().then(res => {
        this.ventas = res;
      })
    },
    addVenta(){
      this.$router.push("/puntoventa");
    },
    buscar(){
      if (this.busqueda == ""){
        this.getListado()
      }else {
        ventaById(this.busqueda)
        .then(res => {
          this.ventas = [];
          this.ventas.push(res);
        })
        .catch(() => {
          this.ventas = [];
          Alertas.toast("Sin resultados", "error");
        })
      }
    }
  }
};
</script>

<style></style>

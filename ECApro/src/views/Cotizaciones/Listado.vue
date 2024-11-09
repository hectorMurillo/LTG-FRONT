<template>
  <div>
    <base-header type="gradient-green" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- if want cards like dashboard -->
      <div class="row"></div>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-md-12">
          <div class="card shadow">
            <div class="card-header border-0 mb-3">
              <div class="row container">
                <div class="col-12 col-md-5 text-left">
                  <h3 class="mb-0">Listado de Clientes</h3>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-md-5">
                  <div class="mt-3">Busqueda:</div>
                  <base-input
                    placeholder="Busqueda"
                    addon-right-icon="fa fa-search"
                    v-upper-case
                    v-model="busqueda"
                    v-on:keyup="filtrado()"
                  />
                </div>
                <div class="col-12 col-md-3 mt-4">
                  <div class="mt-3"></div>
                  <base-button v-on:click="crearCliente()" type="success"
                    >Agregar</base-button
                  >
                </div>
              </div>
            </div>
            <div class="table-responsive table-striped table-hover">
              <base-table
                class="table align-items-center table-flush"
                tbody-classes="list"
                :data="cotizaciones"
              >
                <template slot="columns">
                  <th scope="col">Id</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Fecha y Hora</th>
                  <th scope="col">Status</th>
                  <th scope="col">Total</th>
                  <th scope="col">Productos</th>
                  <th scope="col">Decargar</th>
                </template>
                <template slot-scope="{ row }">
                  <td class="text-sm">{{ row.id }}</td>
                  <th scope="row">
                    <div class="media align-items-center">
                      <div class="media-body">
                        <span class="name mb-0 text-sm">
                          {{ row.nombre }}
                        </span>
                      </div>
                    </div>
                  </th>
                  <td class="budget">
                    {{ row.fecha | formatDate }}
                  </td>
                  <td class="budget">
                    {{ row.status }}
                  </td>

                  <td class="budget">${{ row.totalPagar }}</td>

                  <td class="budget">
                    {{ row.totalProductos }}
                  </td>

                  <td class="text-left">
                    <div v-on:click="descargar(row.id)">
                      <i class="fas fa-file-alt"></i>
                    </div>
                  </td>
                </template>
              </base-table>
            </div>
            <div class="card-footer d-flex justify-content-end">
              <!-- <base-pagination
                :page-count="totalPaginas"
                v-model="pagina"
              ></base-pagination> -->
            </div>
          </div>
        </div>
      </div>
    </div>
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

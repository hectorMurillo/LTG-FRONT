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
                  <h3 class="mb-0">Listado de Facturas</h3>
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
                :data="clientes"
              >
                <template slot="columns">
                  <th scope="col">Id</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Fecha Venta</th>
                  <th scope="col">Monto</th>
                  <th scope="col">Num Articulos</th>
                  <th scope="col"></th>
                </template>
                <template slot-scope="{ row }">
                  <td class="text-sm">{{ row.idCliente }}</td>
                  <th scope="row">
                    <div class="media align-items-center">
                      <div class="media-body">
                        <span class="name mb-0 text-sm">
                          {{ row.nombreCompleto }}
                        </span>
                      </div>
                    </div>
                  </th>
                  <td class="budget">
                    {{ row.fechaNacimiento }}
                  </td>

                  <td class="budget">
                    {{ row.monto | currency }}
                  </td>

                  <td class="budget">
                    {{ row.numArticulos }}
                  </td>

                  <td class="text-left">
                    <b-dropdown
                      size="sm"
                      toggle-class="text-decoration-none"
                      block
                      variant="secondary"
                      no-caret
                    >
                      <b-dropdown-item v-on:click="editar(row.idCliente)"
                        ><i class="fas fa-info"></i
                        >Detalles</b-dropdown-item
                      >
                      <b-dropdown-item v-on:click="editar(row.idCliente)"
                        ><i class="fas fa-print"></i
                        >Imprimir</b-dropdown-item
                      >
                    </b-dropdown>
                  </td>
                </template>
              </base-table>
            </div>
            <div
              class="card-footer d-flex justify-content-end"
            >
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
  </div>
</template>

<script>
export default {
  name: "Facturas",
  data() {
    return {
      model: {
        busqueda: ""
      },
      clientes: [
        {
          idCliente: 1,
          nombreCompleto: "Emmanuel Lopez Ortega",
          fechaNacimiento: "21/11/2020",
          monto: "123123",
          numArticulos: "12"
        },
        {
          idCliente: 2,
          nombreCompleto: "Alexis Esteban Herrera Benitez",
          fechaNacimiento: "14/03/2020",
          monto: "15000",
          numArticulos: "1"
        }
      ],
      pagina: 1,
      totalPaginas: 1
    };
  },
  methods: {
    crearCliente() {
      this.$router.push({
        name: "Agregar Cliente"
      });
    }
  }
};
</script>

<style>
.page-item.active .page-link {
  background-color: #2dce89;
}
</style>

<template>
  <div>
    <base-header type="gradient-green" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- if want cards like dashboard -->
      <div class="row ml-1">
        <!-- <base-button
          v-for="inventario in inventarios"
          :key="inventario.id"
          v-on:click="selectInventario(inventario.id)"
          type="white"
        >
          {{ inventario.nombre }}
        </base-button> -->
      </div>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-md-12">
          <div class="card shadow">
            <div class="card-header border-0 mb-3">
              <div class="row container">
                <div class="col-12 col-md-5 text-left">
                  <h3 class="mb-0">Listado Productos</h3>
                </div>
              </div>
              <!-- <div class="row">
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
                  <base-button v-on:click="addArticulo()" type="success"
                    >Agregar</base-button
                  >
                </div>
              </div> -->
            </div>
            <div class="table-responsive table-striped table-hover">
              <base-table
                class="table align-items-center table-flush"
                tbody-classes="list"
                :data="articulos"
              >
                <template slot="columns">
                  <th scope="col">Codigo</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Marca</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Existencia</th>
                  <th scope="col">Status</th>
                  <th scope="col"></th>
                </template>
                <template slot-scope="{ row }">
                  <th scope="row">
                    <div class="media align-items-center">
                      <div class="media-body">
                        <span class="name mb-0 text-sm">
                          {{ row.uid }}
                        </span>
                      </div>
                    </div>
                  </th>
                  <td class="budget">
                    {{ row.nombre }}
                  </td>
                  <td class="budget">
                    {{ row.marca }}
                  </td>

                  <td class="budget">${{ row.precioVenta }}</td>

                  <td class="budget">
                    {{ row.stock }}
                  </td>

                  <td class="budget">
                    {{ row.status }}
                  </td>

                  <td class="text-left">
                    <b-dropdown
                      size="sm"
                      toggle-class="text-decoration-none"
                      block
                      variant="secondary"
                      no-caret
                    >
                      <b-dropdown-item v-on:click="updateArticulo(row)"
                        ><i class="fas fa-edit"></i>Editar</b-dropdown-item
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
        :show.sync="modal.alta"
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
              Editar precio <br />
            </div>
            <form role="form">
              <div class="row">
                <div class="col-6">
                  <label for="" class="text-left">Nombre: </label>
                  <base-input
                    v-model="alta.nombre"
                    placeholder="Nombre del producto"
                    type="text"
                    disabled
                  ></base-input>
                </div>
                <div class="col-6">
                  <label for="" class="text-left">Precio: </label>
                  <base-input
                    v-model="alta.precioVenta"
                    placeholder="Precio del producto"
                    type="number"
                  ></base-input>
                </div>
                <div class="col-12 text-right mt-3" v-if="!esNuevo">
                  <base-button v-on:click="actualizarProducto" type="success"
                    >Actualizar</base-button
                  >
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
import categorias from "../../components/Utils/categorias";
import alerta from "../../services/Alertas";
import { listadoInventarios } from "../../services/inventarios";
import {
  listadoProductos,
  listadoTipoInventario,
  actualizarProducto
} from "../../services/productos";

export default {
  components: {},
  name: "Inventario",
  data() {
    return {
      esNuevo: false,
      alta: {
        nombre: "",
        inventario: "Selecciona",
        stock: "",
        stockMinimo: "",
        stockMaximo: "",
        precioVenta: 0,
        marca: "",
        modelo: "",
        descripcion: ""
      },
      inventarios: [],
      idInventario: "",
      model: {
        busqueda: ""
      },
      modal: {
        alta: false
      },
      articulos: [],
      categorias: categorias,
      pagina: 1,
      totalPaginas: 1
    };
  },
  mounted() {
    this.getInventarios();
    this.getProductos();
  },
  methods: {
    getInventarios() {
      listadoInventarios().then(res => {
        this.inventarios = res.inventarios;
      });
    },
    selectInventario(id) {
      listadoTipoInventario(id).then(res => {
        this.articulos = res.producto;
      });
    },
    getProductos() {
      listadoProductos().then(res => {
        this.articulos = res.productos;
      });
    },
    updateArticulo(articulo){
      this.esNuevo = false;

      this.modal.alta = true;
      this.alta = articulo;
    },
    actualizarProducto(){
      actualizarProducto(this.alta.uid, this.alta).then(() =>{
        alerta.toast("Actualizado correctamente", "success");
        this.modal.alta = false;
        this.getProductos();
      })
    }
  }
};
</script>

<style>
.page-item.active .page-link {
  background-color: #2dce89;
}
</style>

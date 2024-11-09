<template>
  <div>
    <base-header type="gradient-green" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- if want cards like dashboard -->
      <div class="row ml-1">
        <base-button
          class="mb-1"
          v-on:click="selectInventario('0')"
          type="white"
        >
         Todos
        </base-button>
        <base-button
          class="mb-1"
          v-for="inventario in inventarios"
          :key="inventario.uid"
          v-on:click="selectInventario(inventario.uid)"
          type="white"
        >
          {{ inventario.nombre }}
        </base-button>
      </div>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row ">
        <div class="col-md-12">
          <div class="card shadow">
            <div class="card-header border-0 mb-3">
              <div class="row container">
                <div class="col-12 col-md-5 text-left">
                  <h3 class="mb-0">Listado Inventario</h3>
                </div>
              </div>
              <div class="row ">
                <div class="col-12 col-md-5">
                  <div class="mt-3"></div>
                  <base-input
                    placeholder="Busqueda"
                    addon-right-icon="fa fa-search"
                    v-upper-case
                    v-model="model.busqueda"
                    v-on:keyup="buscarProducto"
                  />
                </div>
                <div class="col-12 col-md-3">
                  <div class="mt-3"></div>
                  <base-button v-on:click="addArticulo()" type="success"
                    >Agregar</base-button
                  >
                </div>
              </div>
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
                  <th scope="col">Modelo</th>
                  <th scope="col">Etiqueta</th>
                  <th scope="col">Precio Unitario</th>
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
                  <td class="budget">
                    {{ row.modelo }}
                  </td>
                  <td class="budget">
                    {{ row.etiqueta }}
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
        <!-- modal agregar etiqueta -->
    <div class="col-md-12">
      <modal
        :show.sync="modals.modalEtiqueta"
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
            <div class="text-left text-muted mb-4">
              Agregar nueva Etiqueta <br />
            </div>
            <div class="row">
              <div class="col">
                <label for="">Nombre Etiqueta: </label>
                <base-input
                  v-model="nuevaEtiqueta.nombre"
                  placeholder="Nombre del inventario"
                  type="text"
                ></base-input>

                <base-button v-on:click="agregarEtiqueta" type="success"
                  >Guardar</base-button
                >
              </div>
            </div>
          </template>
        </card>
      </modal>
    </div>
    <!-- modal agregar inventario -->
    <div class="col-md-12">
      <modal
        :show.sync="modals.modalInventario"
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
            <div class="text-left text-muted mb-4">
              Agregar nuevo inventario <br />
            </div>
            <div class="row">
              <div class="col">
                <label for="">Nombre Inventario: </label>
                <base-input
                  v-model="nuevoInventario.nombre"
                  placeholder="Nombre del inventario"
                  type="text"
                ></base-input>
                <label for="">Descripción: </label>
                <base-input
                  v-model="nuevoInventario.descripcion"
                  placeholder="Descripcion"
                  type="text"
                ></base-input>
                <label for="">Ubicación: </label>
                <base-input
                  v-model="nuevoInventario.ubicacion"
                  placeholder="Ubicación"
                  type="text"
                ></base-input>

                <base-button v-on:click="agregarInventario" type="success"
                  >Guardar</base-button
                >
              </div>
            </div>
          </template>
        </card>
      </modal>
    </div>
    <!-- modal agregar producto -->
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
              Agregar articulo al Inventario <br />
            </div>
            <form role="form">
              <div class="row">
                <div class="col-12">
                  <label for="" class="text-left">Nombre Corto: </label>
                  <base-input
                    v-model="alta.nombre"
                    placeholder="Nombre del producto"
                    type="text"
                  ></base-input>
                </div>
                <div class="col-4">
                  <label for="" class="text-left">Inventario: </label>
                  <select
                    name="inventario"
                    id="inventario"
                    class="form-control form-control-alternative mb-2"
                    aria-describedby="addon-right addon-left"
                    v-model="alta.inventario"
                  >
                    <option value="Selecciona" disabled selected>
                      Selecciona
                    </option>
                    <option
                      v-for="inventario of inventarios"
                      :key="inventario.uid"
                      :value="inventario.uid"
                    >
                      {{ inventario.nombre }}
                    </option>
                  </select>
                </div>
                <div class="col-2 mt-4">
                  <label for="" class="text-left"> </label>
                  <base-button
                    type="secondary"
                    icon="fas fa-plus"
                    v-on:click="openModal"
                  />
                </div>
                <div class="col-4">
                  <label for="" class="text-left">Etiqueta: </label>
                  <select
                    name="etiqueta"
                    id="etiqueta"
                    class="form-control form-control-alternative mb-2"
                    aria-describedby="addon-right addon-left"
                    v-model="alta.etiquetas"
                  >
                    <option value="0" disabled selected>
                      Selecciona
                    </option>
                    <option
                      v-for="etiqueta of etiquetas"
                      :key="etiqueta.uid"
                      :value="etiqueta.uid"
                    >
                      {{ etiqueta.nombre }}
                    </option>
                  </select>
                </div>
                <div class="col-1">
                  <label for="" class="text-left"> </label>
                  <base-button
                    type="secondary"
                    icon="fas fa-plus"
                    v-on:click="openModalEtiqueta"
                  />
                </div>
                <div class="col-12">
                  <div class="row mt-4">
                    <div class="col-6">
                      <label for="" class="text-left">Marca: </label>
                      <base-input
                        v-model="alta.marca"
                        placeholder="Marca del producto"
                        type="text"
                      ></base-input>
                    </div>
                    <div class="col-6">
                      <label for="" class="text-left">Modelo: </label>
                      <base-input
                        v-model="alta.modelo"
                        placeholder="Modelo del producto"
                        type="text"
                      ></base-input>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <label for="" class="text-left">Stock: </label>
                      <base-input
                        v-model="alta.stock"
                        placeholder="Hay en almacen"
                        type="number"
                      ></base-input>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <label for="" class="text-left">Descripción: </label>
                      <base-input
                        v-model="alta.descripcion"
                        placeholder="Descripción del producto"
                        type="text"
                      ></base-input>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 text-right mt-3" v-if="esNuevo">
                  <base-button v-on:click="agregarProducto" type="success"
                    >Agregar</base-button
                  >
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
import storageSession from "../../services/storage";

import categorias from "../../components/Utils/categorias";

import alerta from "../../services/Alertas";

import {  listadoEtiquetas, agregar } from "../../services/etiquetas";

import {
  createInventario,
  listadoInventarios,
} from "../../services/inventarios";

import {
  listadoProductos,
  agregarProducto,
  listadoTipoInventario,
  actualizarProducto,
  busquedaProducto,
} from "../../services/productos";

export default {
  components: {},
  name: "Inventario",
  data() {
    let sesion = storageSession.getObject("sesion");

    return {
      sesion,
      esNuevo: false,
      nuevoInventario: {
        idSucursal: 1,
        nombre: "",
        descripcion: "",
        ubicacion:""
      },
      nuevaEtiqueta: {
        nombre: ""
      },
      alta: {
        nombre: "",
        inventario: "Selecciona",
        stock: "",
        stockMinimo: "",
        stockMaximo: "",
        precioVenta: 0,
        etiquetas: "",
        marca: "",
        modelo: "",
        descripcion: "",
        usuario:"",
      },
      inventarios: [],
      etiquetas: [],
      idInventario: "",
      model: {
        busqueda: "",
      },
      modal: {
        alta: false,
      },
      modals: {
        modalInventario: false,
        modalEtiqueta: false
      },
      articulos: [],
      categorias: categorias,
      pagina: 1,
      totalPaginas: 1,
    };
  },
  mounted() {
    this.getInventarios();
    this.getProductos();
    this.getEtiquetas();
  },
  methods: {
    getEtiquetas() {
      listadoEtiquetas().then((res) => {
        this.etiquetas = res.etiquetas;
      })
    },
    getInventarios() {
      listadoInventarios().then((res) => {
        this.inventarios = res.inventarios;
      });
    },
    selectInventario(id) {
      if(id == '0'){
        this.getProductos();
      }else{
        listadoTipoInventario(id)
        .then((res) => {
          this.articulos = res.producto;
        })
        .catch(() => {
          alerta.toast("Sin articulos en el Inventario Seleccionado", "error");
        });
      }

    },
    getProductos() {
      listadoProductos().then((res) => {
        this.articulos = res.productos;
      });
    },
    openModal() {
      this.modals.modalInventario = true;
      this.modal.alta = false;
    },
    openModalEtiqueta(){
      this.modals.modalEtiqueta = true;
      this.modal.alta = false;
    },
    buscarProducto() {
      if(this.model.busqueda == ""){
        this.getProductos();
      }else{
        busquedaProducto(this.model.busqueda).then((res) => {
          this.articulos = res.productos;
        });
      }
    },
    agregarInventario() {
      createInventario(this.nuevoInventario).then(() => {
        this.modals.modal = false;
        this.modal.alta = true;
        this.getInventarios();
        alerta.toast("Agregado Correctamente", "success");
        this.nuevoInventario.nombre = "";
        this.nuevoInventario.descripcion = "";
      });
    },
    agregarEtiqueta() {
      agregar(this.nuevaEtiqueta).then(() => {
        this.modals.modalEtiqueta = false;
        this.modal.alta = true;
        this.getEtiquetas();
        alerta.toast("Agregado Correctamente", "success");
        this.nuevaEtiqueta.nombre = "";
      })
    },
    updateArticulo(articulo) {
      console.log(articulo);
      this.esNuevo = false;

      this.modal.alta = true;
      this.alta = articulo;
      this.alta.inventario = articulo.inventario._id;
      this.alta.etiquetas = articulo.etiquetas._id;
    },
    addArticulo() {
      this.alta = {
        inventario: "Selecciona",
        usuario:this.sesion.uid
      };
      this.esNuevo = true;
      this.modal.alta = true;
    },
    agregarProducto() {
      agregarProducto(this.alta).then(() => {
        alerta.toast("Agregado correctamente", "success");
        this.modal.alta = false;
        this.getProductos();
      });
    },
    actualizarProducto() {
      actualizarProducto(this.alta.uid, this.alta).then(() => {
        alerta.toast("Actualizado correctamente", "success");
        this.modal.alta = false;
        this.getProductos();
      });
    },
  },
};
</script>

<style>
.page-item.active .page-link {
  background-color: #2dce89;
}
</style>

<template>
  <div>
    <base-header type="gradient-green" class="pb-8 pt-3 pt-md-8">
      <!-- if want cards like dashboard -->
      <base-button type="white" v-on:click="devoluciones">
        Devoluciones
      </base-button>
      <div class="row"></div>
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row" v-if="!hayCliente">
        <div class="col-12">
          <card shadow type="secondary" class="mb-5">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">
                    Seleccionar cliente para empezar la cotización
                  </h3>
                </div>
              </div>
            </div>
            <template>
              <div class="row">
                <div class="col-xl-6 col-sm-12">
                  <div class="row">
                    <div class="col-10">
                      <base-input
                        alternative=""
                        placeholder="Click en el icono para buscar cliente"
                        input-classes="form-control-alternative"
                        v-model="cliente.nombre"
                        disabled
                        v-upper-case
                      />
                    </div>
                    <div class="col-1 mr-2">
                      <base-button
                        type="secondary"
                        icon="fas fa-search"
                        v-on:click="openModal"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12">
                  <label for="">¿Es cliente nuevo?</label>
                  <div class="row">
                    <div class="col-xl-6 col-md-12">
                      <base-input
                        alternative=""
                        placeholder="Nombre"
                        input-classes="form-control-alternative"
                        v-model="nuevoCliente.nombre"
                        required
                        v-upper-case
                      />
                    </div>
                    <div class="col-xl-6 col-md-12">
                      <base-input
                        alternative=""
                        placeholder="Apellido Paterno"
                        input-classes="form-control-alternative"
                        v-model="nuevoCliente.apellidoP"
                        required
                        v-upper-case
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xl-6 col-md-12">
                      <base-input
                        alternative=""
                        placeholder="Apellido Materno"
                        input-classes="form-control-alternative"
                        v-model="nuevoCliente.apellidoS"
                        required
                        v-upper-case
                      />
                    </div>
                    <div class="col-xl-6 col-md-12">
                      <base-input
                        alternative=""
                        placeholder="Correo"
                        input-classes="form-control-alternative"
                        v-model="nuevoCliente.email"
                        required
                        v-upper-case
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xl-6 col-md-12">
                      <base-input
                        alternative=""
                        placeholder="Celular"
                        input-classes="form-control-alternative"
                        v-model="nuevoCliente.celular"
                        required
                        v-upper-case
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 text-right">
                      <base-button type="success" v-on:click="crearCliente">
                        Agregar</base-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </card>
        </div>
      </div>
      <div class="row" v-if="hayCliente">
        <div class="col-xl-7 order-xl-1">
          <card shadow type="secondary" class="mb-5">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">
                    Venta para:  {{ cliente.nombre }}
                    {{ cliente.apellidoP }} {{ cliente.apellidoS }}
                    </h3>
                </div>
                <base-button
                  type="default"
                  class="my--2"
                  v-on:click="cambioCliente"
                >
                  Cambiar Cliente
                </base-button>
              </div>
            </div>
            <template>
              <!-- Agregar Producto -->
              <form @submit.prevent>
                <h6 class="heading-small text-muted mb-4">Producto</h6>
                <div class="pl-lg-1 listaProductos ">
                  <div class="row">
                    <div class="col-sm-3 col-md-3 col-lg-3">
                      <label for="">Cantidad</label>
                      <base-input
                        alternative=""
                        placeholder="Cantidad"
                        input-classes="form-control-alternative"
                        v-model="ventaCodigo.cantidad"
                      />
                    </div>
                    <div class="col-sm-9 col-md-9 col-lg-9">
                      <label for="">Codigo</label>
                      <base-input
                        alternative=""
                        placeholder="Codigo"
                        input-classes="form-control-alternative"
                        v-model="ventaCodigo.codigo"
                        v-on:keyup.enter="agregarPorCodigo(ventaCodigo.codigo)"
                      />
                    </div>
                    <div class="col-1 mr-2 mt-4">
                      <base-button
                        type="secondary"
                        icon="fas fa-search"
                        v-on:click="openModalProducto"
                      />
                    </div>
                  </div>
                  <div class="row ">
                    <div class="col-sm-12 col-md-4 col-lg-4">
                      <label for="">Nombre</label>
                      <base-input
                        alternative=""
                        placeholder="Nombre"
                        input-classes="form-control-alternative"
                        v-model="venta.nombreProducto"
                        :valid="valido.nombre"
                        required
                        v-upper-case
                      />
                    </div>
                    <div class="col-sm-12 col-md-4 col-lg-4">
                      <label for="">Cantidad</label>
                      <base-input
                        alternative=""
                        placeholder="Cantidad"
                        input-classes="form-control-alternative"
                        type="number"
                        v-model="venta.cantidadProducto"
                        :valid="valido.cantidad"
                      />
                    </div>
                    <div class="col-sm-12 col-md-4 col-lg-4">
                      <label for="">Precio</label>
                      <base-input
                        alternative=""
                        placeholder="Precio"
                        input-classes="form-control-alternative"
                        type="number"
                        v-model="venta.precioProducto"
                        :valid="valido.precio"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div
                      class="col-12 col-sm-12 col-md-12 col-lg-12"
                      style="text-align: right"
                    >
                      <base-button
                        type="success"
                        class="my-3"
                        v-on:click="agregarLista(), getTotales()"
                      >
                        Agregar
                      </base-button>

                      <base-button
                        type="danger"
                        class="my-3"
                        v-on:click="borrarVenta"
                      >
                        Cancelar
                      </base-button>
                    </div>
                  </div>
                </div>
              </form>
            </template>
            <detalleVenta ref="detalle" :venta="ventaCompleta" />
          </card>
        </div>
        <div class="col-xl-5 order-xl-1">
          <totalVenta :total="total" :detalle="ticketCompleto" :cliente="cliente.id" />
        </div>
      </div>
    </div>
    <!-- Modal buscar producto por nombre -->
    <div>
      <div class="col-md-12">
        <modal
          :show.sync="modals.modalP"
          body-classes="p-0"
          modal-classes="modal-dialog-centered modal-xl"
        >
          <card
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-4 py-lg-4"
            class="border-0"
          >
            <template>
              <div class="text-left text-muted mb-4">
                Busqueda Producto: <br />
              </div>
              <form role="form">
                <div class="row">
                  <div class="col-2">
                    <base-input
                      placeholder="Cantidad"
                      input-classes="form-control-alternative"
                      type="number"
                      v-model="ventaCodigo.cantidad"
                    />
                  </div>
                  <div class="col-6">
                    <base-input
                      placeholder="Nombre"
                      input-classes="form-control-alternative"
                      type="text"
                      v-model="buscandoP.nombre"
                      @keyup="buscarProducto"
                    />
                  </div>
                </div>
              </form>
              <div class="table-responsive table-striped table-hover">
                <base-table
                  class="table align-items-center table-flush"
                  tbody-classes="list"
                  :data="producto"
                >
                  <template slot="columns">
                    <th scope="col">Nombre</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Inventario</th>
                    <th scope="col"></th>
                  </template>
                  <template slot-scope="{ row }">
                    <th scope="row">
                      <div class="media align-items-center">
                        <div class="media-body">
                          <span class="name mb-0 text-sm">
                            {{ row.nombre }}
                          </span>
                          <span
                            @mouseover="hover = true"
                            @mouseleave="hover = false"
                          >
                             {{ row.descripcion }}
                          </span>
                        </div>
                      </div>
                    </th>
                    <td class="budget">{{ row.stock }}</td>
                    <td class="budget">
                      {{ row.etiquetas.nombre }}
                    </td>
                    <td class="budget">
                      {{ row.inventario.nombre }}
                    </td>
                    <td scope="row">
                      <a
                        slot="title"
                        class="btn btn-sm btn-icon-only text-success"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                        style="right: 75%"
                        v-on:click="seleccionarProducto(row.uid)"
                      >
                        <i class="far fa-check-circle"></i>
                      </a>
                    </td>
                  </template>
                </base-table>
              </div>
              <div class="card-footer d-flex justify-content-end"></div>
            </template>
          </card>
        </modal>
      </div>
    </div>
    <!-- Modal Buscar Cliente -->
    <div>
      <div class="col-md-12">
        <modal
          :show.sync="modals.modal"
          body-classes="p-0"
          modal-classes="modal-dialog-centered modal-xl"
        >
          <card
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-4 py-lg-4"
            class="border-0"
          >
            <template>
              <div class="text-left text-muted mb-4">
                Busqueda cliente: <br />
              </div>
              <form role="form">
                <div class="row">
                  <div class="col-4">
                    <base-input
                      placeholder="Nombre"
                      input-classes="form-control-alternative"
                      type="text"
                      v-model="buscandocliente"
                      @keyup="buscarCliente"
                    />
                  </div>
                </div>
              </form>
              <div class="table-responsive table-striped table-hover">
                <base-table
                  class="table align-items-center table-flush"
                  tbody-classes="list"
                  :data="resBusqueda"
                >
                  <template slot="columns">
                    <th scope="col">Id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Telefono</th>
                    <th scope="col"></th>
                  </template>
                  <template slot-scope="{ row }">
                    <td class="text-sm">{{ row.id }}</td>
                    <th scope="row">
                      <div class="media align-items-center">
                        <div class="media-body">
                          <span class="name mb-0 text-sm">
                            {{ row.nombre }} {{ row.apellidoP }}
                            {{ row.apellidoS }}
                          </span>
                        </div>
                      </div>
                    </th>
                    <td class="budget">{{ row.email }}</td>

                    <td class="budget">
                      {{ row.celular }}
                    </td>
                    <td scope="row">
                      <a
                        slot="title"
                        class="btn btn-sm btn-icon-only text-success"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                        style="right: 75%"
                        v-on:click="seleccionarCliente(row)"
                      >
                        <i class="far fa-check-circle"></i>
                      </a>
                    </td>
                  </template>
                </base-table>
              </div>
              <div class="card-footer d-flex justify-content-end"></div>
            </template>
          </card>
        </modal>
      </div>
    </div>
  </div>
</template>

<script>
import detalleVenta from "./DetalleVenta";
import totalVenta from "./TotalVenta";
import Alertas from "../../services/Alertas";
import storageSession from "../../services/storage";
import { buscarPorCodigo, busquedaProducto } from "../../services/productos";
import {
  buscarClientesPorNombre,
  createProspecto,
} from "../../services/clientes";
export default {
  components: { detalleVenta, totalVenta },
  name: "puntoventa",
  data() {
    let sesion = storageSession.getObject("sesion");
    return {
      sesion,
      hayCliente: false,
      hover:false,
      cliente: {},
      buscandocliente: "",
      buscandoP: {
        nombre: ""
      },
      nuevoCliente: {},
      modals: {
        modal: false,
        modalP: false
      },
      resBusqueda: [],
      producto:[],
      ventaCodigo: {
        codigo: "",
        cantidad: "",
      },
      model: {
        busqueda: ""
      },
      ventaCompleta: [],
      ticketCompleto: [],
      ticket: {
        idProducto: "",
        productoNombre: "",
        cantidad: "",
        precio: ""
      },
      venta: {
        uid: 0,
        nombreProducto: "",
        cantidadProducto: "",
        precioProducto: "",
        totalRow: ""
      },
      total: {
        totalProductos: "",
        totalPagar: "",
        totalPagando: "",
        cambio: ""
      },
      contador: 1,
      valido: {
        nombre: "",
        cantidad: "",
        precio: ""
      }
    };
  },
  methods: {
    seleccionarProducto(codigo){
      this.agregarPorCodigo(codigo);
      this.modals.modalP = false;
    },
    agregarPorCodigo(codigo) {
      buscarPorCodigo(codigo).then((res) => {

        this.ticket.idProducto = res.productos.uid;
        this.ticket.productoNombre = res.productos.nombre;
        this.ticket.precio = res.productos.precioVenta;

        this.ticket
        if (this.ventaCodigo.cantidad == "") {
          this.ticket.cantidad = 1;
        } else {
          this.ticket.cantidad = this.ventaCodigo.cantidad;
        }

        this.venta.nombreProducto = res.productos.nombre;
        this.venta.cantidadProducto = this.ticket.cantidad;
        this.venta.precioProducto = res.productos.precioVenta;

        this.totalRow = this.venta.cantidadProducto * this.venta.precioProducto;
        this.venta.totalRow = this.totalRow;

        this.ventaCompleta.push(this.venta);
        this.venta.id = this.contador;
            this.venta = {
              id: this.contador,
              nombreProducto: "",
              cantidadProducto: "",
              precioProducto: "",
              totalRow: "",
            };
            this.contador++;
            this.ventaCodigo.cantidad = 0;
            this.ventaCodigo.codigo = "";

        this.ticketCompleto.push(this.ticket);
        this.getTotales();
      })
      .catch(() => {
        Alertas.toast("Algo salio mal", "error")
      })
    },
    agregarLista() {
      if (this.venta.nombreProducto != "") {
        if (this.venta.cantidadProducto != "") {
          if (this.venta.precioProducto != "") {
            this.totalRow =
              this.venta.cantidadProducto * this.venta.precioProducto;
            this.venta.totalRow = this.totalRow;

            this.ticket.idProducto = 0;
            this.ticket.productoNombre = this.venta.nombreProducto;
            this.ticket.cantidad = this.venta.cantidadProducto;
            this.ticket.precio = this.venta.precioProducto;
            this.ticketCompleto.push(this.ticket);

            this.ventaCompleta.push(this.venta);
            this.venta.id = this.contador;
            this.venta = {
              id: this.contador,
              nombreProducto: "",
              cantidadProducto: "",
              precioProducto: "",
              totalRow: ""
            };
            this.contador++;
            this.valido.precio = true;
            this.valido.cantidad = true;
            this.valido.nombre = true;
          } else {
            this.valido.precio = false;
            this.valido.cantidad = true;
            this.valido.nombre = true;
            Alertas.toast("Campo Precio Obligatorio", "error");
          }
        } else {
          this.valido.cantidad = false;
          this.valido.nombre = true;
          Alertas.toast("Campo Cantidad Obligatorio", "error");
        }
      } else {
        this.valido.nombre = false;
        Alertas.toast("Campo Nombre Obligatorio", "error");
      }
    },
    getTotales() {
      let totalProductos = 0;
      let totalPagar = 0;
      for (let i = 0; i < this.ventaCompleta.length; i++) {
        totalProductos =
          parseInt(totalProductos) +
          parseInt(this.ventaCompleta[i].cantidadProducto);
        this.total.totalProductos = parseInt(totalProductos);
        totalPagar =
          parseInt(totalPagar) + parseInt(this.ventaCompleta[i].totalRow);
        this.total.totalPagar = parseInt(totalPagar);
      }
    },
    openModal() {
      this.modals.modal = true;
    },
    openModalProducto() {
      this.modals.modalP = true;
    },
    crearCliente() {
      this.nuevoCliente.idSucursal = 1;
      this.nuevoCliente.idUsuario = this.sesion.id;
      createProspecto(this.nuevoCliente)
        .then(res => {
          this.cliente = res;
          Alertas.toast("Creaste un prospecto nuevo", "success");
          this.hayCliente = true;
        })
        .catch(() => {
          Alertas.toast("Algo salió mal", "error");
        });
    },
    buscarCliente() {
      buscarClientesPorNombre(this.buscandocliente).then((res) => {
        this.resBusqueda = res.clientes;
        console.log(res);
      });
    },
    seleccionarCliente(cliente) {
      this.cliente = cliente;
      this.modals.modal = false;
      this.hayCliente = true;
    },
    cambioCliente() {
      this.hayCliente = false;
      this.cliente = {};
    },
    eliminaUno(id) {
      this.ventaCompleta.splice(id, 1);
      if (this.ventaCompleta.length == 0) {
        this.borrarVenta();
      }
      this.getTotales();
    },
    borrarVenta() {
      this.ventaCompleta = [];
      this.total.totalProductos = "";
      this.total.totalPagar = "";
      this.contador = 1;
    },
    devoluciones(){
      this.$router.push({name: "ListaDevoluciones"})
    },
    buscarProducto(){
      busquedaProducto(this.buscandoP.nombre).then((res) => {
        this.producto = res.productos;
      })
    },
  }
};
</script>

<style>
.page-item.active .page-link {
  background-color: #2dce89;
}
#datepicker__value_ {
  margin-top: 2px;
  margin-bottom: 2px;
}
</style>

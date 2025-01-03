<template>
    <div>
        <base-header type="info" class="pb-8 pt-3 pt-md-8">
            <!-- if want cards like dashboard -->
            <div class="row ml-1">
                <base-button v-on:click="irLista()" type="white">
                    Historial de conteo <i class="fas fa-boxes"></i>
                </base-button>
            </div>
        </base-header>
        <div class="container-fluid mt--7">
            <div class="row" v-if="!hayCliente">
                <div class="col-12">
                    <card shadow type="secondary" class="mb-5">
                        <!-- <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">
                                        Seleccionar colaborador para empezar 
                                    </h3>
                                </div>
                            </div>
                        </div> -->
                        <template>
                            <div class="row">
                                <div class="col-xl-12 col-sm-12">
                                    <label for="">Conteo Nuevo <i class="fas fa-box"></i></label>
                                    <!-- <div class="row">

                                        <div class="col-sm-12 col-md-12"> -->
                                    <!-- <label class="form-control-label" for="proveedor">Colaborador</label> -->
                                    <!-- <select  name="colaborador" id="colaborador"
                                                class="form-control form-control-alternative form-group"
                                                aria-describedby="addon-right addon-left">
                                                <option value="SELECCIONA UNA OPCION" disabled selected>
                                                    SELECCIONA UN COLABORADOR
                                                </option>
                                                <option v-for="colaborador of colaboradores" :key="colaborador.id"
                                                    :value="colaborador.id">
                                                    {{ colaborador.nombre }}
                                                </option>
                                            </select>
                                        </div>
                                    </div> -->
                                    <div class="row">

                                        <div class="col-sm-6 col-md-6">
                                            <label class="form-control-label" for="proveedor">Desde</label>
                                            <base-input input-classes="form-control-alternative" type="date"
                                                v-model="fechaDesde" id="dateDesde" @change="obtenerFechasEntre()">
                                            </base-input>
                                        </div>
                                        <div class="col-sm-6 col-md-6">
                                            <label class="form-control-label" for="proveedor">Hasta</label>
                                            <base-input input-classes="form-control-alternative" type="date"
                                                v-model="fechaHasta" @change="obtenerFechasEntre()" disabled>
                                            </base-input>
                                        </div>
                                    </div>
                                    <!-- <div class="row">
                                        <div class="col-xl-12 col-md-12">
                                            <base-input alternative="" placeholder="Cantidad de cajas"
                                                input-classes="form-control-alternative" type="number"
                                                v-model="nuevoCliente.apellidoS" required v-upper-case />
                                        </div>
                                    </div> -->
                                    <!-- <div class="row">
                                        <div class="col-12 text-right">
                                            <base-button type="success" v-on:click="crearCliente">
                                                Agregar</base-button>
                                        </div>
                                    </div> -->
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-x-6 col-sm-12">
                                    <div class="table-responsive table-striped table-hover">
                                        <base-table thead-classes="thead-light" :data="colaboradores">
                                            <template slot="columns">
                                                <th># de colaborador</th>
                                                <th>nombre</th>
                                                <th v-for="fecha in fechasEntre" :key="fecha">
                                                    {{ fecha }}
                                                </th>
                                            </template>
                                            <template slot-scope="{row}">
                                                <td>
                                                    {{ row.id }}
                                                </td>
                                                <td>
                                                    {{ row.nombre }}
                                                </td>
                                                <td v-for="fecha in fechasEntre" :key="fecha">
                                                    <div class="row">
                                                        <base-input class="" type="number" name=""
                                                            :id="obtenerIdInputEntrada(row.id, fecha)"
                                                            v-model="idsInputs[row.id].cantidad"
                                                            :placeholder="row.nombre.split(' ')[0]" />
                                                        <base-button iconOnly outline class="block" type="success"
                                                            size="md" @click="guardarConteo(row.id, fecha)">
                                                            <i class="far fa-save"></i>
                                                        </base-button>
                                                    </div>
                                                </td>
                                                <!-- <td>
                                                    <base-input type="number" name="" id="" />
                                                    <span>{{ row.nombre.split(' ')[0] }}</span>

                                                </td>
                                                <td>
                                                    <base-input type="number" name="" id="" />
                                                    <span class="text-sm">{{ row.nombre.split(' ')[0] }}</span>

                                                </td>
                                                <td>
                                                    <base-input type="number" name="" id="" />
                                                    <span>{{ row.nombre.split(' ')[0] }}</span>

                                                </td>
                                                <td>
                                                    <base-input type="number" name="" id="" />
                                                    <span>{{ row.nombre.split(' ')[0] }}</span>

                                                </td>
                                                <td>
                                                    <base-input type="number" name="" id="" />
                                                    <span>{{ row.nombre.split(' ')[0] }}</span>

                                                </td> -->
                                            </template>

                                        </base-table>
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
                                        Cotización para: {{ cliente.nombre }}
                                        {{ cliente.apellidoP }} {{ cliente.apellidoS }}
                                    </h3>
                                </div>
                                <base-button type="default" class="my--2" v-on:click="cambioCliente">
                                    Cambiar Cliente
                                </base-button>
                            </div>
                        </div>
                        <template>
                            <!-- Agregar Producto -->
                            <form @submit.prevent>
                                <div class="pl-lg-1 listaProductos">
                                    <h6 class="heading-small text-muted mb-4">Producto</h6>
                                    <div class="row">
                                        <div class="col-sm-2 col-md-2 col-lg-2">
                                            <label for="">Cantidad</label>
                                            <base-input alternative="" placeholder="Cantidad"
                                                input-classes="form-control-alternative"
                                                v-model="ventaCodigo.cantidad" />
                                        </div>
                                        <div class="col-sm-8 col-md-8 col-lg-8">
                                            <label for="">Codigo</label>
                                            <base-input alternative="" placeholder="Codigo"
                                                input-classes="form-control-alternative" v-model="ventaCodigo.codigo"
                                                v-on:keyup.enter="agregarPorCodigo(ventaCodigo.codigo)" />
                                        </div>
                                        <div class="col-1 mr-2 mt-4">
                                            <base-button type="secondary" icon="fas fa-search"
                                                v-on:click="openModalProducto" />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12 col-md-4 col-lg-4">
                                            <label for="">Nombre</label>
                                            <base-input alternative="" placeholder="Nombre"
                                                input-classes="form-control-alternative" v-model="venta.nombreProducto"
                                                :valid="valido.nombre" required v-upper-case />
                                        </div>
                                        <div class="col-sm-12 col-md-4 col-lg-4">
                                            <label for="">Cantidad</label>
                                            <base-input alternative="" placeholder="Cantidad"
                                                input-classes="form-control-alternative" type="number"
                                                v-model="venta.cantidadProducto" :valid="valido.cantidad" />
                                        </div>
                                        <div class="col-sm-12 col-md-4 col-lg-4">
                                            <label for="">Precio</label>
                                            <base-input alternative="" placeholder="Precio"
                                                input-classes="form-control-alternative" type="number"
                                                v-model="venta.precioProducto" :valid="valido.precio" />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 col-sm-12 col-md-12 col-lg-12" style="text-align: right">
                                            <base-button type="success" class="my-3"
                                                v-on:click="agregarLista(), getTotales()">
                                                Agregar
                                            </base-button>

                                            <base-button type="danger" class="my-3" v-on:click="borrarVenta">
                                                Cancelar
                                            </base-button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </template>
                        <detalleCotizacion ref="detalle" :venta="ventaCompleta" />
                    </card>
                </div>
                <div class="col-xl-5 order-xl-1">
                    <totalCotizacion :total="total" :detalle="ticketCompleto" :clienteCotizacion="cliente" />
                </div>
            </div>
        </div>
        <!-- Modal buscar producto por nombre -->
        <div>
            <div class="col-md-12">
                <modal :show.sync="modals.modalP" body-classes="p-0" modal-classes="modal-dialog-centered modal-lg">
                    <card shadow header-classes="bg-white pb-5" body-classes="px-lg-4 py-lg-4" class="border-0">
                        <template>
                            <div class="text-left text-muted mb-4">
                                Busqueda Producto: <br />
                            </div>
                            <form role="form">
                                <div class="row">
                                    <div class="col-2">
                                        <base-input placeholder="Cantidad" input-classes="form-control-alternative"
                                            type="number" v-model="ventaCodigo.cantidad" />
                                    </div>
                                    <div class="col-6">
                                        <base-input placeholder="Nombre" input-classes="form-control-alternative"
                                            type="text" v-model="buscandoP.nombre" @keyup="buscarProducto" />
                                    </div>
                                </div>
                            </form>
                            <div class="table-responsive table-striped table-hover">
                                <base-table class="table align-items-center table-flush" tbody-classes="list"
                                    :data="resBusquedaP">
                                    <template slot="columns">
                                        <th scope="col">Id</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Categoria</th>
                                        <th scope="col">Inventario</th>
                                        <th scope="col"></th>
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
                                        <td class="budget">{{ row.stock }}</td>
                                        <td class="budget">
                                            <!-- Se cambio la variable idEtiqueta y se agrego el nombre-->
                                            {{ row.etiquetas.nombre }}
                                        </td>
                                        <td class="budget">
                                            <!-- Se cambio la variable idInventario y se agrego el nombre-->
                                            {{ row.inventario.nombre }}
                                        </td>
                                        <td scope="row">
                                            <a slot="title" class="btn btn-sm btn-icon-only text-success" role="button"
                                                aria-haspopup="true" aria-expanded="false" style="right: 75%"
                                                v-on:click="seleccionarProducto(row.uid)"><!-- Se cambio la variable codigo por uid-->
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
                <modal :show.sync="modals.modal" body-classes="p-0" modal-classes="modal-dialog-centered modal-xl">
                    <card shadow header-classes="bg-white pb-5" body-classes="px-lg-4 py-lg-4" class="border-0">
                        <template>
                            <div class="text-left text-muted mb-4">
                                Busqueda cliente: <br />
                            </div>
                            <form role="form">
                                <div class="row">
                                    <div class="col-4">
                                        <base-input placeholder="Nombre" input-classes="form-control-alternative"
                                            type="text" v-model="buscando.nombre" @keyup="buscarCliente" />
                                    </div>
                                    <div class="col-4">
                                        <base-input placeholder="Apellido Paterno"
                                            input-classes="form-control-alternative" type="text"
                                            v-model="buscando.pApellido" />
                                    </div>
                                    <div class="col-4">
                                        <base-input placeholder="Apellido Materno"
                                            input-classes="form-control-alternative" type="text"
                                            v-model="buscando.sApellido" />
                                    </div>
                                </div>
                            </form>
                            <div class="table-responsive table-striped table-hover">
                                <base-table class="table align-items-center table-flush" tbody-classes="list"
                                    :data="resBusqueda">
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
                                                        {{ row.nombre }} {{ row.apellidoP }} {{ row.apellidoS }}
                                                    </span>
                                                </div>
                                            </div>
                                        </th>
                                        <td class="budget">{{ row.email }}</td>

                                        <td class="budget">
                                            {{ row.celular }}
                                        </td>
                                        <td scope="row">
                                            <a slot="title" class="btn btn-sm btn-icon-only text-success" role="button"
                                                aria-haspopup="true" aria-expanded="false" style="right: 75%"
                                                v-on:click="seleccionarCliente(row)">
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
import detalleCotizacion from "./DetalleCotizacion";
import totalCotizacion from "./TotalCotizacion";
import storageSession from "../../services/storage";
import Colaborador from "../../components/Utils/colaboradores.js";
import Alertas from "../../services/Alertas";
import { buscarPorCodigo, busquedaProducto } from "../../services/productos";
import {
    buscarClientesPorNombre,
    createProspecto,
} from "../../services/clientes";
import {
    listarConteosXFechas,
    agregarConteo
} from "../../services/inventarios.js";
import alerta from "../../services/Alertas";
export default {
    components: { detalleCotizacion, totalCotizacion },
    name: "cotizador",
    data() {
        let sesion = storageSession.getObject("sesion");
        return {
            sesion,
            fechaDesde: "",
            fechaHasta: "",
            fechasEntre: [],
            // conteosGrales: [{ colaborador: 1, conteos: [{ "2024-12-23": 200 }] }],
            conteosGrales: [],
            model: {
                busqueda: "",
            },
            modals: {
                modal: false,
                modalP: false
            },
            buscandoP: {
                nombre: ""
            },
            buscando: {
                nombre: "",
                pApellido: "",
                sApellido: "",
            },
            hayCliente: false,
            resBusqueda: [],
            resBusquedaP: [],
            cliente: {},
            ventaCodigo: {
                codigo: "",
                cantidad: "",
            },
            nuevoCliente: {},
            ventaCompleta: [],
            ticketCompleto: [],
            ticket: {
                idProducto: "",
                productoNombre: "",
                cantidad: "",
                precio: "",
            },
            venta: {
                id: 0,
                nombreProducto: "",
                cantidadProducto: "",
                precioProducto: "",
                totalRow: "",
            },
            total: {
                totalProductos: "",
                totalPagar: "",
                totalPagando: "",
                cambio: "",
            },
            contador: 1,
            valido: {
                nombre: "",
                cantidad: "",
                precio: "",
            },
            colaboradores: Colaborador,
            idsInputs: [{identificador:null,cantidad:0}]
        };
    },
    methods: {
        seleccionarProducto(codigo) {
            this.agregarPorCodigo(codigo);
            this.modals.modalP = false;
        },
        obtenerIdInput(id, fecha) {
            let identificadorCompuesto = `${id}_${fecha}`;
            return identificadorCompuesto;
        },
        guardarConteo(id, fecha) {
            let element = document.getElementById(`${id}_${fecha}`)
            let conteo = {
                "identificadorDiario": this.obtenerIdInput(id, fecha),
                "idUsuarioRegistra": 1,
                "cantidad": element.value
            };
            agregarConteo(conteo).then(() => {
                alerta.toast("Agregado Correctamente", "success");
            });
        },
        agregarPorCodigo(codigo) {
            buscarPorCodigo(codigo).then((res) => {

                this.ticket.idProducto = res.productos.uid;/** Se cambio id por uid*/
                this.ticket.productoNombre = res.productos.nombre;
                this.ticket.precio = res.productos.precioVenta;/** Se cambio precioUnitario por precioVenta*/

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
                    alerta.toast("Algo salio mal", "error")
                })
        },
        agregarLista() {
            if (this.venta.nombreProducto != "") {
                if (this.venta.cantidadProducto != "") {
                    if (this.venta.precioProducto != "") {

                        this.totalRow = this.venta.cantidadProducto * this.venta.precioProducto;
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
                            totalRow: "",
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
        irLista() {
            this.$router.push({ name: "ListaCotizaciones" });
        },
        getTotales() {
            let totalProductos = 0;
            let totalPagar = 0;
            for (let i = 0; i < this.ventaCompleta.length; i++) {
                totalProductos = parseInt(totalProductos) + parseInt(this.ventaCompleta[i].cantidadProducto);
                this.total.totalProductos = parseInt(totalProductos);
                totalPagar = parseFloat(totalPagar) + parseFloat(this.ventaCompleta[i].totalRow);
                this.total.totalPagar = parseFloat(totalPagar);
            }
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
        cambioCliente() {
            this.hayCliente = false;
            this.cliente = {};
        },
        openModalProducto() {
            this.modals.modalP = true;
        },
        openModal() {
            this.modals.modal = true;
        },
        crearCliente() {
            this.nuevoCliente.idSucursal = 1;
            this.nuevoCliente.idUsuario = this.sesion.id;
            createProspecto(this.nuevoCliente)
                .then(() => {
                    this.cliente = this.nuevoCliente;
                    alerta.toast("Creaste un prospecto nuevo", "success");
                    this.hayCliente = true;
                })
                .catch(() => {
                    alerta.toast("Algo salió mal", "error");
                });
        },
        buscarCliente() {
            buscarClientesPorNombre(this.buscando.nombre).then((res) => {
                this.resBusqueda = res.clientes;
            });
        },
        buscarProducto() {
            busquedaProducto(this.buscandoP.nombre).then((res) => {
                this.resBusquedaP = res.productos;
            })
        },
        seleccionarCliente(cliente) {
            this.cliente = cliente;
            this.modals.modal = false;
            this.hayCliente = true;
        },
        obtenerFechaDesdeHoy(diferencia = 0) {
            const fechaHoy = new Date();
            fechaHoy.setDate(fechaHoy.getDate() + diferencia);
            const dia = fechaHoy.getDate().toString().padStart(2, '0');
            const mes = (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
            const anio = fechaHoy.getFullYear();

            return `${anio}-${mes}-${dia}`;
        },
        obtenerFechasEntre() {
            // Convertir las fechas a objetos Date
            const inicio = new Date(this.fechaDesde);
            const fin = new Date(this.fechaHasta);
            // Asegurarse que la fecha inicial sea menor a la fecha final
            if (inicio > fin) {
                throw new Alertas.toast('La fecha inicial debe ser menor a la fecha final.', 'error');
            }

            // Crear un arreglo para almacenar las fechas
            let fechas = [];

            // Iterar desde la fecha inicial hasta la final, agregando cada día al arreglo
            let fechaActual = new Date(inicio);
            while (fechaActual <= fin) {
                fechas.push(fechaActual.toISOString().slice(0, 10)); // Formatear la fecha a yyyy-mm-dd
                fechaActual.setDate(fechaActual.getDate() + 1);
            }
            fechas = fechas.length <= 7 ? fechas : [];
            fechas.length == 0 ? Alertas.toast("No puede ser más de 7 días de diferencia", "error") : "";
            return fechas;
        },
        obtenerConteosFechas() {
            listarConteosXFechas(this.fechaDesde, this.fechaHasta).then((res) => {
                console.log(res);
                res.forEach(x => {
                    this.idsInputs.find(idInp => x.identificadorDiario == idInp.identificador ).cantidad = x.cantidad
                })
            })
        },
    },
    created() {
        this.fechaDesde = this.obtenerFechaDesdeHoy();
        this.fechaHasta = this.obtenerFechaDesdeHoy();
        this.fechasEntre = this.obtenerFechasEntre();
    },
    mounted() {
        this.obtenerConteosFechas();
    },
    computed: {
        obtenerIdInputEntrada() {
            return (rowId, fecha) => {
                if (!this.idsInputs.some(elemento => elemento.identificador == `${rowId}_${fecha}`)) {
                    this.idsInputs.push({ "identificador": `${rowId}_${fecha}`, "cantidad": 0 });
                }
                // console.log(this.idsInputs)
                return `${rowId}_${fecha}`;
            };
        },
        obtenerValor(){
            return (rowId,fecha)=>{
                return this.idsInputs.find(`${rowId}_${fecha}`).cantidad;
            }
        }
    }
};
</script>

<style>
.page-item.active .page-link {
    background-color: #2dce89;
}

.input-container {
    position: relative;
}

.input-button {
    position: absolute;
    right: 0;
}

#datepicker_value {
    margin-top: 2px;
    margin-bottom: 2px;
}
</style>

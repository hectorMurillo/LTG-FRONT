<template>
    <div>
        <div>
            <!-- <button type="button" class="btn btn-primary" @click="toggleModal">Abrir Modal</button> -->
            <div ref="modal" class="modal fade" :class="{ show, 'd-block': active }" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Información de la recepción
                                <br>
                                <span style="color:red;text-transform: uppercase;">
                                    {{ rowSelected.folio_carta }} </span>
                                <span>
                                    del Proveedor

                                </span>
                                <span style="color:red;text-transform: uppercase;">{{
                                    rowSelected.aliasProveedor }}</span>
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                                @click="toggleModal">
                                <span aria-hidden="true">[X]</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <table class="table ">
                                <!-- <th> -->
                                <!-- <pre>{{rowSelected}}</pre> -->
                                <!-- <tr>
                                    <td>Foto carta</td>
                                    <button class="btn btn-outline-default" v-if="imgSelected == ''"
                                        @click="verImagen(rowSelected.pathImgFlyer)">
                                        <span>Ver Imagen
                                            <i class="fas fa-image"></i>
                                        </span>
                                    </button>
                                    <img :src="imgSelected" alt="" width="100" />
                                </tr> -->
                                <tr>
                                    <td>Código</td>
                                    <td><b>{{ rowSelected.idRecepcion }}</b></td>
                                </tr>
                                <tr>
                                    <td>Proveedor</td>
                                    <td><b>{{ rowSelected.aliasProveedor }}</b></td>
                                </tr>
                                <tr>
                                    <td>Costo de madera</td>
                                    <td><b>{{ rowSelected.costoMadera }}</b></td>
                                </tr>
                                <tr>
                                    <td>Costo de descarga</td>
                                    <td><b>{{ rowSelected.costoDescarga }}</b></td>
                                </tr>
                                <tr>
                                    <td>Costo de flete</td>
                                    <td><b>{{ rowSelected.costoFlete }}</b></td>
                                </tr>
                                <tr>
                                    <td>Facebook</td>
                                    <td><b>{{ rowSelected.Facebook }}</b></td>
                                </tr>
                                <tr>
                                    <td>Proyecto</td>
                                    <td><b>{{ rowSelected.NombreProyecto }}</b></td>
                                </tr>
                                <tr>
                                    <td>Descripción</td>
                                    <td>
                                        <textarea name="" id="" cols="20" rows="10"
                                            v-model="rowSelected.DescripcionProducto" disabled="true">
											</textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Fecha de registro</td>
                                    <td><b>{{ rowSelected.fechaFormat }}</b></td>
                                </tr>
                                <tr>
                                    <td>Categoría</td>
                                    <td><b>{{ rowSelected.NombreCategoria }}</b></td>
                                </tr>
                                <tr>
                                    <td>Subcategoría</td>
                                    <td><b>{{ rowSelected.NombreSubCategoria }}</b></td>
                                </tr>
                                <tr>
                                    <td>Revisado</td>
                                    <td><b>{{ rowSelected.Revisado ? 'Si' : 'No' }}</b></td>
                                </tr>
                                <tr>
                                    <td>Confirmado</td>
                                    <td><b>{{ rowSelected.Confirmado ? 'Si' : 'No' }}</b></td>
                                </tr>
                                <!-- </th> -->
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" :class="classBtnRevisado()" @click="saveChangesRevisado(rowSelected)"
                                :disabled="rowSelected.estatusPagoId == 'PAG'">
                                <span v-if="rowSelected.estatusPagoId !== 'PAG'">Cambiar a pagado</span>
                                <span v-else>Pagado</span>

                                <span v-if="rowSelected.Revisado">Revisado <i class="far fa-check-square"></i></span>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-primary" @click="toggleModal">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div ref="modal" class="modal fade" :class="{ 'show': show_abono, 'd-block': active_abono }" tabindex="-1"
                role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Información de pagos
                                <br>
                                <span style="color:red;text-transform: uppercase;">
                                    {{ rowSelected.folio_carta }} </span>
                                <span>
                                    del Proveedor

                                </span>
                                <span style="color:red;text-transform: uppercase;">{{
                                    rowSelected.aliasProveedor }}</span>
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                                @click="toggleAbono">
                                <span aria-hidden="true">[X]</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <table class="table ">
                                <!-- <th> -->
                                <!-- <pre>{{rowSelected}}</pre> -->
                                <!-- <tr>
                                    <td>Foto carta</td>
                                    <button class="btn btn-outline-default" v-if="imgSelected == ''"
                                        @click="verImagen(rowSelected.pathImgFlyer)">
                                        <span>Ver Imagen
                                            <i class="fas fa-image"></i>
                                        </span>
                                    </button>
                                    <img :src="imgSelected" alt="" width="100" />
                                </tr> -->
                                <tr>
                                    <td>Código</td>
                                    <td><b>{{ rowSelected.idRecepcion }}</b></td>
                                </tr>
                                <tr>
                                    <td>Proveedor</td>
                                    <td><b>{{ rowSelected.aliasProveedor }}</b></td>
                                </tr>
                                <tr>
                                    <td>Costo de madera</td>
                                    <td><b>{{ rowSelected.costoMadera }}</b></td>
                                </tr>
                                <tr>
                                    <td>Costo de descarga</td>
                                    <td><b>{{ rowSelected.costoDescarga }}</b></td>
                                </tr>
                                <tr>
                                    <td>Costo de flete</td>
                                    <td><b>{{ rowSelected.costoFlete }}</b></td>
                                </tr>
                                <tr>
                                    <td>Total</td>
                                    <td><b>{{ formattedPrice }}</b></td>
                                </tr>
                                <tr>
                                    <td>Abono o pago</td>
                                    <td>
                                        <base-input alternative="" placeholder="Monto subtotal"
                                            input-classes="form-control-alternative" type="number"
                                            v-model="abonoSubtotalRegistrado" />
                                        <!-- <input type="number" name="" id="" class="mt-4"> -->
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <span :class="classMsgPagoAbono()">{{ msgAbonoSubtotalRegistrado }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Fecha</td>
                                    <td><b>{{ rowSelected.fechaFormat }}</b></td>
                                </tr>
                                <tr>
                                    <td>Estatus</td>
                                    <td><b>{{ rowSelected.estatusPago }}</b></td>
                                </tr>
                                <tr>
                                    <td>Usuario Registró</td>
                                    <td><b>{{ rowSelected.usuarioRegistro }}</b></td>
                                </tr>
                                <!-- </th> -->
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" :class="classBtnRevisado()" @click="saveChangesRevisado(rowSelected)"
                                :disabled="rowSelected.estatusPagoId == 'PAG' || esMayorADeuda">
                                <span v-if="rowSelected.estatusPagoId !== 'PAG' && esAbono">Registrar abono</span>
                                <span v-else-if="rowSelected.estatusPagoId !== 'PAG' && esPagoTotal">Registrar
                                    pago</span>
                                <span v-else-if="rowSelected.estatusPagoId !== 'PAG' && esMayorADeuda">Registrar
                                    pago</span>
                                <span v-else>Pagado</span>

                                <span v-if="rowSelected.Revisado">Revisado <i class="far fa-check-square"></i></span>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-primary" @click="toggleAbono">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
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
                                    <h3 class="mb-0">Listado de pagos </h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-md-5">
                                    <div class="mt-3">Busqueda:</div>
                                    <base-input placeholder="Busqueda" addon-right-icon="fa fa-search" v-upper-case
                                        v-model="buscando" @keyup.delete="buscando = ''" v-on:keyup="buscar()" />
                                </div>
                                <div class="col-12 col-md-3 mt-4">
                                    <div class="mt-3"></div>
                                    <base-button v-on:click="crearCliente()" type="success">Agregar</base-button>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive table-striped table-hover" v-if="listadoPagos.length != 0">
                            <base-table class="table align-items-center table-flush" tbody-classes="list"
                                :data="listadoPagos">
                                <template slot="columns">
                                    <th scope="col"></th>
                                    <th scope="col">FolioRecepcion</th>
                                    <th scope="col">Folio/Carta</th>
                                    <th scope="row">Total</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Proveedor</th>
                                    <th scope="col">Estatus de pago</th>
                                    <th scope="col">Acciones</th>
                                    <!-- <th scope="col">Revisado / Confirmado</th> -->
                                </template>
                                <template slot-scope="{ row }">
                                    <!-- <pre>{{row}}</pre> -->
                                    <td>
                                        <!-- <button class="btn btn-outline-primary btn-sm">
															<i class="fas fa-eye"></i>
														</button> -->
                                        <!-- <button class="btn btn-outline-info btn-sm" @click="toggleModal(row)">
											<i class="fas fa-clipboard-check"></i>
										</button> -->
                                        <!-- {{ row.folio }} -->
                                    </td>
                                    <td class="budget">
                                        {{ row.idRecepcion }}
                                    </td>
                                    <th scope="row">
                                        <div class="media align-items-center">
                                            <div class="media-body">
                                                <span class="name mb-0 text-sm">
                                                    {{ row.folio_carta }}
                                                </span>
                                            </div>
                                        </div>
                                    </th>
                                    <td class="buget">
                                        {{ row.subtotal }}
                                    </td>
                                    <td class="budget">
                                        {{ row.fechaFormat }}
                                    </td>

                                    <td class="budget">
                                        <!-- <a :href="'https://wa.me/+52' + row.Celular" target="_blank"><i class="fab fa-whatsapp"></i> {{
											row.Celular }}</a> -->
                                        {{ row.aliasProveedor }}

                                    </td>
                                    <td class="budget">
                                        <!-- <a :href="'https://wa.me/+52' + row.Celular" target="_blank"><i class="fab fa-whatsapp"></i> {{
											row.Celular }}</a> -->
                                        <span class="badge rounded-pill bg-danger text-white"
                                            v-if="row.estatusPago == 'EN DEUDA'">
                                            {{ row.estatusPago }}
                                        </span>
                                        <span class="badge rounded-pill bg-success text-white"
                                            v-else-if="row.estatusPago == 'PAGADO'">
                                            {{ row.estatusPago }}
                                        </span>
                                        <span class="badge rounded-pill bg-primary text-white" v-else>
                                            {{ row.estatusPago }}
                                        </span>
                                    </td>
                                    <td class="budget">
                                        <button class="btn btn-outline-info btn-sm" @click="toggleModal(row)">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="btn btn-outline-success btn-sm"
                                            v-if="row.estatusPago == 'EN DEUDA'" @click="toggleAbono(row)">
                                            <i class="fas fa-dollar-sign"></i>
                                        </button>
                                    </td>
                                    <!-- <td class="budget">
										<a :href="'https://www.facebook.com/' + row.Facebook + '/?app=fbl'
											" target="_blank"><i class="fab fa-facebook"></i></a>
										&nbsp;|&nbsp;
										<a :href="'https://www.instagram.com/' + row.Instagram" target="_blank"><i
												class="fab fa-instagram"></i>
										</a>
									</td>
									<td class="budget">
										<span class="badge rounded-pill bg-danger text-white" v-if="!row.Revisado">Pendiente de
											revisión</span>
										<span class="badge rounded-pill bg-warning text-white"
											v-if="row.Revisado && !row.Confirmado">Pendiente de confirmar</span>
										<span class="badge rounded-pill bg-success text-white"
											v-if="row.Revisado && row.Confirmado">Confirmado</span>
									</td> -->
                                    <td class="text-left">
                                        <!-- <b-dropdown
																size="sm"
																toggle-class="text-decoration-none"
																block
																variant="secondary"
																no-caret
														>
																<b-dropdown-item v-on:click="editar(row.uid)">
																		<i class="fas fa-eye"></i>
																		Detalle
																</b-dropdown-item>
																<b-dropdown-item v-on:click="editar(row.uid)">
																		<i class="fas fa-clipboard-list"></i>
																		Seguimiento
																</b-dropdown-item>
														</b-dropdown> -->
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
import Swal from 'sweetalert2';
import { listar } from '../../services/recepciones'
// import { buscarByNombre } from "../../services/clientes";
export default {
    name: "clientes",

    data() {
        return {
            buscando: "",
            listadoPagos: [],
            pagina: 1,
            totalPaginas: 1,
            active: false,
            active_abono: false,
            show: false,
            show_abono: false,
            rowSelected: {},
            imgSelected: "",
            abonoSubtotalRegistrado: 0,
            msgAbonoSubtotalRegistrado: '',
            esAbono: false,
            esPagoTotal: false,
            esMayorADeuda: false
        };
    },
    // components:{
    //   Breadcrumbs
    // },
    methods: {
        verImagen(nombreImagen) {
            // this.imgSelected = this.imgSelected == "" ? obtenerURLImg(nombreImagen) : "";
            nombreImagen + "";
        },
        crearCliente() {
            this.$router.push({
                name: "agregar-recepcion",
            });
        },
        editar(id) {
            this.$router.push({
                name: "agregar-recepcion",
                params: { id: id },
            });
        },
        listado() {
            listar().then((res) => {
                this.listadoPagos = res?.data?.length == 0 ? [] : res;
            });
        },
        buscar() {
            if (this.buscando == "") {
                this.listado();
            } else {
                console.log(this.listadoPagos);
                let resultado = this.listadoPagos.filter((cliente) =>
                    (
                        cliente.NombreProyecto +
                        " " +
                        cliente.Correo +
                        " " +
                        cliente.NombreCategoria +
                        " " +
                        cliente.NombreSubCategoria +
                        " " +
                        cliente.Celular
                    )
                        .toUpperCase()
                        .includes(this.buscando)
                );
                this.listadoPagos = resultado;
            }
        },
        toggleModal(rowSelected) {
            this.rowSelected = rowSelected
            console.log(rowSelected)
            const body = document.querySelector("body");
            this.active = !this.active;
            this.imgSelected = "";
            this.active
                ? body.classList.add("modal-open")
                : body.classList.remove("modal-open");
            setTimeout(() => (this.show = !this.show), 10);
        },
        toggleAbono(rowSelected) {
            this.rowSelected = rowSelected;
            this.abonoSubtotalRegistrado = rowSelected.subtotal;
            console.log(rowSelected)
            const body = document.querySelector("body");
            this.active_abono = !this.active_abono;
            this.imgSelected = "";
            this.active_abono
                ? body.classList.add("modal-open")
                : body.classList.remove("modal-open");
            setTimeout(() => (this.show_abono = !this.show_abono), 10);
        },
        saveChangesRevisado(row) {
            // actualizarRevisado(row.IdCandidatosAColaboradoresEnc).then(res => {
            // if (res.resultado[0][0].pResultado) {
            console.log(row);
            Swal.fire({
                title: "Comentarios sobre este movimiento:",
                input: "text",
                inputAttributes: {
                    autocapitalize: "on"
                },
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                showLoaderOnConfirm: true,
                preConfirm: async (login) => {
                    try {
                        const githubUrl = `
                                https://api.github.com/users/${login}
                            `;
                        const response = await fetch(githubUrl);
                        if (!response.ok) {
                            return Swal.showValidationMessage(`
                                ${JSON.stringify(await response.json())}
                                `);
                        }
                        return response.json();
                    } catch (error) {
                        Swal.showValidationMessage(`
                                Request failed: ${error}
                            `);
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: `${result.value.login}'s avatar`,
                        imageUrl: result.value.avatar_url
                    });
                }
            });




            // Swal.fire({
            //     title: '¡ Éxito !',
            //     // text: JSON.stringify(data, null, 2),
            //     text: res?.resultado[0][0]?.pMsg,
            //     icon: 'success',
            //     confirmButtonText: 'Entendido',
            //     customClass: {
            //         // title: 'my-title-class', // Clase CSS para el título
            //         confirmButton: 'btn-modales' // Clase CSS para el botón de confirmación
            //     }
            // });
        },


        classBtnRevisado() {
            return !this.rowSelected.Revisado ? 'btn btn-sm btn-outline-primary' : 'btn btn-sm btn-outline-warning';
        },
        classMsgPagoAbono() {
            return this.esAbono ? 'text-warning' : !this.esPagoTotal ? 'text-info' : 'text-success';
        }
    },
    mounted() {
        this.listado();
    },
    watch: {
        abonoSubtotalRegistrado: function (newVal) {
            if (newVal > this.rowSelected.subtotal) {
                this.esMayorADeuda = true;
                this.esAbono = false;
                this.esPagoTotal = false;
                this.msgAbonoSubtotalRegistrado = 'EL MONTO ES MAYOR QUE LA DEUDA...'
            } else if (newVal < this.rowSelected.subtotal) {
                this.esMayorADeuda = false;
                this.esAbono = true;
                this.esPagoTotal = false;
                this.msgAbonoSubtotalRegistrado = `ABONO, QUEDA UN SALDO DE ${this.rowSelected.subtotal - newVal}`
            } else {
                this.esPagoTotal = true;
                this.esAbono = false;
                this.esMayorADeuda = false;
                this.msgAbonoSubtotalRegistrado = 'EL MONTO ENTRA COMO PAGO TOTAL...'
            }
        }
    },
    computed: {
        formattedPrice() {
            return this.rowSelected?.subtotal?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 });
        }
    }
};
</script>

<style>
.page-item.active .page-link {
    background-color: #2dce89;
}
</style>

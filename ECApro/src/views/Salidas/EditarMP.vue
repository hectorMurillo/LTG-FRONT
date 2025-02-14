<template>
    <div>
        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row"></div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-md-12">
                    <div class="card shadow" :class="''">
                        <div class="card-header border-0" :class="''">
                            <div class="row container">
                                <div class="col-12 col-md-8">
                                    <h3 class="mb-0" :class="''">
                                        <base-button iconOnly outline rounded type="success" size="sm"
                                            v-on:click="regresar" icon="ni ni-bold-left" v-b-popover.hover.top
                                            title="Regresar"></base-button>
                                        Salida: <span class="name mb-0 text-sm"></span>
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div class="row align-items-center">
                            <div class="col-12 col-md-1"></div>
                            <div class="col-12 col-md-10">
                                <card type="secondary">
                                    <template>
                                        <form @submit.prevent>
                                            <div style="" class="col-12 col-md-12">
                                                <h6 class="heading-small text-muted mb-2">
                                                    Datos de la salida
                                                    <i class="fas fa-truck-loading"></i>
                                                </h6>
                                                <div class="row">
                                                    <div class="col-sm-12 col-md-4">
                                                        <base-input alternative="" label="Centro de destino"
                                                            placeholder="Centro de destino"
                                                            input-classes="form-control-alternative"
                                                            v-model="salida.centro" />
                                                    </div>
                                                    <div class="col-sm-12 col-md-4">
                                                        <base-input alternative="" label="Cant. de cajas"
                                                            placeholder="Cant. de cajas"
                                                            input-classes="form-control-alternative"
                                                            v-model="salida.cant_cajas" @blur="obtenerLote"
                                                            @input="validarCantidad" />
                                                        <p v-if="error" class="text-danger">{{ error }}</p>
                                                    </div>
                                                    <!-- <div class="col-sm-12 col-md-3">
                                                        <label class="form-control-label" for="lotesDisp">Lote</label>
                                                        <select name="lotesDisp" id="lotesDisp"
                                                            class="form-control form-control-alternative"
                                                            aria-describedby="addon-right addon-left"
                                                            v-model="loteSelected">
                                                            <option value="SELECCIONA UNA OPCION" disabled selected>
                                                                SELECCIONA UNA OPCIÓN
                                                            </option>
                                                            <option v-for="loteDisp of salida.lote" :key="loteDisp.id">
                                                                {{ loteDisp.nombre }}
                                                            </option>
                                                        </select>
                                                    </div> -->
                                                    <div class="col-sm-12 col-md-4">
                                                        <base-input alternative="" label="Nombre de quien recibe"
                                                            placeholder="Nombre de quien Recibe"
                                                            input-classes="form-control-alternative"
                                                            v-model="salida.recibe" />
                                                    </div>

                                                    <!-- <div class="col-sm-12 col-md-6">
														<base-input alternative="" label="Apellido Paterno" placeholder="Apellido Paterno"
															input-classes="form-control-alternative" v-model="cliente.apellidoP" v-upper-case />
													</div>
												</div>
												<div class="row">
													<div class="col-sm-12 col-md-6">
														<base-input alternative="" label="Apellido Materno" placeholder="Apellido Materno"
															input-classes="form-control-alternative" v-model="cliente.apellidoS" v-upper-case />
													</div> -->
                                                    <!-- <div class="col-sm-12 col-md-6">
                                                        <label style="margin-bottom: 0" for="datepicker"
                                                            class="form-control-label mb-2">Fecha de
                                                            Nacimiento</label>
                                                        <b-form-datepicker size="sm" id="datepicker"
                                                            placeholder="Fecha de Nacimiento"
                                                            label-help="Selecciona la fecha con el puntero."
                                                            class="mb-2" v-model="cliente.fechaNacimiento"
                                                            :date-format-options="{
                                                                year: 'numeric',
                                                                month: 'numeric',
                                                                day: 'numeric'
                                                            }">
                                                        </b-form-datepicker>
                                                    </div> -->
                                                </div>
                                                <div class="row">
                                                    <div class="col-12 text-right mt-3 mb-3" v-if="id == 0">
                                                        <base-button type="warning" icon="ni ni-fat-delete">
                                                            Limpiar
                                                        </base-button>
                                                        <base-button type="success" icon="ni ni-fat-add"
                                                            v-on:click="save" :disabled="error">Guardar</base-button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </template>
                                </card>
                            </div>
                        </div>
                        <div class="card-footer d-flex justify-content-end marginBotton" :class="''"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import storageSession from "../../services/storage.js";
import Proveedores from "../../components/Utils/proveedores.js";
// import { listarSucursales } from "../../services/sucursales";
import { getById, updateCliente } from "../../services/clientes.js";
// import { create } from "../../services/recepciones.js";
import { agregarSalidaACentro } from "../../services/salidas.js";
import { obtenerMPConMargen } from '../../services/inventarios.js';
import alerta from "../../services/Alertas.js";
export default {
    name: "Recepcion-madera",
    props: {
        id: {
            type: String,
            default: ""
        }
    },
    data() {
        let sesion = storageSession.getObject("sesion");
        return {
            cliente: {
                uidSucursal: {
                    _id: "SELECCIONA"
                }
            },
            sesion,
            proveedores: Proveedores,
            sucursales: "",
            pagina: 1,
            totalPaginas: 1,
            salida: {
                idSalida: null,
                centro: "",
                cant_cajas: 0,
                lote: [{ id: 0, nombre: "Seleccione" }],
                recibe: ""
            },
            loteSelected: 0,
            loteSelected2: null,
            recepcion: {
                idRecepcion: null,
                fechaRecepcion: null,
                folio_carta: "",
                idProveedor: "SELECCIONA UNA OPCION",
                subtotal: 0.00,
                costoMadera: 0.00,
                costoFlete: 0.00,
                costoDescarga: 0,
                cantCabezales: 0,
                cantidadTabletas: 0,
                numCajas: 0,
                codUsuario: 0,
                costoXCaja: 0
            },
            error: null,
        };
    },
    computed: {
        subtotal() {
            const costoMadera = isNaN(parseFloat(this.recepcion.costoMadera)) ? 0 : parseFloat(this.recepcion.costoMadera);
            const costoFlete = isNaN(parseFloat(this.recepcion.costoFlete)) ? 0 : parseFloat(this.recepcion.costoFlete);
            const costoDescarga = isNaN(parseFloat(this.recepcion.costoDescarga)) ? 0 : parseFloat(this.recepcion.costoDescarga);

            const totalCost = costoMadera + costoFlete + costoDescarga;
            return totalCost.toFixed(2);
        }
    },
    created() {
        this.cliente.estado = "SELECCIONA UNA OPCION";
        if (this.id != "") {
            getById(this.id).then(res => {
                this.cliente = res.clientes;
            });
        }
    },
    methods: {
        save() {
            // salida: {
            //     idSalida: null,
            //     centro: "",
            //     cant_cajas: 0,
            //     lote: [{ id: 0, nombre: "Seleccione" }],
            //     recibe: ""
            // },
            let salidaACentroGuardar = {
                idLote: null,
                idLoteRef: this.idLoteRef,
                idLoteRef2: this.idLoteRef2,
                nombreCentro: this.salida.centro,
                nombreRecibe: this.salida.recibe,
                cantCajas: this.salida.cant_cajas,
                codUsuario: 1
            };
            agregarSalidaACentro(salidaACentroGuardar).then(() => {
                alerta.toast("Guardado", "success");
                this.$router.push({
                    name: "salida"
                });
            }).catch((error) => {
                alerta.toast("Ha ocurrido un error en el guardado", "error")
                console.error(error);
            });
        },
        // validarPuntoDecimal(valor) {
        //     const regex = /^[0-9]*\.?[0-9]*$/;
        //     return regex.test(valor);
        // },
        // validarNumero(event) {
        //     const valor = event.target.value;
        //     if (!this.validarPuntoDecimal(valor)) {
        //         // Si el valor no es válido, puedes mostrar un mensaje de error o restringir la entrada
        //         this.recepcion.costoMadera = valor.slice(0, -1); // Elimina el último carácter
        //     }
        // },
        update() {
            updateCliente(this.cliente, this.cliente.uid).then(() => {
                alerta.toast("Guardado", "success");
                this.$router.push({
                    name: "clientes"
                });
            });
        },
        getCliente(id) {
            getById(id).then(res => (this.cliente = res));
        },
        regresar() {
            this.$router.go(-1);
        },
        cancelar() {
            this.$router.go(-1);
        },
        obtenerLote() {
            if (this.salida.cant_cajas > 0) {
                obtenerMPConMargen(this.salida.cant_cajas).then((res) => {
                    console.log("res ", res);
                    this.error = res == undefined ? "No hay existencia para esa cantidad " : null;
                    // this.salida.lote.pop();
                    // this.salida.lote.push({ id: res?.IDLOTEENC, nombre: res?.NOMBRELOTE });
                    this.idLoteRef = res.id_lote1;
                    this.idLoteRef2 = res.id_lote2;
                });
            }
        },
        validarCantidad(newValue) { // Recibe newValue como argumento
            if (newValue < 1 || newValue > 5000) {
                this.error = 'La cantidad de cajas debe estar entre 1 y 5000.';
            } else {
                this.error = null;
            }
        },
    },
    watch: {
        'salida.cant_cajas': function (newValue) {
            this.validarCantidad(newValue); // Pasa newValue a la función
        },
    }
};
</script>

<style>
.font-weight-bold {
    color: black;
}

#datepicker__value_ {
    margin-top: 2px;
    margin-bottom: 2px;
}
</style>

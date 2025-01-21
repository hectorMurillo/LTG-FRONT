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
                                        Recepcion: <span class="name mb-0 text-sm"></span>
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
                                                    Datos de la recepcion <i class="fas fa-boxes"></i>
                                                </h6>
                                                <div class="row">
                                                    <div class="col-sm-12 col-md-4">
                                                        <base-input alternative="" label="Folio / Carta"
                                                            placeholder="Folio / Carta"
                                                            input-classes="form-control-alternative"
                                                            v-model="recepcion.folio_carta" />
                                                    </div>
                                                    <div class="col-sm-12 col-md-4">
                                                        <label class="form-control-label"
                                                            for="cajero Externo">cajero Externo</label>
                                                        <select name="cajeroExterno" id="cajeroExterno"
                                                            class="form-control form-control-alternative"
                                                            aria-describedby="addon-right addon-left"
                                                            v-model="recepcion.idCajeroExterno">
                                                            <option value="SELECCIONA UNA OPCION" disabled selected>
                                                                SELECCIONA UNA OPCIÓN
                                                            </option>
                                                            <option v-for="cajeroExterno of cajerosExternos" :key="cajeroExterno.id"
                                                                :value="cajeroExterno.id">
                                                                {{ cajeroExterno.nombre }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div class="col-sm-12 col-md-4">
                                                        <base-input alternative="" label="Fecha de recepción"
                                                            placeholder="Fecha de recepción"
                                                            input-classes="form-control-alternative"
                                                            type="date"
                                                            v-model="recepcion.fechaRecepcion" />
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-12 col-md-4">
                                                        <base-input type="number" alternative="" label="Costo por caja"
                                                            placeholder="Costo por caja"
                                                            input-classes="form-control-alternative"
                                                            v-model="recepcion.costoXCaja" />
                                                    </div>
                                                    <div class="col-sm-12 col-md-4">
                                                        <base-input type="number" alternative="" label="No. Cajas"
                                                            placeholder="No. Cajas"
                                                            input-classes="form-control-alternative"
                                                            v-model="recepcion.numCajas" />
                                                    </div>
                                                    <div class="col-sm-12 col-md-4">
                                                        <base-input alternative="" label="Subtotal"
                                                            placeholder="Subtotal"
                                                            input-classes="form-control-alternative" v-model="subtotal"
                                                            disabled />
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12 text-right mt-3 mb-3" v-if="id == 0">
                                                        <base-button type="warning" icon="ni ni-fat-delete">
                                                            Limpiar
                                                        </base-button>
                                                        <base-button type="success" icon="ni ni-fat-add"
                                                            v-on:click="save">Guardar</base-button>
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
import storageSession from "../../../services/storage.js";
import cajerosExternos from "../../../components/Utils/cajerosExternos.js";
// import { listarSucursales } from "../../../services/sucursales";
import { getById, updateCliente } from "../../../services/clientes.js";
import { create } from "../../../services/recepciones.js";
import alerta from "../../../services/Alertas.js";
export default {
    name: "Recepcion-cajas",
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
            cajerosExternos: cajerosExternos,
            sucursales: "",
            pagina: 1,
            totalPaginas: 1,
            recepcion: {
                idRecepcion: null,
                fechaRecepcion: null,
                folio_carta: "",
                idCajeroExterno: "SELECCIONA UNA OPCION",
                idClienteExterno: 0,
                idProveedor: 0,
                subtotal: 0.00,
                costoMadera: 0.00,
                costoFlete: 0.00,
                costoDescarga: 0,
                cantCabezales: 0,
                cantidadTabletas: 0,
                numCajas: 0,
                codUsuario: 0,
                costoXCaja: 0
            }
        };
    },
    computed: {
        subtotal() {
            const costoXCaja = isNaN(parseFloat(this.recepcion.costoXCaja)) ? 0 : parseFloat(this.recepcion.costoXCaja); 
            const numCajas = isNaN(parseFloat(this.recepcion.numCajas)) ? 0 : parseFloat(this.recepcion.numCajas); 

            const totalCost = costoXCaja *  numCajas;
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
            let recepcionACrear = {
                idRecepcion: this.recepcion.idRecepcion,
                fechaRecepcion: this.recepcion.fechaRecepcion,
                folio_carta: this.recepcion.folio_carta,
                idProveedor: 0,
                idCajeroExterno: this.recepcion.idCajeroExterno,
                idClienteExterno: 0,
                subtotal: this.recepcion.subtotal,
                costoMadera: this.recepcion.costoMadera,
                costoFlete: this.recepcion.costoFlete,
                costoDescarga: this.recepcion.costoDescarga,
                cantCabezales: this.recepcion.cantCabezales,
                cantidadTabletas: this.recepcion.cantidadTabletas,
                numCajas: this.recepcion.numCajas,
                codUsuario: this.recepcion.codUsuario,
                costoXCaja: this.recepcion.costoXCaja,
                tipoLote: 5
            };
            create(recepcionACrear).then(() => {
                alerta.toast("Guardado", "success");
                this.$router.push({
                    name: "recepcion"
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
        }
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

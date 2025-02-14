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
                                                    Datos de la recepcion
                                                </h6>
                                                <div class="row">
                                                    <div class="col-sm-12 col-md-6">
                                                        <base-input alternative="" label="Fecha de recepción"
                                                            placeholder="Fecha de recepción"
                                                            input-classes="form-control-alternative" type="date"
                                                            v-model="recepcion.fechaRecepcion" />
                                                    </div>
                                                    <div class="col-sm-12 col-md-6">
                                                        <label class="form-control-label" for="proveedor">Salida
                                                            pertenece</label>
                                                        <select name="proveedor" id="proveedor"
                                                            class="form-control form-control-alternative"
                                                            aria-describedby="addon-right addon-left"
                                                            v-model="selectedSalidaACentro">
                                                            <option value="0" disabled selected>
                                                                SELECCIONA UNA OPCIÓN
                                                            </option>
                                                            <option v-for="salidaACentro of salidasACentro"
                                                                :key="salidaACentro.id" :value="salidaACentro.id">
                                                                {{ salidaACentro.value }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-12 col-md-6">
                                                        <base-input alternative="" label="Cantidad"
                                                            placeholder="Cantidad"
                                                            input-classes="form-control-alternative" v-model="recepcion.numCajas" />
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
import Proveedores from "../../../components/Utils/proveedores.js";
// import { listarSucursales } from "../../../services/sucursales";
import { getById, updateCliente } from "../../../services/clientes.js";
import { obtenerLotesFueraLocal } from "../../../services/inventarios.js";
import { create } from "../../../services/recepciones.js";
import alerta from "../../../services/Alertas.js";
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
            salidasACentro: [],
            selectedSalidaACentro: 0,
            sesion,
            proveedores: Proveedores,
            sucursales: "",
            pagina: 1,
            totalPaginas: 1,
            recepcion: {
                idRecepcion: null,
                fechaRecepcion: null,
                numCajas: 0
            }
        };
    },
    watch: {
        selectedSalidaACentro(newValue, oldValue) {
            // Este código se ejecutará cada vez que selectedSalidaACentro cambie
            console.log('Valor anterior:', oldValue);
            console.log('Valor actual:', newValue);
        }
    },
    mounted() {
        obtenerLotesFueraLocal().then(res => {
            res.forEach(element => {
                this.salidasACentro.push({ id: element.IDLOTEENC, value: `${element.NOMBRELOTE} ${element.NombreRecibeOEntrega} (${element.NombreCentro})` })
            });
        });
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
    methods: {
        save() {
            let recepcionACrear = {
                idRecepcion: this.recepcion.idRecepcion,
                idReferencia: this.selectedSalidaACentro,
                fechaRecepcion: this.recepcion.fechaRecepcion,
                numCajas: this.recepcion.numCajas,
                codUsuario: this.recepcion.codUsuario
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

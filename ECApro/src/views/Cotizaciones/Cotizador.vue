<template>
    <div>
        <Loader v-if="true"></Loader>
        <div ref="modal" class="modal fade" :class="{ 'show': showPago, 'd-block': active_pago }" tabindex="-1"
            role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Información de pago para el colaborador
                            <br>
                            <span style="color:red;text-transform: uppercase;">
                                {{ rowSelected.nombre }} </span>
                            <span>

                            </span>
                            <span style="color:red;text-transform: uppercase;">{{
                                rowSelected.aliasProveedor }}</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="togglePago">
                            <span aria-hidden="true">[X]</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <table class="table ">
                            <tr>
                                <td>Código de colaborador</td>
                                <td><b>{{ rowSelected.id }}</b></td>
                            </tr>
                            <tr>
                                <td>Nombre de colaborador</td>
                                <td><b>{{ rowSelected.nombre }}</b></td>
                            </tr>
                            <tr>
                                <td>Cantidad de cajas elaboradas</td>
                                <td><b>{{ rowSelected.cantTotalPorPeriodo }}</b></td>
                            </tr>
                            <tr>
                                <td>Total a pagar</td>
                                <td><b>{{ formattedPrice }} <span v-if="descuentoAColaborador > 0" style="color: red;">
                                            - {{ formattedPricedescuentoAColaborador }} = <span style="color:green">{{
                                                formattedTotalAPagar }}</span></span></b></td>
                            </tr>
                            <tr>
                                <td>Descuento</td>
                                <td>
                                    <base-input alternative="" placeholder="Monto descuento"
                                        input-classes="form-control-alternative" type="number"
                                        v-model="descuentoAColaborador" />
                                </td>
                            </tr>
                            <tr>
                                <td>Concepto descuento</td>
                                <td>
                                    <base-input alternative="" placeholder="Concepto descuento"
                                        input-classes="form-control-alternative" type="text"
                                        v-model="conceptoDescuento" />
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <!-- <span :class="classMsgPagoAbono()">{{ msgAbonoSubtotalRegistrado }}</span> -->
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <!-- <button type="button" :class="classBtnRevisado()" @click="saveChangesRevisado(rowSelected)"
                            :disabled="rowSelected.estatusPagoId == 'PAG' || esMayorADeuda">
                            <span v-if="rowSelected.estatusPagoId !== 'PAG' && esAbono">Registrar abono</span>
                            <span v-else-if="rowSelected.estatusPagoId !== 'PAG' && esPagoTotal">Registrar
                                pago</span>
                            <span v-else-if="rowSelected.estatusPagoId !== 'PAG' && esMayorADeuda">Registrar
                                pago</span>
                            <span v-else>Pagado</span>

                            <span v-if="rowSelected.Revisado">Revisado <i class="far fa-check-square"></i></span>
                        </button> -->
                        <button type="button" class="btn btn-sm btn-outline-primary" @click="savePago(rowSelected)">
                            Aplicar pago
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-danger" @click="togglePago">
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>

        

        <base-header type="info" class="pb-8 pt-3 pt-md-8">
            <!-- if want cards like dashboard -->
            <div class="row ml-1">
                <base-button v-on:click="irAHistorial()" v-if="!esHistorial" type="white">
                    Historial de conteo <i class="fas fa-boxes"></i>
                </base-button>
            </div>
        </base-header>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-12">
                    <card shadow type="secondary" class="mb-5">
                        <template>
                            <div class="row">
                                <div class="col-xl-12 col-sm-12">
                                    <label for="">{{ nombreComponente }} <i class="fas fa-box"></i></label>
                                    <div class="row">

                                        <div class="col-sm-6 col-md-6">
                                            <label class="form-control-label" for="proveedor">Desde</label>
                                            <base-input input-classes="form-control-alternative" type="date"
                                                v-model="fechaDesde" id="dateDesde" @change="obtenerFechasEntre()">
                                            </base-input>
                                        </div>
                                        <div class="col-sm-6 col-md-6">
                                            <label class="form-control-label" for="proveedor">Hasta</label>
                                            <base-input input-classes="form-control" type="date" v-model="fechaHasta"
                                                @change="obtenerFechasEntre()" disabled>
                                            </base-input>
                                        </div>
                                    </div>
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
                                                <th v-if="esHistorial">T. cajas</th>
                                                <th v-if="esHistorial">subtotal</th>
                                                <th v-if="esHistorial">descuento</th>
                                                <th v-if="esHistorial">total</th>
                                                <th v-if="esHistorial">Acciones</th>
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
                                                            :placeholder="row.nombre.split(' ')[0]"
                                                            v-if="!esHistorial" />
                                                        <base-input class="" type="number" name=""
                                                            :id="obtenerIdInputEntrada(row.id, fecha)"
                                                            :value="getCantidadByIdentificador(row.id + '_' + fecha)"
                                                            :placeholder="row.nombre.split(' ')[0]"
                                                            :disabled="esHistorial" v-if="esHistorial" />
                                                        <base-button iconOnly outline class="block" type="success"
                                                            size="md" @click="guardarConteo(row, fecha)"
                                                            v-if="!esHistorial && row.cantTotalPorPeriodo==0">
                                                            <i class="far fa-save"></i>
                                                        </base-button>
                                                        <!-- <pre>{{row}}</pre> -->
                                                    </div>
                                                </td>
                                                <td v-if="esHistorial">
                                                    {{ row.cantTotalPorPeriodo }}
                                                </td>
                                                <td v-if="esHistorial">
                                                    <span style="font-weight: bold; font-size: medium;">
                                                        {{ Math.round(row.totalAPagar) }}
                                                    </span>
                                                </td>
                                                <td v-if="esHistorial">
                                                    {{ row.monto_descuento }}
                                                </td>
                                                <td v-if="esHistorial">
                                                    {{ row.totalConDescuento }}
                                                </td>
                                                <td v-if="esHistorial">
                                                    <base-button outline class="block" type="info"
                                                        v-if="esHistorial && !row.pagada" size="sm">
                                                        <i class="fas fa-dollar-sign" @click="togglePago(row)"></i>
                                                    </base-button>
                                                    <base-button outline class="block" type="primary" v-else size="sm">
                                                        <i class="fas fa-download" @click="mandarAImprimir(row)"></i>
                                                    </base-button>
                                                    <a :href="base64PDFNomina" :download="'rptNomina_'+row.nombre.split(' ')[0]+'_'+randomId+'.pdf'" id="descargaRpt" style="display: none;"></a>
                                                </td>
                                            </template>
                                        </base-table>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import storageSession from "../../services/storage";
import Loader from "../../components/Loader/Loader.vue";
import Alertas from "../../services/Alertas";
import {
    listarConteosXFechas,
    agregarConteo,

} from "../../services/inventarios.js";
import {
    getCantidadxcolaborador,
    guardarRegistroNomina,
    generaPDFNomina

} from "../../services/colaboradores.js";
import alerta from "../../services/Alertas";
export default {
    components:{
        Loader
    },
    name: "cotizador",
    data() {
        let sesion = storageSession.getObject("sesion");
        return {
            isLoading:false,
            sesion,
            fechaDesde: "",
            fechaHasta: "",
            totalDiasDesde: 0,
            fechasEntre: [],
            // conteosGrales: [{ colaborador: 1, conteos: [{ "2024-12-23": 200 }] }],
            conteosGrales: [],
            colaboradores: [],
            idsInputs: [{ identificador: null, cantidad: 0 }],
            esHistorial: false,
            nombreComponente: "Conteo Nuevo",
            totales: [],
            rowSelected: {},
            descuentoAColaborador: 0,
            conceptoDescuento: "",
            active_pago: false,
            showPago: false,
            base64PDFNomina: "",
            randomId:0
        };
    },
    methods: {
        obtenerIdInput(id, fecha) {
            let identificadorCompuesto = `${id}_${fecha}`;
            return identificadorCompuesto;
        },
        guardarConteo(row, fecha) {
            let element = document.getElementById(`${row.id}_${fecha}`)
            let conteo = {
                "identificadorDiario": this.obtenerIdInput(row.id, fecha),
                "idUsuarioRegistra": 1,
                "cantidad": element.value
            };
            agregarConteo(conteo).then((res) => {
                if(res.status == 200){
                    alerta.toast("Agregado Correctamente", "success");
                    this.obtenerConteosFechas();
                }
            }).catch(e => {
                alerta.toast("ocurrió el siguiente error -> " + e, "danger");
            });
        },
        obtenerFechaDesdeHoy(diferencia = 0) {
            const fechaHoy = new Date();
            fechaHoy.setDate(fechaHoy.getDate() + diferencia);
            const dia = fechaHoy.getDate().toString().padStart(2, '0');
            const mes = (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
            const anio = fechaHoy.getFullYear();

            return `${anio}-${mes}-${dia}`;
        },
        formatearFecha(fecha) {
            const año = fecha.getFullYear();
            const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 al mes porque comienza en 0 (enero = 0)
            const dia = fecha.getDate().toString().padStart(2, '0');
            return `${año}-${mes}-${dia}`;
        },

        obtenerFechasEntre() {
            // Convertir las fechas a objetos Date
            if (this.esHistorial) {
                const { monday, sunday } = this.getWeekStartEnd();
                this.fechaDesde = this.formatearFecha(monday);
                this.fechaHasta = this.formatearFecha(sunday);
            }

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
            this.isLoading = true; // Mostrar indicador de carga
            listarConteosXFechas(this.fechaDesde, this.fechaHasta)
                .then(res => {
                    res.forEach(x => {
                        setTimeout(() => {
                            const inputIndex = this.idsInputs.findIndex(idInp => x.identificadorDiario === idInp.identificador);
                            if (inputIndex !== -1) {
                                this.idsInputs[inputIndex].cantidad = x.cantidad || 0;
                            } else {
                                console.error('Elemento no encontrado:', x.identificadorDiario);
                            }
                        }, 1000);
                    });
                    this.isLoading = false;
                })
                .catch(error => {
                    console.error('Error al obtener conteos:', error.message);
                    this.error = 'Ocurrió un error al cargar los datos.';
                    this.isLoading = false;
                });
        },
        getWeekStartEnd() {
            // Obtener la fecha actual
            const today = new Date();

            // Obtener el día de la semana (0: Domingo, 1: Lunes, ...)
            const dayOfWeek = today.getDay() + 1;

            // Calcular el inicio de la semana (lunes)
            const monday = new Date(today);

            monday.setDate(today.getDate() - dayOfWeek + 1);

            // Calcular el final de la semana (domingo)
            const sunday = new Date(monday);
            sunday.setDate(monday.getDate() + 6);

            return {
                monday,
                sunday
            };
        },

        irAHistorial() {
            //convertir a historial
            if (!this.esHistorial) {
                this.$router.push("../conteo/historial");
            }
        },
        obtenerInfoTablaColaboradores() {
            this.colaboradores = [];
            getCantidadxcolaborador(this.fechaDesde, this.fechaHasta, 0).then(res => {
                let result = res;
                result.forEach(element => {
                    this.colaboradores.push({
                        id: element.idColaboradores,
                        nombre: element.alias,
                        estatus: element.estatus,
                        cantTotalPorPeriodo: element.cantTotalPorPeriodo,
                        totalAPagar: element.totalAPagar,
                        pagada: element.pagada,
                        monto_descuento: element.monto_descuento,
                        totalConDescuento: element.totalConDescuento
                    })
                });
            })
        },
        togglePago(rowSelected) {
            this.rowSelected = rowSelected;
            this.descuentoAColaborador = 0;
            const body = document.querySelector("body");
            this.active_pago = !this.active_pago;
            this.imgSelected = "";
            // this.showPago = !this.showPago;
            this.active_pago
                ? body.classList.add("modal-open")
                : body.classList.remove("modal-open");
            setTimeout(() => (this.showPago = !this.showPago), 10);
        },
        savePago(row) {

            let pago_nomina_registrar = {
                fechaInicio: this.fechaDesde,
                fechaFin: this.fechaHasta,
                codColaborador: row.id,
                cantCajasAPagar: row.cantTotalPorPeriodo,
                pagoPorCaja: 0,
                totalAPagar: Math.round(row.totalAPagar),
                idUsuarioRegistra: 1,
                pagada: false,
                monto_descuento: this.descuentoAColaborador,
                descripcionDescuento: this.conceptoDescuento
            }
            guardarRegistroNomina(pago_nomina_registrar).then((r) => {
                if (r.status == 200) {
                    alerta.toast("Nómina guardada con éxito", "success");
                    this.showPago = false;
                    this.active_pago = false;
                    this.obtenerInfoTablaColaboradores();
                } else {
                    alerta.toast("Error: ", r.statusText)
                }
            })
        },
        mandarAImprimir(rowSelected) {
            this.randomId = (Math.round(Math.random()+1*100*Math.random()+1*623));
            generaPDFNomina(this.fechaDesde, this.fechaHasta, rowSelected?.id).then((res) => {
                const base64EncodedPDF = res;
                // const newWindow = window.open();
                const pdfUrl = "data:application/pdf;base64," + base64EncodedPDF;
                this.base64PDFNomina = pdfUrl;
                setTimeout(() => {
                    const enlace = document.getElementById('descargaRpt');
                    enlace.click();
                }, 1000);
            });
        }
    },
    created() {
        this.fechaDesde = this.obtenerFechaDesdeHoy(0);
        this.fechaHasta = this.obtenerFechaDesdeHoy(0);
        this.fechasEntre = this.obtenerFechasEntre();
    },
    mounted() {
        this.obtenerConteosFechas();
        this.obtenerInfoTablaColaboradores();
    },
    computed: {
        obtenerIdInputEntrada() {
            return (rowId, fecha) => {
                if (!this.idsInputs.some(elemento => elemento.identificador == `${rowId}_${fecha}`)) {
                    this.idsInputs.push({ "identificador": `${rowId}_${fecha}`, "cantidad": 0 });
                }
                return `${rowId}_${fecha}`;
            };
        },
        obtenerValor() {
            return (rowId, fecha) => {
                return this.idsInputs.find(`${rowId}_${fecha}`).cantidad;
            }
        },
        getCantidadByIdentificador() {
            return (identificador) => {
                const elemento = this.idsInputs.find(item => item.identificador === identificador);
                return elemento ? elemento.cantidad : 0;
            }
        },
        formattedPrice() {
            return Math.round(this.rowSelected?.totalAPagar)?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 });
        },
        formattedPricedescuentoAColaborador() {
            return Math.round(this.descuentoAColaborador)?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 });
        },
        formattedTotalAPagar() {
            return Math.round(this.rowSelected.totalAPagar - this.descuentoAColaborador)?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 });
        }
    },
    watch: {
        $route(to) {
            if (to.path == "/conteo") {
                this.nombreComponente = "Nuevo conteo";
                this.esHistorial = false;
                this.totalDiasDesde = 0;
            } else if (to.path == "/conteo/historial") {
                this.nombreComponente = "Historial de conteo";
                this.esHistorial = true;
                this.totalDiasDesde = -6;
                this.colaboradores = [];
            }
            this.fechaDesde = this.obtenerFechaDesdeHoy(this.totalDiasDesde);
            this.fechaHasta = this.obtenerFechaDesdeHoy(0);
            this.fechasEntre = this.obtenerFechasEntre();
            this.obtenerInfoTablaColaboradores();
            this.obtenerConteosFechas();
        }
    },

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

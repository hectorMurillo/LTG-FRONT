<template>
    <div class="card">
        <div class="card-header border-0">
            <div class="row align-items-center">
                <div class="col">
                    <h3 class="mb-0">Ultimos lotes recibidos</h3>
                </div>
                <div class="col text-right">
                    <h3>Por elaborar</h3> <p>{{ sumaTotalPorElaborar }}</p>
                    <!-- <a href="#!" class="btn btn-sm btn-primary">Ver más</a> -->
                </div>
            </div>
        </div>

        <div class="table-responsive">
            <base-table thead-classes="thead-light" :data="ultimosLotes">
                <template slot="columns">
                    <th># Lote</th>
                    <th>Proveedor</th>
                    <th>Fecha de recepción</th>
                    <th>Elaborados</th>
                    <th>% Elaborados</th>
                    <th>Por Elaborar</th>
                </template>

                <template slot-scope="{row}">
                    <td>
                        {{ row.IDLOTE }}
                    </td>
                    <th scope="row">
                        {{ row.proveedor }}
                    </th>
                    <td>
                        {{ row.FECHAINICIO }}
                    </td>
                    <td>
                        {{ row.ELABORADOS }}
                    </td>
                    <td>
                        {{ Math.round(row.porcentaje_elaborados) }}%
                    </td>
                    <td>
                        <!-- <i class="text-success mr-3"
                            :class="row.bounceRateDirection === 'up' ? 'text-success fas fa-arrow-up' : 'text-danger fas fa-arrow-down'">
                        </i> -->
                        {{ row.PORELABORAR }}
                    </td>
                </template>

            </base-table>
        </div>

    </div>
</template>
<script>

import {
    listadoUltimosLotesRecibidos
} from "../../services/inventarios";

export default {
    name: 'cajas-x-elaborar',
    data() {
        return {
            ultimosLotes: [
                // {
                //     page: 'Victor Angulo',
                //     visitors: '35',
                //     unique: '28',
                //     bounceRate: '46,53%',
                //     bounceRateDirection: 'up'
                // },
                // {
                //     page: 'Paola Snachez',
                //     visitors: '15',
                //     unique: '34',
                //     bounceRate: '46,53%',
                //     bounceRateDirection: 'down'
                // },
                // {
                //     page: 'Norma Sandoval',
                //     visitors: '24',
                //     unique: '03',
                //     bounceRate: '36,49%',
                //     bounceRateDirection: 'down'
                // },
                // {
                //     page: 'Hector Estrada',
                //     visitors: '27',
                //     unique: '24',
                //     bounceRate: '50,87%',
                //     bounceRateDirection: 'up'
                // },
                // {
                //     page: 'Antonia Lizarraga',
                //     visitors: '08',
                //     unique: '12',
                //     bounceRate: '46,53%',
                //     bounceRateDirection: 'down'
                // }
            ],
            sumaTotalPorElaborar : 0
        }
    },
    mounted() {
        this.getUltimosLotesRecibidos();
    },
    methods: {
        getUltimosLotesRecibidos(){
            listadoUltimosLotesRecibidos().then((res) => {
                this.ultimosLotes = res;
                this.ultimosLotes.forEach(element => {
                    this.sumaTotalPorElaborar +=  element.PORELABORAR;
                }); 
            });
        }
    },
    // computed: {
    //     formattedPrice() {
    //         return this.sumaTotalPorElaborar?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 });
    //     }
    // }
}
</script>
<style></style>

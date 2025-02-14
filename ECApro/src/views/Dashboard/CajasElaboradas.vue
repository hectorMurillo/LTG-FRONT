<template>
    <div class="card">
        <div class="card-header border-0">
            <div class="row align-items-center">
                <div class="col">
                    <h3 class="mb-0">Lotes de cajas recibidas</h3>
                </div>
                <div class="col text-right">
                    <h3>Disponibilidad</h3> <p>{{ sumaTotalElaborados }}</p>
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
                    <td :class="row.PORELABORAR == 0 ? 'tachado' : '.sinStyle'">
                        {{ row.NOMBRELOTE }}
                    </td>
                    <th scope="row" :class="row.PORELABORAR == 0 ? 'tachado' : '.sinStyle'">
                        {{ row.proveedor }}
                    </th>
                    <td :class="row.PORELABORAR == 0 ? 'tachado' : '.sinStyle'">
                        {{ row.FECHAINICIO }}
                    </td>
                    <td :class="row.PORELABORAR == 0 ? 'tachado' : '.sinStyle'">
                        {{ row.ELABORADOS }}
                    </td>
                    <td :style="row.PORELABORAR == 0 ? 'color:green' : 'color:black'">
                        {{ Math.round(row.porcentaje_elaborados) }}%
                    </td>
                    <td :class="row.PORELABORAR == 0 ? 'tachado' : '.sinStyle'">
                        {{ row.PORELABORAR }}
                    </td>
                </template>

            </base-table>
        </div>

    </div>
</template>
<script>

import {
    listadoUltimosLotesCajasRecibidos
} from "../../services/inventarios";

export default {
    name: 'cajas-elaboradas',
    data() {
        return {
            ultimosLotes: [
            
            ],
            sumaTotalElaborados : 0
        }
    },
    mounted() {
        this.getUltimosLotesRecibidos();
    },
    methods: {
        getUltimosLotesRecibidos(){
            listadoUltimosLotesCajasRecibidos().then((res) => {
                this.ultimosLotes = res;
                this.ultimosLotes.forEach(element => {
                    console.log("SE SALE AQUI ",element)
                    this.sumaTotalElaborados += element.ELABORADOS;
                });
            });
        }
    },
}
</script>
<style scoped>
.tachado {
  text-decoration: line-through;
}
.sinStyle {
  text-decoration: none;
}
</style>

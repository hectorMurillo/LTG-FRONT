<template>
    <div class="card">
        <div class="card-header border-0">
            <div class="row align-items-center">
                <div class="col">
                    <h3 class="mb-0">Asesores</h3>
                </div>
                <div class="col text-right">
                    <a href="#!" class="btn btn-sm btn-primary">Ver más</a>
                </div>
            </div>
        </div>

        <div class="table-responsive">
            <base-table thead-classes="thead-light" :data="tableData">
                <template slot="columns">
                    <th>Nombre</th>
                    <th>Ventas</th>
                    <th>ID Usuario</th>
                    <th>Rendimiento</th>
                </template>

                <template slot-scope="{row}">
                    <th scope="row">
                        {{ row.page }}
                    </th>
                    <td>
                        {{ row.visitors }}
                    </td>
                    <td>
                        {{ row.unique }}
                    </td>
                    <td>
                        <i class="text-success mr-3"
                            :class="row.bounceRateDirection === 'up' ? 'text-success fas fa-arrow-up' : 'text-danger fas fa-arrow-down'">
                        </i>
                        {{ row.bounceRate }}
                    </td>
                </template>

            </base-table>
        </div>

    </div>
</template>
<script>
export default {
    name: 'page-visits-table',
    data() {
        return {
            tableData: [
                {
                    page: 'Victor Angulo',
                    visitors: '35',
                    unique: '28',
                    bounceRate: '46,53%',
                    bounceRateDirection: 'up'
                },
                {
                    page: 'Paola Snachez',
                    visitors: '15',
                    unique: '34',
                    bounceRate: '46,53%',
                    bounceRateDirection: 'down'
                },
                {
                    page: 'Norma Sandoval',
                    visitors: '24',
                    unique: '03',
                    bounceRate: '36,49%',
                    bounceRateDirection: 'down'
                },
                {
                    page: 'Hector Estrada',
                    visitors: '27',
                    unique: '24',
                    bounceRate: '50,87%',
                    bounceRateDirection: 'up'
                },
                {
                    page: 'Antonia Lizarraga',
                    visitors: '08',
                    unique: '12',
                    bounceRate: '46,53%',
                    bounceRateDirection: 'down'
                }
            ]
        }
    }
}
</script>
<style></style>

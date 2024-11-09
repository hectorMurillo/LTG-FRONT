<template>
  <div class="table-responsive" style="height: 45vh; overflow-y: auto;">
    <base-table
      class="table align-items-center table-flush"
      tbody-classes="list"
      :data="venta"
    >
      <template slot="columns">
        <th></th>
        <th>Nombre</th>
        <th>Cantidad</th>
        <th>Precio</th>
        <th>Subtotal</th>
        <th></th>
      </template>

      <template slot-scope="{ row }">
        <td class="budget">
          {{ row.id }}
        </td>
        <th scope="row">
          <div class="media align-items-center">
            <div class="media-body">
              <span class="name mb-0 text-sm">
                {{ row.nombreProducto }}
              </span>
            </div>
          </div>
        </th>
        <td class="budget">
          {{ row.cantidadProducto }}
        </td>

        <td class="budget">{{ row.precioProducto | currency }}</td>

        <td class="budget">{{ row.totalRow | currency }}</td>
        <td class="budget">
          <div class="row">
            <div class="col-6 cursor" v-on:click="eliminar(row)">
              <i class="fas fa-minus-circle text-red"></i>
            </div>
          </div>
        </td>
      </template>
    </base-table>
  </div>
</template>
<script>
export default {
  name: "detalleVenta",
  props: {
    venta: {
      type: Array
    }
  },
  data() {
    return {

    }
  },
  methods: {
    sumaUno(id) {
      console.log(id);
    },
    eliminar(row){
      let index = this.venta.indexOf(row)
      this.$parent.$parent.eliminaUno(index);
    }
  }
};
</script>
<style>
.cursor {
  cursor: pointer;
}
</style>

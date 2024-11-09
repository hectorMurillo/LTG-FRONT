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
          <base-input
            placeholder="Nombre"
            input-classes="form-control-alternative"
            type="number"
            v-model="row.cantidadProducto"
            @change="sumaUno(row.id, row.cantidadProducto, row.precioProducto)"
          />
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
  name: "detalleCotizacion",
  props: {
    venta: {
      type: Array
    }
  },
  data() {
    return {
      subTotal: 0
    };
  },
  methods: {
    sumaUno(id, cantidad, precio) {
      this.subTotal = cantidad * precio;
      for (let i = 0; i < this.venta.length; i++) {
        if (this.venta[i].id == id) {
          let ventaNueva = {
            id: this.venta[i].id,
            nombreProducto: this.venta[i].nombreProducto,
            cantidadProducto: this.venta[i].cantidadProducto,
            precioProducto: this.venta[i].precioProducto,
            totalRow: this.subTotal
          };
          this.venta.push(ventaNueva);
          this.$parent.$parent.eliminaUno(this.venta[i]);
          break;
        }
      }
      this.$parent.$parent.getTotales();
    },
    eliminar(row) {
      let index = this.venta.indexOf(row);
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

<template>
  <div>
    <base-header type="gradient-green" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- if want cards like dashboard -->
      <div class="row"></div>
    </base-header>
    <div class="container mt--7">
      <div class="row">
        <div class="col-md-12">
          <div class="card shadow">
            <div class="card-header border-0 mb-3">
              <div class="row container">
                <div class="col-12 col-md-5 text-left">
                  <h3 class="mb-0">Listado de Usuarios</h3>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-md-5">
                  <div class="mt-3">Busqueda:</div>
                  <base-input
                    placeholder="Busqueda"
                    addon-right-icon="fa fa-search"
                    v-upper-case
                    v-model="buscando"
                    v-on:keyup="buscar()"
                  />
                </div>
                <div class="col-12 col-md-3 mt-4">
                  <div class="mt-3"></div>
                  <base-button v-on:click="crearCliente()" type="success"
                    >Agregar</base-button
                  >
                </div>
              </div>
            </div>
            <div class="table-responsive table-striped table-hover">
              <base-table
                class="table align-items-center table-flush"
                tbody-classes="list"
                :data="usuarios"
              >
                <template slot="columns">
                  <th scope="col">Usuario</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Status</th>
                  <!-- <th scope="col">ID</th> -->
                  <th scope="col">Opciones</th>
                </template>
                <template slot-scope="{ row }">
                  <th scope="row">
                    <div class="media align-items-center">
                      <div class="media-body">
                        <span class="name mb-0 text-sm">
                          {{ row.name }}
                        </span>
                      </div>
                    </div>
                  </th>
                  <td class="budget">
                    {{ row.email }}
                  </td>

                  <td class="budget">
                    {{ row.status }}
                  </td>

                  <!-- <td class="budget">
                    {{ row.uid }}
                  </td> -->

                  <td class="text-left">
                    <b-dropdown
                      size="sm"
                      toggle-class="text-decoration-none"
                      block
                      variant="secondary"
                      no-caret
                    >
                      <b-dropdown-item v-on:click="editar(row.uid)"
                        ><i class="ni ni-ruler-pencil"></i
                        >Editar</b-dropdown-item
                      >

                      <b-dropdown-item
                        v-if="row.status == 'ACTIVO'"
                        v-on:click="cambioStatus(row.uid, false)"
                        ><i class="ni ni-fat-remove"></i
                        >Desactivar</b-dropdown-item
                      >

                      <b-dropdown-item
                        v-if="row.status == 'INACTIVO'"
                        v-on:click="cambioStatus(row.uid, true)"
                        ><i class="ni ni-check-bold"></i
                        >Activar</b-dropdown-item
                      >
                    </b-dropdown>
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
import { listar, activar } from "../../services/usuarios";
import { buscarByNombre } from "../../services/clientes";
import alerta from "../../services/Alertas";
export default {
  name: "usuarios",

  data() {
    return {
      buscando: "",
      usuarios: [],
      pagina: 1,
      totalPaginas: 1
    };
  },
  methods: {
    crearCliente() {
      this.$router.push({
        name: "usuariosEditar"
      });
    },
    editar(id) {
      this.$router.push({
        name: "usuariosEditar",
        params: { id: id }
      });
    },
    cambioStatus(id, tipo) {
      if (tipo == true) {
        let status = {
          status: "ACTIVO"
        };
        activar(status, id).then(() => {
          alerta.toast("Guardado", "success");
          this.listado();
        });
      } else {
        let status = {
          status: "INACTIVO"
        };
        activar(status, id).then(() => {
          alerta.toast("Guardado", "success");
          this.listado();
        });
      }
    },
    listado() {
      listar().then(res => {
        this.usuarios = res.usuarios;
      });
    },
    buscar() {
      if (this.buscando == "") {
        this.listado();
      } else {
        this.usuarios = [];
        buscarByNombre(this.buscando).then(res => {
          this.usuarios = res.usuarios;
        });
      }
    }
  },
  mounted() {
    this.listado();
  }
};
</script>

<style>
.page-item.active .page-link {
  background-color: #2dce89;
}
</style>

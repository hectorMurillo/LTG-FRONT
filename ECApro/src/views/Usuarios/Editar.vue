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
                  <h3 v-if="usuarioNuevo" class="mb-0">Crear Ususarios</h3>
                  <h3 v-if="!usuarioNuevo" class="mb-0">Editar Ususarios</h3>
                </div>
              </div>
            </div>
            <div class="table-responsive table-striped table-hover">
              <form autocomplete="off">
                <div class="container">
                  <div class="row">
                    <div class="col-sm-12 col-md-6">
                      <base-input
                        alternative=""
                        label="Nombre"
                        placeholder="Nombre"
                        input-classes="form-control-alternative"
                        v-model="usuario.name"
                        v-upper-case
                        autocomplete="new-password"
                      />
                    </div>
                    <div class="col-sm-12 col-md-6">
                      <base-input
                        alternative=""
                        label="Correo"
                        placeholder="ejemplo@email.com"
                        input-classes="form-control-alternative"
                        v-model="usuario.email"
                        v-upper-case
                        autocomplete="new-password"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6">
                      <base-input
                        type="password"
                        alternative=""
                        label="Contraseña"
                        placeholder="Contraseña"
                        input-classes="form-control-alternative"
                        v-model="usuario.password"
                        v-upper-case
                        @keyup="checkPassword()"
                        autocomplete="new-password"
                      />
                    </div>
                    <div class="col-sm-12 col-md-6">
                      <base-input
                        type="password"
                        alternative=""
                        label="Confirmar Contraseña"
                        placeholder="Confirmar Contraseña"
                        input-classes="form-control-alternative"
                        v-model="passwordCheck"
                        :valid="check == true"
                        v-upper-case
                        @keyup="checkPassword()"
                        autocomplete="new-password"
                      />
                    </div>
                  </div>
                  <div class="row mb-1">
                    <div class="col-sm-12 col-md-6">
                      <label class="form-control-label" for="estados"
                        >Sucursal</label
                      >
                      <select
                        name="estados"
                        id="estados"
                        class="form-control form-control-alternative"
                        aria-describedby="addon-right addon-left"
                        v-model="usuario.sucursal"
                      >
                        <option value="SELECCIONA" disabled selected>
                          SELECCIONA UNA OPCIÓN
                        </option>
                        <option
                          :value="sucursal.uid"
                          v-for="sucursal of sucursales"
                          :key="sucursal.uid"
                        >
                          {{ sucursal.nombre }}
                        </option>
                      </select>
                    </div>
                    <div class="col-sm-12 col-md-6">
                      <label class="form-control-label" for="estados"
                        >Perfil</label
                      >
                      <select
                        name="estados"
                        id="estados"
                        class="form-control form-control-alternative"
                        aria-describedby="addon-right addon-left"
                        v-model="usuario.perfil"
                      >
                        <option value="SELECCIONA" disabled selected>
                          SELECCIONA UNA OPCIÓN
                        </option>
                        <option
                          :value="perfil.uid"
                          v-for="perfil of perfiles"
                          :key="perfil.uid"
                        >
                          {{ perfil.nombre }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="row mb-1">
                    <div class="col-sm-12  mt-4 text-right" v-if="usuarioNuevo">
                      <base-button
                        type="success"
                        icon="ni ni-fat-add"
                        @click="crearUsuario"
                        >Guardar</base-button
                      >
                    </div>
                    <div
                      class="col-sm-12  mt-4 text-right"
                      v-if="!usuarioNuevo"
                    >
                      <base-button
                        type="success"
                        icon="ni ni-fat-add"
                        v-on:click="update"
                        >Actualizar</base-button
                      >
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="card-footer d-flex mt-4 justify-content-end"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { crear, getById, actualizar } from "../../services/usuarios";
import { listarSucursales } from "../../services/sucursales";
import { listarPerfiles } from "../../services/perfiles";
import { alerta } from "../../services/Alertas";
export default {
  name: "usuariosEditar",
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      usuarioNuevo: true,
      usuario: {
        name: "",
        email: "",
        password: "",
        sucursal: "SELECCIONA",
        perfile: "SELECCIONA"
      },
      passwordCheck: "",
      check: false,
      sucursales: [],
      perfiles: []
    };
  },
  created() {
    this.getSucursales();
    this.getPerfiles();
    if (this.id != "") {
      this.usuarioNuevo = false;
      this.getUsuario();
    }
  },
  methods: {
    checkPassword() {
      if (this.usuario.password != "") {
        if (this.usuario.password == this.passwordCheck) {
          this.check = true;
        } else {
          this.check = false;
        }
      }
    },
    getUsuario() {
      getById(this.id).then(res => {
        this.usuario = res.usuarios;
      });
    },
    getSucursales() {
      listarSucursales().then(res => {
        this.sucursales = res.sucursales;
      });
    },
    getPerfiles() {
      listarPerfiles().then(res => {
        this.perfiles = res.perfiles;
      });
    },
    crearUsuario() {
      crear(this.usuario).then(() => {
        alerta.toast("Guardado", "success");
      });
    },
    update() {
      actualizar(this.usuario.uid, this.usuario).then(() => {
        alerta.toast("Guardado", "success");
      });
    }
  }
};
</script>

<style></style>

<template>
  <div>
    <base-header type="gradient-red" class="pb-6 pb-8 pt-5 pt-md-8">
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
                    <base-button
                      iconOnly
                      outline
                      rounded
                      type="success"
                      size="sm"
                      v-on:click="regresar"
                      icon="ni ni-bold-left"
                      v-b-popover.hover.top
                      title="Regresar"
                    ></base-button>
                    Candidato: <span class="name mb-0 text-sm"></span>
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
                      <h6 class="heading-small text-muted mb-2">
                        Datos del Candidato
                      </h6>

                      <div class="col-12 col-md-12">
                        <div class="row">
                          <div class="col-sm-12 col-md-6">
                            <base-input
                              alternative=""
                              label="Nombre"
                              placeholder="Nombre"
                              input-classes="form-control-alternative"
                              v-model="cliente.nombre"
                              v-upper-case
                            />
                          </div>
                          <div class="col-sm-12 col-md-6">
                            <base-input
                              alternative=""
                              label="Apellido Paterno"
                              placeholder="Apellido Paterno"
                              input-classes="form-control-alternative"
                              v-model="cliente.apellidoP"
                              v-upper-case
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12 col-md-6">
                            <base-input
                              alternative=""
                              label="Apellido Materno"
                              placeholder="Apellido Materno"
                              input-classes="form-control-alternative"
                              v-model="cliente.apellidoS"
                              v-upper-case
                            />
                          </div>
                          <div class="col-sm-12 col-md-6">
                            <label
                              style="margin-bottom: 0"
                              for="datepicker"
                              class="form-control-label mb-2"
                              >Fecha de Nacimiento</label
                            >
                            <b-form-datepicker
                              size="sm"
                              id="datepicker"
                              placeholder="Fecha de Nacimiento"
                              label-help="Selecciona la fecha con el puntero."
                              class="mb-2"
                              v-model="cliente.fechaNacimiento"
                              :date-format-options="{
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric'
                              }"
                            >
                            </b-form-datepicker>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12 col-md-4">
                            <base-input
                              alternative=""
                              label="RFC"
                              placeholder="RFC"
                              input-classes="form-control-alternative"
                              v-model="cliente.rfc"
                              v-upper-case
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12 col-md-6">
                            <base-input
                              alternative=""
                              label="Calle"
                              placeholder="Calle"
                              input-classes="form-control-alternative"
                              v-model="cliente.calle"
                              v-upper-case
                            />
                          </div>
                          <div class="col-sm-12 col-md-6">
                            <base-input
                              alternative=""
                              label="Colonia"
                              placeholder="Colonia"
                              input-classes="form-control-alternative"
                              v-model="cliente.colonia"
                              v-upper-case
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12 col-md-4">
                            <base-input
                              alternative=""
                              label="Numero Exterior"
                              placeholder="Numero Exterior"
                              input-classes="form-control-alternative"
                              v-model="cliente.numExterior"
                            />
                          </div>
                          <div class="col-sm-12 col-md-4">
                            <base-input
                              alternative=""
                              label="Numero Interior"
                              placeholder="Numero Interior"
                              input-classes="form-control-alternative"
                              v-model="cliente.numInterior"
                              v-upper-case
                            />
                          </div>
                          <div class="col-sm-12 col-md-4">
                            <base-input
                              alternative=" "
                              label="Codigo Postal"
                              placeholder="Codigo Postal"
                              input-classes="form-control-alternative"
                              v-model="cliente.codigoPostal"
                              v-upper-case
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12 col-md-6">
                            <label class="form-control-label" for="estados"
                              >Estado</label
                            >
                            <select
                              name="estados"
                              id="estados"
                              class="form-control form-control-alternative"
                              aria-describedby="addon-right addon-left"
                              v-model="cliente.estado"
                            >
                              <option
                                value="SELECCIONA UNA OPCION"
                                disabled
                                selected
                              >
                                SELECCIONA UNA OPCIÓN
                              </option>
                              <option
                                v-for="estado of estados"
                                :key="estado.id"
                              >
                                {{ estado.nombre }}
                              </option>
                            </select>
                          </div>
                          <div class="col-sm-12 col-md-6">
                            <base-input
                              alternative=""
                              label="Ciudad"
                              placeholder="Ciudad"
                              input-classes="form-control-alternative"
                              v-model="cliente.ciudad"
                              v-upper-case
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12 col-md-12">
                            <base-input
                              alternative=""
                              label="Correo"
                              placeholder="Correo"
                              input-classes="form-control-alternative"
                              v-model="cliente.email"
                              v-upper-case
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12 col-md-6">
                            <base-input
                              alternative=""
                              label="Celular"
                              placeholder="Celular"
                              input-classes="form-control-alternative"
                              v-model="cliente.celular"
                              v-upper-case
                            />
                          </div>
                          <div class="col-sm-12 col-md-6">
                            <label class="form-control-label" for="estados"
                              >Sucursal</label
                            >
                            <select
                              name="suscursal"
                              id="suscursal"
                              class="form-control form-control-alternative"
                              aria-describedby="addon-right addon-left"
                              v-model="cliente.uidSucursal._id"
                            >
                              <option value="SELECCIONA" disabled selected>
                                SELECCIONA UNA OPCIÓN
                              </option>
                              <option
                                :value="sucursal.uid"
                                v-for="sucursal in sucursales"
                                :key="sucursal.uid"
                              >
                                {{ sucursal.nombre }}
                              </option>
                            </select>
                          </div>
                          <div class="col-12 text-right mt-3" v-if="id == 0">
                            <base-button
                              type="success"
                              icon="ni ni-fat-add"
                              v-on:click="save"
                              >Guardar</base-button
                            >
                          </div>
                          <div class="col-12 text-right mt-3" v-if="id != 0">
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
                  </template>
                </card>
              </div>
            </div>
            <div
              class="card-footer d-flex justify-content-end marginBotton"
              :class="''"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storageSession from "../../services/storage.js";
import Estados from "../../components/Utils/estados";
import { listarSucursales } from "../../services/sucursales";
import { getById, updateCliente } from "../../services/clientes";
import { create } from "../../services/clientes";
import alerta from "../../services/Alertas";
export default {
  name: "agregar-cliente",
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
      estados: Estados,
      sucursales: "",
      pagina: 1,
      totalPaginas: 1
    };
  },
  created() {
    this.getSucursales();
    if (this.id != "") {
      getById(this.id).then(res => {
        this.cliente = res.clientes;
      });
    }
  },
  methods: {
    save() {
      let clienteCrear = {
        apellidoP: this.cliente.apellidoP,
        apellidoS: this.cliente.apellidoS,
        calle: this.cliente.calle,
        celular: this.cliente.celular,
        ciudad: this.cliente.ciudad,
        codigoPostal: this.cliente.codigoPostal,
        colonia: this.cliente.colonia,
        email: this.cliente.email,
        estado: this.cliente.estado,
        fechaNacimiento: this.cliente.fechaNacimiento,
        nombre: this.cliente.nombre,
        numExterior: this.cliente.numExterior,
        numInterior: this.cliente.numInterior,
        rfc: this.cliente.rfc,
        uidSucursal: this.cliente.uidSucursal._id,
        uidUsuario: this.sesion.uid
      };
      create(clienteCrear).then(() => {
        alerta.toast("Guardado", "success");
        this.$router.push({
          name: "clientes"
        });
      }).catch((error)=>{
        alerta.toast("Ha ocurrido un error en el guardado", "error")
        console.error(error);
      });
    },
    update() {
      updateCliente(this.cliente, this.cliente.uid).then(() => {
        alerta.toast("Guardado", "success");
        this.$router.push({
          name: "clientes"
        });
      });
    },
    getSucursales() {
      listarSucursales().then(res => {
        this.sucursales = res.sucursales;
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
  color: gray;
}
#datepicker__value_ {
  margin-top: 2px;
  margin-bottom: 2px;
}
</style>

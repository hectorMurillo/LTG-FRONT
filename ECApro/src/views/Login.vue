<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-dark shadow border-0">
        <div class="card-header bg-transparent pb-5">
          <div class="btn-wrapper text-center">
            <router-link slot="brand" class="navbar-brand" to="/">
              <img class="logo" src="img/brand/todoChiloLogo.png" />
            </router-link>
          </div>
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-2">
            <small>Ingresa tus datos para iniciar sesion</small>
          </div>
          <form role="form" @submit.prevent="logeo">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Usuario"
              addon-left-icon="ni ni-single-02"
              v-model="model.user"
            >
            </base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Contraseña"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password"
            >
            </base-input>

            <div class="text-center">
              <base-button type="outline-success" :nativeType="'submit'" class="my-4"
                >Entrar</base-button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { login, refreshToken } from "@/services/login";
import alerta from "../services/Alertas";
export default {
  name: "login",
  data() {
    return {
      model: {
        user: "",
        password: ""
      }
    };
  },
  methods: {
    logeo() {
      if (this.model.user == "") {
        alerta.toast("Campo usuario obligatorio", "warning");
      } else {
        if (this.model.password == "") {
          alerta.toast("Campo contraseña obligatorio", "warning");
        } else {
          login(this.model.user, this.model.password)
            .then(() => {
              alerta.toast(
                "Bienvenid@ " + sessionStorage.getItem("nombre"),
                "success"
              );
              this.$router.push("/dashboard");
            })
            .catch(() => {
              alerta.toast(`Algo salió mal`, "error");
            });
        }
      }
    },
    refreshTokens() {
      refreshToken()
        .then(() => {})
        .catch(() => {
          alerta.toast("Algo salió mal", "error");
        });
    }
  }
};
</script>
<style>
.logo {
  width: 250px;
}
</style>

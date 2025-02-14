<template>
    <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
        <side-bar :background-color="sidebarBackground" short-title="Argon" title="Argon">
            <template slot="links">
                <span v-if="!isProduction">
                    <h2 class="color:#2dce89;">Desarrollo</h2>
                </span>
                <div v-for="opcion in opciones" :key="opcion.id">
                    <!-- antes de la modificacion by hector -->
                    <!-- <sidebar-item
            :link="{
              name: opcion.menu.nombre,
              icon: opcion.menu.icon + ' text-grey',
              path: opcion.menu.ruta
            }"
          /> -->
                    <!-- <pre>{{opcion}}</pre> -->
                    <sidebar-item :link="{
                        name: opcion.nombre,
                        icon: opcion.icon + ' text-grey',
                        path: opcion.ruta
                    }" />
                </div>
            </template>
            <!-- <template slot="links">
        <div v-if="isAdmin">
          <sidebar-item
            :link="{
              name: 'Inicio',
              icon: 'ni ni-tv-2 text-primary',
              path: '/dashboard'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Clientes',
              icon: 'ni ni-single-02 text-blue',
              path: '/clientes'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Punto de Venta',
              icon: 'fas fa-dollar-sign text-green',
              path: '/puntoventa'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Cotizador',
              icon: 'fas fa-money-bill text-gray',
              path: '/cotizador'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Ventas',
              icon: 'fas fa-clipboard-list text-purple',
              path: '/listaventas'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Inventario',
              icon: 'ni ni-delivery-fast text-red',
              path: '/inventario' 
            }"
          />
          <sidebar-item
            :link="{
              name: 'Precios',
              icon: 'ni ni-money-coins text-yellow',
              path: '/precios'
            }"
          />
        </div>
        <div v-if="isInventarios">
          <sidebar-item
            :link="{
              name: 'Inventario',
              icon: 'ni ni-delivery-fast text-red',
              path: '/inventario'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Cotizador',
              icon: 'fas fa-dollar-sign text-gray',
              path: '/cotizador'
            }"
          />
        </div>
        <div v-if="isServicioC">
          <sidebar-item
            :link="{
              name: 'Clientes',
              icon: 'ni ni-single-02 text-blue',
              path: '/clientes'
            }"
          />
          <sidebar-item
            :link="{
              name: 'Cotizador',
              icon: 'fas fa-dollar-sign text-gray',
              path: '/cotizador'
            }"
          />
        </div>
      </template> -->
        </side-bar>
        <div class="main-content" :data="sidebarBackground">
            <dashboard-navbar></dashboard-navbar>

            <div @click="toggleSidebar">
                <fade-transition :duration="200" origin="center top" mode="out-in">
                    <!-- your content here -->
                    <router-view></router-view>
                </fade-transition>
            </div>
        </div>
    </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import storageSession from "../../src/services/storage";
import { FadeTransition } from "vue2-transitions";
import { getOpciones, getIsProduction } from "../../src/services/menu";

export default {
    components: {
        DashboardNavbar,
        FadeTransition
    },
    data() {
        let sesion = storageSession.getObject("sesion");
        return {
            sesion,
            opciones: [],
            isAdmin: false,
            isInventarios: false,
            isServicioC: false,
            isProduction: false,
            sidebarBackground: "orange" //vue|blue|orange|green|red|primary
        };
    },
    created() {
        this.tipoUsuario();
        this.getPermisos();
    },
    methods: {
        toggleSidebar() {
            if (this.$sidebar.showSidebar) {
                this.$sidebar.displaySidebar(false);
            }
        },
        getPermisos() {
            // let id = this.sesion.uid;
            let id = (sessionStorage.getItem("nombre") == 'Conteos') ? 3 : 1;
            getOpciones(id).then(res => {
                this.opciones = res;
                console.log("aquii ", this.opciones)
            });
            getIsProduction().then(res => {
                this.isProduction = res[0].estatus;
            })
        },
        tipoUsuario() {
            if (this.sesion.tipo == 1) {
                this.isAdmin = true;
                this.isInventarios = false;
                this.isServicioC = false;
            } else if (this.sesion.tipo == 2) {
                this.isAdmin = false;
                this.isInventarios = true;
                this.isServicioC = false;
            } else if (this.sesion.tipo == 3) {
                this.isAdmin = false;
                this.isInventarios = false;
                this.isServicioC = true;
            }
        }
    }
};
</script>
<style lang="scss"></style>

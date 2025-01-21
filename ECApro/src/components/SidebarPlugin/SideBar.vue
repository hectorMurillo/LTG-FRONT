<template>
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-info bg-info" id="sidenav-main">
        <div class="container-fluid">
            <!--Toggler-->
            <!-- <navbar-toggle-button @click.native="showSidebar">
        <span class="navbar-toggler-icon"></span>
      </navbar-toggle-button> -->
            <router-link class="navbar-brand" to="/">
                <img src="../../assets/logo.png" class="navbar-brand-img" alt="..." />
            </router-link>

            <slot name="mobile-left">
                <ul class="nav align-items-center d-md-none">
                    <base-dropdown class="nav-item" position="left">
                        <a slot="title" class="nav-link nav-link-icon" href="#" role="button" data-toggle="dropdown"
                            aria-haspopup="true">
                            <i class="ni ni-bell-55"></i>
                        </a>

                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </base-dropdown>
                    <!-- movil navbar -->
                    <base-dropdown class="nav-item" position="right">
                        <a slot="title" class="nav-link" href="#" role="button">
                            <div class="media align-items-center">
                                <span class="avatar avatar-sm rounded-circle">
                                    <img alt="Image placeholder" src="img/theme/user.jpeg" />
                                </span>
                            </div>
                        </a>

                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Bienvenido</h6>
                        </div>
                        <!-- <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>Mi perfil</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-settings-gear-65"></i>
                            <span>Opciones</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-calendar-grid-58"></i>
                            <span>Actividad</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-support-16"></i>
                            <span>Soporte</span>
                        </router-link> -->
                        <div class="dropdown-divider"></div>
                        <li class="dropdown-item" @click="logout">
                            <i class="ni ni-user-run"></i>
                            <a href="#" class="link">Cerrar Sesión</a>
                        </li>
                    </base-dropdown>
                </ul>
            </slot>
            <slot></slot>
            <div v-show="$sidebar.showSidebar" class="navbar-collapse collapse show" id="sidenav-collapse-main">
                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <router-link to="/">
                                <img :src="logo" />
                            </router-link>
                        </div>
                        <div class="col-6 collapse-close">
                            <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
                        </div>
                    </div>
                </div>

                <ul class="navbar-nav">
                    <slot name="links"> </slot>
                </ul>
                <!--Divider-->
                <hr class="my-3" />
                <!--Heading-->
                <!-- <h6 class="navbar-heading text-muted">Documentación</h6> -->
                <!--Navigation-->
                <!--  <ul class="navbar-nav mb-md-3">
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://demos.creative-tim.com/vue-argon-dashboard/documentation"
            >
              <i class="ni ni-spaceship"></i> Inicio Rapido
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://demos.creative-tim.com/vue-argon-dashboard/documentation/foundation/colors.html"
            >
              <i class="ni ni-palette"></i> Foundation
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://demos.creative-tim.com/vue-argon-dashboard/documentation/components/alerts.html"
            >
              <i class="ni ni-ui-04"></i> Componentes
            </a>
          </li>
        </ul> -->
            </div>
        </div>
    </nav>
</template>
<script>
import NavbarToggleButton from "@/components/NavbarToggleButton";
import login from "../../components/mixins/login";

export default {
    mixins: [login],
    name: "sidebar",
    components: {
        NavbarToggleButton
    },
    props: {
        logo: {
            type: String,
            // default: "img/brand/todoChiloLogo.png",
            description: "Sidebar app logo"
        },
        autoClose: {
            type: Boolean,
            default: true,
            description:
                "Whether sidebar should autoclose on mobile when clicking an item"
        }
    },
    provide() {
        return {
            autoClose: this.autoClose
        };
    },
    methods: {
        closeSidebar() {
            this.$sidebar.displaySidebar(false);
        },
        showSidebar() {
            this.$sidebar.displaySidebar(true);
        }
    },
    beforeDestroy() {
        if (this.$sidebar.showSidebar) {
            this.$sidebar.showSidebar = false;
        }
    }
};
</script>
<style scoped>
.link {
    color: black;
    text-decoration: none;
    text-decoration-color: black;
}

.link:link {
    color: black;
    text-decoration: none;
    text-decoration-color: black;
}

a {
    /* background: rgb(33, 37, 41); */
}
</style>

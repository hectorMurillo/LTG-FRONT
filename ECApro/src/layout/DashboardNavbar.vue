<template>
  <base-nav
    class="navbar-top navbar-dark"
    id="navbar-main"
    :show-toggle-button="false"
    expand
  >
    <form
      class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto"
    >
      <div class="form-group mb-0"></div>
    </form>
    <ul class="navbar-nav align-items-center d-none d-md-flex">
      <li class="nav-item dropdown">
        <base-dropdown class="nav-link pr-0">
          <div class="media align-items-center" slot="title">
            <span class="avatar avatar-sm rounded-circle">
              <img alt="Image placeholder" src="img/theme/user.jpeg" />
            </span>
            <div class="media-body ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm usuario">{{ sesion.name }} </span>
            </div>
          </div>

          <template>
            <div class=" dropdown-header noti-title">
              <h6 class="text-overflow m-0">Bienvenido menu</h6>
            </div>
            <div class="dropdown-divider"></div>
            <li class="dropdown-item" @click="logout">
              <i class="ni ni-user-run"></i>
              <a href="#" class="link">Cerrar Sesión</a>
            </li>
          </template>
        </base-dropdown>
      </li>
    </ul>
  </base-nav>
</template>
<script>
import storageSession from "../services/storage.js";
import login from "../../src/components/mixins/login";
export default {
  mixins: [login],
  data() {
    let sesion = storageSession.getObject("sesion");
    return {
      sesion,
      activeNotifications: false,
      showMenu: false,
      searchQuery: ""
    };
  },
  mounted() {},
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  }
};
</script>

<style>
.usuario {
  font-weight: bolder;
}
</style>

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
.link:active {
  color: white;
  text-decoration: none;
  text-decoration-color: white;
}
a {
  background: white;
}
a:active {
  background: none;
}
</style>

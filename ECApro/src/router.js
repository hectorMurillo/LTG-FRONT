import Vue from "vue";
import Router from "vue-router";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";
import helperPermisos from "@/plugins/helpers.js";
Vue.use(Router);

const routes = [
  {
    path: "/",
    redirect: "login",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          isPublic: false
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "demo" */ "./views/Dashboard.vue")
      },
      {
        path: "/convenios",
        name: "convenios",
        component: () =>
          import(/* webpackChunkName: "demo" */ "./views/Convenios/Listado.vue")
      },
      {
        path: "/recepcion",
        name: "recepcion",
        component: () =>
          import(/* webpackChunkName: "demo" */ "./views/Recepcion/Listado.vue")
      },
      {
        path: "/agregarRecepcion",
        name: "agregar-recepcion",
        component: () =>
          import(/* webpackChunkName: "demo" */ "./views/Recepcion/Editar.vue"),
        props: true
      },
      {
        path: "/pagos",
        name: "pagos",
        component: () =>
          import(/* webpackChunkName: "demo" */ "./views/Pagos//Listado.vue")
      },
      {
        path: "/usuarios",
        name: "usuarios",
        component: () =>
          import(/* webpackChunkName: "demo" */ "./views/Usuarios/Listado.vue"),
        props: true
      },
      {
        path: "/usuariosEditar",
        name: "usuariosEditar",
        component: () =>
          import(/* webpackChunkName: "demo" */ "./views/Usuarios/Editar.vue"),
        props: true
      },
      {
        path: "/puntoventa",
        name: "PuntoVenta",
        component: () =>
          import(/* webpackChunkName: "demo" */ "./views/Ventas/Ventas.vue")
      },
      {
        path: "/listaVentas",
        name: "ListaVentas",
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "./views/ListaVentas/Listado.vue"
          )
      },
      {
        path: "/conteo",
        name: "Conteo",
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "./views/Cotizaciones/Cotizador.vue"
          )
      },
      {
        path: "/listaCotizaciones",
        name: "ListaCotizaciones",
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "./views/Cotizaciones/Listado.vue"
          )
      },
      {
        path: "/listaDevoluciones",
        name: "ListaDevoluciones",
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "./views/Devoluciones/Listado.vue"
          )
      },
      {
        path: "/devoluciones",
        name: "Devoluciones",
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "./views/Devoluciones/Devoluciones.vue"
          ),
        props: true
      },
      {
        path: "/facturas",
        name: "Facturas",
        component: () =>
          import(/* webpackChunkName: "demo" */ "./views/Facturas/Listado.vue"),
        props: true
      },
      {
        path: "/precios",
        name: "Precios",
        component: () =>
          import(/* webpackChunkName: "demo" */ "./views/Precios/Precios.vue"),
        props: true
      },
      {
        path: "/inventario",
        name: "Inventario",
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "./views/Inventario/Listado.vue"
          )
      },
      {
        path: "/perfiles",
        name: "perfiles",
        component: () =>
          import(/* webpackChunkName: "demo" */ "./views/Perfiles/Listado.vue")
      },
      {
        path: "/agregarConvenios",
        name: "agregar-convenios",
        component: () =>
          import(/* webpackChunkName: "demo" */ "./views/Convenios/Editar.vue"),
        props: true
      },
      {
        path: "/icons",
        name: "icons",
        component: () =>
          import(/* webpackChunkName: "demo" */ "./views/Icons.vue")
      },
      {
        path: "/profile",
        name: "profile",
        component: () =>
          import(/* webpackChunkName: "demo" */ "./views/UserProfile.vue")
      },
      {
        path: "/maps",
        name: "maps",
        component: () =>
          import(/* webpackChunkName: "demo" */ "./views/Maps.vue")
      },
      {
        path: "/tables",
        name: "tables",
        component: () =>
          import(/* webpackChunkName: "demo" */ "./views/Tables.vue")
      }
    ]
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "demo" */ "./views/Login.vue"),
        meta: {
          isPublic: true
        }
      },
      {
        path: "/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "demo" */ "./views/Register.vue")
      }
    ]
  }
];

const router = new Router({
  linkExacActiveClass: "active",
  routes
});

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !helperPermisos.isAuthenticated()) {
    return next({ name: "login" });
  }

  if (to.name === "login" && helperPermisos.isAuthenticated(to.meta.modulo)) {
    return next({ name: "dashboard" });
  }

  if (to.name !== "login" && !helperPermisos.isAuthorized(to.meta.modulo)) {
    return next({ name: "login" });
  }

  return next();
});

export default router;

<template>
    <div class="main-content ">
        <!-- Navbar -->
        <base-nav class="navbar-top navbar-horizontal navbar-dark"
                  containerClasses="px-4 container"
                  expand>
            <router-link slot="brand" class="navbar-brand" to="/">
                <img src="img/brand/todoChiloLogo.png"/>
            </router-link>
        </base-nav>
        <!-- Header -->
        <div class="header py-7 py-lg-6">
            <!-- <div class="container">
                <div class="header-body text-center mb-9">
                    <div class="row justify-content-center">
                        <div class="col-lg-5 col-md-6">
                            <h1 class="text-white">¡Bienvenido!</h1>
                            <p class="text-lead text-white">ECApro somos una empresa enfocada a equipo de computo empresarial como también para ingenieros, arquitectos y diseñadores.</p>
                        </div>
                    </div>
                </div>
            </div> -->
            <!-- <div style="height: 100px; overflow: hidden;" class="separator separator-bottom separator-skew zindex-100" >
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" style="height: 50%; width: 100%;">
                    <path d="M-0.27,42.92 C127.25,228.45 361.45,-73.52 503.10,93.25 L500.00,150.00 L0.00,150.00 Z"  style="stroke: none;" class="fill-dark">
                    </path>
                </svg>
            </div> -->
        </div>
        <!-- Page content -->
        <div class="container mt--8 pb-5">
            <slide-y-up-transition mode="out-in" origin="center top">
                <router-view></router-view>
            </slide-y-up-transition>
        </div>
        <footer class="py-5">
            <div class="container">
                <div class="row align-items-center justify-content-xl-between">
                    <div class="col-xl-6">
                        <div class="copyright text-center text-xl-left font-weight-bold">
                            Todo Chilo &copy; {{year}} 
                        </div>
                    </div>
                    <!-- <div class="col-xl-6">
                        <ul class="nav nav-footer justify-content-center justify-content-xl-end">
                            <li class="nav-item">
                                <a href="#" class="nav-link" target="_blank">Blue Screen Software &copy;</a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link" target="_blank">Acerca de nosotros</a>
                            </li>
                        </ul>
                    </div> -->
                </div>
            </div>
        </footer>
    </div>
</template>
<script>
  import { SlideYUpTransition } from 'vue2-transitions'

  export default {
    name: 'auth-layout',
    components: {
      SlideYUpTransition
    },
    data() {
      return {
        year: new Date().getFullYear(),
        showMenu: false
      }
    }
  }
</script>
<style>
    .font-weight-bold{
        color: rgb(5, 5, 5);
    } 
    .nav-link{
        color: rgb(3, 3, 3);
    }
    .gradiente{
       background: linear-gradient(85deg, #0a0a0a 0, #000000 100%) !important;
    }
</style>

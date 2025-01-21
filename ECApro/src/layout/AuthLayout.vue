<template>
    <div class="main-content ">
        <!-- Navbar -->
        <base-nav class=""
                  containerClasses="px-4 container"
                  expand>
            <router-link slot="brand" class="navbar-brand" to="/">
            </router-link>
        </base-nav>
        <!-- Header -->
        <div class="header py-7 py-lg-6">
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
                            
                        </div>
                    </div>
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

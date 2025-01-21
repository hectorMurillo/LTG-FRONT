<template>
    <div v-if="isLoading">
      <img src="../../assets/loading.gif" alt="Cargando...">
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLoading: false
      }
    }
  }
  </script>




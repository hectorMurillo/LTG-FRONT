const helperPermisos = {
  isAuthenticated: function () {
    return window.sessionStorage.sesion
  },
  isAuthorized: function () {
    // let stringModulos = window.localStorage.modulos
    // let respuesta = false

    // if (stringModulos != '') {
    //   let permisos = JSON.parse(stringModulos)

    //   respuesta = permisos.includes(modulo)
    // }

    // return respuesta

    return true
  }
}

export default helperPermisos

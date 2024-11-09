import { api, headers } from "./api";
import storage from "./storage";

const URL = `/login`;

async function login(email, password) {
  // alert(URL);
  var post = {
    email: email,
    password: password
  };
  return await api.post(URL, post).then(res => {
    console.log("login ",res.data);
    storage.setObject("sesion", res.data.email);
    storage.setObject("email", res.data.email);
    storage.setString("nombre",res.data.nombre)
    storage.setString("x-token", 'res.data.token');
    return 'res.data.usuario';
  });
}

async function userCreate(object) {
  if (object.length == 0) {
    return false;
  }

  /**
   * this objects example to create
   * {
        "name":"EDGAR",
        "email":"ecapro@gmail.com",
        "password":"123456",
        "sucursal":"60af228bca2bf835f0cd1148"
    }
   */
  return await api.post(URL + "/create", object).then(res => {
    storage.setObject("sesion", res.data.usuario);
    storage.setString("x-token", res.data.token);
    return res.data.usuario;
  });
}

async function refreshToken() {
  const header = { headers: headers }; //Enviar token en los encabezados de las peticiones ejemplo

  return await api.post(URL + "/refreshToken", {}, header);
}

export { login, userCreate, refreshToken };

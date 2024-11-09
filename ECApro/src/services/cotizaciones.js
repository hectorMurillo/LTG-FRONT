import { api } from './api';
const URL = `api/cotizacion`;

function createCotizacion(venta) {
  const path = `${URL}/agregar`;
  return api.post(path, venta).then(res => {
    return res.data;
  })
}
function getLista() {
  const path = `${URL}/listado`;
  return api.get(path).then(res => {
    return res.data;
  })
}

function getByNombre(nombre) {
  const path = `${URL}/busqueda/${nombre}`;
  return api.get(path).then(res => {
    return res.data;
  })
}


function getPDF(id) {
  const path = `${URL}/pdf/${id}`;
  return api.get(path).then(res => {
    return res.data;
  })
}


export {
  createCotizacion,
  getLista,
  getByNombre,
  getPDF
}

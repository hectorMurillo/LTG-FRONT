import { api, headers } from "./api";
const URL = `recepciones`;
const header = { headers: headers };

function listar() {
  const path = `${URL}/listar`;
  return api.get(path, header).then(res => res.data);
}

function generaPDF(id) {
  const path = `cotizacion/pdf/${id}`;
  return api.get(path, header).then(res => res.data);
}

function create(recepcion	) {
  const path = `${URL}/agregar/null`;
  return api.post(path, recepcion	, header).then(res => {
    return res.data;
  });
}

// function actualizarRevisado(idCandidato) {
//   const path = `${URL}/actualizarARevisado/${idCandidato}/1`;
//   return api.post(path, header).then(res => res.data);
// }

// function obtenerImagen(nombreImagen){
//   const path = `${URL}/imagen/${nombreImagen}`;
//   return api.get(path,header).then(res => res.data);
// }

// function obtenerURLImg(nombreImagen){
//   const path = `${api.defaults.baseURL}${URL}/imagen/${nombreImagen}`
//   return path;
// }

// function getById(id) {
//   const path = `${URL}/buscarId/${id}`;
//   return api.get(path, header).then(res => res.data);
// }
// function buscarByNombre(nombre) {
//   const path = `${URL}/buscar/${nombre}`;
//   return api.get(path, header).then(res => res.data);
// }

// function buscarClientesPorNombre(cliente) {
//   const path = `${URL}/buscar/${cliente}`;
//   return api.get(path,header).then(res => res.data);
// }

export {
    create,
    listar,
    generaPDF
  //   updateCliente,
  //   createProspecto,
//   actualizarRevisado,
//   obtenerImagen,
//   obtenerURLImg
  //   getById,
  //   buscarByNombre,
  //   buscarClientesPorNombre
};

import { api, headers } from "./api";
const URL = `colaboradores`;
const header = { headers: headers };

function listarCombo() {
    const path = `${URL}/listaCombo`;
    return api.get(path, header).then(res => res.data);
}

function listarComboCajerosExternos() {
    const path = `${URL}/cajaExternos/listaCombo`;
    return api.get(path, header).then(res => res.data);
}

function getCantidadxcolaborador(fechaDesde, fechaHasta, codColaborador) {
    const path = `${URL}/cantidadxcolaborador/${fechaDesde}/${fechaHasta}/${codColaborador}`;
    return api.get(path, header).then(res => res.data[0]);
}

function guardarRegistroNomina(datosNomina) {
    const path = `${URL}/registraNomina`
    return api.post(path, datosNomina, header).then(res => res);
}

function generaPDFNomina(fechaInicio, fechaFin, codColaborador) {
    const path = `${URL}/historialConteo/pdf/${fechaInicio}/${fechaFin}/${codColaborador}`
    return api.get(path,header).then(res => res.data);
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
    //   create,
    //   updateCliente,
    //   createProspecto,
    listarCombo,
    listarComboCajerosExternos,
    getCantidadxcolaborador,
    guardarRegistroNomina,
    generaPDFNomina
    //   actualizarRevisado,
    //   obtenerImagen,
    //   obtenerURLImg
    //   getById,
    //   buscarByNombre,
    //   buscarClientesPorNombre
};

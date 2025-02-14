import { api, headers } from './api';
const URL = `inventarios`;
const header = { headers: headers };

function listadoUltimosLotesRecibidos() {
    const path = `${URL}/listarUltimoLotesRecibidosMP`;
    return api.get(path, header).then(res => res.data);
}

function listadoUltimosLotesCajasRecibidos() {
    const path = `${URL}/listarUltimoLotesRecibidosCajas`;
    return api.get(path, header).then(res => res.data);
}

function listarConteosXFechas(fechaInicio, fechaFin) {
    const path = `${URL}/listarConteosXFechas/${fechaInicio}/${fechaFin}`
    return api.get(path, header).then(res => res.data[0]);
}

function agregarConteo(item) {
    const path = `${URL}/agregarConteo`;
    return api.post(path,item, header).then(res=>res);
}

function obtenerMPConMargen(cantidad){
    const path = `${URL}/obtenerMPConMargen/${cantidad}`;
    return api.get(path,header).then(res=> res.data[0][0]);
}

function obtenerLotesFueraLocal(){
    const path = `${URL}/listarLotesFueraLocal/`;
    return api.get(path,header).then(res=> res.data);
}

// "identificadorDiario":this.obtenerIdInput(id,fecha),
// "idUsuarioRegistra":1,
// "cantidad": cantidad
// function createInventario(inventario){
//   const path =`${URL}/inventario`;
//   return api.post(path, inventario, header).then(res => res.data);
// }

export {
    listadoUltimosLotesRecibidos,
    listarConteosXFechas,
    agregarConteo,
    listadoUltimosLotesCajasRecibidos,
    obtenerMPConMargen,
    obtenerLotesFueraLocal
    // createInventario
}

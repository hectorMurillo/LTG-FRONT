import { api, headers } from './api';
const URL = `inventarios`;
const header = { headers: headers };
function listadoUltimosLotesRecibidos(){
  const path =`${URL}/listarUltimoLotesRecibidos`;
  return api.get(path,header).then(res => res.data);
}
// function createInventario(inventario){
//   const path =`${URL}/inventario`;
//   return api.post(path, inventario, header).then(res => res.data);
// }

export {
  listadoUltimosLotesRecibidos,
  // createInventario
}

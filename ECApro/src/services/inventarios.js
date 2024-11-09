import { api, headers } from './api';
const URL = `api/almacen`;
const header = { headers: headers };
function listadoInventarios(){
  const path =`${URL}//inventario/ACTIVO`;
  return api.get(path,header).then(res => res.data);
}
function createInventario(inventario){
  const path =`${URL}/inventario`;
  return api.post(path, inventario, header).then(res => res.data);
}

export {
  listadoInventarios,
  createInventario
}

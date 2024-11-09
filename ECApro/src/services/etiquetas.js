import { api, headers } from './api';
const URL = `api/almacen`;
const header = { headers: headers };
function listadoEtiquetas(){
  const path =`${URL}/etiqueta/ACTIVO`;
  return api.get(path, header).then(res => res.data);
}

function agregar(item){
  const path =`${URL}/etiqueta/`;
  return api.post(path, item, header).then(res => res.data);
}

function getByID(id){
  const path =`${URL}/listar/${id}`;
  return api.get(path).then(res => res.data);
}

function bajaEtiqueta(id){
  const path =`${URL}/baja/${id}`;
  return api.put(path).then(res => res.data);
}

export {
  listadoEtiquetas,
  agregar,
  getByID,
  bajaEtiqueta
}

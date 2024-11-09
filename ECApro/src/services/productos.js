import { api, headers } from './api';

const URL = `api/almacen`;
const header = { headers: headers };

function listadoProductos(){
  const path =`${URL}/productos/ACTIVO`;
  return api.get(path, header).then(res => res.data);
}

function listadoTipoInventario(id){
  const path = `${URL}/productoByIdInventario/${id}`;
  return api.get(path,header).then(res => res.data);
}

function agregarProducto(producto){
  const path =`${URL}/productos`;
  return api.post(path, producto,header).then(res => res.data);
}

function actualizarProducto(id, producto){
  const path = `${URL}/productos/update/${id}`;
  return api.put(path, producto,header).then(res => res.data);
}

function buscarPorCodigo(codigo){
  const path = `${URL}/producto/${codigo}`;
  return api.get(path,header).then(res => res.data);
}

function busquedaProducto(item){
  const path =`${URL}/productosByNombre/${item}`;
  return api.get(path,header).then(res => res.data);
}


export {
  listadoProductos,
  agregarProducto,
  listadoTipoInventario,
  actualizarProducto,
  buscarPorCodigo,
  busquedaProducto
}

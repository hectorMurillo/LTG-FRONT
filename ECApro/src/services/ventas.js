import { api } from './api';
const URL = `/ventas`;

function create(venta) {
  const path = `${URL}/agregar`;
  return api.post(path, venta).then(res => {
    return res.data;
  })
}
function update(idVenta, venta) {
  const path = `${URL}/actulizar/${idVenta}`;
  return api.put(path, venta).then(res => {
    return res.data;
  })
}
function listar() {
  const path = `${URL}/listado`;
  return api.get(path).then(res => res.data);
}
function ventaById(idVenta) {
  const path = `${URL}/listado/${idVenta}`;
  return api.get(path).then(res => res.data);
}
function getDetallesVenta(idVenta) {
  const path = `${URL}/detalles/${idVenta}`;
  return api.get(path).then(res => res.data);
}
function bajaVenta(idVenta) {
  const path = `${URL}/cancelar/${idVenta}`;
  return api.delete(path).then(res => res.data);
}
function listarDevoluciones() {
  const path = `${URL}/listadodevolucion`;
  return api.get(path).then(res=> res.data);
}

export {
  create,
  update,
  listar,
  ventaById,
  getDetallesVenta,
  bajaVenta,
  listarDevoluciones
}

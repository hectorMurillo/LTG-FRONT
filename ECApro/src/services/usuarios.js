import { api, headers } from "./api";

const URL = `api/login`;
const header = { headers: headers };

function listar() {
  const path = `${URL}/usuarios`;
  return api.get(path, header).then(res => res.data);
}

function getById(id) {
  const path = `${URL}/usuarios/${id}`;
  return api.get(path, header).then(res => res.data);
}

function crear(usuario) {
  const path = `${URL}/create`;
  return api.post(path, usuario, header).then(res => res.data);
}
function actualizar(id, usuario) {
  const path = `${URL}/update/${id}`;
  return api.post(path, usuario, header).then(res => res.data);
}
function activar(status, id) {
  const path = `${URL}/active/${id}`;
  return api.post(path, status, header).then(res => res.data);
}

export { listar, getById, crear, actualizar, activar };

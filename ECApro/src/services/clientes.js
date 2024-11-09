import { api, headers } from "./api";
const URL = `clientes`;
const header = { headers: headers };

function create(cliente) {
  const path = `${URL}/agregar`;
  console.log("asdsa ",cliente);
  return api.post(path, cliente, header).then(res => {
    return res.data;
  });
}
function updateCliente(cliente, id) {
  const path = `${URL}/update/${id}`;
  return api.put(path, cliente, header).then(res => {
    return res.data;
  });
}
function createProspecto(cliente) {
  const path = `${URL}/agregarprospecto`;
  return api.post(path, cliente).then(res => {
    return res.data;
  });
}
// YA SIRVE
function listar() {
  const path = `${URL}/listar`;
  return api.get(path, header).then(res => res.data);
}

function getById(id) {
  const path = `${URL}/buscarId/${id}`;
  return api.get(path, header).then(res => res.data);
}
function buscarByNombre(nombre) {
  const path = `${URL}/buscar/${nombre}`;
  return api.get(path, header).then(res => res.data);
}

function buscarClientesPorNombre(cliente) {
  const path = `${URL}/buscar/${cliente}`;
  return api.get(path,header).then(res => res.data);
}

export {
  create,
  updateCliente,
  createProspecto,
  listar,
  getById,
  buscarByNombre,
  buscarClientesPorNombre
};

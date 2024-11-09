import { api, headers } from "./api";
const URL = `api/sucursal`;
const header = { headers: headers };

function listarSucursales() {
  const path = `${URL}/sucursales`;
  return api.get(path, header).then(res => res.data);
}

export { listarSucursales };

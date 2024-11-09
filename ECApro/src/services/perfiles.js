import { api } from "./api";
import storage from "./storage";

const URL = `api/login/`;

const header = {
  "x-token":storage.getString('x-token')
};

function listarPerfiles() {
  const path = `${URL}perfil`;
  return api.get(path, header).then(res => res.data);
}

export { listarPerfiles };

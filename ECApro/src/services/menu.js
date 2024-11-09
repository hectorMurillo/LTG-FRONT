import { api, headers } from "./api";
// const URL = `/api/login`;
const URL = `/menu`
const header = { headers: headers };

function getOpciones(id) {
  // const path = `${URL}/permisos/${id}`;
  const path = `${URL}/listar/${id}`;
  // alert( JSON.stringify(header))
  return api.get(path, header).then(res => res.data);
} 

export { getOpciones };

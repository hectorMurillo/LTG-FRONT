import { api, headers } from './api';
const URL = `salidas`;
const header = { headers: headers };

function agregarSalidaACentro(item) {
    const path = `${URL}/agregarSalidaACentro`;
    return api.post(path,item, header).then(res=>res);
}

function listarSalidas() {
    const path = `${URL}/listar`;
    return api.get(path, header).then(res => res.data);
}

function agregarSalidaCajas(item){
    const path = `${URL}/agregarSalidaCaja`
    return api.post(path, item, header).then(res=> res);
}

export {
    agregarSalidaACentro,
    listarSalidas,
    agregarSalidaCajas
}

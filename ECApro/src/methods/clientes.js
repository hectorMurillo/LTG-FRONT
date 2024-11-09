import { create,listar } from '../services/clientes';
import ClientesModel from '../models/Cliente';
import Asserts from '../utils/Asserts';
import storage from '../services/storage';
import { mapListData } from '../utils/mapListData'

function guardar(cliente, $router){
  const session = storage.getObject('sesion');

  cliente = new ClientesModel(cliente);
  try {
    Asserts.notEmpty(cliente.nombre,"El nombre no puede estar vacio");

  } catch (error) {
    console.log(error.message);
    return;
  }

    cliente.idUsuario = session.id;
    create(cliente).then(()=> $router.push({ name: "clientes" }));

}

function listarClientes(){
  return listar().then(response=>{
      return mapListData(response,ClientesModel);
  });
}

export {
  guardar,
  listarClientes
}

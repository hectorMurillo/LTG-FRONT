import { listar } from '../../services/proveedores.js'

const array = []
listar().then((res) => {
     let result = res?.data?.length == 0 ? [] : res;
     result.forEach(element => {
        array.push({id:element.idProveedor,nombre:element.alias})
     });
});





export default array
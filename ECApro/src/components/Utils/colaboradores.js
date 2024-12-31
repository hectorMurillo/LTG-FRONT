import { listarCombo } from '../../services/colaboradores.js'

const array = []
listarCombo().then((res) => {
    let result = res?.data?.length == 0 ? [] : res;
    result.forEach(element => {
        array.push({ id: element.idColaboradores, nombre: element.alias, estatus: element.estatus })
    });
});





export default array
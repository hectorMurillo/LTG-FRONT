import { listarComboCajerosExternos } from '../../services/colaboradores.js'

const arrayCajerosExternos = []

listarComboCajerosExternos().then((res) => {
    let result = res?.data?.length == 0 ? [] : res;
    result.forEach(element => {
        arrayCajerosExternos.push({ id: element.idCajeroExterno, nombre: element.alias, estatus: element.estatus })
    });
});


export default arrayCajerosExternos
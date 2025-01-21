import {
    getCantidadxcolaborador
} from "../../services/colaboradores.js";

const array = []


getCantidadxcolaborador().then(res=>{
    let result = res;
    console.log("asdsadsa",result);
    result.forEach(element => {
        array.push({ id: element.idColaboradores, nombre: element.alias, estatus: element.estatus, cantTotalPorPeriodo: element.cantTotalPorPeriodo, totalAPagar: element.totalAPagar })
    });
})
export default class ClienteModelo {
    id = 0;
    idSucursal=0;
    idUsuario = 0;
    email='';
    nombre = "";
    apellidoP = "";
    apellidoS = "";
    rfc="";
    estado="";
    ciudad="";
    colonia="";
    calle="";
    numExterior="";
    numInterior="";
    codigoPostal="";
    celular = "";
    fechaNacimiento = "";

    constructor(object){
        if(object != undefined && object != null){
            this.assing(object);
        }
    }

    getNombreCompleto(){
      return ` ${this.nombre} ${this.apellidoP} ${this.apellidoS}`
    }

    assing(object){
        const _this = this;
        Object.keys(object).forEach(function(key) {
            if (key in _this) { // or obj1.hasOwnProperty(key)
                _this[key] = object[key];
            }
        });
    }
}

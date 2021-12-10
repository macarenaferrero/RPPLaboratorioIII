class Anuncio {

    constructor(id, titulo, transaccion, descripcion, precio) {
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}


export class Anuncio_Auto extends Anuncio {

    constructor(id, titulo, transaccion, descripcion, precio, puerta, km, potencia, condicion, acondicionado, alarma) {
        super(id, titulo, transaccion, descripcion, precio);
        this.puerta = puerta;
        this.km = km;
        this.potencia = potencia;
        this.condicion = condicion;
        this.acondicionado = acondicionado;
        this.alarma = alarma;
    }
}
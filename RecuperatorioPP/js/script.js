
import { Anuncio_Auto } from "./anuncio.js";
import { crearTabla } from "./dinamicas.js";
import { Ids } from "./ids.js";

const $divTabla = document.getElementById("divTabla");
const $divTablaIds = document.getElementById("divTablaIds");

const anuncios = JSON.parse(localStorage.getItem("anuncios")) || [];
const ids = JSON.parse(localStorage.getItem("ids")) || [];
console.log(anuncios);
actualizarTabla();

window.addEventListener("click", (e) => {

    if (e.target.matches("td")) {
        console.log(e.target.parentElement.dataset.id);
        let id = e.target.parentElement.dataset.id;
        var cantidad = 1;
        ids.forEach(id => {
            Ids.cantidad++;
        });
        ids.push(id, cantidad);
        actualizarTablaIds(ids);

        cargarFormulario(anuncios.find((anuncio) => anuncio.id == id));
    }
    else if (e.target.matches("#btnDelete")) {
        handlerEliminar(parseFloat($formulario.txtId.value));
        $formulario.txtId.value = "";
        const $btnEliminar = document.getElementById("btnDelete").classList.add("oculto");
        $formulario.reset();
    } else if (e.target.matches("#btnCancelar")) {
        const $btnEliminar = document.getElementById("btnDelete").classList.add("oculto");
        const $btnCancelar = document.getElementById("btnCancelar").classList.add("oculto");
        $formulario.reset();
    }
});

const $formulario = document.forms[0];

function cargarFormulario(anuncio) {
    const { titulo, precio, puerta, potencia, km, txtId, descripcion, transaccion, condicion, acondicionadoCheck, alarmaCheck } = $formulario;
    txtId.value = anuncio.id;
    titulo.value = anuncio.titulo;
    descripcion.value = anuncio.descripcion;
    precio.value = anuncio.precio;
    puerta.value = anuncio.puerta;
    potencia.value = anuncio.potencia;
    km.value = anuncio.km;
    transaccion.value = anuncio.transaccion;
    condicion.value = anuncio.condicion;
    acondicionadoCheck.checked = anuncio.acondicionado;
    alarmaCheck.checked = anuncio.alarma;

    const $submit = document.getElementsByClassName("submit")[0];
    $submit.value = "Modificar";
    const $btnEliminar = document.getElementById("btnDelete").classList.remove("oculto");
    const $btnCancelar = document.getElementById("btnCancelar").classList.remove("oculto");
}

$formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("Enviando");
    const { titulo, precio, puerta, potencia, km, txtId, descripcion, transaccion, condicion, acondicionadoCheck, alarmaCheck } = $formulario;

    const anuncioAuxiliar = new Anuncio_Auto(txtId.value, titulo.value, transaccion.value, descripcion.value, precio.value, puerta.value, km.value, potencia.value, condicion.value, acondicionadoCheck.checked, alarmaCheck.checked);

    if (anuncioAuxiliar.id === '') {
        anuncioAuxiliar.id = Date.now();
        handlerCrear(anuncioAuxiliar);
        Alert("Anuncio Creado", "alert-info");
    }
    else {
        handlerEditar(anuncioAuxiliar);
        Alert("Anuncio Modificado", "alert-info");
        const $btnEliminar = document.getElementById("btnDelete").classList.add("oculto");
        const $btnCancelar = document.getElementById("btnCancelar").classList.add("oculto");
        $formulario.txtId.value = "";
    }

    $formulario.reset();
});



function actualizarTabla() {
    while ($divTabla.hasChildNodes()) {
        $divTabla.removeChild($divTabla.firstChild)
    }
    const data = JSON.parse(localStorage.getItem("anuncios"));

    if (data) {
        data.sort(function (a, b) { return b.precio - a.precio });
        $divTabla.appendChild(crearTabla(data));
    }
};

function actualizarTablaIds(data) {
    while ($divTablaIds.hasChildNodes()) {
        $divTablaIds.removeChild($divTablaIds.firstChild)
    }
    $divTablaIds.appendChild(crearTabla(data));
};


const handlerCrear = (nuevoAnuncio) => {
    anuncios.push(nuevoAnuncio);
    actualizarStorage(anuncios);
    agregarSpinner();
    setTimeout(() => {
        actualizarTabla();
        eliminarSpinner();
    }, 3000);
    actualizarTabla();
};

const handlerEditar = (editarAnuncio) => {
    let indice = anuncios.findIndex((anuncio) => {
        return anuncio.id == editarAnuncio.id;
    });

    anuncios.splice(indice, 1);
    anuncios.push(editarAnuncio);
    actualizarStorage(anuncios);
    agregarSpinner();
    setTimeout(() => {
        actualizarTabla();
        eliminarSpinner();
    }, 3000);
    const $submit = document.getElementsByClassName("submit")[0];
    $submit.value = "Guardar";
};

const handlerEliminar = (id) => {
    let indice = anuncios.findIndex((anuncio) => {
        return anuncio.id == id;
    });
    anuncios.splice(indice, 1);
    actualizarStorage(anuncios);
    agregarSpinner();
    setTimeout(() => {
        actualizarTabla();
        eliminarSpinner();
    }, 3000);
    const $submit = document.getElementsByClassName("submit")[0];
    $submit.value = "Guardar";
    Alert("Anuncio Eliminado", "alert-info");
};


const actualizarStorage = (data) => {
    localStorage.setItem("anuncios", JSON.stringify(data));
};

function agregarSpinner() {
    let spinner = document.createElement("img");
    spinner.setAttribute("src", "./images/spinners.gif");
    spinner.setAttribute("alt", "Imagen spinner");
    document.getElementById("spinner-container").appendChild(spinner);
}


function eliminarSpinner() {

    const $spinnerContainer = document.getElementById("spinner-container");
    while ($spinnerContainer.hasChildNodes()) {
        $spinnerContainer.removeChild($spinnerContainer.firstElementChild);
    }
}


function Alert(texto, tipo) {
    let divAlert = document.getElementById("divAlert");
    divAlert.innerHTML = "";
    divAlert.setAttribute("style", "display: flex");
    divAlert.classList.add(tipo);
    const textNode = document.createTextNode(texto);
    divAlert.appendChild(textNode);
    setTimeout(() => {
        divAlert.setAttribute("style", "display: none");
    }, 3000);
}

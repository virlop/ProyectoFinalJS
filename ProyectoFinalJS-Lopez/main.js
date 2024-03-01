
import {iniciarSesión, crearUsuario, mostrarGastos, mostrarIngresos, mostrarDatosEstadisticos, mostrarSobreNosotros, limpiar, usuarioActual, vaciarUsuarioActual, vaciarLocalStorage } from "./funciones.js";

//----------------------VARIABLES Y CONTENEDORES DOM------------------------------------------------------


export let contenedorUsuario = document.getElementById("contenedorUsuario");
export let tituloInfo = document.getElementById("tituloInfo");
export let contenedorGastos = document.getElementById("contenedorGastos");
export let contenedorIngresos = document.getElementById("contenedorIngresos");
export let contenedorDE = document.getElementById("contenedorDE");
export let contenedorSN = document.getElementById("contenedorSN");
export let contenedorAgregarGasto = document.getElementById("contenedorAgregarGasto");
export let contenedorTablaGastos = document.getElementById("contenedorTablaGastos");
export let contenedorAgregarIngreso = document.getElementById(
    "contenedorAgregarIngreso"
);
export let contenedorTablaIngresos = document.getElementById(
    "contenedorTablaIngresos"
);


//----------------------CLASES------------------------------------------------------------------------

export class Gasto {
    constructor(monto, categoria, descripcion) {
        if (monto > 0) {
            this.monto = -monto;
        } else {
            this.monto = monto;
        }
        const DateTime = luxon.DateTime;
        const now = DateTime.now();
        this.fecha = now;
        this.fechaString = now.toLocaleString(); //guardo fecha Date y fecha String para mostrarla
        this.categoria = categoria;
        this.descripcion = descripcion;
    }
}

export class Ingreso {
    constructor(monto, categoria, descripcion) {
        if (monto < 0) {
            this.monto = -monto;
        } else {
            this.monto = monto;
        }
        const DateTime = luxon.DateTime;
        const now = DateTime.now();
        this.fecha = now;
        this.fechaString = now.toLocaleString(); //guardo fecha Date y fecha String para mostrarla
        this.categoria = categoria;
        this.descripcion = descripcion;
    }
}
export class Usuario {
    constructor(email, contrasena) {
        this.email = email;
        this.contrasena = contrasena;
        this.gastos = [];
        this.ingresos = [];
    }
    agregarGasto(gasto) {
        this.gastos.push(gasto);
    }
    agregarIngreso(ingreso) {
        this.ingresos.push(ingreso);
    }
}

//----------------------FLUJO------------------------------------------------------

//---boton de inicio de sesion - crear cuenta--------
document
    .getElementById("botonIniciarSesion")
    .addEventListener("click", function () {
        if (usuarioActual){
            limpiar();
            tituloInfo.innerHTML = "Sesión ya iniciada";
            let datosIngreso = document.createElement("p");
            datosIngreso.innerHTML = `Iniciaste sesión con el mail: ${usuarioActual.email}`;
            datosIngreso.classList.add("text-center");
            contenedorUsuario.appendChild(datosIngreso);
            let botonCerrarSesion = document.createElement("button");
            botonCerrarSesion.innerHTML = "Cerrar Sesión";
            botonCerrarSesion.classList.add("btn", "btn-danger");
            contenedorUsuario.appendChild(botonCerrarSesion);
            botonCerrarSesion.addEventListener("click", function () {
                vaciarLocalStorage();
                vaciarUsuarioActual();
                limpiar();
                Swal.fire({
                    title: "¡Adiós!",
                    text: "Cerraste sesión correctamente",
                    icon: "success"
                    });
            });
        }else{
        limpiar();
        tituloInfo.innerHTML = "Inicia sesión o únete a nuestra comunidad!";
        tituloInfo.classList.add("text-center");

        //boton de inicio de sesion
        let botonInicioSesion = document.createElement("button");
        botonInicioSesion.setAttribute("type", "button");
        botonInicioSesion.classList.add("btn", "btn-secondary", "m-2");
        botonInicioSesion.innerHTML = "Iniciar sesión";
        contenedorUsuario.classList.add("text-center");
        contenedorUsuario.appendChild(botonInicioSesion);
        botonInicioSesion.addEventListener("click", function () {
            iniciarSesión();
        });

        //boton unirse
        let botonUnirse = document.createElement("button");
        botonUnirse.setAttribute("type", "button");
        botonUnirse.classList.add("btn", "btn-outline-secondary", "m-2");
        botonUnirse.innerHTML = "Quiero unirme";
        contenedorUsuario.appendChild(botonUnirse);
        botonUnirse.addEventListener("click", function () {
            crearUsuario();
        });
    }
    });

//--------boton de registro de gastos--------
document.getElementById("botonGastos").addEventListener("click", function () {
    mostrarGastos();
});

//---boton de registro de ingresos--------
document.getElementById("botonIngresos").addEventListener("click", function () {
    mostrarIngresos();
});

//---boton de datos estadisticos--------
document
    .getElementById("botonDatosEstadisticos")
    .addEventListener("click", function () {
        mostrarDatosEstadisticos();
    });

//---boton sobre nosotros--------
document
    .getElementById("botonSobreNosotros")
    .addEventListener("click", function () {
        mostrarSobreNosotros();
    });

//--------------------------------


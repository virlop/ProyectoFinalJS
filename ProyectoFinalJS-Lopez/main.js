//----------------------VARIABLES------------------------------------------------------

let categorias = [];
let gastos = [];
let ingresos = [];
let registroCompleto = [];
let usuarios = [];

//----------------------CLASES------------------------------------------------------

class Categoria{
    constructor(nombreCategoria){
        this.nombreCategoria = nombreCategoria;
    }
}
class Gasto{
    constructor(monto, nombreCategoria, descripcion){
        if (monto > 0) {
            this.monto = -monto;
        }else{
            this.monto = monto;
        }
        this.fecha = new Date();
        let categoriaEncontrada = buscarCategoria(nombreCategoria, categorias);
        if (typeof categoriaEncontrada === 'undefined' ) {
            let nuevaCategoria = new Categoria(nombreCategoria);
            this.Categoria = nuevaCategoria;
            categorias.push(nuevaCategoria); 
        } else {
            this.Categoria = categoriaEncontrada;
        }
        this.descripcion = descripcion;
        registroCompleto.push(this);
    }
}

class Ingreso{
    constructor(monto, nombreCategoria, descripcion){
        if (monto < 0) {
            this.monto = -monto;
        }else{
            this.monto = monto;
        }
        this.fecha = new Date();
        let categoriaEncontrada = buscarCategoria(nombreCategoria, categorias);
        if (typeof categoriaEncontrada === 'undefined' ) {
            let nuevaCategoria = new Categoria(nombreCategoria);
            this.Categoria = nuevaCategoria;
            categorias.push(nuevaCategoria); 
        } else {
            this.Categoria = categoriaEncontrada;
        }
        this.descripcion = descripcion;
        registroCompleto.push(this);
    }
}
class Usuario{
    constructor(email, contraseña){
        this.email = email;
        this.contraseña = contraseña;
        this.gastos = [];
        this.ingresos = [];
    }
    agregarGasto(gasto){
        this.gastos.push(gasto);
    }
    agregarIngreso(ingreso){
        this.ingresos.push(ingreso);
    }
}

//----------------------FUNCIONES------------------------------------------------------

function buscarCategoria(nombreCategoria, categorias){
    let miCategoria = categorias.find((categoria) => categoria.nombreCategoria == nombreCategoria);
    return miCategoria;
}

function buscarUsuario(usuarios, email){
    let usuarioBuscado = null;
    usuarios.forEach(usuario => {
        if (usuario.email == email) {
            usuarioBuscado = usuario;
        }
    });
    return usuarioBuscado;
}

function iniciarSesión(contenedorFormularios){

    let inputEmailLabel = document.createElement("label");
    inputEmailLabel.classList.add("form-label", "m-2");
    inputEmailLabel.innerHTML = "Ingresa tu mail";
    contenedorFormularios.appendChild(inputEmailLabel);
    let inputEmail = document.createElement("input")
    inputEmail.classList.add("form-control", "m-2", "formulario");
    contenedorFormularios.appendChild(inputEmail);

    let inputContrasenaLabel =  document.createElement("label");
    inputContrasenaLabel.classList.add("form-label", "m-2");
    inputContrasenaLabel.innerHTML= "Ingresa la contraseña";
    contenedorFormularios.appendChild(inputContrasenaLabel);
    let inputContrasena = document.createElement("input")
    inputContrasena.classList.add("form-control", "m-2", "formulario");
    contenedorFormularios.appendChild(inputContrasena);

    let entrarBoton = document.createElement("button");
    entrarBoton.setAttribute("type", "button");
    entrarBoton.classList.add("btn", "btn-secondary", "m-2");
    entrarBoton.innerHTML = "Entrar";
    contenedorFormularios.appendChild(entrarBoton);

    entrarBoton.addEventListener("click", function(){
        let email = inputEmail.value;
        let contraseña = inputContrasena.value;
        alert(email);
        alert(contraseña);
        buscarUsuario(usuarios, email);
    })

}

function crearUsuario(contenedorFormularios){

}

function mostrarGastos(contenedorInfo, tituloInfo, contenedorFormularios){
    limpiar(contenedorInfo, tituloInfo, contenedorFormularios);
    tituloInfo.innerHTML = "Estos son tus gastos";
    
}
function mostrarIngresos(contenedorInfo, tituloInfo, contenedorFormularios){
    limpiar(contenedorInfo, tituloInfo, contenedorFormularios);
    tituloInfo.innerHTML = "Estos son tus Ingresos";
}
function mostrarDatosEstadisticos(contenedorInfo, tituloInfo, contenedorFormularios){
    limpiar(contenedorInfo, tituloInfo, contenedorFormularios);
    tituloInfo.innerHTML = "Datos estadísticos sobre tus registros";
}
function mostrarSobreNosotros(contenedorInfo, tituloInfo, contenedorFormularios){
    limpiar(contenedorInfo, tituloInfo, contenedorFormularios);
    tituloInfo.innerHTML = "¿Quienes somos?";
    contenedorInfo.innerHTML = "¡Hola! Soy Virginia, estudiante de ingeniería en sistemas y la creadora apasionada detrás de MoneyMind, tu gestor de finanzas personales. ¿Por qué un gestor de finanzas? Porque como entusiasta de la tecnología y amante de la programación, comprendo la importancia de optimizar nuestras finanzas personales en un mundo cada vez más digitalizado. Mi plataforma está diseñada pensando en ti, para simplificar la gestión de tus ingresos, gastos, y metas financieras.  ¡Gracias por ser parte de esta comunidad!";
}

function limpiar(contenedorInfo, tituloInfo, contenedorFormularios){
    contenedorInfo.innerHTML = "";
    tituloInfo.innerHTML = "";
    contenedorFormularios.innerHTML = "";
}

//----------------------FLUJO------------------------------------------------------
let contenedorInfo = document.getElementById("contenedorInfo");
let tituloInfo = document.getElementById("tituloInfo");
let contenedorFormularios = document.getElementById("contenedorFormularios");
let formulariosAgregadosInicioSesion = false;

document.getElementById("botonIniciarSesion").addEventListener("click", function(){
    limpiar(contenedorInfo, tituloInfo, contenedorFormularios);
    tituloInfo.innerHTML = "Iniciar sesión o unirse";

    //boton inicio de sesion
    let botonInicioSesion = document.createElement("button");
    botonInicioSesion.setAttribute("type", "button");
    botonInicioSesion.classList.add("btn", "btn-primary", "m-2");
    botonInicioSesion.innerHTML = "Iniciar sesión";
    contenedorInfo.appendChild(botonInicioSesion);
    botonInicioSesion.addEventListener("click", function(){
        if (!formulariosAgregadosInicioSesion) {
            iniciarSesión(contenedorFormularios);
            formulariosAgregadosInicioSesion = true;
        } 
    });

    //boton unirse
    let botonUnirse =  document.createElement("button");
    botonUnirse.setAttribute("type", "button");
    botonUnirse.classList.add("btn", "btn-primary", "m-2");
    botonUnirse.innerHTML = "Quiero unirme";
    contenedorInfo.appendChild(botonUnirse);
    botonUnirse.addEventListener("click", function(){
        crearUsuario(contenedorFormularios);
    });

})
document.getElementById("botonGastos").addEventListener("click", function(){
    mostrarGastos(contenedorInfo, tituloInfo, contenedorFormularios);
    formulariosAgregadosInicioSesion = false;
});

document.getElementById("botonIngresos").addEventListener("click", function(){
    mostrarIngresos(contenedorInfo, tituloInfo, contenedorFormularios)
    formulariosAgregadosInicioSesion = false;
});

document.getElementById("botonDatosEstadisticos").addEventListener("click", function(){
    mostrarDatosEstadisticos(contenedorInfo, tituloInfo, contenedorFormularios);
    formulariosAgregadosInicioSesion = false;
});

document.getElementById("botonSobreNosotros").addEventListener("click", function(){
    mostrarSobreNosotros(contenedorInfo, tituloInfo, contenedorFormularios);
    formulariosAgregadosInicioSesion = false;
});
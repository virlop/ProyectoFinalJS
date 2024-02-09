//----------------------VARIABLES------------------------------------------------------

let categorias = [];
let gastos = [];
let ingresos = [];
let registroCompleto = [];
let usuarios = [];
let usuarioActual;

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
    constructor(email, contrasena){
        this.email = email;
        this.contrasena = contrasena;
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
        let contrasena = inputContrasena.value;
        let usuarioEncontrado = JSON.parse(localStorage.getItem(email));
        
        if (usuarioEncontrado && usuarioEncontrado.contrasena == contrasena) {
            contenedorFormularios.innerHTML = "";
            usuarioActual = new Usuario(email,contrasena);
            usuarios.push(usuarioActual);
            alert("Inicio de sesión exitoso");
            alert(usuarioActual.Categoria);
        
        } else {
            alert("Usuario no registrado / email o contraseña incorrectos");
        }

    })

}

function crearUsuario(contenedorFormularios){
    contenedorFormularios.innerHTML = "";
    let inputEmailLabel = document.createElement("label");
    inputEmailLabel.classList.add("form-label", "m-2");
    inputEmailLabel.innerHTML = "Ingresa tu mail para crear una cuenta nueva";
    contenedorFormularios.appendChild(inputEmailLabel);
    let inputEmail = document.createElement("input")
    inputEmail.classList.add("form-control", "m-2", "formulario");
    contenedorFormularios.appendChild(inputEmail);

    let inputContrasenaLabel =  document.createElement("label");
    inputContrasenaLabel.classList.add("form-label", "m-2");
    inputContrasenaLabel.innerHTML= "Ingresa la contraseña de tu nueva cuenta";
    contenedorFormularios.appendChild(inputContrasenaLabel);

    let inputContrasena = document.createElement("input")
    inputContrasena.classList.add("form-control", "m-2", "formulario");
    contenedorFormularios.appendChild(inputContrasena);

    let crearCuentaBoton = document.createElement("button");
    crearCuentaBoton.setAttribute("type", "button");
    crearCuentaBoton.classList.add("btn", "btn-secondary", "m-2");
    crearCuentaBoton.innerHTML = "Crear cuenta";
    contenedorFormularios.appendChild(crearCuentaBoton);

    crearCuentaBoton.addEventListener("click", function(){
        let email = inputEmail.value;
        let contrasena = inputContrasena.value;
        if (email && contrasena) {
            let nuevoUsuario = new Usuario(email,contrasena);
        localStorage.setItem(email, JSON.stringify(nuevoUsuario));
        contenedorFormularios = "";
        alert("Cuenta creada con éxito");
        
        } else {
            alert("Ingrese usuario o contraseña validos");
        }
        
    })

}

function mostrarGastos(contenedorInfo, tituloInfo, contenedorFormularios){
    limpiar(contenedorInfo, tituloInfo, contenedorFormularios);
    if (usuarioActual) {
        
        tituloInfo.innerHTML = "Estos son tus gastos";

        let tablaGastos = document.createElement("table");
        tablaGastos.classList.add("table");
        contenedorFormularios.appendChild(tablaGastos);
        
        let theadGastos = document.createElement("thead");
        tablaGastos.appendChild(theadGastos);

        let trGastos = document.createElement("tr");
        theadGastos.appendChild(trGastos);

        let thGastosMonto = document.createElement("th");
        thGastosMonto.setAttribute("scope", "col");
        thGastosMonto.innerHTML = "Monto";

        let thGastosFecha = document.createElement("th");
        thGastosFecha.setAttribute("scope", "col");
        thGastosFecha.innerHTML = "Fecha";

        let thGastosCategoria = document.createElement("th");
        thGastosCategoria.setAttribute("scope", "col");
        thGastosCategoria.innerHTML = "Categoria";

        let thGastosDescripcion = document.createElement("th");
        thGastosDescripcion.setAttribute("scope", "col");
        thGastosDescripcion.innerHTML = "Descripcion";

        trGastos.appendChild(thGastosMonto);
        trGastos.appendChild(thGastosDescripcion);
        trGastos.appendChild(thGastosCategoria);
        trGastos.appendChild(thGastosFecha);

        let thBody = document.createElement("tbody");
        tablaGastos.appendChild(thBody);

        usuarioActual.gastos.forEach(gasto => {
        let trGasto = document.createElement("tr");
        thBody.appendChild(trGasto);

        let thGastosMonto = document.createElement("th");
        let tdGastosDescripcion =  Document.createElement("td");
        let tdGastosCategoria =  Document.createElement("td");
        let tdGastosFecha =  Document.createElement("td");

        thGastosMonto.setAttribute("scope", "row");
        thGastosMonto.innerHTML = `${gasto.monto}`;



        
        });
        
    } else {
        let textoGastos = document.createElement("p");
        textoGastos.innerHTML = "Debes iniciar sesion";
        contenedorInfo.appendChild(textoGastos);

    }
    


    //agregar nuevos gastos
    let inputGastoMontoLabel =  document.createElement("label");
    inputGastoMontoLabel.classList.add("form-label", "m-2");
    inputGastoMontoLabel.innerHTML= "Ingrese el monto";
    contenedorFormularios.appendChild(inputGastoMontoLabel);

    let inputGastoMonto = document.createElement("input")
    inputGastoMonto.classList.add("form-control", "m-2", "formulario");
    contenedorFormularios.appendChild(inputGastoMonto);

    let inputGastoCategoriaLabel =  document.createElement("label");
    inputGastoCategoriaLabel.classList.add("form-label", "m-2");
    inputGastoCategoriaLabel.innerHTML = "Ingrese la categoria";
    contenedorFormularios.appendChild(inputGastoCategoriaLabel);

    let inputGastoCategoria = document.createElement("input")
    inputGastoMonto.classList.add("form-control", "m-2", "formulario");
    contenedorFormularios.appendChild(inputGastoCategoria);

    let inputGastoDescripLabel =  document.createElement("label");
    inputGastoDescripLabel.classList.add("form-label", "m-2");
    inputGastoDescripLabel.innerHTML= "Ingrese la descripcion";
    contenedorFormularios.appendChild(inputGastoDescripLabel);

    let inputGastoDescrip = document.createElement("input")
    inputGastoDescrip.classList.add("form-control", "m-2", "formulario");
    contenedorFormularios.appendChild(inputGastoDescrip);

    let botonAgregarGasto = document.createElement("button");
    botonAgregarGasto.setAttribute("type", "button");
    botonAgregarGasto.classList.add("btn", "btn-secondary", "m-2");
    botonAgregarGasto.innerHTML = "Agregar gasto";
    contenedorFormularios.appendChild(botonAgregarGasto);

    botonAgregarGasto.addEventListener("click", function(){
        if(usuarioActual){
            let gasto =  new Gasto(inputGastoMonto.value, inputGastoCategoria.value, inputGastoDescrip.value);
            usuarioActual.agregarGasto(gasto);
            localStorage.setItem(usuarioActual.email,JSON.stringify(usuarioActual));
            alert("Gasto agregado!");
            
        }else{
            alert("Debe iniciar sesion");
        }
        
    })

    
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
let formulariosAgregadosUnirse = false;


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
        if (!formulariosAgregadosUnirse) {
            crearUsuario(contenedorFormularios);
            formulariosAgregadosUnirse = true;
        } 
    });

})
document.getElementById("botonGastos").addEventListener("click", function(){
    mostrarGastos(contenedorInfo, tituloInfo, contenedorFormularios);
    formulariosAgregadosInicioSesion = false;
    formulariosAgregadosUnirse = false;

});

document.getElementById("botonIngresos").addEventListener("click", function(){
    mostrarIngresos(contenedorInfo, tituloInfo, contenedorFormularios)
    formulariosAgregadosInicioSesion = false;
    formulariosAgregadosUnirse = false;
});

document.getElementById("botonDatosEstadisticos").addEventListener("click", function(){
    mostrarDatosEstadisticos(contenedorInfo, tituloInfo, contenedorFormularios);
    formulariosAgregadosInicioSesion = false;
    formulariosAgregadosUnirse = false;
});

document.getElementById("botonSobreNosotros").addEventListener("click", function(){
    mostrarSobreNosotros(contenedorInfo, tituloInfo, contenedorFormularios);
    formulariosAgregadosInicioSesion = false;
    formulariosAgregadosUnirse = false;
});
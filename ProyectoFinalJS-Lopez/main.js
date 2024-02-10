
//----------------------VARIABLES------------------------------------------------------

let usuarioActual;
let contenedorUsuario = document.getElementById("contenedorUsuario");
let tituloInfo = document.getElementById("tituloInfo");
let contenedorGastos = document.getElementById("contenedorGastos");
let contenedorIngresos =  document.getElementById("contenedorIngresos");
let contenedorDE = document.getElementById("contenedorDE");
let contenedorSN =  document.getElementById("contenedorSN");
let contenedorAgregarGasto = document.getElementById("contenedorAgregarGasto");
let contenedorTablaGastos = document.getElementById("contenedorTablaGastos");

//----------------------CLASES------------------------------------------------------


class Gasto{
    constructor(monto, categoria, descripcion){
        if (monto > 0) {
            this.monto = -monto;
        }else{
            this.monto = monto;
        }
        this.fecha = new Date();
        this.categoria = categoria;
        this.descripcion = descripcion;
    }
}

class Ingreso{
    constructor(monto, categoria, descripcion){
        if (monto < 0) {
            this.monto = -monto;
        }else{
            this.monto = monto;
        }
        this.categoria = categoria;
        this.descripcion = descripcion;
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

function mostrarFecha(fecha){
    return "Mes: " + (fecha.getMonth() + 1) + ", Día: " + fecha.getDate() + ", Año: " + fecha.getFullYear();
}

function iniciarSesión(){
    limpiar();
    tituloInfo.innerHTML = "Inicia sesión"

    let inputEmailLabel = document.createElement("label");
    inputEmailLabel.classList.add("form-label", "m-2");
    inputEmailLabel.innerHTML = "Ingresa tu mail";
    contenedorUsuario.appendChild(inputEmailLabel);

    let inputEmail = document.createElement("input")
    inputEmail.classList.add("form-control", "m-2", "formulario");
    contenedorUsuario.appendChild(inputEmail);

    let inputContrasenaLabel =  document.createElement("label");
    inputContrasenaLabel.classList.add("form-label", "m-2");
    inputContrasenaLabel.innerHTML= "Ingresa la contraseña";
    contenedorUsuario.appendChild(inputContrasenaLabel);

    let inputContrasena = document.createElement("input")
    inputContrasena.classList.add("form-control", "m-2", "formulario");
    contenedorUsuario.appendChild(inputContrasena);

    let entrarBoton = document.createElement("button");
    entrarBoton.setAttribute("type", "button");
    entrarBoton.classList.add("btn", "btn-secondary", "m-2");
    entrarBoton.innerHTML = "Entrar";
    contenedorUsuario.appendChild(entrarBoton);

    entrarBoton.addEventListener("click", function(){
        let correo = inputEmail.value;
        let password = inputContrasena.value;
        let usuarioEncontrado = JSON.parse(localStorage.getItem(correo));
        
        if (usuarioEncontrado && usuarioEncontrado.contrasena == password) {
            usuarioActual = new Usuario(usuarioEncontrado.email, usuarioEncontrado.contrasena);
            alert("Inicio de sesión exitoso");
            limpiar();
            tituloInfo.innerHTML = "BIENVENIDO";
        
        } else {
            alert("Usuario no registrado / email o contraseña incorrectos");
        }

    })

}

function crearUsuario(){
    limpiar();
    tituloInfo.innerHTML = "Únete"

    let inputEmailLabel = document.createElement("label");
    inputEmailLabel.classList.add("form-label", "m-2");
    inputEmailLabel.innerHTML = "Ingresa tu mail para crear una cuenta nueva";
    contenedorUsuario.appendChild(inputEmailLabel);

    let inputEmail = document.createElement("input")
    inputEmail.classList.add("form-control", "m-2", "formulario");
    contenedorUsuario.appendChild(inputEmail);

    let inputContrasenaLabel =  document.createElement("label");
    inputContrasenaLabel.classList.add("form-label", "m-2");
    inputContrasenaLabel.innerHTML= "Ingresa la contraseña de tu nueva cuenta";
    contenedorUsuario.appendChild(inputContrasenaLabel);

    let inputContrasena = document.createElement("input")
    inputContrasena.classList.add("form-control", "m-2", "formulario");
    contenedorUsuario.appendChild(inputContrasena);

    let crearCuentaBoton = document.createElement("button");
    crearCuentaBoton.setAttribute("type", "button");
    crearCuentaBoton.classList.add("btn", "btn-secondary", "m-2");
    crearCuentaBoton.innerHTML = "Crear cuenta";
    contenedorUsuario.appendChild(crearCuentaBoton);

    crearCuentaBoton.addEventListener("click", function(){

        let correo = inputEmail.value;
        let password = inputContrasena.value;

        if (correo && password) {
            limpiar();
            let nuevoUsuario = new Usuario(correo,password);
            localStorage.setItem(correo, JSON.stringify(nuevoUsuario));
            alert("Cuenta creada con éxito");
            tituloInfo.innerHTML = "Ya podes iniciar sesión con tu cuenta nueva";
        } else {
            alert("Ingrese usuario o contraseña validos");
        }
    })
}

function mostrarGastos(){
    limpiar();
    if(usuarioActual){
    tituloInfo.innerHTML = "Estos son tus Gastos";

    //muestro los gastos del usuario
    let tableGastos = document.createElement("table");
    tableGastos.classList.add("table");
    let theadTableGastos = document.createElement("thead");
    let tbodyTableGastos = document.createElement("tbody");

    let trTableGastos = document.createElement("tr");

    let thMonto = document.createElement("th");
    thMonto.setAttribute("scope", "col");
    thMonto.innerHTML = "MONTO";

    let thFecha = document.createElement("th");
    thFecha.setAttribute("scope", "col");
    thFecha.innerHTML = "FECHA";

    let thDescripcion = document.createElement("th");
    thDescripcion.setAttribute("scope", "col");
    thDescripcion.innerHTML = "DESCRIPCIÓN";

    let thCategoria = document.createElement("th");
    thCategoria.setAttribute("scope", "col");
    thCategoria.innerHTML = "CATEGORIA";

    let arregloHeadTable = [];
    arregloHeadTable.push(thMonto, thFecha, thDescripcion, thCategoria);

    arregloHeadTable.forEach(th => {
        trTableGastos.appendChild(th);
    });

    let usuario = JSON.parse(localStorage.getItem(usuarioActual.email));

    if(usuario.gastos.length == 0){
            contenedorTablaGastos.innerHTML = "No hay gastos registrados";
    }else{
            
            usuario.gastos.forEach(gasto => {

            let trGastoUsuario = document.createElement("tr");

            let thGastoUsuarioMonto = document.createElement("th");
            thGastoUsuarioMonto.setAttribute("scope", "row");
            thGastoUsuarioMonto.innerHTML = `${gasto.monto}`;

            let tdGastoUsuarioFecha = document.createElement("td");
            tdGastoUsuarioFecha.innerHTML = `${mostrarFecha(new Date(gasto.fecha))}`;
            

            let tdGastoUsuarioDescripcion = document.createElement("td");
            tdGastoUsuarioDescripcion.innerHTML = `${gasto.descripcion}`;

            let tdGastoUsuarioCategoria = document.createElement("td");
            tdGastoUsuarioCategoria.innerHTML = `${gasto.categoria}`;

            trGastoUsuario.appendChild(thGastoUsuarioMonto);
            trGastoUsuario.appendChild(tdGastoUsuarioFecha);
            trGastoUsuario.appendChild(tdGastoUsuarioDescripcion);
            trGastoUsuario.appendChild(tdGastoUsuarioCategoria);
            tbodyTableGastos.appendChild(trGastoUsuario);
            theadTableGastos.appendChild(trTableGastos);
            tableGastos.appendChild(theadTableGastos);
            tableGastos.appendChild(tbodyTableGastos);
            contenedorTablaGastos.appendChild(tableGastos);
        });
    }

    contenedorGastos.appendChild(contenedorTablaGastos);

    //boton para agregar nuevos gastos
    let inputGastoMontoLabel =  document.createElement("label");
    inputGastoMontoLabel.classList.add("form-label", "m-2");
    inputGastoMontoLabel.innerHTML= "Ingrese el monto";
    contenedorAgregarGasto.appendChild(inputGastoMontoLabel);

    let inputGastoMonto = document.createElement("input")
    inputGastoMonto.classList.add("form-control", "m-2", "formulario");
    contenedorAgregarGasto.appendChild(inputGastoMonto);

    let inputGastoCategoriaLabel =  document.createElement("label");
    inputGastoCategoriaLabel.classList.add("form-label", "m-2");
    inputGastoCategoriaLabel.innerHTML = "Ingrese la categoria";
    contenedorAgregarGasto.appendChild(inputGastoCategoriaLabel);

    let inputGastoCategoria = document.createElement("input")
    inputGastoMonto.classList.add("form-control", "m-2", "formulario");
    contenedorAgregarGasto.appendChild(inputGastoCategoria);

    let inputGastoDescripLabel =  document.createElement("label");
    inputGastoDescripLabel.classList.add("form-label", "m-2");
    inputGastoDescripLabel.innerHTML= "Ingrese la descripcion";
    contenedorAgregarGasto.appendChild(inputGastoDescripLabel);

    let inputGastoDescrip = document.createElement("input")
    inputGastoDescrip.classList.add("form-control", "m-2", "formulario");
    contenedorAgregarGasto.appendChild(inputGastoDescrip);

    let botonAgregarGasto = document.createElement("button");
    botonAgregarGasto.setAttribute("type", "button");
    botonAgregarGasto.classList.add("btn", "btn-secondary", "m-2");
    botonAgregarGasto.innerHTML = "Agregar gasto";
    contenedorAgregarGasto.appendChild(botonAgregarGasto);

    contenedorGastos.appendChild(contenedorAgregarGasto);

    botonAgregarGasto.addEventListener("click", function(){
        let monto = inputGastoMonto.value;
        let categoria = inputGastoCategoria.value;
        let descripcion = inputGastoDescrip.value;
        let gastoUsuario = new Gasto(monto, categoria, descripcion);
        let usuarioInstancia = new Usuario(usuario.email, usuario.contrasena);

        usuario.gastos.forEach(gastoObtenido => {
            usuarioInstancia.agregarGasto(gastoObtenido);
        });

        usuarioInstancia.agregarGasto(gastoUsuario);
        localStorage.setItem(usuario.email, JSON.stringify(usuarioInstancia));
        alert("Gasto agregado correctamente, Toca el botón 'Registro de gastos' para actualizar");
    })

    }else{
        tituloInfo.innerHTML = "Debes iniciar sesión";
    } //cierra el if
}
function mostrarIngresos(){
    limpiar();
    tituloInfo.innerHTML = "Estos son tus Ingresos";
}
function mostrarDatosEstadisticos(){
    limpiar();
    tituloInfo.innerHTML = "Datos estadísticos sobre tus registros";
}
function mostrarSobreNosotros(){
    limpiar();
    tituloInfo.innerHTML = "¿Quienes somos?";
    contenedorSN.innerHTML = "¡Hola! Soy Virginia, estudiante de ingeniería en sistemas y la creadora apasionada detrás de MoneyMind, tu gestor de finanzas personales. ¿Por qué un gestor de finanzas? Porque como entusiasta de la tecnología y amante de la programación, comprendo la importancia de optimizar nuestras finanzas personales en un mundo cada vez más digitalizado. Mi plataforma está diseñada pensando en ti, para simplificar la gestión de tus ingresos, gastos, y metas financieras.  ¡Gracias por ser parte de esta comunidad!";
}

function limpiar(){
    contenedorUsuario.innerHTML = "";
    contenedorGastos.innerHTML = "";
    contenedorIngresos.innerHTML = "";
    contenedorDE.innerHTML = "";
    contenedorSN.innerHTML = "";
    tituloInfo.innerHTML = "";
    contenedorTablaGastos.innerHTML = "";
    contenedorAgregarGasto.innerHTML = "";
}

//----------------------FLUJO------------------------------------------------------


//---boton de inicio de sesion - crear cuenta--------
document.getElementById("botonIniciarSesion").addEventListener("click", function(){
    limpiar();
    tituloInfo.innerHTML = "Iniciar sesión o unirse";

    //boton de inicio de sesion
    let botonInicioSesion = document.createElement("button");
    botonInicioSesion.setAttribute("type", "button");
    botonInicioSesion.classList.add("btn", "btn-primary", "m-2");
    botonInicioSesion.innerHTML = "Iniciar sesión";
    contenedorUsuario.appendChild(botonInicioSesion);
    botonInicioSesion.addEventListener("click", function(){
            iniciarSesión();
    });

    //boton unirse
    let botonUnirse =  document.createElement("button");
    botonUnirse.setAttribute("type", "button");
    botonUnirse.classList.add("btn", "btn-primary", "m-2");
    botonUnirse.innerHTML = "Quiero unirme";
    contenedorUsuario.appendChild(botonUnirse);
    botonUnirse.addEventListener("click", function(){
            crearUsuario();
    });

})

//--------boton de registro de gastos--------
document.getElementById("botonGastos").addEventListener("click", function(){
    mostrarGastos();
});

//---boton de registro de ingresos--------
document.getElementById("botonIngresos").addEventListener("click", function(){
    mostrarIngresos();
});

//---boton de datos estadisticos--------
document.getElementById("botonDatosEstadisticos").addEventListener("click", function(){
    mostrarDatosEstadisticos();
});

//---boton sobre nosotros--------
document.getElementById("botonSobreNosotros").addEventListener("click", function(){
    mostrarSobreNosotros();
});
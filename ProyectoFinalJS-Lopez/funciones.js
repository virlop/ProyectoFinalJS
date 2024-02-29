
import { contenedorUsuario, tituloInfo, contenedorGastos, contenedorIngresos, contenedorDE, contenedorSN, contenedorAgregarGasto, contenedorTablaIngresos, contenedorAgregarIngreso, contenedorTablaGastos, Gasto, Ingreso, Usuario } from "./main.js";
export let usuarioActual;
export let usuarioEncontrado;

//----------------------FUNCIONES------------------------------------------------------

export function mostrarFecha(fecha) {
    return (
        "Mes: " +
        (fecha.getMonth() + 1) +
        ", Día: " +
        fecha.getDate() +
        ", Año: " +
        fecha.getFullYear()
    );
}

export async function iniciarSesión() {
    let correo;
    let contrasena;
    const { value: email } = await Swal.fire({
        title: "¡Bienvenido nuevamente!",
        input: "email",
        inputLabel: "Ingresá tu mail para entrar a tu cuenta",
        inputPlaceholder: "Enter your email address",
        });
        if (email) {
            correo = email;
        }

    const { value: password } = await Swal.fire({
        title: "¡Bienvenido nuevamente!",
        input: "password",
        inputLabel: "Ahora ingresá la contraseña de tu cuenta",
        inputPlaceholder: "Contraseña",
        inputAttributes: {
        maxlength: "10",
        autocapitalize: "off",
        autocorrect: "off",
        },
        });
        if (password) {
            contrasena = password;
            usuarioEncontrado = JSON.parse(localStorage.getItem(correo));
            if(usuarioEncontrado && usuarioEncontrado.contrasena == contrasena){
                usuarioActual = new Usuario(usuarioEncontrado.email, usuarioEncontrado.contrasena);
                limpiar();
                tituloInfo.innerHTML = "Sesión iniciada";
                Swal.fire({
                    title: "¡Bienvenido!",
                    text: "Iniciaste sesión correctamente",
                    icon: "success"
                    });
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Datos incorrectos",
                    text: "Mail y/o contraseña incorrectos",
                    });
            }
        }
    
}

export function crearUsuario() {
    limpiar();
    tituloInfo.innerHTML = "Únete";

    let inputEmailLabel = document.createElement("label");
    inputEmailLabel.classList.add("form-label", "m-2");
    inputEmailLabel.innerHTML = "Ingresa tu mail para crear una cuenta nueva";
    contenedorUsuario.appendChild(inputEmailLabel);

    let inputEmail = document.createElement("input");
    inputEmail.classList.add("form-control", "m-2", "formulario");
    contenedorUsuario.appendChild(inputEmail);

    let inputContrasenaLabel = document.createElement("label");
    inputContrasenaLabel.classList.add("form-label", "m-2");
    inputContrasenaLabel.innerHTML = "Ingresa la contraseña de tu nueva cuenta";
    contenedorUsuario.appendChild(inputContrasenaLabel);

    let inputContrasena = document.createElement("input");
    inputContrasena.classList.add("form-control", "m-2", "formulario");
    contenedorUsuario.appendChild(inputContrasena);

    let crearCuentaBoton = document.createElement("button");
    crearCuentaBoton.setAttribute("type", "button");
    crearCuentaBoton.classList.add("btn", "btn-secondary", "m-2");
    crearCuentaBoton.innerHTML = "Crear cuenta";
    contenedorUsuario.appendChild(crearCuentaBoton);

    crearCuentaBoton.addEventListener("click", function () {
        let correo = inputEmail.value;
        let password = inputContrasena.value;

        if (correo && password) {
            limpiar();
            let nuevoUsuario = new Usuario(correo, password);
            localStorage.setItem(correo, JSON.stringify(nuevoUsuario));
            alert("Cuenta creada con éxito");
            tituloInfo.innerHTML = "Ya podes iniciar sesión con tu cuenta nueva";
        } else {
            alert("Ingrese usuario o contraseña validos");
        }
    });
}

export function mostrarGastos() {
    limpiar();
    if (usuarioActual) {
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

        arregloHeadTable.forEach((th) => {
            trTableGastos.appendChild(th);
        });

        let usuario = JSON.parse(localStorage.getItem(usuarioActual.email));

        if (usuario.gastos.length == 0) {
            contenedorTablaGastos.innerHTML = "No hay gastos registrados";
        } else {
            usuario.gastos.forEach((gasto) => {
                let trGastoUsuario = document.createElement("tr");

                let thGastoUsuarioMonto = document.createElement("th");
                thGastoUsuarioMonto.setAttribute("scope", "row");
                thGastoUsuarioMonto.innerHTML = `${gasto.monto}`;

                let tdGastoUsuarioFecha = document.createElement("td");
                tdGastoUsuarioFecha.innerHTML = `${mostrarFecha(
                    new Date(gasto.fecha)
                )}`;

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
        let inputGastoMontoLabel = document.createElement("label");
        inputGastoMontoLabel.classList.add("form-label", "m-2");
        inputGastoMontoLabel.innerHTML = "Ingrese el monto";
        contenedorAgregarGasto.appendChild(inputGastoMontoLabel);

        let inputGastoMonto = document.createElement("input");
        inputGastoMonto.classList.add("form-control", "m-2", "formulario");
        contenedorAgregarGasto.appendChild(inputGastoMonto);

        let inputGastoCategoriaLabel = document.createElement("label");
        inputGastoCategoriaLabel.classList.add("form-label", "m-2");
        inputGastoCategoriaLabel.innerHTML = "Ingrese la categoria";
        contenedorAgregarGasto.appendChild(inputGastoCategoriaLabel);

        let inputGastoCategoria = document.createElement("input");
        inputGastoMonto.classList.add("form-control", "m-2", "formulario");
        contenedorAgregarGasto.appendChild(inputGastoCategoria);

        let inputGastoDescripLabel = document.createElement("label");
        inputGastoDescripLabel.classList.add("form-label", "m-2");
        inputGastoDescripLabel.innerHTML = "Ingrese la descripcion";
        contenedorAgregarGasto.appendChild(inputGastoDescripLabel);

        let inputGastoDescrip = document.createElement("input");
        inputGastoDescrip.classList.add("form-control", "m-2", "formulario");
        contenedorAgregarGasto.appendChild(inputGastoDescrip);

        let botonAgregarGasto = document.createElement("button");
        botonAgregarGasto.setAttribute("type", "button");
        botonAgregarGasto.classList.add("btn", "btn-secondary", "m-2");
        botonAgregarGasto.innerHTML = "Agregar gasto";
        contenedorAgregarGasto.appendChild(botonAgregarGasto);

        contenedorGastos.appendChild(contenedorAgregarGasto);

        botonAgregarGasto.addEventListener("click", function () {
            let monto = parseFloat(inputGastoMonto.value);
            let categoria = inputGastoCategoria.value;
            let descripcion = inputGastoDescrip.value;
            let gastoUsuario = new Gasto(monto, categoria, descripcion);
            let usuarioInstancia = new Usuario(usuario.email, usuario.contrasena);

            usuario.gastos.forEach((gastoObtenido) => {
                usuarioInstancia.agregarGasto(gastoObtenido);
            });
            usuario.ingresos.forEach((ingresoObtenido) => {
                usuarioInstancia.agregarIngreso(ingresoObtenido);
            });

            usuarioInstancia.agregarGasto(gastoUsuario);
            localStorage.setItem(usuario.email, JSON.stringify(usuarioInstancia));
            alert(
                "Gasto agregado correctamente, Toca el botón 'Registro de gastos' para actualizar"
            );
        });
    } else {
        Swal.fire("Debes iniciar sesión para ver tus gastos");
    } //cierra el if
}

export function mostrarIngresos() {
    limpiar();
    if (usuarioActual) {
        tituloInfo.innerHTML = "Estos son tus Ingresos";

        //muestro los ingresos del usuario
        let tableIngresos = document.createElement("table");
        tableIngresos.classList.add("table");
        let theadTableIngresos = document.createElement("thead");
        let tbodyTableIngresos = document.createElement("tbody");

        let trTableIngresos = document.createElement("tr");

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

        arregloHeadTable.forEach((th) => {
            trTableIngresos.appendChild(th);
        });

        let usuario = JSON.parse(localStorage.getItem(usuarioActual.email));

        if (usuario.ingresos.length == 0) {
            contenedorTablaIngresos.innerHTML = "No hay ingresos registrados";
        } else {
            usuario.ingresos.forEach((ingreso) => {
                let trIngresoUsuario = document.createElement("tr");

                let thIngresoUsuarioMonto = document.createElement("th");
                thIngresoUsuarioMonto.setAttribute("scope", "row");
                thIngresoUsuarioMonto.innerHTML = `${ingreso.monto}`;

                let tdIngresoUsuarioFecha = document.createElement("td");
                tdIngresoUsuarioFecha.innerHTML = `${mostrarFecha(
                    new Date(ingreso.fecha)
                )}`;

                let tdIngresoUsuarioDescripcion = document.createElement("td");
                tdIngresoUsuarioDescripcion.innerHTML = `${ingreso.descripcion}`;

                let tdIngresoUsuarioCategoria = document.createElement("td");
                tdIngresoUsuarioCategoria.innerHTML = `${ingreso.categoria}`;

                trIngresoUsuario.appendChild(thIngresoUsuarioMonto);
                trIngresoUsuario.appendChild(tdIngresoUsuarioFecha);
                trIngresoUsuario.appendChild(tdIngresoUsuarioDescripcion);
                trIngresoUsuario.appendChild(tdIngresoUsuarioCategoria);
                tbodyTableIngresos.appendChild(trIngresoUsuario);
                theadTableIngresos.appendChild(trTableIngresos);
                tableIngresos.appendChild(theadTableIngresos);
                tableIngresos.appendChild(tbodyTableIngresos);
                contenedorTablaIngresos.appendChild(tableIngresos);
            });
        }

        contenedorIngresos.appendChild(contenedorTablaIngresos);

        //boton para agregar nuevos ingresos
        let inputIngresoMontoLabel = document.createElement("label");
        inputIngresoMontoLabel.classList.add("form-label", "m-2");
        inputIngresoMontoLabel.innerHTML = "Ingrese el monto";
        contenedorAgregarIngreso.appendChild(inputIngresoMontoLabel);

        let inputIngresoMonto = document.createElement("input");
        inputIngresoMonto.classList.add("form-control", "m-2", "formulario");
        contenedorAgregarIngreso.appendChild(inputIngresoMonto);

        let inputIngresoCategoriaLabel = document.createElement("label");
        inputIngresoCategoriaLabel.classList.add("form-label", "m-2");
        inputIngresoCategoriaLabel.innerHTML = "Ingrese la categoria";
        contenedorAgregarIngreso.appendChild(inputIngresoCategoriaLabel);

        let inputIngresoCategoria = document.createElement("input");
        inputIngresoMonto.classList.add("form-control", "m-2", "formulario");
        contenedorAgregarIngreso.appendChild(inputIngresoCategoria);

        let inputIngresoDescripLabel = document.createElement("label");
        inputIngresoDescripLabel.classList.add("form-label", "m-2");
        inputIngresoDescripLabel.innerHTML = "Ingrese la descripcion";
        contenedorAgregarIngreso.appendChild(inputIngresoDescripLabel);

        let inputIngresoDescrip = document.createElement("input");
        inputIngresoDescrip.classList.add("form-control", "m-2", "formulario");
        contenedorAgregarIngreso.appendChild(inputIngresoDescrip);

        let botonAgregarIngreso = document.createElement("button");
        botonAgregarIngreso.setAttribute("type", "button");
        botonAgregarIngreso.classList.add("btn", "btn-secondary", "m-2");
        botonAgregarIngreso.innerHTML = "Agregar ingreso";
        contenedorAgregarIngreso.appendChild(botonAgregarIngreso);

        contenedorIngresos.appendChild(contenedorAgregarIngreso);

        botonAgregarIngreso.addEventListener("click", function () {
            let monto = parseFloat(inputIngresoMonto.value);
            let categoria = inputIngresoCategoria.value;
            let descripcion = inputIngresoDescrip.value;
            let ingresoUsuario = new Ingreso(monto, categoria, descripcion);
            let usuarioInstancia = new Usuario(usuario.email, usuario.contrasena);

            usuario.ingresos.forEach((ingresoObtenido) => {
                usuarioInstancia.agregarIngreso(ingresoObtenido);
            });
            usuario.gastos.forEach((gastoObtenido) => {
                usuarioInstancia.agregarGasto(gastoObtenido);
            });

            usuarioInstancia.agregarIngreso(ingresoUsuario);
            localStorage.setItem(usuario.email, JSON.stringify(usuarioInstancia));
            alert(
                "Ingreso agregado correctamente, Toca el botón 'Registro de ingresos' para actualizar"
            );
        });
    } else {
        Swal.fire("Debes iniciar sesión para ver tus Ingresos");
    }
}

export function mostrarDatosEstadisticos() {
    limpiar();
    if (usuarioActual) {
        tituloInfo.innerHTML = "Datos estadísticos sobre tus registros";

        let usuario = JSON.parse(localStorage.getItem(usuarioActual.email));

        //suma de gastos
        let sumaGastosLabel = document.createElement("label");
        sumaGastosLabel.innerHTML = "Suma de todos tus gastos";
        let sumaGastos = 0;
        usuario.gastos.forEach((gasto) => {
            sumaGastos += gasto.monto;
        });
        let sumaGastosMostrar = document.createElement("p");
        sumaGastosMostrar.innerHTML = sumaGastos;
        contenedorDE.appendChild(sumaGastosLabel);
        contenedorDE.appendChild(sumaGastosMostrar);

        //suma de ingresos
        let sumaIngresosLabel = document.createElement("label");
        sumaIngresosLabel.innerHTML = "Suma de todos tus ingresos";
        let sumaIngresos = 0;
        usuario.ingresos.forEach((ingreso) => {
            sumaIngresos += ingreso.monto;
        });
        let sumaIngresosMostrar = document.createElement("p");
        sumaIngresosMostrar.innerHTML = sumaIngresos;
        contenedorDE.appendChild(sumaIngresosLabel);
        contenedorDE.appendChild(sumaIngresosMostrar);

        //balance total
        let balanceTotalLabel = document.createElement("label");
        balanceTotalLabel.innerHTML = "Balance total";
        let balanceTotal = sumaIngresos + sumaGastos; //es suma porque los ingresos ya son negativos
        let balanceTotalMostrar = document.createElement("p");
        balanceTotalMostrar.innerHTML = balanceTotal;
        contenedorDE.appendChild(balanceTotalLabel);
        contenedorDE.appendChild(balanceTotalMostrar);

        let avisoSituacion = document.createElement("p");
        balanceTotal < 0
            ? (avisoSituacion.innerHTML =
                "Tus gastos son mayores a tus ingresos, cuidado!")
            : (avisoSituacion.innerHTML =
                "Tus gastos son menores a los ingresos, bien!");
        contenedorDE.appendChild(avisoSituacion);
    } else {
        Swal.fire("Debes iniciar sesión para ver tus datos estadísticos");
    }
}

export function mostrarSobreNosotros() {
    limpiar();
    tituloInfo.innerHTML = "¿Quienes somos?";
    tituloInfo.classList.add("text-center");
    contenedorSN.innerHTML =
        "¡Hola! Soy Virginia, estudiante de ingeniería en sistemas y la creadora apasionada detrás de MoneyMind, tu gestor de finanzas personales. ¿Por qué un gestor de finanzas? Porque como entusiasta de la tecnología y amante de la programación, comprendo la importancia de optimizar nuestras finanzas personales en un mundo cada vez más digitalizado. Mi plataforma está diseñada pensando en ti, para simplificar la gestión de tus ingresos, gastos, y metas financieras.  ¡Gracias por ser parte de esta comunidad!";
}

export function limpiar() {
    contenedorUsuario.innerHTML = "";
    contenedorGastos.innerHTML = "";
    contenedorIngresos.innerHTML = "";
    contenedorDE.innerHTML = "";
    contenedorSN.innerHTML = "";
    tituloInfo.innerHTML = "";
    contenedorTablaGastos.innerHTML = "";
    contenedorAgregarGasto.innerHTML = "";
    contenedorTablaIngresos.innerHTML = "";
    contenedorAgregarIngreso.innerHTML = "";
}

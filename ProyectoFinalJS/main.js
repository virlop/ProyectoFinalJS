alert("Bienvenido al gestor de gastos. Para salir del menú pulsa 0 en cualquier momento")

//clases
class Categoria{
    constructor(nombreCategoria){
        this.nombreCategoria = nombreCategoria;
    }
}
class Gasto{
    constructor(monto, nombreCategoria){
        if (monto > 0) {
            this.monto = -monto;
        }else{
            this.monto = monto;
        }
        this.fecha = new Date();
        this.Categoria = new Categoria(nombreCategoria);
    }
}

class Ingreso{
    constructor(monto, nombreCategoria){
        if (monto < 0) {
            this.monto = -monto;
        }else{
            this.monto = monto;
        }
        this.fecha = new Date();
        this.Categoria = new Categoria(nombreCategoria);
    }
}
let monto = 0;
let gastos = [];
let ingresos = [];

//funciones
function dineroDisponible(gastos, ingresos){
    let total = 0;
    let totalGastos = 0;
    let totalIngresos = 0;

    gastos.forEach(gasto => {
        totalGastos = totalGastos + gasto.monto;
    });
    alert("El gasto total es " + totalGastos);

    ingresos.forEach(ingreso => {
        totalIngresos = totalIngresos + ingreso.monto;
    });
    alert("El ingreso total es " + totalIngresos);

    total = totalIngresos + totalGastos //porque los gastos ya son -
    alert("El total disponible es " + total);
}


//Gastos
let i = 1;
alert("Ingrese primero los GASTOS");
while(true) {
    monto = parseFloat(prompt("Ingrese el gasto numero " + i));
    if (monto == 0) {
        break;
    }else{
        let nombreCategoria = prompt("A qué categoría pertenece?");
        gastos.push(new Gasto(monto, nombreCategoria));
        i ++;
    }
}
gastos.forEach(element => {
    alert("Gasto de:" + element.monto + " de la categoría " + element.Categoria.nombreCategoria + "," + element.fecha);
});


//Ingresos
let f = 1;
alert("Ingrese ahora los INGRESOS");
while(true) {
    monto = parseFloat(prompt("Ingrese el ingreso numero " + f));
    if (monto == 0) {
        break;
    }else{
        let nombreCategoria = prompt("A qué categoría pertenece?");
        ingresos.push(new Ingreso(monto, nombreCategoria));
        f ++;
    }
}
ingresos.forEach(element => {
    alert("Ingreso de:" + element.monto + " de la categoría " + element.Categoria.nombreCategoria + "," + element.fecha);
});

//muestro resultados
dineroDisponible(gastos, ingresos);






// let montoTotal = Number(prompt("Ingrese su monto inicial total de dinero"));
// let menu = true;

// while (menu) {
//     let monto = Number(prompt("Ingrese un monto. Si es negativo se considera GASTO, si es positivo se considera INGRESO"));
//     montoTotal += monto;
//     menu = evaluaSeguimientoMenu(prompt("Quiere seguir? Ingrese SI o N0").toUpperCase());
// }

// alert(`El monto total es ${montoTotal} `);

// function evaluaSeguimientoMenu(menu) {
//     if (menu == 'SI') {return true};
//     if (menu == 'NO') {return false};
// }

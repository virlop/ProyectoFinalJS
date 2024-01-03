let montoTotal = Number(prompt("Ingrese su monto inicial total de dinero"));
let menu = true;

while (menu) {
    let monto = Number(prompt("Ingrese un monto. Si es negativo se considera GASTO, si es positivo se considera INGRESO"));
    montoTotal += monto;
    menu = evaluaSeguimientoMenu(prompt("Quiere seguir? Ingrese SI o N0").toUpperCase());
}

alert(`El monto total es ${montoTotal} `);

function evaluaSeguimientoMenu(menu) {
    if (menu == 'SI') {return true};
    if (menu == 'NO') {return false};
}

//objeto usuario
class persona {
    constructor(nombre, mail, sueldo, ahorro, extra, objetivo, valorBien) {
        this.nombre = nombre;
        this.mail = mail;
        this.sueldo = sueldo;
        this.ahorro = ahorro;
        this.extra = extra;
        this.objetivo = objetivo;
        this.valorBien = valorBien;
    }
    toString() {
        return `Nombre: ${this.nombre} \nMail: ${this.mail} \nSueldo: ${this.sueldo} \nAhorro: ${this.ahorro} \nIngreso extra anual: ${this.extra} \nBien a adquirir: ${this.objetivo} \nValor del Bien: ${this.valorBien}`;
    }
}
let arrayUsuarios = [];

// array inversiones
class Inversion {
    constructor(denominacion, nivelRiesgo, valor, descripcion, foto) {
        this.denominacion = denominacion;
        this.nivelRiesgo = nivelRiesgo;
        this.valor = valor;
        this.descripcion = descripcion;
        this.foto = foto;
    }
}
class activoDeInversion {
    constructor() {
        this.activo = [];
    }
    agregarInversion(inversion) {
        this.activo.push(inversion);
    }
}

let nacional = new activoDeInversion("Activos dentro del mercado local con los cuales poder ahorrar");
let dolarBlue = new Inversion("Dolar blue", 1, 180, "El Dólar Blue es el dólar que se consigue en el mercado negro o paralelo. Su cotización o valor generalmente es superior a la cotización del oficial y suele aumentar a medida que aumenta el control de cambios o se incrementan las restricciones para la compra de dólares al precio oficial.", "../img/dolar.jpg");
let bitcoin = new Inversion("Bitcoin", 3, 8300000, "Bitcoin es una criptomoneda descentralizada, es decir que no existe una autoridad de control que sea responsable de su emisión y registro de sus movimientos.", "../img/bitcoin.jpg");
let cedearTesla = new Inversion("Tesla cedear", 3, 7500, "Cedears  (Certificados de Depósito Argentinos) de la compañia Tesla. Activo financiero atado al dolar y a la valuación de la empresa en el mercado. Este activo es considerado de riesgo.", "../img/tesla.png");
let cedearApple = new Inversion("Apple cedear", 2, 3500, "Cedears  (Certificados de Depósito Argentinos) de la compañia Apple. Activo financiero atado al dolar y a la valuación de la empresa en el mercado.", "../img/apple.jpg");
let cedearAmazon = new Inversion("Amazon cedear", 2, 4500, "Cedears  (Certificados de Depósito Argentinos) de la compañia Amazon. Activo financiero atado al dolar y a la valuación de la empresa en el mercado.", "../img/amazon.jpg");
let oro = new Inversion("Oro", 1, 55700, "El oro es un metal precioso utilizado como reserva de valor. Se caracteriza por tener poca variación en su cotización y ser resguardo de valor en epocas de inflación. El interés por las materias primas parece que está en auge y hay buenos catalizadores que pueden mantener esta dinámica creciente. Su venta es por gramo.", "../img/oro.jpg");

nacional.agregarInversion(dolarBlue);
nacional.agregarInversion(bitcoin);
nacional.agregarInversion(cedearTesla);
nacional.agregarInversion(cedearApple);
nacional.agregarInversion(cedearAmazon);
nacional.agregarInversion(oro);

const ordenarActivos = () => {
    nacional.activo.sort((a, b) => {
        if (a.valor < b.valor) {
            return -1;
        }
        if (a.valor > b.valor) {
            return 1;
        }
        return 0;
    });
    console.log(nacional.activo);
}
ordenarActivos();

//funciones operaciones matematicas
const multiplicacion = (a, b) => a * b;
const division = (a, b) => a / b;
const suma = (a, b) => a + b;

//formulario cuanto tardo
function crearUsuario(e) {

    e.preventDefault();
    let formulario = e.target;

    let nombreIngresado = document.getElementById('nombre').value;
    let emailIngresado = document.getElementById('email').value;
    let sueldoIngresado = parseInt(document.getElementById('sueldo').value);
    let ahorroIngresado = parseInt(document.getElementById('ahorro').value);
    let extraIngresado = parseInt(document.getElementById('extra').value);
    let objetivoIngresado = document.getElementById('objetivo').value;
    let valorBienIngresado = document.getElementById('valorBien').value;

    let usuario = new persona(nombreIngresado, emailIngresado, sueldoIngresado, ahorroIngresado, extraIngresado, objetivoIngresado, valorBienIngresado);
    arrayUsuarios.push(usuario);
    localStorage.setItem(1, JSON.stringify(arrayUsuarios));
    console.log(usuario)

    let ahorroPorcentaje = division((multiplicacion(100, ahorroIngresado)), sueldoIngresado);
    let ahorroAnual = suma((multiplicacion(ahorroIngresado, 12)), extraIngresado);
    let mesesDeAhorro = division(valorBienIngresado, sueldoIngresado);
    let ahorroReal = division(valorBienIngresado, ahorroIngresado);
    let sueldoAños = division(mesesDeAhorro, 12);
    let ahorroAños = division(ahorroReal, 12);
    let tiempoTotal = division(valorBienIngresado, (suma(extraIngresado, ahorroAnual)));

    let dolarBlueAhorro = division(document.getElementById('ahorro').value, dolarBlue.valor);
    let bitcoinAhorro = division(document.getElementById('ahorro').value, bitcoin.valor);
    let appleAhorro = division(document.getElementById('ahorro').value, cedearApple.valor);
    let amazonAhorro = division(document.getElementById('ahorro').value, cedearAmazon.valor);
    let teslaAhorro = division(document.getElementById('ahorro').value, cedearTesla.valor);
    let oroAhorro = division(document.getElementById('ahorro').value, oro.valor);

    $(document).ready(function() {
        $("#submitButton").click(function(event) {
            $("#cuantoTardo").empty();
            $("#card").empty();
        });
    });

    function tiempo() {
        let tiempoTotal = division(valorBienIngresado, (suma(extraIngresado, ahorroAnual)))
        if (tiempoTotal < 1) {
            tiempoTotal = "menos de un año"
        } else {
            tiempoTotal = `${tiempoTotal.toFixed()} años`
        }
        return tiempoTotal
    }

    function AhorroAños() {
        let ahorroAños = division(ahorroReal, 12)
        if (ahorroAños < 1) {
            ahorroAños = "menos de un año"
        } else {
            ahorroAños = `${ahorroAños.toFixed()} años`
        }
        return ahorroAños
    }

    function SueldoAños() {
        let sueldoAños = division(mesesDeAhorro, 12)
        if (sueldoAños < 1) {
            sueldoAños = "menos de un año"
        } else {
            sueldoAños = `${sueldoAños.toFixed()} años`
        }
        return sueldoAños
    }

    function AhorroReal() {
        let ahorroReal = division(valorBienIngresado, ahorroIngresado)
        if (ahorroReal < 1) {
            ahorroReal = "menos de un mes"
        } else {
            ahorroReal = `${ahorroReal.toFixed()} meses`
        }
        return ahorroReal
    }

    function MesesDeAhorro() {
        let mesesDeAhorro = division(valorBienIngresado, sueldoIngresado);
        if (mesesDeAhorro < 1) {
            mesesDeAhorro = "menos de un mes"
        } else {
            mesesDeAhorro = `${mesesDeAhorro.toFixed()} meses`
        }
        return mesesDeAhorro
    }

    let cuantoTardo = document.getElementById("cuantoTardo");

    switch (true) {
        case (ahorroPorcentaje <= 5):
            let contenedorPorcentajeAhorro1 = document.createElement("div");
            contenedorPorcentajeAhorro1.classList.add('operacionOpciones');
            contenedorPorcentajeAhorro1.innerHTML = `<h5>\nSu porcentaje de ahorro es bajo.</h><h3>Hola ${usuario.nombre}!</h3>
            <h5>\nSu porcentaje de ahorro mensual es del ${ahorroPorcentaje.toFixed(2)}%</h5> 
            <h5>\nSu ahorro anual es de $${ahorroAnual}</h5> 
            <h5>\nValor del Bien: $${usuario.valorBien}<h5>
            <h5>\nSi destinara todo su sueldo a comprar su ${usuario.objetivo} tardaría ${MesesDeAhorro()} o ${SueldoAños()} para comprar lo que desea</h5> 
            <h5>\nSi destinara solo su ahorro mensual a comprar su ${usuario.objetivo} tardaría ${AhorroReal()} o ${AhorroAños()} para comprar lo que desea</h5> 
            <h5>\nSi destinara su ahorro anual más sus ingresos extra anuales a comprar su ${usuario.objetivo} tardaría ${tiempo()} para comprar lo que desea</h5>`;
            cuantoTardo.appendChild(contenedorPorcentajeAhorro1);
            break;
        case ((ahorroPorcentaje > 5) && (ahorroPorcentaje <= 10)):
            let contenedorPorcentajeAhorro2 = document.createElement("div");
            contenedorPorcentajeAhorro2.classList.add('operacionOpciones');
            contenedorPorcentajeAhorro2.innerHTML = `<h3>Hola ${usuario.nombre}!</h3>
            <h4>\nSu porcentaje de ahorro podría ser más elevado</h4>
            <h5>\nSu porcentaje de ahorro mensual es del ${ahorroPorcentaje.toFixed(2)}%</h5>
            <h5>\nSu ahorro anual es de $${ahorroAnual}</h5> 
            <h5>\nValor del Bien: $${usuario.valorBien}<h5>
            <h5>\nSi destinara todo su sueldo a comprar su ${usuario.objetivo} tardaría ${MesesDeAhorro()} o ${SueldoAños()} para comprar lo que desea</h5> 
            <h5>\nSi destinara solo su ahorro mensual a comprar su ${usuario.objetivo} tardaría ${AhorroReal()} o ${AhorroAños()} para comprar lo que desea</h5> 
            <h5>\nSi destinara su ahorro anual más sus ingresos extra anuales a comprar su ${usuario.objetivo} tardaría ${tiempo()} para comprar lo que desea</h5>`;
            cuantoTardo.appendChild(contenedorPorcentajeAhorro2);
            break;
        case ((ahorroPorcentaje > 10) && (ahorroPorcentaje <= 20)):
            let contenedorPorcentajeAhorro3 = document.createElement("div");
            contenedorPorcentajeAhorro3.classList.add('operacionOpciones');
            contenedorPorcentajeAhorro3.innerHTML = `<h3>Hola ${usuario.nombre}!</h3>
            <h4>\nSu porcentaje de ahorro es considerable</h4>
            <h5>\nSu porcentaje de ahorro mensual es del ${ahorroPorcentaje.toFixed(2)}%</h5> 
            <h5>\nSu ahorro anual es de $${ahorroAnual}</h5> 
            <h5>\nValor del Bien: $${usuario.valorBien}<h5>
            <h5>\nSi destinara todo su sueldo a comprar su ${usuario.objetivo} tardaría ${MesesDeAhorro()} o ${SueldoAños()} para comprar lo que desea</h5> 
            <h5>\nSi destinara solo su ahorro mensual a comprar su ${usuario.objetivo} tardaría ${AhorroReal()} o ${AhorroAños()} para comprar lo que desea</h5> 
            <h5>\nSi destinara su ahorro anual más sus ingresos extra anuales a comprar su ${usuario.objetivo} tardaría ${tiempo()} para comprar lo que desea</h5>`;
            cuantoTardo.appendChild(contenedorPorcentajeAhorro3);
            break;
        case ((ahorroPorcentaje > 20) && (ahorroPorcentaje <= 50)):
            let contenedorPorcentajeAhorro4 = document.createElement("div");
            contenedorPorcentajeAhorro4.classList.add('operacionOpciones');
            contenedorPorcentajeAhorro4.innerHTML = `<h3>Hola ${usuario.nombre}!</h3>
            <h4>\nSu porcentaje de ahorro es elevado</h4>
            <h5>\nSu porcentaje de ahorro mensual es del ${ahorroPorcentaje.toFixed(2)}%</h5> 
            <h5>\nSu ahorro anual es de $${ahorroAnual}</h5> 
            <h5>\nValor del Bien: $${usuario.valorBien}<h5>
            <h5>\nSi destinara todo su sueldo a comprar su ${usuario.objetivo} tardaría ${MesesDeAhorro()} o ${SueldoAños()} para comprar lo que desea</h5> 
            <h5>\nSi destinara solo su ahorro mensual a comprar su ${usuario.objetivo} tardaría ${AhorroReal()} o ${AhorroAños()} para comprar lo que desea</h5> 
            <h5>\nSi destinara su ahorro anual más sus ingresos extra anuales a comprar su ${usuario.objetivo} tardaría ${tiempo()} para comprar lo que desea</h5>`;
            cuantoTardo.appendChild(contenedorPorcentajeAhorro4);
            break;
        case (ahorroPorcentaje > 50):
            let contenedorPorcentajeAhorro5 = document.createElement("div");
            contenedorPorcentajeAhorro5.classList.add('operacionOpciones');
            contenedorPorcentajeAhorro5.innerHTML = `<h3>Hola ${usuario.nombre}!</h3>
            <h4>\nUsted tiene una gran capacidad de ahorro</h4>
            <h5>\nSu porcentaje de ahorro mensual es del ${ahorroPorcentaje.toFixed(2)}%</h5> 
            <h5>\nSu ahorro anual es de $${ahorroAnual}</h5> 
            <h5>\nValor del Bien: $${usuario.valorBien}<h5>
            <h5>\nSi destinara todo su sueldo a comprar su ${usuario.objetivo} tardaría ${MesesDeAhorro()} o ${SueldoAños()} para comprar lo que desea</h5> 
            <h5>\nSi destinara solo su ahorro mensual a comprar su ${usuario.objetivo} tardaría ${AhorroReal()} o ${AhorroAños()} para comprar lo que desea</h5> 
            <h5>\nSi destinara su ahorro anual más sus ingresos extra anuales a comprar su ${usuario.objetivo} tardaría ${tiempo()} para comprar lo que desea</h5>`;
            cuantoTardo.appendChild(contenedorPorcentajeAhorro5);
            break;
        default:
            let contenedorPorcentajeAhorro6 = document.createElement("div");
            contenedorPorcentajeAhorro6.classList.add('operacionOpciones');
            contenedorPorcentajeAhorro6.innerHTML = `<h3>Hola ${usuario.nombre}!</h3>
            <h4>\nUsted no ahorra o ingresó un dato incorrecto</h4>
            <h5>\nSu porcentaje de ahorro mensual es del ${ahorroPorcentaje.toFixed(2)}%</h5> 
            <h5>\nSu ahorro anual es de $${ahorroAnual}</h5> 
            <h5>\nValor del Bien: $${usuario.valorBien}<h5>
            <h5>\nSi destinara todo su sueldo a comprar su ${usuario.objetivo} tardaría ${MesesDeAhorro()} o ${SueldoAños()} para comprar lo que desea</h5> 
            <h5>\nSi destinara solo su ahorro mensual a comprar su ${usuario.objetivo} tardaría ${AhorroReal()} o ${AhorroAños()} para comprar lo que desea</h5> 
            <h5>\nSi destinara su ahorro anual más sus ingresos extra anuales a comprar su ${usuario.objetivo} tardaría ${tiempo()} para comprar lo que desea</h5>`;
            cuantoTardo.appendChild(contenedorPorcentajeAhorro6);
            break;
    }

    $("#mostrarTipoInversor").prepend(`<h6 class="operacionOpcion2">Listado de posibles inversiones</h6>`);
    for (const inversiones of nacional.activo) {
        $("#card").append(`<div class= "activo__dolarBlue">
        <h2 class="dolarBlue__nombre">${inversiones.denominacion}</h2>
        <img class="activo__foto" src="${inversiones.foto}" alt="foto de ${inversiones.denominacion}" width= "100px" height= "100px">
        <p class="activo__info">${inversiones.descripcion}</p>
        <p class="activo__valor">Valor: $${inversiones.valor}</p>
        <h5 class="opciones">\nUsted podría comprar con su ahorro mensual ${division(ahorroIngresado, inversiones.valor).toFixed(2)} ${inversiones.denominacion}.</h5></div>`);
    }
    $(".operacionOpcion2").css("display", "block");
    $("#formIdBis").hide(1000);
    $(".sidebar").fadeIn(1000);
    $("#mostarTipoInversor").css("display", "inline-block");
    $("#myForm")[0].reset();
};
localStorage.setItem(1, JSON.stringify(arrayUsuarios));
console.log(localStorage.getItem(1));

//quizz tipo de inversor
function definirInversor(evnt) {
    evnt.preventDefault();
    let formulario = evnt.target;

    let porcentajeDeAhorro = parseInt(document.querySelector('input[name="porcentajeDeAhorro"]:checked').value);
    let reduccionDeActivo = parseInt(document.querySelector('input[name="reduccionDeActivo"]:checked').value);
    let gananciaEsperada = parseInt(document.querySelector('input[name="gananciaEsperada"]:checked').value);
    let nuevoActivo = parseInt(document.querySelector('input[name="nuevoActivo"]:checked').value);
    let SumaQuizz = porcentajeDeAhorro + reduccionDeActivo + gananciaEsperada + nuevoActivo;
    console.log(SumaQuizz);

    $(document).ready(function() {
        $("#submitButtonQuizz").click(function(event) {
            $("#tipoInversor").empty();
            $(".resultadoTipoInversor2").empty();
        });
    });

    let tipoInversor = document.getElementById("tipoInversor");

    switch (true) {
        case (SumaQuizz <= 4 || SumaQuizz <= 6):
            let inversorConservadorJson = {
                "tipoDeInversor": "conservador"
            };
            localStorage.setItem("tipoDeInversor", JSON.stringify(inversorConservadorJson));
            console.log(localStorage.getItem("tipoDeInversor"));
            let contenedorTipoInversorConservador = document.createElement("div");
            contenedorTipoInversorConservador.innerHTML =
                `<h5 class="operacionOpcion">Usted es un inversor conservador</h>`;
            tipoInversor.appendChild(contenedorTipoInversorConservador);
            for (const inversiones of nacional.activo) {
                $(".resultadoTipoInversor2").prepend(`<div class= "nivelRiesgo${inversiones.nivelRiesgo}">
                    <h2 class="dolarBlue__nombre">${inversiones.denominacion}</h2>
                    <img class="activo__foto2" src="${inversiones.foto}" alt="foto de ${inversiones.denominacion}" width= "100px" height= "90px">
                    <p class="activo__valor2">Valor: $${inversiones.valor}</p>
                    </div>`);
            }
            $(".nivelRiesgo2").css("display", "none");
            $(".nivelRiesgo3").css("display", "none");
            break;
        case (SumaQuizz <= 7 || SumaQuizz <= 9):
            let inversorModeradoJson = {
                "tipoDeInversor": "moderado"
            };
            localStorage.setItem("tipoDeInversor", JSON.stringify(inversorModeradoJson));
            console.log(localStorage.getItem("tipoDeInversor"));
            let contenedorTipoInversorModerado = document.createElement("div");
            contenedorTipoInversorModerado.innerHTML =
                `<h5 class="operacionOpcion">Usted es un inversor Moderado</h>`;
            tipoInversor.appendChild(contenedorTipoInversorModerado);
            for (const inversiones of nacional.activo) {
                $(".resultadoTipoInversor2").prepend(`<div class= "nivelRiesgo${inversiones.nivelRiesgo}">
                <h2 class="dolarBlue__nombre">${inversiones.denominacion}</h2>
                <img class="activo__foto" src="${inversiones.foto}" alt="foto de ${inversiones.denominacion}" width= "100px" height= "90px">
                <p class="activo__valor2">Valor: $${inversiones.valor}</p>
                </div>`);
            }
            $(".nivelRiesgo1").css("display", "none");
            $(".nivelRiesgo3").css("display", "none");
            break;
        case (SumaQuizz >= 10 || SumaQuizz <= 12):
            let inversorAgresivoJson = {
                "tipoDeInversor": "agresivo"
            };
            localStorage.setItem("tipoDeInversor", JSON.stringify(inversorAgresivoJson));
            console.log(localStorage.getItem("tipoDeInversor"));
            let contenedorTipoInversorAgresivo = document.createElement("div");
            contenedorTipoInversorAgresivo.innerHTML =
                `<h5 class="operacionOpcion">Usted es un inversor agresivo</h>`;
            tipoInversor.appendChild(contenedorTipoInversorAgresivo);
            for (const inversiones of nacional.activo) {
                $(".resultadoTipoInversor2").prepend(`<div class= "nivelRiesgo${inversiones.nivelRiesgo}">
                <h2 class="dolarBlue__nombre">${inversiones.denominacion}</h2>
                <img class="activo__foto2" src="${inversiones.foto}" alt="foto de ${inversiones.denominacion}" width= "100px" height= "90px">
                <p class="activo__valor2">Valor: $${inversiones.valor}</p>
                </div>`);
            }
            $(".nivelRiesgo1").css("display", "none");
            $(".nivelRiesgo2").css("display", "none");
            break;
    }
    localStorage.setItem(1, JSON.stringify(arrayUsuarios));

    //funcion efectos
    function removeElementWithAnimation() {
        $("#formId").hide(1000);
        $(".sidebar").fadeIn(1000);
        $(".resultadoTipoInversor").fadeIn(1000);
        // $(".operacionOpcion").delay(10000).fadeOut("slow");
    }
    removeElementWithAnimation();

    $(".operacionOpcion3").css("display", "block");
    $("#mostrarCuantoTardo").css("display", "block");
    $("#mostarTipoInversor").css("display", "inline-block");
    $("#formulario2")[0].reset();
}

//funcion Dolar Vs. Dolar
function DolarVsDolar(g) {
    g.preventDefault();
    let formulario = g.target;

    let pesosADolar = parseInt(document.getElementById('pesosADolar').value);
    let dolaresQueCompra = division(pesosADolar, 165);
    if (dolaresQueCompra > 200)
        dolaresQueCompra = 200;
    let restoDolarOficial = pesosADolar - (multiplicacion(165, 200));
    let blue = division(restoDolarOficial, 183);
    let dolaresTotal = suma(dolaresQueCompra, blue);
    let dolarBolsa = division(pesosADolar, 170);
    console.log(dolaresQueCompra);
    console.log(dolaresTotal);
    console.log(restoDolarOficial);

    $(document).ready(function() {
        $("#submitButtonDolar").click(function(event) {
            $(".resultadoDolarVsDolar").empty();
        });
    });

    if (dolaresTotal <= 200) {
        $(".resultadoDolarVsDolar").append(`<div>Compre dolar oficial</div>`);
    } else {
        if (dolaresTotal > dolarBolsa) {
            $(".resultadoDolarVsDolar").append(`<div>Compre dolar oficial y el resto dolar blue</div>`)
        } else if (dolaresTotal < dolarBolsa) {
            $(".resultadoDolarVsDolar").append(`<div>Compre dolar bolsa</div>`)
        } else console.log("Compre dolar bolsa")
    }
    $("#formIdDolar").hide(1000);
    $(".sidebar").fadeIn(1000);
    $(".resultadoDolarVsDolar").fadeIn(1000);
    $("#mostarTipoInversor").css("display", "inline-block");
    $("#myFormDolar")[0].reset();
}

//funciones abrir y cerrar formularios
//formulario cuanto tardo
function abrirFormulario() {
    document.getElementById("formIdBis").style.display = "block";
}

function cerrarFormulario() {
    document.getElementById("formIdBis").style.display = "none";
    $("#myForm")[0].reset();
}
//formulario quizz tipo de inversor
function abrir() {
    document.getElementById("formId").style.display = "block";
}

function cerrar() {
    document.getElementById("formId").style.display = "none";
    $("#formulario2")[0].reset();
}
//formulario dolar vs. dolar
function abrirFormularioDolar() {
    document.getElementById("formIdDolar").style.display = "block";
}

function cerrarFormularioDolar() {
    document.getElementById("formIdDolar").style.display = "none";
    $("#myFormDolar")[0].reset();
}

//lamadas funciones formularios
//formulario cuanto tardo
let miFormulario = document.getElementById("myForm");
let buttonSubmit = document.getElementById('submitButton');
miFormulario.addEventListener("submit", crearUsuario);
//formulario quizz tipo de inversor
let miFormulario2 = document.getElementById("formulario2")
let buttonSubmitQuizz = document.getElementById('submitButtonQuizz');
miFormulario2.addEventListener("submit", definirInversor);
//formulario dolar vs. dolar
let miFormulario3 = document.getElementById("myFormDolar");
let buttonSubmitDolar = document.getElementById('submitButtonDolar');
miFormulario3.addEventListener("submit", DolarVsDolar);

//clientes opiniones
$("#contenedor__clientes").show(function() {

    $.ajax({
            url: "../json/usuarios.json",
            type: "GET",
            dataType: "json"
        })
        .done(function(respuesta, estado) {

            if (estado === "success") {
                let misDatos = respuesta.users;
                for (const personajes of misDatos) {
                    console.log(personajes)
                    $("#nuestrosClientes").prepend(`<div class= "nivelRiesgo4">
                                    <h2 class="activo__valor2">${personajes.name}</h2>
                                    <img class="activo__foto3" src="${personajes.image}" alt="foto de ${personajes.image}" width= "100px" height= "100px">
                                    <p class="activo__valor2">${personajes.house}</p>
                                    <p class="activo__valor3">"${personajes.opinion}"</p>
                                    </div>`);
                }
            }
        })
        .fail(function(xhr, status, error) {
            console.log("error")
        })
})

//api dolar
const URL_DOLAR = "https://criptoya.com/api/dolar"

$(() => {
    $.get(URL_DOLAR, function(res, state) {
        if (state === "success") {
            for (const dolar in res) {
                $(".contenedorDolar").append(`<div class="card__dolares" id="${dolar}">
                <h5 class="dolarNombre" id="card__${dolar}">Dolar ${dolar}</h5>
                <h5 class="dolarPrecio" id="card__${dolar}">$${res[dolar]}</h5></div>`);
            }
        }
        $("#time").css("display", "none");
        $("#ccb").css("display", "none");
    });
});
//objeto usuario
class Persona {
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

    tiempo(valor, ingresoExtra, ahorro) {
        let tiempoTotal = division(valor, (suma(ingresoExtra, ahorro)))
        if (tiempoTotal < 1) {
            tiempoTotal = "menos de un año"
        } else {
            tiempoTotal = `${tiempoTotal.toFixed()} años`
        }
        return tiempoTotal
    }

    AhorroAños(ahorroAnio) {
        let ahorroAños = division(ahorroAnio, 12)
        if (ahorroAños < 1) {
            ahorroAños = "menos de un año"
        } else {
            ahorroAños = `${ahorroAños.toFixed()} años`
        }
        return ahorroAños
    }

    SueldoAños(ahorroEnMeses) {
        let sueldoAños = division(ahorroEnMeses, 12)
        if (sueldoAños < 1) {
            sueldoAños = "menos de un año"
        } else {
            sueldoAños = `${sueldoAños.toFixed()} años`
        }
        return sueldoAños
    }

    AhorroReal(valorBien, ahorro) {
        let ahorroReal = division(valorBien, ahorro)
        if (ahorroReal < 1) {
            ahorroReal = "menos de un mes"
        } else {
            ahorroReal = `${ahorroReal.toFixed()} meses`
        }
        return ahorroReal
    }

    MesesDeAhorro(valorBien, sueldo) {
        let mesesDeAhorro = division(valorBien, sueldo);
        if (mesesDeAhorro < 1) {
            mesesDeAhorro = "menos de un mes"
        } else {
            mesesDeAhorro = `${mesesDeAhorro.toFixed()} meses`
        }
        return mesesDeAhorro
    }

    stringTiempo(porcentaje, ahorroAnual, valor, ingresoExtra, ahorro, ahorroAnio, ahorroEnMeses, valorBien, ahorroReal, valorBienMeses, sueldo) {
        return `
            <div className ="operacionOpciones">
            <h5>\nSu porcentaje de ahorro mensual es del ${porcentaje.toFixed(2)}%</h5> 
            <h5>\nSu ahorro anual es de $${ahorroAnual}</h5> 
            <h5>\nValor del Bien: $${this.valorBien}<h5>
            <h5>\nSi destinara todo su sueldo a comprar su ${this.objetivo} tardaría ${this.MesesDeAhorro(valorBienMeses, sueldo)} o ${this.SueldoAños(ahorroEnMeses)} para comprar lo que desea</h5> 
            <h5>\nSi destinara solo su ahorro mensual a comprar su ${this.objetivo} tardaría ${this.AhorroReal(valorBien, ahorroReal)} o ${this.AhorroAños(ahorroAnio)} para comprar lo que desea</h5> 
            <h5>\nSi destinara su ahorro anual más sus ingresos extra anuales a comprar su ${this.objetivo} tardaría ${this.tiempo(valor, ingresoExtra, ahorro)} para comprar lo que desea</h5>;
            </div>
        
        `
    }
}
let arrayUsuarios = [];

// array inversiones
class Inversion {
    constructor(id, denominacion, nivelRiesgo, valor, descripcion, foto) {
        this.id = id;
        this.denominacion = denominacion;
        this.nivelRiesgo = nivelRiesgo;
        this.valor = valor;
        this.descripcion = descripcion;
        this.foto = foto;
    }

    stringInversion(ahorro) {
        return `<div class= "activo__dolarBlue">
            <h2 class="dolarBlue__nombre">${this.denominacion}</h2>
            <img class="activo__foto" src="${this.foto}" alt="foto de ${this.denominacion}" width= "100px" height= "100px">
            <p class="activo__info">${this.descripcion}</p>
            <h4 class="nivelRiesgo">${this.nivelRiesgo}</h4>
            <p class="activo__valor">Valor: $${this.valor}</p>
            <h5 class="opciones">\nUsted podría comprar con su ahorro mensual ${division(ahorro, this.valor).toFixed(2)} ${this.denominacion}</h5>
            </div>`
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

function getInversiones(param) {
    $.ajax({
            url: "./json/inversiones.json",
            type: "GET",
            dataType: "json"
        })
        .done(function(respuesta, estado) {

            if (estado === "success") {
                let misDatos = respuesta.inversiones;
                for (const inversiones of misDatos) {
                    let opcionesDeInversion = new Inversion(inversiones.id, inversiones.denominacion, inversiones.nivelRiesgo, inversiones.valor, inversiones.descripcion, inversiones.foto)
                    console.log(opcionesDeInversion)
                    $("#card").append(
                        opcionesDeInversion.stringInversion(param)
                    );
                }
            }
        })
        .fail(function(xhr, status, error) {
            console.log("error")
        })
}

//funcion ordenar activos
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

    let ahorroPorcentaje = division((multiplicacion(100, ahorroIngresado)), sueldoIngresado);
    let ahorroAnual = suma((multiplicacion(ahorroIngresado, 12)), extraIngresado);
    let mesesDeAhorro = division(valorBienIngresado, sueldoIngresado);
    let ahorroReal = division(valorBienIngresado, ahorroIngresado);
    let sueldoAños = division(mesesDeAhorro, 12);
    let ahorroAños = division(ahorroReal, 12);
    let tiempoTotal = division(valorBienIngresado, (suma(extraIngresado, ahorroAnual)));

    //Creamos el objeto Persona
    let usuario = new Persona(nombreIngresado, emailIngresado, sueldoIngresado, ahorroIngresado, extraIngresado, objetivoIngresado, valorBienIngresado);
    arrayUsuarios.push(usuario);
    localStorage.setItem(1, JSON.stringify(arrayUsuarios));
    console.log(usuario)

    switch (true) {
        case (ahorroPorcentaje <= 5):
            let contenedorPorcentajeAhorro1 = document.createElement("div");
            contenedorPorcentajeAhorro1.classList.add('operacionOpciones');
            contenedorPorcentajeAhorro1.innerHTML = `<h3>Hola ${usuario.nombre}!</h3>
            <h5>\nSu porcentaje de ahorro es bajo</h>`;
            cuantoTardo.appendChild(contenedorPorcentajeAhorro1);
            break;
        case ((ahorroPorcentaje > 5) && (ahorroPorcentaje <= 10)):
            let contenedorPorcentajeAhorro2 = document.createElement("div");
            contenedorPorcentajeAhorro2.classList.add('operacionOpciones');
            contenedorPorcentajeAhorro2.innerHTML = `<h3>Hola ${usuario.nombre}!</h3>
            <h4>\nSu porcentaje de ahorro podría ser más elevado</h4>`;
            cuantoTardo.appendChild(contenedorPorcentajeAhorro2);
            break;
        case ((ahorroPorcentaje > 10) && (ahorroPorcentaje <= 20)):
            let contenedorPorcentajeAhorro3 = document.createElement("div");
            contenedorPorcentajeAhorro3.classList.add('operacionOpciones');
            contenedorPorcentajeAhorro3.innerHTML = `<h3>Hola ${usuario.nombre}!</h3>
            <h4>\nSu porcentaje de ahorro es considerable</h4>`;
            cuantoTardo.appendChild(contenedorPorcentajeAhorro3);
            break;
        case ((ahorroPorcentaje > 20) && (ahorroPorcentaje <= 50)):
            let contenedorPorcentajeAhorro4 = document.createElement("div");
            contenedorPorcentajeAhorro4.classList.add('operacionOpciones');
            contenedorPorcentajeAhorro4.innerHTML = `<h3>Hola ${usuario.nombre}!</h3>
            <h4>\nSu porcentaje de ahorro es elevado</h4>`;
            cuantoTardo.appendChild(contenedorPorcentajeAhorro4);
            break;
        case (ahorroPorcentaje > 50):
            let contenedorPorcentajeAhorro5 = document.createElement("div");
            contenedorPorcentajeAhorro5.classList.add('operacionOpciones');
            contenedorPorcentajeAhorro5.innerHTML = `<h3>Hola ${usuario.nombre}!</h3>
            <h4>\nUsted tiene una gran capacidad de ahorro</h4>`;
            cuantoTardo.appendChild(contenedorPorcentajeAhorro5);
            break;
        default:
            let contenedorPorcentajeAhorro6 = document.createElement("div");
            contenedorPorcentajeAhorro6.classList.add('operacionOpciones');
            contenedorPorcentajeAhorro6.innerHTML = `<h3>Hola ${usuario.nombre}!</h3>
            <h4>\nUsted no ahorra o ingresó un dato incorrecto</h4>`;
            cuantoTardo.appendChild(contenedorPorcentajeAhorro6);
            break;
    }

    $('#cuantoTardo').append(
        usuario.stringTiempo(ahorroPorcentaje, ahorroAnual, valorBienIngresado, extraIngresado, ahorroAnual, ahorroReal, mesesDeAhorro, valorBienIngresado, ahorroIngresado, valorBienIngresado, sueldoIngresado)
    )

    getInversiones(ahorroIngresado)

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
    let tipoInversor = document.getElementById("tipoInversor");

    console.log(SumaQuizz);

    switch (true) {
        case (SumaQuizz <= 4 || SumaQuizz <= 6):
            let inversorConservadorJson = {
                "tipoDeInversor": "conservador"
            };
            localStorage.setItem("tipoDeInversor", JSON.stringify(inversorConservadorJson));
            console.log(localStorage.getItem("tipoDeInversor"));
            let contenedorTipoInversorConservador = document.createElement("div");
            contenedorTipoInversorConservador.innerHTML =
                `<h5 class="operacionOpcion">Usted es un inversor conservador</h5>`;
            tipoInversor.appendChild(contenedorTipoInversorConservador);
            break;
        case (SumaQuizz <= 7 || SumaQuizz <= 9):
            let inversorModeradoJson = {
                "tipoDeInversor": "moderado"
            };
            localStorage.setItem("tipoDeInversor", JSON.stringify(inversorModeradoJson));
            console.log(localStorage.getItem("tipoDeInversor"));
            let contenedorTipoInversorModerado = document.createElement("div");
            contenedorTipoInversorModerado.innerHTML =
                `<h5 class="operacionOpcion">Usted es un inversor Moderado</h5>`;
            tipoInversor.appendChild(contenedorTipoInversorModerado);
            break;
        case (SumaQuizz >= 10 || SumaQuizz <= 12):
            let inversorAgresivoJson = {
                "tipoDeInversor": "agresivo"
            };
            localStorage.setItem("tipoDeInversor", JSON.stringify(inversorAgresivoJson));
            console.log(localStorage.getItem("tipoDeInversor"));
            let contenedorTipoInversorAgresivo = document.createElement("div");
            contenedorTipoInversorAgresivo.innerHTML =
                `<h5 class="operacionOpcion">Usted es un inversor agresivo</h5>`;
            tipoInversor.appendChild(contenedorTipoInversorAgresivo);
            break;
    }
    localStorage.setItem(1, JSON.stringify(arrayUsuarios));

    //funcion efectos
    function removeElementWithAnimation() {
        $("#formId").hide(1000);
        $(".sidebar").fadeIn(1000);
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
    let dolaresQueCompra = division(pesosADolar, 170);
    if (dolaresQueCompra > 200)
        dolaresQueCompra = 200;
    let restoDolarOficial = pesosADolar - (multiplicacion(170, 200));
    let blue = division(restoDolarOficial, 185);
    let dolaresTotal = suma(dolaresQueCompra, blue);
    let dolarBolsa = division(pesosADolar, 175);
    console.log(dolaresQueCompra);
    console.log(dolaresTotal);
    console.log(restoDolarOficial);

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

//funciones limpiar formularios
$(document).ready(function() {
    ordenarActivos();
    $("#submitButton").click(function(event) {
        $("#cuantoTardo").empty();
        $("#card").empty();
    });
});
$(document).ready(function() {
    $("#submitButtonQuizz").click(function(event) {
        $("#tipoInversor").empty();
        $(".resultadoTipoInversor2").empty();
    });
});
$(document).ready(function() {
    $("#submitButtonDolar").click(function(event) {
        $(".resultadoDolarVsDolar").empty();
    });
});

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
            url: "./json/usuarios.json",
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
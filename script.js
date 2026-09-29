// ==========================================
// PARTICULAS
// ==========================================

const contenedorParticulas =
    document.getElementById("particulas");


for (let i = 0; i < 45; i++) {

    const particula =
        document.createElement("div");


    particula.classList.add(
        "particula"
    );


    const tamaño =
        Math.random() * 4 + 2;


    particula.style.width =
        `${tamaño}px`;


    particula.style.height =
        `${tamaño}px`;


    particula.style.left =
        `${Math.random() * 100}%`;


    particula.style.animationDuration =
        `${Math.random() * 8 + 7}s`;


    particula.style.animationDelay =
        `${Math.random() * 8}s`;


    contenedorParticulas.appendChild(
        particula
    );
}



// ==========================================
// ELEMENTOS
// ==========================================

const viajeInicial =
    document.getElementById("viajeInicial");


const inicio =
    document.getElementById("inicio");


const carta =
    document.getElementById("carta");


const segunda =
    document.getElementById("segunda");


const final =
    document.getElementById("final");


const botonAbrir =
    document.getElementById("botonAbrir");


const continuar =
    document.getElementById("continuar");


const continuar2 =
    document.getElementById("continuar2");


const avionInicial =
    document.getElementById("avionInicial");


const rutaInicial =
    document.getElementById("rutaInicial");


// CONTADOR

const diasElemento =
    document.getElementById("dias");


const horasElemento =
    document.getElementById("horas");


const minutosElemento =
    document.getElementById("minutos");


const segundosElemento =
    document.getElementById("segundos");


const textoViaje =
    document.getElementById("textoViaje");



// ==========================================
// FECHAS
// ==========================================

// Inicio del viaje
const inicioViaje =
    new Date("2026-09-28T00:00:00");


// Llegada a Costa Rica
const llegadaViaje =
    new Date("2026-10-18T00:00:00");



// ==========================================
// ACTUALIZAR CONTADOR
// ==========================================

function actualizarContador() {

    const ahora =
        new Date();


    const diferencia =
        llegadaViaje - ahora;


    // ======================================
    // YA LLEGÓ
    // ======================================

    if (diferencia <= 0) {

        diasElemento.textContent =
            "00";

        horasElemento.textContent =
            "00";

        minutosElemento.textContent =
            "00";

        segundosElemento.textContent =
            "00";


        textoViaje.textContent =
            "💌 ¡La carta llegó a Costa Rica!";


        return;

    }



    // ======================================
    // CALCULAR TIEMPO
    // ======================================

    const dias =
        Math.floor(
            diferencia /
            (1000 * 60 * 60 * 24)
        );


    const horas =
        Math.floor(
            (diferencia %
                (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );


    const minutos =
        Math.floor(
            (diferencia %
                (1000 * 60 * 60))
            /
            (1000 * 60)
        );


    const segundos =
        Math.floor(
            (diferencia %
                (1000 * 60))
            /
            1000
        );



    // ======================================
    // MOSTRAR
    // ======================================

    diasElemento.textContent =
        String(dias).padStart(2, "0");


    horasElemento.textContent =
        String(horas).padStart(2, "0");


    minutosElemento.textContent =
        String(minutos).padStart(2, "0");


    segundosElemento.textContent =
        String(segundos).padStart(2, "0");

}



// ==========================================
// POSICIÓN DEL AVIÓN
// ==========================================

function actualizarAvion() {

    if (!rutaInicial || !avionInicial) {
        return;
    }


    const ahora =
        new Date();


    const tiempoTotal =
        llegadaViaje - inicioViaje;


    const tiempoTranscurrido =
        ahora - inicioViaje;


    let progreso =
        tiempoTranscurrido /
        tiempoTotal;


    // Mantener entre 0 y 1

    progreso =
        Math.max(
            0,
            Math.min(
                1,
                progreso
            )
        );


    const longitud =
        rutaInicial.getTotalLength();


    const distancia =
        progreso * longitud;


    const posicion =
        rutaInicial.getPointAtLength(
            distancia
        );


    const posicionAnterior =
        rutaInicial.getPointAtLength(
            Math.max(
                0,
                distancia - 2
            )
        );



    // ======================================
    // ROTACIÓN
    // ======================================

    const angulo =
        Math.atan2(
            posicion.y -
            posicionAnterior.y,

            posicion.x -
            posicionAnterior.x
        )
        *
        180
        /
        Math.PI;



    avionInicial.setAttribute(
        "transform",
        `translate(${posicion.x}, ${posicion.y}) rotate(${angulo})`
    );



    // ======================================
    // SI LLEGÓ
    // ======================================

    if (progreso >= 1) {

        textoViaje.textContent =
            "💌 ¡La carta llegó a Costa Rica!";

    }

}



// ==========================================
// ACTUALIZAR TODO
// ==========================================

function actualizarViaje() {

    actualizarContador();

    actualizarAvion();

}



// ==========================================
// BOTÓN ABRIR
// ==========================================

botonAbrir.addEventListener(
    "click",
    () => {

        inicio.classList.remove(
            "mostrar"
        );


        setTimeout(() => {

            carta.classList.add(
                "mostrar"
            );

        }, 400);

    }
);



// ==========================================
// PRIMERA ESCENA
// ==========================================

continuar.addEventListener(
    "click",
    () => {

        carta.classList.remove(
            "mostrar"
        );


        setTimeout(() => {

            segunda.classList.add(
                "mostrar"
            );

        }, 400);

    }
);



// ==========================================
// SEGUNDA → FINAL
// ==========================================

continuar2.addEventListener(
    "click",
    () => {

        segunda.classList.remove(
            "mostrar"
        );


        setTimeout(() => {

            final.classList.add(
                "mostrar"
            );


            iniciarFuegos();

        }, 400);

    }
);



// ==========================================
// FUEGOS ARTIFICIALES
// ==========================================

function crearFuego() {

    const fuego =
        document.createElement("div");


    fuego.classList.add(
        "fuego"
    );


    fuego.style.left =
        `${Math.random() * 100}%`;


    fuego.style.top =
        `${Math.random() * 70 + 5}%`;


    const tamaño =
        Math.random() * 4 + 4;


    fuego.style.width =
        `${tamaño}px`;


    fuego.style.height =
        `${tamaño}px`;


    document
        .getElementById("fuegos")
        .appendChild(fuego);


    setTimeout(() => {

        fuego.remove();

    }, 1800);

}



// ==========================================
// INICIAR FUEGOS
// ==========================================

function iniciarFuegos() {

    let cantidad = 0;


    const intervalo =
        setInterval(
            () => {

                crearFuego();

                cantidad++;


                if (cantidad >= 18) {

                    clearInterval(
                        intervalo
                    );

                }

            },
            280
        );

}



// ==========================================
// INICIAR
// ==========================================

actualizarViaje();


// Contador cada segundo

setInterval(
    actualizarContador,
    1000
);


// Actualizar posición del avión

setInterval(
    actualizarAvion,
    1000
);
// INICIAR VIAJE
// ==========================================

animarViajeInicial();

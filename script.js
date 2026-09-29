/* =====================================================
   PARTICULAS
   ===================================================== */

const contenedorParticulas =
    document.getElementById("particulas");

for (let i = 0; i < 45; i++) {

    const particula =
        document.createElement("div");

    particula.classList.add("particula");

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



/* =====================================================
   ELEMENTOS
   ===================================================== */

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

const mapaSvg =
    document.getElementById("mapaSvg");

const textoViaje =
    document.getElementById("textoViaje");



/* =====================================================
   CONTADOR
   ===================================================== */

const diasElemento =
    document.getElementById("dias");

const horasElemento =
    document.getElementById("horas");

const minutosElemento =
    document.getElementById("minutos");

const segundosElemento =
    document.getElementById("segundos");



/* =====================================================
   FECHAS
   ===================================================== */

/*
    El viaje comienza:

    28 de septiembre de 2026

    La carta llega:

    18 de octubre de 2026
*/

const inicioViaje =
    new Date(
        "2026-09-28T00:00:00"
    );

const llegadaViaje =
    new Date(
        "2026-10-18T00:00:00"
    );



/* =====================================================
   CONTROL DE LLEGADA
   ===================================================== */

let llegadaProcesada = false;



/* =====================================================
   CONTADOR
   ===================================================== */

function actualizarContador() {

    const ahora =
        new Date();

    const diferencia =
        llegadaViaje - ahora;


    /*
        Si ya llegó:
    */

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


    const dias =
        Math.floor(
            diferencia /
            (1000 * 60 * 60 * 24)
        );


    const horas =
        Math.floor(
            (
                diferencia %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutos =
        Math.floor(
            (
                diferencia %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const segundos =
        Math.floor(
            (
                diferencia %
                (1000 * 60)
            ) /
            1000
        );


    diasElemento.textContent =
        String(dias).padStart(2, "0");

    horasElemento.textContent =
        String(horas).padStart(2, "0");

    minutosElemento.textContent =
        String(minutos).padStart(2, "0");

    segundosElemento.textContent =
        String(segundos).padStart(2, "0");
}



/* =====================================================
   POSICIÓN DEL AVIÓN
   ===================================================== */

function actualizarAvion() {

    if (
        !rutaInicial ||
        !avionInicial ||
        !mapaSvg
    ) {
        return;
    }


    const ahora =
        new Date();


    const tiempoTotal =
        llegadaViaje -
        inicioViaje;


    const tiempoTranscurrido =
        ahora -
        inicioViaje;


    /*
        Calculamos el porcentaje
        del viaje.
    */

    let progreso =
        tiempoTranscurrido /
        tiempoTotal;


    /*
        Evitamos que sea menor
        que 0 o mayor que 1.
    */

    progreso =
        Math.max(
            0,
            Math.min(
                1,
                progreso
            )
        );


    /*
        Longitud total de la ruta.
    */

    const longitud =
        rutaInicial.getTotalLength();


    /*
        Punto actual.
    */

    const distancia =
        progreso *
        longitud;


    const punto =
        rutaInicial.getPointAtLength(
            distancia
        );


    /*
        Punto ligeramente anterior.

        Lo usamos para saber hacia
        dónde está viajando el avión.
    */

    const puntoAnterior =
        rutaInicial.getPointAtLength(
            Math.max(
                0,
                distancia - 3
            )
        );


    /*
        Dirección del avión.
    */

    const angulo =
        Math.atan2(
            punto.y -
            puntoAnterior.y,

            punto.x -
            puntoAnterior.x
        )
        *
        180 /
        Math.PI;


    /*
        Convertimos las coordenadas
        del SVG a coordenadas reales
        dentro del mapa HTML.
    */

    const puntoSVG =
        mapaSvg.createSVGPoint();

    puntoSVG.x =
        punto.x;

    puntoSVG.y =
        punto.y;


    const matriz =
        rutaInicial.getScreenCTM();


    if (!matriz) {
        return;
    }


    const puntoPantalla =
        puntoSVG.matrixTransform(
            matriz
        );


    const rectMapa =
        mapaSvg.getBoundingClientRect();


    /*
        Posición final del avión.
    */

    const x =
        puntoPantalla.x -
        rectMapa.left;


    const y =
        puntoPantalla.y -
        rectMapa.top;


    /*
        Movemos el avión.
    */

    avionInicial.style.left =
        `${x}px`;

    avionInicial.style.top =
        `${y}px`;


    /*
        Giramos solamente el avión.

        El emoji originalmente apunta
        hacia la derecha.
    */

    avionInicial.querySelector(
        ".avion-emoji"
    ).style.transform =
        `rotate(${angulo}deg)`;


    /*
        Cuando llega a Costa Rica.
    */

    if (progreso >= 1) {

        textoViaje.textContent =
            "💌 ¡La carta llegó a Costa Rica!";


        if (!llegadaProcesada) {

            llegadaProcesada =
                true;


            /*
                Esperamos 2.5 segundos
                antes de mostrar la portada.
            */

            setTimeout(() => {

                viajeInicial.classList.add(
                    "ocultar"
                );

                inicio.classList.add(
                    "mostrar"
                );

            }, 2500);
        }
    }
}



/* =====================================================
   ACTUALIZAR VIAJE
   ===================================================== */

function actualizarViaje() {

    actualizarContador();

    actualizarAvion();
}



/* =====================================================
   BOTÓN ABRIR
   ===================================================== */

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



/* =====================================================
   PRIMERA ESCENA
   ===================================================== */

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



/* =====================================================
   SEGUNDA → FINAL
   ===================================================== */

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



/* =====================================================
   FUEGOS
   ===================================================== */

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



function iniciarFuegos() {

    let cantidad = 0;


    const intervalo =
        setInterval(() => {

            crearFuego();

            cantidad++;


            if (cantidad >= 18) {

                clearInterval(
                    intervalo
                );

            }

        }, 280);
}



/* =====================================================
   INICIAR
   ===================================================== */

actualizarViaje();


/*
    Contador:
    cada segundo.
*/

setInterval(
    actualizarContador,
    1000
);


/*
    Avión:
    cada segundo.

    También se actualiza cuando
    cambia el tamaño de la pantalla.
*/

setInterval(
    actualizarAvion,
    1000
);


window.addEventListener(
    "resize",
    actualizarAvion
);

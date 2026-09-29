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


const diasElemento =
    document.getElementById("dias");


const horasElemento =
    document.getElementById("horas");


const minutosElemento =
    document.getElementById("minutos");


const segundosElemento =
    document.getElementById("segundos");


const avionEmoji =
    document.querySelector(".avion-emoji");



/* =====================================================
   FECHAS
   ===================================================== */

const inicioViaje =
    new Date(
        "2026-09-28T00:00:00"
    );


const llegadaViaje =
    new Date(
        "2026-10-18T00:00:00"
    );


let llegadaProcesada =
    false;



/* =====================================================
   CONTADOR
   ===================================================== */

function actualizarContador() {

    const ahora =
        new Date();


    const diferencia =
        llegadaViaje -
        ahora;


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
        String(dias).padStart(
            2,
            "0"
        );


    horasElemento.textContent =
        String(horas).padStart(
            2,
            "0"
        );


    minutosElemento.textContent =
        String(minutos).padStart(
            2,
            "0"
        );


    segundosElemento.textContent =
        String(segundos).padStart(
            2,
            "0"
        );
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


    let progreso =
        tiempoTranscurrido /
        tiempoTotal;


    progreso =
        Math.max(
            0,
            Math.min(
                1,
                progreso
            )
        );


    /*
       Longitud total de la ruta
    */

    const longitud =
        rutaInicial.getTotalLength();


    /*
       Punto actual
    */

    const distancia =
        progreso *
        longitud;


    const puntoActual =
        rutaInicial.getPointAtLength(
            distancia
        );


    /*
       Punto un poco más adelante
       para calcular dirección
    */

    const distanciaAdelante =
        Math.min(
            longitud,
            distancia + 2
        );


    const puntoSiguiente =
        rutaInicial.getPointAtLength(
            distanciaAdelante
        );


    const dx =
        puntoSiguiente.x -
        puntoActual.x;


    const dy =
        puntoSiguiente.y -
        puntoActual.y;


    /*
       Dirección de la ruta
    */

    let angulo =
        Math.atan2(
            dy,
            dx
        )
        *
        180 /
        Math.PI;


    /*
       El emoji ✈️ apunta originalmente
       hacia arriba, por eso corregimos
       90 grados.
    */

    angulo += 90;


    /*
       Convertimos coordenadas SVG
       a coordenadas de pantalla.
    */

    const puntoSVG =
        mapaSvg.createSVGPoint();


    puntoSVG.x =
        puntoActual.x;


    puntoSVG.y =
        puntoActual.y;


    const matriz =
        mapaSvg.getScreenCTM();


    if (!matriz) {
        return;
    }


    const puntoPantalla =
        puntoSVG.matrixTransform(
            matriz
        );


    const rectMapa =
        mapaSvg.getBoundingClientRect();


    const x =
        puntoPantalla.x -
        rectMapa.left;


    const y =
        puntoPantalla.y -
        rectMapa.top;


    /*
       Mover avión
    */

    avionInicial.style.left =
        `${x}px`;


    avionInicial.style.top =
        `${y}px`;


    /*
       Girar avión siguiendo la ruta
    */

    avionEmoji.style.transform =
        `
        translate(-50%, -50%)
        rotate(${angulo}deg)
        `;


    /*
       Llegada
    */

    if (progreso >= 1) {

        textoViaje.textContent =
            "💌 ¡La carta llegó a Costa Rica!";


        if (!llegadaProcesada) {

            llegadaProcesada =
                true;


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
   SEGUNDA ESCENA → FINAL
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
   FUEGOS ARTIFICIALES
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
        .appendChild(
            fuego
        );


    setTimeout(() => {

        fuego.remove();

    }, 1800);
}



function iniciarFuegos() {

    let cantidad =
        0;


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

actualizarContador();

actualizarAvion();


setInterval(
    actualizarContador,
    1000
);


setInterval(
    actualizarAvion,
    1000
);


window.addEventListener(
    "resize",
    actualizarAvion
);

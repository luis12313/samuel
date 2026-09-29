/* =========================================
   CAMBIO DE ESCENAS
========================================= */

const escenas = document.querySelectorAll(".escena");

function mostrarEscena(id) {

    escenas.forEach(escena => {
        escena.classList.remove("activa");
    });

    const escena = document.getElementById(id);

    if (escena) {
        escena.classList.add("activa");
    }
}


/* =========================================
   VIAJE COLOMBIA -> COSTA RICA
========================================= */

const inicioViaje =
    new Date("2026-09-28T00:00:00");

const llegadaViaje =
    new Date("2026-10-18T00:00:00");


/*
    Esta es EXACTAMENTE la ruta que
    ya existe dentro de america.svg.

    No estamos dibujando otra ruta.
*/

const ruta = {
    x1: 610,
    y1: 329,

    x2: 340,
    y2: 205
};


/* =========================================
   ELEMENTOS
========================================= */

const avion =
    document.getElementById("avion");

const contador =
    document.getElementById("contador");

const mensajeViaje =
    document.getElementById("mensajeViaje");


/* =========================================
   BEZIER

   Misma forma aproximada de la ruta
   del SVG.
========================================= */

function calcularPosicion(t) {

    /*
        Ruta original del SVG:

        M610 329
        C575 285 520 252 449 235
        C410 226 375 216 340 205
    */

    if (t <= 0.5) {

        const localT = t * 2;

        return bezier(
            610, 329,
            575, 285,
            520, 252,
            449, 235,
            localT
        );

    } else {

        const localT = (t - 0.5) * 2;

        return bezier(
            449, 235,
            410, 226,
            375, 216,
            340, 205,
            localT
        );
    }
}


function bezier(
    x0,
    y0,
    x1,
    y1,
    x2,
    y2,
    x3,
    y3,
    t
) {

    const u = 1 - t;

    const x =
        u * u * u * x0 +
        3 * u * u * t * x1 +
        3 * u * t * t * x2 +
        t * t * t * x3;

    const y =
        u * u * u * y0 +
        3 * u * u * t * y1 +
        3 * u * t * t * y2 +
        t * t * t * y3;

    return { x, y };
}


/* =========================================
   ANIMACIÓN DEL AVIÓN
========================================= */

function actualizarViaje() {

    const ahora = new Date();

    let progreso =
        (ahora - inicioViaje) /
        (llegadaViaje - inicioViaje);

    progreso =
        Math.max(
            0,
            Math.min(1, progreso)
        );


    const posicion =
        calcularPosicion(progreso);


    /*
        El avión usa las mismas coordenadas
        del viewBox del america.svg.
    */

    avion.setAttribute(
        "transform",
        `translate(${posicion.x}, ${posicion.y})`
    );


    /* =====================================
       CONTADOR
    ====================================== */

    const diferencia =
        llegadaViaje - ahora;


    if (diferencia <= 0) {

        contador.textContent =
            "✈️ El viaje terminó";

        mensajeViaje.textContent =
            "💌 ¡La carta llegó a Costa Rica!";

        /*
            Después de llegar dejamos unos
            segundos para mostrar el mensaje.
        */

        if (!window.cartaLlegadaMostrada) {

            window.cartaLlegadaMostrada = true;

            setTimeout(() => {

                mostrarEscena("portada");

            }, 2500);
        }

        return;
    }


    const dias =
        Math.floor(
            diferencia /
            (1000 * 60 * 60 * 24)
        );

    const horas =
        Math.floor(
            (diferencia %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

    const minutos =
        Math.floor(
            (diferencia %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );

    const segundos =
        Math.floor(
            (diferencia %
                (1000 * 60)) /
            1000
        );


    contador.textContent =
        `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}


/* Actualizar cada segundo */

actualizarViaje();

setInterval(
    actualizarViaje,
    1000
);


/* =========================================
   BOTÓN ABRIR
========================================= */

const abrirBtn =
    document.getElementById("abrirBtn");

abrirBtn.addEventListener(
    "click",
    () => {

        mostrarEscena("escena1");

    }
);


/* =========================================
   BOTONES CONTINUAR
========================================= */

document
    .querySelectorAll(".continuar")
    .forEach(boton => {

        boton.addEventListener(
            "click",
            () => {

                const siguiente =
                    boton.dataset.next;

                mostrarEscena(siguiente);

                /*
                    Si llegamos al final,
                    iniciamos los fuegos.
                */

                if (siguiente === "final") {

                    iniciarFuegos();

                }

            }
        );

    });


/* =========================================
   PARTÍCULAS
========================================= */

const contenedorParticulas =
    document.getElementById("particulas");


function crearParticulas() {

    for (let i = 0; i < 45; i++) {

        const particula =
            document.createElement("div");

        particula.className =
            "particula";

        particula.style.left =
            `${Math.random() * 100}%`;

        particula.style.top =
            `${Math.random() * 100}%`;

        particula.style.animationDelay =
            `${Math.random() * 4}s`;

        particula.style.animationDuration =
            `${3 + Math.random() * 4}s`;

        contenedorParticulas.appendChild(
            particula
        );
    }
}

crearParticulas();


/* =========================================
   FUEGOS ARTIFICIALES
========================================= */

function iniciarFuegos() {

    const contenedor =
        document.getElementById("fuegos");

    /*
        Limpiar fuegos anteriores.
    */

    contenedor.innerHTML = "";


    /*
        Lanzamos varios fuegos.
    */

    for (let i = 0; i < 9; i++) {

        setTimeout(() => {

            crearFuego(
                15 + Math.random() * 70,
                15 + Math.random() * 50
            );

        }, i * 500);
    }
}


function crearFuego(x, y) {

    const cantidad =
        30;


    for (let i = 0; i < cantidad; i++) {

        const particula =
            document.createElement("div");

        particula.className =
            "fuego";


        const angulo =
            Math.random() *
            Math.PI *
            2;


        const distancia =
            60 +
            Math.random() * 130;


        const destinoX =
            Math.cos(angulo) *
            distancia;


        const destinoY =
            Math.sin(angulo) *
            distancia;


        particula.style.left =
            `${x}%`;

        particula.style.top =
            `${y}%`;


        particula.style.setProperty(
            "--x",
            `${destinoX}px`
        );

        particula.style.setProperty(
            "--y",
            `${destinoY}px`
        );


        particula.style.animationDelay =
            `${Math.random() * 0.15}s`;


        document
            .getElementById("fuegos")
            .appendChild(particula);


        setTimeout(() => {

            particula.remove();

        }, 2200);
    }
}

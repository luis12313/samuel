/* =========================================
   CAMBIO DE ESCENAS
========================================= */

const escenas =
    document.querySelectorAll(".escena");


function mostrarEscena(id) {

    escenas.forEach(escena => {

        escena.classList.remove("activa");

    });

    const escena =
        document.getElementById(id);

    if (escena) {

        escena.classList.add("activa");

    }
}


/* =========================================
   VIAJE
========================================= */

const inicioViaje =
    new Date("2026-09-28T00:00:00");

const llegadaViaje =
    new Date("2026-10-18T00:00:00");


const avion =
    document.getElementById("avion");

const contador =
    document.getElementById("contador");

const mensajeViaje =
    document.getElementById("mensajeViaje");


/*
    COORDENADAS DEL MAPA

    Colombia:
        1654,837

    Costa Rica:
        1462,731

    Por lo tanto:

    0%   = Colombia
    100% = Costa Rica
*/


const colombia = {
    x: 1654,
    y: 837
};

const costaRica = {
    x: 1462,
    y: 731
};


/* =========================================
   BEZIER
========================================= */

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

    return {
        x,
        y
    };
}


/* =========================================
   POSICIÓN DEL AVIÓN
========================================= */

function calcularPosicion(progreso) {

    /*
        Colombia
             ↓
        curva
             ↓
        Costa Rica
    */

    return bezier(

        colombia.x,
        colombia.y,

        1595,
        825,

        1505,
        755,

        costaRica.x,
        costaRica.y,

        progreso

    );
}


/* =========================================
   ACTUALIZAR VIAJE
========================================= */

function actualizarViaje() {

    const ahora =
        new Date();


    let progreso =
        (
            ahora - inicioViaje
        ) /
        (
            llegadaViaje -
            inicioViaje
        );


    progreso =
        Math.max(
            0,
            Math.min(
                1,
                progreso
            )
        );


    /* Posición */

    const posicion =
        calcularPosicion(
            progreso
        );


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


        if (
            !window.cartaLlegadaMostrada
        ) {

            window.cartaLlegadaMostrada =
                true;


            setTimeout(() => {

                mostrarEscena(
                    "portada"
                );

            }, 2500);

        }

        return;
    }


    const dias =
        Math.floor(
            diferencia /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    const horas =
        Math.floor(
            (
                diferencia %
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            ) /
            (
                1000 *
                60 *
                60
            )
        );


    const minutos =
        Math.floor(
            (
                diferencia %
                (
                    1000 *
                    60 *
                    60
                )
            ) /
            (
                1000 *
                60
            )
        );


    const segundos =
        Math.floor(
            (
                diferencia %
                (
                    1000 *
                    60
                )
            ) /
            1000
        );


    contador.textContent =
        `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}


actualizarViaje();


setInterval(
    actualizarViaje,
    1000
);


/* =========================================
   BOTÓN ABRIR
========================================= */

const abrirBtn =
    document.getElementById(
        "abrirBtn"
    );


abrirBtn.addEventListener(
    "click",
    () => {

        mostrarEscena(
            "escena1"
        );

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


                mostrarEscena(
                    siguiente
                );


                if (
                    siguiente === "final"
                ) {

                    iniciarFuegos();

                }

            }
        );

    });


/* =========================================
   PARTICULAS
========================================= */

const contenedorParticulas =
    document.getElementById(
        "particulas"
    );


function crearParticulas() {

    for (
        let i = 0;
        i < 45;
        i++
    ) {

        const particula =
            document.createElement(
                "div"
            );


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
        document.getElementById(
            "fuegos"
        );


    contenedor.innerHTML = "";


    for (
        let i = 0;
        i < 9;
        i++
    ) {

        setTimeout(
            () => {

                crearFuego(
                    15 +
                    Math.random() * 70,

                    15 +
                    Math.random() * 50
                );

            },

            i * 500
        );

    }
}


function crearFuego(
    x,
    y
) {

    const cantidad = 30;


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const particula =
            document.createElement(
                "div"
            );


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


        contenedorFuegos =
            document.getElementById(
                "fuegos"
            );


        contenedorFuegos.appendChild(
            particula
        );


        setTimeout(
            () => {

                particula.remove();

            },

            2200
        );

    }
}

/* =====================================================
   PARTICULAS
   ===================================================== */

const particulas =
    document.getElementById("particulas");

for (let i = 0; i < 70; i++) {

    const particula =
        document.createElement("div");

    particula.className =
        "particula";

    particula.style.left =
        Math.random() * 100 + "%";

    particula.style.animationDuration =
        (5 + Math.random() * 8) + "s";

    particula.style.animationDelay =
        Math.random() * 8 + "s";

    particula.style.opacity =
        0.3 + Math.random() * 0.7;

    particulas.appendChild(
        particula
    );
}


/* =====================================================
   ELEMENTOS
   ===================================================== */

const viajeInicial =
    document.getElementById(
        "viajeInicial"
    );

const inicio =
    document.getElementById(
        "inicio"
    );

const rutaInicial =
    document.getElementById(
        "rutaInicial"
    );

const avionInicial =
    document.getElementById(
        "avionInicial"
    );

const textoViaje =
    document.getElementById(
        "textoViaje"
    );


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

    let diferencia =
        llegadaViaje - ahora;

    if (diferencia < 0) {
        diferencia = 0;
    }

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


    document.getElementById(
        "dias"
    ).textContent =
        String(dias).padStart(2, "0");

    document.getElementById(
        "horas"
    ).textContent =
        String(horas).padStart(2, "0");

    document.getElementById(
        "minutos"
    ).textContent =
        String(minutos).padStart(2, "0");

    document.getElementById(
        "segundos"
    ).textContent =
        String(segundos).padStart(2, "0");
}


/* =====================================================
   AVION
   ===================================================== */

function actualizarAvion() {

    const ahora =
        new Date();


    const duracionTotal =
        llegadaViaje -
        inicioViaje;


    const transcurrido =
        ahora -
        inicioViaje;


    let progreso =
        transcurrido /
        duracionTotal;


    progreso =
        Math.max(
            0,
            Math.min(
                1,
                progreso
            )
        );


    /*
        La ruta mide exactamente lo que
        utilizamos para mover el avión.
    */

    const longitud =
        rutaInicial.getTotalLength();


    const distancia =
        progreso *
        longitud;


    const punto =
        rutaInicial.getPointAtLength(
            distancia
        );


    /*
        Punto ligeramente adelantado
        para saber hacia dónde apunta
        el avión.
    */

    const puntoSiguiente =
        rutaInicial.getPointAtLength(
            Math.min(
                longitud,
                distancia + 1
            )
        );


    const dx =
        puntoSiguiente.x -
        punto.x;

    const dy =
        puntoSiguiente.y -
        punto.y;


    let angulo =
        Math.atan2(
            dy,
            dx
        ) *
        180 /
        Math.PI;


    /*
        El emoji del avión apunta
        hacia arriba.
    */

    angulo += 90;


    avionInicial.setAttribute(
        "transform",
        `
        translate(
            ${punto.x}
            ${punto.y}
        )
        rotate(${angulo})
        `
    );


    /* =================================================
       LLEGADA
       ================================================= */

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
   ACTUALIZACION
   ================================================= */

function actualizarTodo() {

    actualizarContador();

    actualizarAvion();
}


actualizarTodo();


setInterval(
    actualizarTodo,
    1000
);


/* =====================================================
   BOTONES
   ===================================================== */

const botonAbrir =
    document.getElementById(
        "botonAbrir"
    );

const carta =
    document.getElementById(
        "carta"
    );

const segunda =
    document.getElementById(
        "segunda"
    );

const final =
    document.getElementById(
        "final"
    );

const continuar =
    document.getElementById(
        "continuar"
    );

const continuar2 =
    document.getElementById(
        "continuar2"
    );


botonAbrir.addEventListener(
    "click",
    () => {

        inicio.classList.remove(
            "mostrar"
        );

        carta.classList.add(
            "activa"
        );
    }
);


continuar.addEventListener(
    "click",
    () => {

        carta.classList.remove(
            "activa"
        );

        segunda.classList.add(
            "activa"
        );
    }
);


continuar2.addEventListener(
    "click",
    () => {

        segunda.classList.remove(
            "activa"
        );

        final.classList.add(
            "activa"
        );

        lanzarFuegos();
    }
);


/* =====================================================
   FUEGOS ARTIFICIALES
   ===================================================== */

function lanzarFuegos() {

    const contenedor =
        document.getElementById(
            "fuegos"
        );


    for (let explosion = 0;
         explosion < 8;
         explosion++) {

        setTimeout(() => {

            const centroX =
                10 +
                Math.random() * 80;

            const centroY =
                10 +
                Math.random() * 50;


            for (let i = 0;
                 i < 35;
                 i++) {

                const particula =
                    document.createElement(
                        "div"
                    );

                particula.className =
                    "fuego";


                particula.style.left =
                    centroX + "%";

                particula.style.top =
                    centroY + "%";


                const angulo =
                    Math.random() *
                    Math.PI *
                    2;


                const distancia =
                    50 +
                    Math.random() *
                    100;


                particula.style.setProperty(
                    "--x",
                    Math.cos(angulo) *
                    distancia +
                    "px"
                );


                particula.style.setProperty(
                    "--y",
                    Math.sin(angulo) *
                    distancia +
                    "px"
                );


                contenedor.appendChild(
                    particula
                );


                setTimeout(() => {

                    particula.remove();

                }, 1600);
            }

        }, explosion * 500);
    }
}

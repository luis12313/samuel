// ==========================================
// PARTICULAS
// ==========================================

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



// ==========================================
// FECHAS DEL VIAJE
// ==========================================

// Comienzo del viaje
const inicioViaje =
    new Date("2026-09-28T00:00:00");


// Día del cumpleaños
const llegadaViaje =
    new Date("2026-10-18T00:00:00");



// ==========================================
// VIAJE COLOMBIA → COSTA RICA
// ==========================================

function animarViajeInicial() {

    if (!rutaInicial || !avionInicial) {
        return;
    }


    const ahora =
        new Date();


    const tiempoTotal =
        llegadaViaje - inicioViaje;


    const tiempoTranscurrido =
        ahora - inicioViaje;


    // Porcentaje del viaje completado
    let progreso =
        tiempoTranscurrido / tiempoTotal;


    // Limitar entre 0 y 1
    progreso =
        Math.max(
            0,
            Math.min(1, progreso)
        );


    // Longitud total de la ruta
    const longitud =
        rutaInicial.getTotalLength();


    // Posición actual
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



    // ==========================================
    // ROTACIÓN DEL AVIÓN
    // ==========================================

    const angulo =
        Math.atan2(
            posicion.y -
            posicionAnterior.y,

            posicion.x -
            posicionAnterior.x
        )
        * 180 / Math.PI;



    avionInicial.setAttribute(
        "transform",
        `translate(${posicion.x}, ${posicion.y}) rotate(${angulo})`
    );



    // ==========================================
    // CUANDO LLEGA EL 18/10
    // ==========================================

    if (progreso >= 1) {

        const posicionFinal =
            rutaInicial.getPointAtLength(
                longitud
            );


        avionInicial.setAttribute(
            "transform",
            `translate(${posicionFinal.x}, ${posicionFinal.y})`
        );


        const textoViaje =
            document.querySelector(
                ".viaje-inicial-texto"
            );


        if (textoViaje) {

            textoViaje.textContent =
                "💌 ¡La carta llegó a Costa Rica!";

        }



        // Después de llegar,
        // aparece la portada.

        setTimeout(() => {

            viajeInicial.classList.add(
                "ocultar"
            );

            inicio.classList.add(
                "mostrar"
            );

        }, 2500);


        return;
    }



    // ==========================================
    // ACTUALIZAR
    // ==========================================

    setTimeout(
        animarViajeInicial,
        1000
    );
}



// ==========================================
// ABRIR REGALO
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
// PRIMERA ESCENA → SEGUNDA
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
// SEGUNDA ESCENA → FINAL
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
// CREAR FUEGO ARTIFICIAL
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



// ==========================================
// INICIAR VIAJE
// ==========================================

animarViajeInicial();
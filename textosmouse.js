// script.js – Código reutilizable para texto dinámico por posición del mouse.
// Lee los textos desde el atributo data-textos del contenedor principal.

(function() {
    // 1. Obtener el contenedor donde se mostrará el texto
    const contenedor = document.getElementById("textoDinamico");
    if (!contenedor) {
        console.warn("No se encontró el elemento con id 'textoDinamico'");
        return;
    }

    // 2. Leer los textos desde el atributo data-textos (formato JSON)
    let textos = [];
    const rawTextos = contenedor.getAttribute("data-textos");
    if (rawTextos) {
        try {
            textos = JSON.parse(rawTextos);
        } catch(e) {
            console.error("Error al parsear data-textos:", e);
            textos = ["Error: formato de textos incorrecto"];
        }
    } else {
        // Fallback por si no hay atributo (opcional)
        textos = ["Texto por defecto 1", "Texto por defecto 2"];
    }

    // 3. Referencia al elemento que muestra la posición (opcional)
    const displayPos = document.getElementById("posicionMouse");

    // 4. Variable para evitar cambios innecesarios
    let indiceActual = -1;

    // 5. Función que actualiza el texto según la posición X del mouse
    function actualizarPorMouse(event) {
        const anchoVentana = window.innerWidth;
        let mouseX = event.clientX;

        // Mostrar posición (solo si existe el elemento)
        if (displayPos) {
            displayPos.textContent = `Posición X: ${Math.round(mouseX)}px`;
        }

        // Calcular índice (0..textos.length-1) según el porcentaje horizontal
        let indice = Math.floor((mouseX / anchoVentana) * textos.length);
        indice = Math.min(Math.max(indice, 0), textos.length - 1);

        // Solo actualizar si cambió el índice
        if (indice !== indiceActual) {
            indiceActual = indice;
            // Usamos innerHTML para permitir saltos de línea y etiquetas ligeras
            contenedor.innerHTML = textos[indiceActual];
        }
    }

    // 6. Eventos
    document.addEventListener("mousemove", actualizarPorMouse);
    document.addEventListener("touchmove", function(e) {
        const touch = e.touches[0];
        if (touch) actualizarPorMouse(touch);
    });

    // 7. Inicialización: mostrar el texto correspondiente al centro de la pantalla
    window.addEventListener("load", function() {
        const eventoSimulado = { clientX: window.innerWidth / 2 };
        actualizarPorMouse(eventoSimulado);
    });
})();
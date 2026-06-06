(function() {
    const contenedor = document.getElementById("textoVariable");
    if (!contenedor) return;

    // Leer textos desde atributo data-textos (formato JSON)
    let textos = [];
    const raw = contenedor.getAttribute("data-textos");
    if (raw) {
        try {
            textos = JSON.parse(raw);
        } catch(e) {
            console.error("Error al parsear data-textos", e);
            textos = ["Error: textos no válidos"];
        }
    } else {
        // Valores por defecto si no hay atributo
        textos = ["Texto 1", "Texto 2", "Texto 3"];
    }
let indiceActual = -1;
    const displayPosicion = document.getElementById("mousePosDisplay");

    function actualizarPorMouse(event) {
        const anchoVentana = window.innerWidth;
        let mouseX = event.clientX;
        if (displayPosicion) displayPosicion.textContent = `Posición X: ${Math.round(mouseX)}px`;
        let indice = Math.floor((mouseX / anchoVentana) * textos.length);
        indice = Math.min(Math.max(indice, 0), textos.length - 1);
        if (indice !== indiceActual) {
            indiceActual = indice;
            contenedor.innerHTML = textos[indiceActual];
            contenedor.scrollTop = 0;
        }
    }


  document.addEventListener("mousemove", actualizarPorMouse);
    document.addEventListener("touchmove", (e) => {
        const touch = e.touches[0];
        if (touch) actualizarPorMouse(touch);
    });

    window.addEventListener("load", () => {
        const eventoSimulado = { clientX: window.innerWidth / 2 };
        actualizarPorMouse(eventoSimulado);
    });
})();
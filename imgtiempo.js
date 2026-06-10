// carrusel-tiempo.js
(function() {
    const contenedor = document.getElementById("carruselAutomatico");
    if (!contenedor) return;

    // Leer el array de imágenes desde el atributo data-imagenes
    let imagenes = [];
    const raw = contenedor.getAttribute("data-imagenes");
    if (raw) {
        try {
            imagenes = JSON.parse(raw);
        } catch(e) {
            console.error("Error al parsear data-imagenes", e);
            return;
        }
    } else {
        console.warn("No se encontró el atributo data-imagenes en el contenedor");
        return;
    }

    if (imagenes.length === 0) return;

    // Crear el elemento <img> dentro del contenedor
    const imgElement = document.createElement("img");
    imgElement.classList.add("imagen-activa");
    contenedor.appendChild(imgElement);

    let indiceActual = 0;

    // Función para cambiar a la siguiente imagen
    function siguienteImagen() {
        // Avanzar al siguiente índice (cíclico)
        indiceActual = (indiceActual + 1) % imagenes.length;
        // Cambiar la fuente de la imagen
        imgElement.src = imagenes[indiceActual];
        
        // Opcional: efecto de fade reiniciando la opacidad (ya está en CSS)
        // No es necesario hacer nada más
    }

    // Mostrar la primera imagen al cargar
    imgElement.src = imagenes[0];

    // Configurar el intervalo de tiempo (cada 3 segundos)
    const intervalo = setInterval(siguienteImagen, 300); // Cambia 3000 por los milisegundos que quieras

    // Opcional: detener el carrusel si la página se descarga (buena práctica)
    window.addEventListener("beforeunload", function() {
        clearInterval(intervalo);
    });
})();
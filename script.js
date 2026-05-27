const videos = [
    "videos/videotesis1.mp4",
    "videos/videotesis2.mp4",
    "videos/videotesis3.mp4",
    "videos/videotesis4.mp4",
    "videos/videotesis5.mp4",
    "videos/videotesis6.mp4",
    "videos/videotesis7.mp4",
    "videos/videotesis8.mp4",
    "videos/videotesis9.mp4",
    "videos/videotesis10.mp4",
    "videos/videotesis11.mp4",
    "videos/videotesis12.mp4",
    "videos/videotesis13.mp4",
    "videos/videotesis14.mp4",
    "videos/videotesis15.mp4",
    "videos/videotesis16.mp4",
    "videos/videotesis17.mp4",
    "videos/videotesis18.mp4",
    "videos/videotesis19.mp4"
];

const videoElement = document.getElementById("videoPlayer");
let currentIndex = -1; // para saber si ya cambió

// Función que cambia el video según la posición del mouse (0 a 1)
function cambiarVideoPorMouse(event) {
    // Obtener el ancho total de la ventana
    const anchoVentana = window.innerWidth;
    // Obtener la posición X del mouse (0 a anchoVentana)
    let mouseX = event.clientX;
    // Calcular el índice (0 a 18)
    let indice = Math.floor((mouseX / anchoVentana) * videos.length);
    // Asegurar que no se salga del rango
    indice = Math.min(Math.max(indice, 0), videos.length - 1);

    // Solo cambiar si el índice es diferente al actual (evita recargas innecesarias)
    if (indice !== currentIndex) {
        currentIndex = indice;
        const nuevaFuente = videos[currentIndex];
        
        // Cambiar el src del video
        videoElement.src = nuevaFuente;
        // Reproducir (necesario porque al cambiar src se detiene)
        videoElement.play().catch(error => {
            // Si el navegador bloquea el autoplay, se puede mostrar un mensaje
            console.log("Autoplay bloqueado, pero el video se activará con el mouse");
        });
    }
}

// Escuchar el movimiento del mouse en toda la pantalla
document.addEventListener("mousemove", cambiarVideoPorMouse);

// Opcional: si quieres que también funcione con el dedo en pantallas táctiles
document.addEventListener("touchmove", function(event) {
    const touch = event.touches[0];
    // Crear un evento simulado
    cambiarVideoPorMouse(touch);
});

// Inicializar con el primer video (para que no esté en negro al cargar)
window.addEventListener("load", function() {
    // Simular mouse en el centro de la pantalla al inicio
    const eventoSimulado = { clientX: window.innerWidth / 2 };
    cambiarVideoPorMouse(eventoSimulado);
});

const totalVideos = 26;
const videoPaths = [];

// Generar rutas: asume que se llaman videotesis1.mp4 ... videotesis19.mp4
for (let i = 1; i <= totalVideos; i++) {
    videoPaths.push(`videos4/20sec_${i}.mp4`);
}

const container = document.getElementById('videoContainer');
let videos = [];          // almacenará los elementos <video>
let currentIndex = 0;

// Crear los 19 videos, uno por uno
videoPaths.forEach((path, idx) => {
    const video = document.createElement('video');
    video.src = path;
    video.classList.add('video-layer');
    if (idx === 0) video.classList.add('active');   // el primero visible
    video.autoplay = true;
    video.muted = true;          // obligatorio para autoplay
    video.loop = true;           // repite en bucle
    video.playsInline = true;    // evita pantalla completa en móvil
    container.appendChild(video);
    videos.push(video);
});

// Función que cambia el video visible según la posición X del mouse
function cambiarVideoPorMouse(event) {
    const anchoVentana = window.innerWidth;
    let mouseX = event.clientX;
    let nuevoIndice = Math.floor((mouseX / anchoVentana) * totalVideos);
    nuevoIndice = Math.min(Math.max(nuevoIndice, 0), totalVideos - 1);

    if (nuevoIndice !== currentIndex) {
        // Ocultar el actual
        videos[currentIndex].classList.remove('active');
        // Mostrar el nuevo
        videos[nuevoIndice].classList.add('active');
        currentIndex = nuevoIndice;

        // Por si el navegador pausó el video recién mostrado, lo reanudamos
        videos[currentIndex].play().catch(e => console.log("autoplay", e));
    }
}

// Evento para ratón
document.addEventListener('mousemove', cambiarVideoPorMouse);

// Evento para pantallas táctiles (arrastrar el dedo)
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    cambiarVideoPorMouse(touch);
});

// Al cargar la página, reproducir todos los videos (importante para que estén en loop)
window.addEventListener('load', () => {
    videos.forEach(video => {
        video.play().catch(e => console.log("No se pudo reproducir automáticamente", video.src));
    });
    
    // Opcional: colocar el mouse virtualmente en el centro para que muestre el video intermedio
    const eventoSimulado = { clientX: window.innerWidth / 2 };
    cambiarVideoPorMouse(eventoSimulado);
});
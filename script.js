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

const video1 = document.getElementById("video1");
const video2 = document.getElementById("video2");
let activeVideo = video1;   // el que se ve actualmente
let inactiveVideo = video2;
let currentIndex = -1;

function cambiarVideoPorMouse(event) {
    const anchoVentana = window.innerWidth;
    let mouseX = event.clientX;
    let indice = Math.floor((mouseX / anchoVentana) * videos.length);
    indice = Math.min(Math.max(indice, 0), videos.length - 1);
    
    if (indice !== currentIndex) {
        currentIndex = indice;
        const nuevaFuente = videos[currentIndex];
        
        // El video inactivo (el que no se ve) carga el nuevo src
        inactiveVideo.src = nuevaFuente;
        inactiveVideo.play().catch(e => console.log("autoplay", e));
        
        // Hacemos fade: el inactivo se vuelve activo (opaco)
        inactiveVideo.classList.add("active");
        activeVideo.classList.remove("active");
        
        // Intercambiamos los roles
        let temp = activeVideo;
        activeVideo = inactiveVideo;
        inactiveVideo = temp;
    }
}

// Escuchar mouse
document.addEventListener("mousemove", cambiarVideoPorMouse);
document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    cambiarVideoPorMouse(touch);
});

// Inicializar con el primer video
window.addEventListener("load", () => {
    // Cargar video inicial en el activo
    activeVideo.src = videos[0];
    activeVideo.play().catch(e => console.log("autoplay inicial", e));
    activeVideo.classList.add("active");
    inactiveVideo.classList.remove("active");
    currentIndex = 0;
});
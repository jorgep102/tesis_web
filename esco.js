const video = document.getElementById('bgVideo');
        const enlaces = document.querySelectorAll('.menu a');
        let videoActual = '';

        // Guarda el color original del body (puedes cambiarlo aquí si quieres otro color)
        const colorOriginal = '#ffffffff'; 

        // Función para cambiar el video
        function cambiarVideo(ruta) {
            if (ruta === videoActual) return;
            videoActual = ruta;
            video.src = ruta;
            video.play().catch(e => console.log("Autoplay no permitido", e));
        }

        // Función para restaurar el fondo sólido y detener el video (opcional)
        function restaurarFondo() {
            // Opcional: detener el video (no es necesario, pero se puede)
            // video.pause();
            // video.src = '';  // si quieres vaciarlo, descomenta
            document.body.style.backgroundColor = colorOriginal;
        }

        // Asignar eventos a cada enlace
        enlaces.forEach(enlace => {
            const videoSrc = enlace.getAttribute('data-video');
            if (!videoSrc) return;

            enlace.addEventListener('mouseenter', () => {
                // Cambia el fondo del body a negro (por si el video tarda en cargar) y luego cambia el video
                document.body.style.backgroundColor = 'rgba(0, 0, 0, 1)';
                cambiarVideo(videoSrc);
            });

            enlace.addEventListener('mouseleave', () => {
                restaurarFondo();
            });
        });

        // Al cargar la página, aseguramos fondo negro y ningún video (o el que quieras como por defecto)
        window.addEventListener('load', () => {
            document.body.style.backgroundColor = colorOriginal;
            // Opcional: muestra un video por defecto (comenta si no quieres)
            // cambiarVideo('videos/fondo1.mp4');
        });
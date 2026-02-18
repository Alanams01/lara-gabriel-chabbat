// audio.js - Gestion musicale Lara & Gabriel
document.addEventListener("DOMContentLoaded", function() {
    const audioHtml = `
        <div id="music-control" style="position: fixed; top: 18px; left: 20px; z-index: 1000; cursor: pointer; color: #3b1e2f; font-size: 9px; font-weight: 700; letter-spacing: 3px; font-family: 'Montserrat', sans-serif; text-shadow: 0 0 10px #fff;">
            SOUND <span id="music-status">ON</span>
        </div>
        <audio id="bg-music" loop>
            <source src="musique4.mp3" type="audio/mpeg">
        </audio>`;
    
    document.body.insertAdjacentHTML('beforeend', audioHtml);

    const music = document.getElementById('bg-music');
    const status = document.getElementById('music-status');
    const control = document.getElementById('music-control');

    // Reprendre la musique là où elle s'était arrêtée
    const musicTime = localStorage.getItem('musicTime');
    const isPaused = localStorage.getItem('musicPaused');

    if (musicTime) {
        music.currentTime = parseFloat(musicTime);
    }

    // Tentative de lecture automatique (si pas en pause manuelle)
    if (isPaused !== 'true') {
        music.play().then(() => {
            status.innerText = "ON";
        }).catch(() => {
            // Blocage navigateur : on attend une interaction
            status.innerText = "OFF";
        });
    } else {
        status.innerText = "OFF";
    }

    // Sauvegarder la position en temps réel (toutes les 500ms)
    setInterval(() => {
        if (!music.paused) {
            localStorage.setItem('musicTime', music.currentTime);
        }
    }, 500);

    // Contrôle ON/OFF
    control.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            status.innerText = "ON";
            localStorage.setItem('musicPaused', 'false');
        } else {
            music.pause();
            status.innerText = "OFF";
            localStorage.setItem('musicPaused', 'true');
        }
    });
});
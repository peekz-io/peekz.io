// --- Now Playing Modul (Header Rechts) ---

function initNowPlaying() {
    const root = document.getElementById('now-playing-root');
    if (!root || typeof nowPlayingData === 'undefined') return;

    root.innerHTML = `
        <div class="now-playing">
            <img src="${nowPlayingData.cover}" alt="Cover" class="now-playing__cover">
            <div class="now-playing__info">
                <span class="now-playing__ticker">
                    ${nowPlayingData.title} <span class="now-playing__artist">&bull; ${nowPlayingData.artist}</span>
                </span>
            </div>
            <div class="now-playing__bars">
                <div class="now-playing__bar"></div>
                <div class="now-playing__bar"></div>
                <div class="now-playing__bar"></div>
            </div>
        </div>
    `;

    // Klick-Logik, um die Now-Playing Ansicht zu öffnen
    const nowPlayingElement = root.querySelector('.now-playing');
    nowPlayingElement.addEventListener('click', () => {
        if (typeof window.switchAppView === 'function') {
            if (sessionStorage.getItem('activeViewId') === 'nowplaying') return;
            window.switchAppView('nowplaying', true);
        }
    });
}
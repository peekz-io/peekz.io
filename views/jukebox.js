// --- Jukebox View ---

// Beispiel-Tracks (Mock-Daten)
const jukeboxTracks = [
    { id: 1, title: "Midnight City", artist: "M83", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=100&q=80", votes: 42 },
    { id: 2, title: "Starboy", artist: "The Weeknd, Daft Punk", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=100&q=80", votes: 38 },
    { id: 3, title: "Nightcall", artist: "Kavinsky", cover: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=100&q=80", votes: 31 },
    { id: 4, title: "Blinding Lights", artist: "The Weeknd", cover: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f4b0?auto=format&fit=crop&w=100&q=80", votes: 29 },
    { id: 5, title: "Do I Wanna Know?", artist: "Arctic Monkeys", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=100&q=80", votes: 24 },
    { id: 6, title: "Bad Guy", artist: "Billie Eilish", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=100&q=80", votes: 19 },
    { id: 7, title: "Pursuit Of Happiness", artist: "Kid Cudi", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=100&q=80", votes: 15 },
    { id: 8, title: "Feel It Still", artist: "Portugal. The Man", cover: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=100&q=80", votes: 12 },
    { id: 9, title: "Gooey", artist: "Glass Animals", cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=100&q=80", votes: 8 },
    { id: 10, title: "Electric Feel", artist: "MGMT", cover: "https://images.unsplash.com/photo-1525362081669-2b476bb628c3?auto=format&fit=crop&w=100&q=80", votes: 5 }
];

function initJukeboxView() {
    const root = document.getElementById('jukebox-root');
    if (!root) return;

    // Nimmt den aktuellen Song aus den globalen data.js, sonst ein Fallback
    const nowPlaying = typeof nowPlayingData !== 'undefined' ? nowPlayingData : jukeboxTracks[0];

    // HTML Struktur generieren
    root.innerHTML = `
        <section class="jukebox-section container">
            
            <!-- Hero Header ("Now Playing") -->
            <div class="jukebox-hero">
                <div class="jukebox-hero__cover-wrapper">
                    <img src="${nowPlaying.cover}" alt="${nowPlaying.title}" class="jukebox-hero__cover">
                </div>
                <div class="jukebox-hero__info">
                    <h2 class="jukebox-hero__title">${nowPlaying.title}</h2>
                    <p class="jukebox-hero__artist">${nowPlaying.artist}</p>
                </div>
                <div class="jukebox-hero__progress">
                    <div class="jukebox-hero__progress-bar">
                        <div class="jukebox-hero__progress-fill"></div>
                    </div>
                </div>
            </div>

            <!-- Main Content (Voting-Liste) -->
            <div class="jukebox-list-header">
                <h3 class="jukebox-list-title">Up Next</h3>
            </div>
            <div class="jukebox-list no-scrollbar">
                ${jukeboxTracks.map((track, index) => `
                    <div class="jukebox-track">
                        <div class="jukebox-track__rank">${index + 1}</div>
                        <img src="${track.cover}" alt="${track.title}" class="jukebox-track__cover">
                        <div class="jukebox-track__info">
                            <div class="jukebox-track__title">${track.title}</div>
                            <div class="jukebox-track__artist">${track.artist}</div>
                        </div>
                        <button class="jukebox-track__vote-btn" data-track-id="${track.id}">
                            <svg class="vote-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                            <span class="vote-count">${track.votes}</span>
                        </button>
                    </div>
                `).join('')}
            </div>
        </section>
    `;

    // Interaktive Logik (Voting / Herz-Button)
    const voteButtons = root.querySelectorAll('.jukebox-track__vote-btn');
    
    voteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const countSpan = this.querySelector('.vote-count');
            const currentCount = parseInt(countSpan.textContent);
            
            if (this.classList.contains('is-voted')) {
                // Stimme zurückziehen
                this.classList.remove('is-voted');
                countSpan.textContent = currentCount - 1;
            } else {
                // Stimme abgeben
                this.classList.add('is-voted');
                countSpan.textContent = currentCount + 1;
            }
            
            // Taktiles Feedback für mobile Geräte, falls unterstützt
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
    });
}
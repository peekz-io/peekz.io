// --- Story Modul Logik ---

let currentStoryIndex = 0;
let storyTimeout = null;
const STORY_DURATION = 4000; // Zeit pro Story in Millisekunden (hier 4 Sekunden)

// Variablen für Touch/Swipe-Erkennung
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

// Neu für Pause-Feature
let storyStartTime = 0;
let remainingTime = 0;
let isPaused = false;
let isLoading = false;

// Wird vom Haupt-Controller (app.js) aufgerufen
function initStoryModule() {
    renderStoryModule();
    
    // Event-Listener zum Schließen des Viewers
    const closeBtn = document.getElementById('story-viewer-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeStoryViewer);
    }

    // Touch/Klick & Long-Press Steuerung auf dem Bild
    const viewerImg = document.getElementById('story-viewer-img');
    if (viewerImg) {
        let pressTimer;
        let isLongPress = false;
        let startX = 0, startY = 0;

        viewerImg.addEventListener('pointerdown', (e) => {
            isLongPress = false;
            startX = e.clientX;
            startY = e.clientY;
            
            pressTimer = setTimeout(() => {
                isLongPress = true;
                pauseStory();
            }, 250); // Ab 250ms gilt es als "Gedrückt halten"
        });

        viewerImg.addEventListener('pointerup', (e) => {
            clearTimeout(pressTimer);
            if (isLongPress) {
                resumeStory();
            } else {
                // Klick nur ausführen, wenn nicht stark gewischt wurde (Swipe)
                const deltaX = Math.abs(e.clientX - startX);
                const deltaY = Math.abs(e.clientY - startY);
                if (deltaX < 10 && deltaY < 10) {
                    const screenWidth = window.innerWidth;
                    if (e.clientX < screenWidth / 2) showStory(currentStoryIndex - 1);
                    else showStory(currentStoryIndex + 1);
                }
            }
        });

        // Verhindert das Standard-Kontextmenü/Speichern-Dialog auf Mobile
        viewerImg.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    // Swipe-Erkennung auf dem gesamten Viewer-Overlay
    const viewer = document.getElementById('story-viewer');
    if (viewer) {
        viewer.addEventListener('touchstart', (e) => {
            // Verhindert, dass das "Pull-to-Refresh"-Skript auf dem Document getriggert wird,
            // während der Story-Viewer aktiv ist.
            e.stopPropagation();
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });

        // Blockiert das native iOS-Gummi-Band-Scrollen (Scroll-Bleed) komplett
        viewer.addEventListener('touchmove', (e) => {
            e.preventDefault(); 
        }, { passive: false });

        viewer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });
    }
}

function renderStoryModule() {
    const root = document.getElementById('story-root');
    if (!root) return;

    // Dynamisches Skeleton HTML generieren
    let skeletonHtml = '<div class="story-container no-scrollbar">';
    const widths = [70, 50, 60, 75, 45, 65];
    const count = typeof storyData !== 'undefined' ? storyData.length : 6;
    
    for (let i = 0; i < count; i++) {
        const randomWidth = widths[i % widths.length];
        skeletonHtml += `
            <div class="story-item is-skeleton">
                <div class="story-ring"><div class="story-inner skeleton-pulse skeleton-circle"></div></div>
                <span class="story-label story-skeleton-label" style="width: ${randomWidth}px;"><span class="skeleton-pulse"></span></span>
            </div>
        `;
    }
    skeletonHtml += '</div>';
    root.innerHTML = skeletonHtml;

    const skeletonItems = root.querySelectorAll('.story-item.is-skeleton');

    storyData.forEach((story, index) => {
        const item = skeletonItems[index];
        if (!item) return;

        item.classList.remove('is-skeleton');
        item.setAttribute('onclick', `openStoryViewer(${index})`);
        
        const imgContainer = item.querySelector('.story-inner');
        const labelContainer = item.querySelector('.story-label');

        // Erstelle das echte Bild
        const img = new Image();
        img.className = 'story-img media-loading';
        img.alt = story.label;

        img.onload = () => {
            imgContainer.innerHTML = ''; // Skeleton entfernen
            imgContainer.classList.remove('skeleton-pulse', 'skeleton-circle');
            imgContainer.appendChild(img);
            setTimeout(() => img.classList.add('media-loaded'), 10); // Fade-in auslösen
        };
        
        img.onerror = () => {
            imgContainer.innerHTML = ''; 
            imgContainer.classList.remove('skeleton-pulse', 'skeleton-circle');
        };
        
        img.src = story.thumbnail; // WICHTIG: src immer NACH onload setzen!
        
        labelContainer.innerHTML = ''; // Skeleton entfernen
        labelContainer.style = '';
        labelContainer.textContent = story.label;
    });
}

// --- Story Viewer Logik ---

window.openStoryViewer = function(index) {
    const viewer = document.getElementById('story-viewer');
    if (!viewer) return;
    
    viewer.style.display = 'flex';
    document.body.classList.add('body-no-scroll'); // Hintergrund einfrieren
    showStory(index, true); // Beim allerersten Klick den Blur-Up Effekt verwenden
};

window.closeStoryViewer = function() {
    const viewer = document.getElementById('story-viewer');
    if (viewer) {
        viewer.style.display = 'none';
        document.body.classList.remove('body-no-scroll'); // Hintergrund wieder freigeben
    }
    clearTimeout(storyTimeout);
};

function showStory(index, isInitial = false) {
    if (index >= storyData.length || index < 0) {
        closeStoryViewer();
        return;
    }

    currentStoryIndex = index;
    
    const viewerImg = document.getElementById('story-viewer-img');
    
    clearTimeout(storyTimeout);

    const progressContainer = document.getElementById('story-progress-container');
    progressContainer.innerHTML = ''; 

    storyData.forEach((_, i) => {
        const bar = document.createElement('div');
        bar.className = 'story-progress-bar';
        const fill = document.createElement('div');
        fill.className = 'story-progress-fill';
        
        if (i < index) {
            fill.style.width = '100%'; 
        } else if (i === index) {
            fill.style.width = '0%'; 
        }
        bar.appendChild(fill);
        progressContainer.appendChild(bar);
    });

    // Hilfsfunktion, um den Story-Timer zu starten
    const startStoryTimer = () => {
        remainingTime = STORY_DURATION;
        storyStartTime = Date.now();
        isPaused = false;
        
        const activeFill = progressContainer.querySelectorAll('.story-progress-fill')[index];
        if (activeFill) {
            setTimeout(() => {
                if (!isPaused) {
                    activeFill.style.transition = `width ${remainingTime}ms linear`;
                    activeFill.style.width = '100%';
                }
            }, 50);
        }
        
        storyTimeout = setTimeout(() => showStory(index + 1), remainingTime);
    };

    if (isInitial) {
        // 1. Blur-Up Effekt NUR beim ersten Öffnen der Story
        isLoading = true;
        viewerImg.style.transition = 'none';
        viewerImg.style.backgroundImage = `url('${storyData[index].thumbnail}')`;
        viewerImg.style.filter = 'blur(20px)';
        viewerImg.style.transform = 'scale(1.1)';
        
        const fullImg = new Image();
        
        fullImg.onload = () => {
            if (currentStoryIndex !== index) return;
            isLoading = false;
            viewerImg.style.backgroundImage = `url('${storyData[index].image}')`;
            viewerImg.style.transition = 'filter 0.4s ease-out, transform 0.4s ease-out';
            viewerImg.style.filter = 'blur(0px)';
            viewerImg.style.transform = 'scale(1)';
            startStoryTimer();
        };

        fullImg.onerror = () => {
            if (currentStoryIndex !== index) return;
            isLoading = false;
            viewerImg.style.transition = 'filter 0.4s ease-out, transform 0.4s ease-out';
            viewerImg.style.filter = 'blur(0px)';
            viewerImg.style.transform = 'scale(1)';
            startStoryTimer();
        };

        if (index + 1 < storyData.length) {
            const preloadNext = new Image();
            preloadNext.src = storyData[index + 1].image;
        }
        fullImg.src = storyData[index].image;

    } else {
        // 2. Für alle weiteren Slides (Swipe / Auto-Play): Sofortiges Anzeigen ohne Delay
        isLoading = false;
        viewerImg.style.transition = 'none';
        viewerImg.style.filter = 'blur(0px)';
        viewerImg.style.transform = 'scale(1)';
        viewerImg.style.backgroundImage = `url('${storyData[index].image}')`;

        if (index + 1 < storyData.length) {
            const preloadNext = new Image();
            preloadNext.src = storyData[index + 1].image;
        }
        
        // Kurze Verzögerung für DOM-Update, dann Timer direkt starten
        setTimeout(() => {
            if (currentStoryIndex === index) startStoryTimer();
        }, 10);
    }
}

function pauseStory() {
    if (isPaused || isLoading) return;
    isPaused = true;
    clearTimeout(storyTimeout);
    remainingTime -= (Date.now() - storyStartTime);
    const activeBar = document.querySelectorAll('.story-progress-fill')[currentStoryIndex];
    if (activeBar) {
        const computedWidth = window.getComputedStyle(activeBar).width;
        activeBar.style.transition = 'none';
        activeBar.style.width = computedWidth;
    }
}

function resumeStory() {
    if (!isPaused || isLoading) return;
    isPaused = false;
    storyStartTime = Date.now();
    storyTimeout = setTimeout(() => showStory(currentStoryIndex + 1), remainingTime);
    const activeBar = document.querySelectorAll('.story-progress-fill')[currentStoryIndex];
    if (activeBar) {
        activeBar.style.transition = `width ${remainingTime}ms linear`;
        activeBar.style.width = '100%';
    }
}

function handleSwipe() {
    const swipeThreshold = 50;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > swipeThreshold) {
        closeStoryViewer();
    } else if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > swipeThreshold) {
        if (deltaX > 0) showStory(currentStoryIndex - 1);
        else showStory(currentStoryIndex + 1);
    }
}
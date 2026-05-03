// --- Pull to Refresh (Instagram-Style) Logik ---

// Fix: Browser Scroll-Restoration deaktivieren, damit die Seite nach einem Reload immer ganz oben startet
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0); // Seite beim Laden explizit nach oben setzen

    const ptrContainer = document.getElementById('ptr-container');
    const ptrSpinner = document.querySelector('.ptr-spinner');
    const appContent = document.getElementById('app-content');
    
    let startX = 0;
    let startY = 0;
    let currentY = 0;
    let isPulling = false;
    let isRefreshing = false;
    let canPull = false; // Zeigt an, dass der Swipe ganz oben gestartet hat

    // Hilfsfunktion: Setzt alles sicher zurück
    const resetPullToRefresh = () => {
        if (!isPulling) return; // Nur resetten, wenn wir auch wirklich CSS verändert haben
        
        isPulling = false;
        canPull = false;
        if (ptrContainer) {
            ptrContainer.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            ptrContainer.style.transform = 'translateY(-100%)';
            ptrContainer.style.opacity = '0';
        }
        if (appContent) {
            appContent.style.transition = 'transform 0.3s ease';
            appContent.style.transform = 'translateY(0px)';
        }
    };

    document.addEventListener('touchstart', (e) => {
        // Wenn der Story Viewer geöffnet ist, blockieren wir das Pull-to-Refresh
        const storyViewer = document.getElementById('story-viewer');
        if (storyViewer && window.getComputedStyle(storyViewer).display !== 'none') {
            return;
        }

        // Wenn das Product Overlay geöffnet ist, blockieren wir das Pull-to-Refresh ebenfalls
        const productOverlay = document.getElementById('product-overlay');
        if (productOverlay && window.getComputedStyle(productOverlay).display !== 'none') {
            return;
        }

        // Nur starten, wenn wir ganz oben auf der Seite sind
        if (window.scrollY <= 0 && !isRefreshing) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            currentY = startY; // Verhindert alte Y-Werte im Speicher
            canPull = true;
            // WICHTIG: Hier noch KEINE CSS-Transitions anpassen, das blockiert das native Scrollen (Ruckler auf iOS)!
        }
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!canPull || isRefreshing) return;
        
        const currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
        const distanceX = Math.abs(currentX - startX);
        const distanceY = Math.abs(currentY - startY);
        const distance = currentY - startY;

        // Wenn man seitlich wischt ODER normal nach unten in die Seite scrollt (distance < 0)
        if (distanceX > distanceY || distance < 0) {
            canPull = false;
            resetPullToRefresh();
            return;
        }

        // Nur, wenn man nach unten zieht
        if (distance > 0 && window.scrollY <= 0) {
            // Erst JETZT, wo wir sicher sind, dass es ein echtes Pull-to-Refresh wird, CSS anpassen
            if (!isPulling) {
                isPulling = true;
                if (ptrContainer) {
                    ptrContainer.style.transition = 'none';
                    ptrContainer.style.opacity = '1';
                }
                if (appContent) appContent.style.transition = 'none';
            }

            if (e.cancelable) e.preventDefault(); // Stoppt normales Scrollen

            // Widerstand aufbauen (fühlt sich wie ein Gummiband an)
            let pullDistance = distance * 0.4;
            ptrContainer.style.transform = `translateY(${pullDistance - 60}px)`; // -60px, weil es von oben reinkommt
            ptrSpinner.style.transform = `rotate(${pullDistance * 4}deg)`; // Das Rad dreht sich beim Ziehen mit
            if (appContent) appContent.style.transform = `translateY(${pullDistance}px)`; // Inhalt synchron mit nach unten ziehen
        }
    }, { passive: false }); // Passive: false, damit e.preventDefault() erlaubt ist

    document.addEventListener('touchend', () => {
        if (!canPull || isRefreshing) return;
        canPull = false;
        
        if (!isPulling) return; // Nichts zu tun, wenn nicht wirklich gezogen wurde
        
        const distance = currentY - startY;

        if (distance * 0.4 > 55) { // Threshold/Limit überschritten
            isRefreshing = true;
            if (ptrContainer) {
                ptrContainer.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                ptrContainer.classList.add('refreshing');
                ptrContainer.style.transform = `translateY(20px)`; // Rad bleibt kurz stehen
                ptrContainer.style.opacity = '1';
            }
            if (appContent) {
                appContent.style.transition = 'transform 0.3s ease';
                appContent.style.transform = `translateY(70px)`; // Inhalt bleibt unten
            }
            setTimeout(() => location.reload(), 800); // 0.8 Sekunden Animation zeigen, dann Seite aktualisieren
        } else {
            resetPullToRefresh();
        }
    });

    // WICHTIG: iOS (Safari/Chrome) bricht Touch-Events ab, wenn das native Scrollen übernimmt.
    // Ohne dieses Event bleibt 'isPulling' auf true hängen und löst am Ende der Seite einen Reload aus!
    document.addEventListener('touchcancel', () => {
        canPull = false;
        resetPullToRefresh();
    });
});
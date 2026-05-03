// --- Bottom Navigation Modul ---

function initMenuBottom() {
    const root = document.getElementById('menu-bottom-root');
    if (!root || typeof bottomMenuData === 'undefined') return;

    // Aktiven Tab auslesen: 1. URL Pathname (Clean URL), 2. SessionStorage, 3. Standard ('discover')
    // Entfernt Slashes am Anfang und Ende (z.B. "/browse" -> "browse")
    let path = window.location.pathname.replace(/^\/|\/$/g, '');
    let savedViewId = path === '' ? 'discover' : path;

    const isValidView = bottomMenuData.some(item => item.id === savedViewId);
    if (!isValidView) {
        savedViewId = sessionStorage.getItem('activeViewId') || 'discover';
    }

    // Initialen State für die History-API setzen (Ohne Raute, Clean URL)
    const initialUrl = savedViewId === 'discover' ? '/' : `/${savedViewId}`;
    history.replaceState({ viewId: savedViewId }, '', initialUrl);
    sessionStorage.setItem('activeViewId', savedViewId);

    // Direkt die korrekte Ansicht aktivieren, um Flackern beim Neuladen zu verhindern
    document.querySelectorAll('.app-view').forEach(view => view.classList.remove('is-active'));
    const initialView = document.getElementById(`view-${savedViewId}`);
    if (initialView) initialView.classList.add('is-active');

    // HTML für die Buttons generieren
    const buttonsHtml = bottomMenuData.map(item => {
        const activeClass = (item.id === savedViewId) ? 'menu-btn--active' : '';
        
        return `
            <button class="menu-btn ${activeClass}" aria-label="${item.label}">
                ${item.icon}
                <span class="menu-btn__label">${item.label}</span>
            </button>
        `;
    }).join('');

    root.innerHTML = `
        <div id="menu-bottom-wrapper" class="menu-bottom-wrapper">
            <nav class="menu-bottom-nav">
                ${buttonsHtml}
            </nav>
        </div>
    `;

    // Klick-Logik für Active-Status
    const buttons = root.querySelectorAll('.menu-btn');
    buttons.forEach((btn, index) => {
        const item = bottomMenuData[index];
        
        btn.addEventListener('click', () => {
            if (sessionStorage.getItem('activeViewId') === item.id) return; // Nichts tun, wenn schon aktiv
            switchView(item.id, true);
        });
    });

    // Zentrale Funktion für den Ansicht-Wechsel
    function switchView(viewId, addToHistory = true) {
        const targetView = document.getElementById(`view-${viewId}`);
        if (!targetView) return;

        // Buttons aktualisieren
        buttons.forEach((b, idx) => {
            b.classList.toggle('menu-btn--active', bottomMenuData[idx].id === viewId);
        });
        
        // Ansicht aktualisieren
        document.querySelectorAll('.app-view').forEach(view => view.classList.remove('is-active'));
        targetView.classList.add('is-active');

        // State & History updaten
        sessionStorage.setItem('activeViewId', viewId);
        window.scrollTo(0, 0);
        isFirstLoadOrSwitch = true; // Reset für das Menü-Verhalten beim Wechseln
        setTimeout(checkScrollVisibility, 50);

        if (addToHistory) {
            // Setzt saubere Pfade: "discover" wird zu "/", alles andere zu "/viewId"
            const newUrl = viewId === 'discover' ? '/' : `/${viewId}`;
            history.pushState({ viewId: viewId }, '', newUrl);
        }
    }

    // Event-Listener für die nativen Browser Vor/Zurück Tasten (bzw. Wischgesten in Safari)
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.viewId) {
            switchView(event.state.viewId, false); // false, damit wir nicht endlos neue Einträge pushen
        } else {
            // Fallback auf URL-Pathname
            let currentPath = window.location.pathname.replace(/^\/|\/$/g, '');
            let fallbackView = currentPath === '' ? 'discover' : currentPath;
            if (bottomMenuData.some(item => item.id === fallbackView)) {
                switchView(fallbackView, false);
            }
        }
    });

    // Scroll-Logik: Beim Runterscrollen anzeigen, beim Hochscrollen verstecken
    const wrapper = document.getElementById('menu-bottom-wrapper');
    let lastScrollY = window.scrollY;
    let accumulatedScroll = 0; // Sammelt die Pixel für die Verzögerung (Threshold)
    let hideTimeout; // Speichert den Timer für das Ausblenden
    let isFirstLoadOrSwitch = true; // Sorgt dafür, dass das Menü beim Start/Wechsel immer sichtbar ist
    
    const showMenu = () => {
        if (wrapper && !wrapper.classList.contains('is-visible')) {
            clearTimeout(hideTimeout);
            wrapper.style.display = 'block';
            void wrapper.offsetWidth; // Reflow erzwingen
            wrapper.classList.add('is-visible');
        }
    };

    const hideMenu = () => {
        if (wrapper && wrapper.classList.contains('is-visible')) {
            wrapper.classList.remove('is-visible');
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(() => {
                if (!wrapper.classList.contains('is-visible')) {
                    wrapper.style.display = 'none';
                }
            }, 400);
        }
    };

    const checkScrollVisibility = () => {
        const currentScrollY = Math.max(0, window.scrollY || document.documentElement.scrollTop);
        const delta = currentScrollY - lastScrollY;
        
        // Prüfen, ob die Seite genug Inhalt zum Scrollen hat (mit 50px Puffer)
        const isScrollable = document.documentElement.scrollHeight > window.innerHeight + 50;

        // Wenn die Seite zu kurz ist (wie eine leere Seite), MUSS das Menü sichtbar sein
        if (!isScrollable) {
            showMenu();
            lastScrollY = currentScrollY;
            return;
        }

        // Wenn wir ganz frisch auf der Seite sind oder gewechselt haben, zeige das Menü an
        if (isFirstLoadOrSwitch) {
            showMenu();
            
            // Sobald wir ein Stück nach unten gescrollt haben, geben wir die Automatik frei
            if (currentScrollY > 20) {
                isFirstLoadOrSwitch = false;
                accumulatedScroll = 0;
            }
            lastScrollY = currentScrollY;
            return;
        }

        // Wenn wir die Scroll-Richtung ändern, setzen wir den Zähler auf 0 zurück
        if ((delta > 0 && accumulatedScroll < 0) || (delta < 0 && accumulatedScroll > 0)) {
            accumulatedScroll = 0;
        }
        accumulatedScroll += delta;
        
        if (accumulatedScroll > 30) {
            // Nach unten gescrollt -> Anzeigen
            showMenu();
        } else if (accumulatedScroll < -80 || currentScrollY <= 20) {
            // Nach oben gescrollt oder fast ganz oben angekommen -> Verstecken
            hideMenu();
        }
        lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', checkScrollVisibility, { passive: true });
    
    // Initialer Status beim Laden der Seite (verhindert den Safari-Bug von Sekunde 1 an)
    checkScrollVisibility();
}
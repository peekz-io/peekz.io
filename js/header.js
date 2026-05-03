// --- Header Modul ---

function initHeader() {
    const root = document.getElementById('header-root');
    if (!root) return;

    let logoFallback = `<div class="app-header__logo-text">Logo</div>`; // Fallback

    // Generiert den simplen, cleanen Header
    root.innerHTML = `
        <header class="app-header" id="app-header">
            <div class="container app-header__inner">
                <button class="app-header__btn app-header__btn--left" aria-label="Menü öffnen">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </button>

                <a href="#" class="app-header__logo" aria-label="Startseite" id="app-header-logo-container">
                    ${logoFallback}
                </a>

                <button class="app-header__btn app-header__btn--right" id="btn-header-favorites" aria-label="Favoriten anzeigen">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
            </div>
        </header>
    `;

    // Smarte Logik zur Unterscheidung zwischen Bild, SVG-Pfad und direktem SVG-Code
    const logoContainer = document.getElementById('app-header-logo-container');
    const logoData = (typeof appConfig !== 'undefined' && appConfig.logo) ? appConfig.logo.trim() : '';
    
    if (logoData) {
        if (logoData.startsWith('<svg')) {
            // 1. Fall: Direkter SVG-Code als String
            logoContainer.innerHTML = `<div class="app-header__logo-svg">${logoData}</div>`;
        } else if (logoData.toLowerCase().endsWith('.svg')) {
            // 2. Fall: Pfad zu einer .svg Datei -> Laden & Inline einfügen (für besseres Rendering)
            fetch(logoData)
                .then(response => response.text())
                .then(svgText => {
                    if(svgText.trim().startsWith('<svg')) {
                        logoContainer.innerHTML = `<div class="app-header__logo-svg">${svgText}</div>`;
                    } else {
                        logoContainer.innerHTML = `<img src="${logoData}" alt="App Logo" class="app-header__logo-img">`;
                    }
                })
                .catch(() => {
                    logoContainer.innerHTML = `<img src="${logoData}" alt="App Logo" class="app-header__logo-img">`;
                });
        } else {
            // 3. Fall: Standard-Bild (PNG, JPG, etc.)
            logoContainer.innerHTML = `<img src="${logoData}" alt="App Logo" class="app-header__logo-img">`;
        }
    }

    // Logo Klick-Logik (Zurück zur Startseite "Entdecken")
    if (logoContainer) {
        logoContainer.addEventListener('click', (e) => {
            e.preventDefault(); // Verhindert das Standard-Springen der Seite
            if (typeof window.switchAppView === 'function') {
                window.switchAppView('discover');
            }
        });
    }

    // Favoriten-Button Logik
    const favBtn = document.getElementById('btn-header-favorites');
    if (favBtn) {
        favBtn.addEventListener('click', () => {
            if (typeof window.switchAppView === 'function') {
                window.switchAppView('favorites');
            }
        });
    }

    // Scroll-Logik für den Header (Harmoniert exakt invers zum Bottom-Menu)
    let lastScrollY = window.scrollY;
    let accumulatedScroll = 0;
    
    const checkHeaderScroll = () => {
        const currentScrollY = Math.max(0, window.scrollY || document.documentElement.scrollTop);
        const delta = currentScrollY - lastScrollY;
        
        if ((delta > 0 && accumulatedScroll < 0) || (delta < 0 && accumulatedScroll > 0)) {
            accumulatedScroll = 0;
        }
        accumulatedScroll += delta;
        
        const header = document.getElementById('app-header');
        if (!header) return;

        if (accumulatedScroll > 30 && currentScrollY > 50) {
            // Nach unten gescrollt -> Header hochschieben/verstecken
            header.classList.add('app-header--hidden');
        } else if (accumulatedScroll < -100 || currentScrollY <= 50) {
            // Nach oben gescrollt oder ganz oben -> Header anzeigen
            header.classList.remove('app-header--hidden');
        }
        lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', checkHeaderScroll, { passive: true });
}
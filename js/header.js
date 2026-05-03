// --- Header Modul ---

function initHeader() {
    const root = document.getElementById('header-root');
    if (!root) return;

    // Dynamisches Logo aus der data.js laden
    const logoHtml = (typeof appConfig !== 'undefined' && appConfig.logo) 
        ? `<img src="${appConfig.logo}" alt="App Logo" class="app-header__logo-img">`
        : `<div class="app-header__logo-text">Logo</div>`; // Fallback, falls der Kunde (noch) kein Bild hat

    // Generiert den simplen, cleanen Header
    root.innerHTML = `
        <header class="app-header" id="app-header">
            <div class="container app-header__inner">
                <!-- Logo mit a-Tag umschließen, typisch für App-Startseiten -->
                <a href="#" class="app-header__logo" aria-label="Startseite">${logoHtml}</a>
                <!-- Container für das Now Playing Modul auf der rechten Seite -->
                <div id="now-playing-root"></div>
            </div>
        </header>
    `;

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
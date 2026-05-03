// Haupt-Controller der App

document.addEventListener('DOMContentLoaded', () => {
    
    // 0. Initialisiere den Header
    if (typeof initHeader === 'function') {
        initHeader();
    }

    // 0.5 Initialisiere Now Playing Modul (im Header)
    if (typeof initNowPlaying === 'function') {
        initNowPlaying();
    }

    // 1. Initialisiere das Story-Modul
    if (typeof initStoryModule === 'function') {
        initStoryModule();
    }
    
    // 2. Initialisiere den Category-Slider
    if (typeof initCategorySlider === 'function') {
        initCategorySlider();
    }
    
    // 3. Initialisiere das Hero-Banner
    if (typeof initHeroBanner === 'function') {
        initHeroBanner();
    }
    
    // 4. Initialisiere die Bottom Navigation
    if (typeof initMenuBottom === 'function') {
        initMenuBottom();
    }
    
    // 5. Initialisiere das Angebots-Modul (Produkte)
    if (typeof initOffersModule === 'function') {
        initOffersModule();
    }
    
    // 6. Initialisiere das Product Overlay
    if (typeof initProductOverlay === 'function') {
        initProductOverlay();
    }
    
    // 7. Initialisiere die Browse (Suchen) View
    if (typeof initBrowseView === 'function') {
        initBrowseView();
    }
});
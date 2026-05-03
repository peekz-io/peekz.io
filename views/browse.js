// --- Browse View (Ansicht für Suchen / Speisekarte) ---

function initBrowseView() {
    const root = document.getElementById('browse-root');
    if (!root) return;

    // Die View baut nur das Grundgerüst auf (wie die index.html für die Startseite)
    root.innerHTML = `
        <section class="browse-section container">
            <div class="browse-search-wrapper">
                <svg class="browse-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="search" class="browse-search-input" placeholder="Suchen">
            </div>
            <h2 class="browse-title">Kategorien</h2>
            <!-- Hier wird das separate Kategorien-Modul geladen -->
            <div id="browse-categories-root" class="browse-grid"></div>
        </section>
    `;

    // Initialisiere die Komponenten in dieser View
    if (typeof initBrowseCategories === 'function') {
        initBrowseCategories();
    }
}
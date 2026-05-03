// --- Browse / Suchen Modul (Digitale Speisekarte) ---

function initBrowseModule() {
    const root = document.getElementById('browse-root');
    if (!root || typeof browseCategoriesData === 'undefined') return;

    // Generiere das HTML für jede einzelne Karte
    const cardsHtml = browseCategoriesData.map(cat => `
        <div class="browse-card" tabindex="0" role="button">
            <h4 class="browse-card__title">${cat.title}</h4>
            <div class="browse-card__img-wrapper">
                <!-- Fallback-Bild, falls das richtige Bild noch nicht hochgeladen wurde -->
                <img src="${cat.image}" alt="${cat.title}" class="browse-card__img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1575859431774-2e57ed632664?auto=format&fit=crop&w=200&q=80&transparent=1'">
            </div>
        </div>
    `).join('');

    root.innerHTML = `
        <section class="browse-section container">
            <div class="browse-search-wrapper">
                <svg class="browse-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="search" class="browse-search-input" placeholder="Suchen">
            </div>
            <h2 class="browse-title">Kategorien</h2>
            <div class="browse-grid">
                ${cardsHtml}
            </div>
        </section>
    `;
}
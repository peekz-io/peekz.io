// --- Browse / Suchen Modul (Digitale Speisekarte) ---

function initBrowseModule() {
    const root = document.getElementById('browse-root');
    if (!root || typeof browseCategoriesData === 'undefined') return;

    // Generiere das HTML für jede einzelne Karte
    const cardsHtml = browseCategoriesData.map(cat => `
        <div class="browse-card" tabindex="0" role="button">
            <div class="browse-card__title">${cat.title}</div>
            <div class="browse-card__img-wrapper">
                <!-- Fallback-Bild, falls das richtige Bild noch nicht hochgeladen wurde -->
                <img src="${cat.image}" alt="${cat.title}" class="browse-card__img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1575859431774-2e57ed632664?auto=format&fit=crop&w=200&q=80&transparent=1'">
            </div>
        </div>
    `).join('');

    root.innerHTML = `
        <section class="browse-section container">
            <h2 class="browse-title">Speise- & Genusskarte</h2>
            <div class="browse-grid">
                ${cardsHtml}
            </div>
        </section>
    `;
}
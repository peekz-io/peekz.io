// --- Browse / Suchen Modul (Digitale Speisekarte) ---

function initBrowseModule() {
    const root = document.getElementById('browse-root');
    if (!root || typeof browseCategoriesData === 'undefined') return;

    // 1. Skeleton HTML generieren
    let skeletonHtml = '';
    browseCategoriesData.forEach(() => {
        skeletonHtml += `
            <div class="browse-card is-skeleton" tabindex="0" role="button">
                <div class="browse-skeleton-title skeleton-pulse"></div>
                <div class="browse-card__img-wrapper browse-skeleton-img-wrapper">
                    <div class="skeleton-pulse browse-skeleton-img"></div>
                </div>
            </div>
        `;
    });

    root.innerHTML = `
        <section class="browse-section container">
            <div class="browse-search-wrapper">
                <svg class="browse-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="search" class="browse-search-input" placeholder="Suchen">
            </div>
            <h2 class="browse-title">Kategorien</h2>
            <div class="browse-grid">
                ${skeletonHtml}
            </div>
        </section>
    `;

    const skeletonCards = root.querySelectorAll('.browse-card.is-skeleton');

    // 2. Karten hydrieren (Echte Daten und Bilder laden)
    browseCategoriesData.forEach((cat, index) => {
        const card = skeletonCards[index];
        if (!card) return;

        const img = new Image();
        img.className = 'browse-card__img media-loading';
        img.alt = cat.title;

        img.onload = () => {
            card.classList.remove('is-skeleton');
            card.innerHTML = `
                <h4 class="browse-card__title">${cat.title}</h4>
                <div class="browse-card__img-wrapper"></div>
            `;
            card.querySelector('.browse-card__img-wrapper').appendChild(img);
            setTimeout(() => img.classList.add('media-loaded'), 10);
        };

        img.onerror = () => {
            // Fallback, falls das Bild nicht gefunden wurde
            card.classList.remove('is-skeleton');
            card.innerHTML = `
                <h4 class="browse-card__title">${cat.title}</h4>
                <div class="browse-card__img-wrapper">
                    <img src="https://images.unsplash.com/photo-1575859431774-2e57ed632664?auto=format&fit=crop&w=200&q=80&transparent=1" alt="${cat.title}" class="browse-card__img media-loaded">
                </div>
            `;
        };

        img.src = cat.image; // WICHTIG: Src immer nach onload setzen
    });
}
// --- Browse Categories Modul (Grid-Logik) ---

function initBrowseCategories() {
    const root = document.getElementById('browse-categories-root');
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

    root.innerHTML = skeletonHtml;
    const skeletonCards = root.querySelectorAll('.browse-card.is-skeleton');

    // 2. Karten hydrieren (Echte Daten und Bilder laden)
    browseCategoriesData.forEach((cat, index) => {
        const card = skeletonCards[index];
        if (!card) return;

        const imgPreload = new Image();

        imgPreload.onload = () => {
            card.classList.remove('is-skeleton');
            card.innerHTML = `
                <h4 class="browse-card__title">${cat.title}</h4>
                <div class="browse-card__img-wrapper">
                    <div class="browse-card__img media-loading" style="background-image: url('${cat.image}');"></div>
                </div>
            `;
            setTimeout(() => {
                const bgDiv = card.querySelector('.browse-card__img');
                if (bgDiv) bgDiv.classList.add('media-loaded');
            }, 10);
        };

        imgPreload.onerror = () => {
            card.classList.remove('is-skeleton');
            const fallbackUrl = 'https://images.unsplash.com/photo-1575859431774-2e57ed632664?auto=format&fit=crop&w=200&q=80&transparent=1';
            card.innerHTML = `
                <h4 class="browse-card__title">${cat.title}</h4>
                <div class="browse-card__img-wrapper">
                    <div class="browse-card__img media-loaded" style="background-image: url('${fallbackUrl}');"></div>
                </div>
            `;
        };

        // WICHTIG: Src immer nach onload setzen
        imgPreload.src = cat.image; 
    });
}
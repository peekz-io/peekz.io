// --- Product Overlay Modul ---

let isProductOverlayOpen = false;

function initProductOverlay() {
    let overlay = document.getElementById('product-overlay');
    
    // Dynamisches Erstellen des Overlays, falls nicht vorhanden
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'product-overlay';
        overlay.className = 'product-overlay';
        overlay.innerHTML = `
            <div class="product-overlay__backdrop"></div>
            <header class="product-overlay__header">
                <button class="product-overlay__back-btn" aria-label="Zurück">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
            </header>
            <div class="product-overlay__content">
                <div class="product-overlay__image-container">
                    <div id="product-overlay-media-wrapper" class="product-overlay__media-wrapper"></div>
                    <div id="product-overlay-badges" class="product-overlay__badges"></div>
                    <div class="product-overlay__properties">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="property-icon"><line x1="12" y1="2" x2="12" y2="22"></line><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="19.07" y2="4.93"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
                    </div>
                </div>

                <div class="product-overlay__main-card">
                    <div class="product-overlay__info-group">
                        <h5 class="product-overlay__category" id="product-overlay-category">Kategorie</h5>
                        <h2 class="product-overlay__title" id="product-overlay-title">Produktname</h2>
                        <p class="product-overlay__short-desc" id="product-overlay-short-desc">Kurze Beschreibung...</p>
                    </div>
                    
                    <div class="product-overlay__price-wrapper">
                        <div class="product-overlay__price" id="product-overlay-price">0,00 €</div>
                        <div class="product-overlay__base-price" id="product-overlay-base-price">0,00 € / 1kg</div>
                    </div>

                    <button class="product-overlay__add-btn" id="product-overlay-add-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        Jetzt merken
                    </button>

                    <details class="product-overlay__accordion">
                        <summary class="product-overlay__accordion-summary">
                            Produktinformationen
                            <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </summary>
                        <div class="product-overlay__accordion-content" id="product-overlay-desc"></div>
                    </details>
                    
                    <details class="product-overlay__accordion" id="product-overlay-allergens-accordion">
                        <summary class="product-overlay__accordion-summary">
                            Allergene & Zusatzstoffe
                            <svg class="accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </summary>
                        <div class="product-overlay__accordion-content" id="product-overlay-allergens"></div>
                    </details>

                    <div class="product-overlay__similar">
                        <h3 class="product-overlay__similar-title">Wird dir auch gefallen</h3>
                        <div class="product-overlay__similar-slider no-scrollbar"></div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    const backdrop = overlay.querySelector('.product-overlay__backdrop');
    const backBtn = overlay.querySelector('.product-overlay__back-btn');

    const closeHandler = () => closeProductOverlay();

    // Schließt das Overlay beim Klick auf den Hintergrund (oder Back-Button)
    backdrop.addEventListener('click', closeHandler);
    backBtn.addEventListener('click', closeHandler);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isProductOverlayOpen) {
            closeProductOverlay();
        }
    });
}

function openProductOverlay(sourceCard, offer) {
    if (isProductOverlayOpen) return;
    
    const overlay = document.getElementById('product-overlay');
    const backdrop = overlay.querySelector('.product-overlay__backdrop');
    const content = overlay.querySelector('.product-overlay__content');
    const header = overlay.querySelector('.product-overlay__header');
    const mediaWrapper = document.getElementById('product-overlay-media-wrapper');

    if (!overlay || !mediaWrapper) return;

    // 1. Daten dynamisch befüllen
    document.getElementById('product-overlay-category').textContent = offer.category || 'Produkt';
    document.getElementById('product-overlay-title').textContent = offer.title;
    document.getElementById('product-overlay-short-desc').textContent = offer.desc || '';
    document.getElementById('product-overlay-price').textContent = offer.price;
    document.getElementById('product-overlay-desc').textContent = offer.detailedDesc || 'Keine weiteren Informationen verfügbar.';
    document.getElementById('product-overlay-base-price').textContent = offer.oldPrice ? offer.oldPrice : '';

    // Allergene Accordion dynamisch steuern
    const allergensAccordion = document.getElementById('product-overlay-allergens-accordion');
    if (allergensAccordion) {
        if (offer.allergens && offer.allergens.length > 0) {
            allergensAccordion.style.display = 'block';
            document.getElementById('product-overlay-allergens').textContent = offer.allergens.join(', ');
        } else {
            allergensAccordion.style.display = 'none';
        }
    }

    // 1.5 Badges rendern
    const badgesContainer = document.getElementById('product-overlay-badges');
    if (badgesContainer) {
        badgesContainer.innerHTML = '';
        if (offer.badges && offer.badges.length > 0) {
            offer.badges.forEach(badgeHtml => {
                const badge = document.createElement('div');
                badge.className = 'offer-badge'; // Verwendet dein bestehendes, sauberes CSS aus der Slider-Karte
                if (badgeHtml === 'Happy Hour') {
                    badge.classList.add('offer-badge--ci');
                }
                badge.innerHTML = badgeHtml;
                badgesContainer.appendChild(badge);
            });
        }
    }

    // 2. Skeleton vorbereiten (Lade-Indikator falls die Verbindung schlecht ist)
    mediaWrapper.innerHTML = '<div id="product-overlay-skeleton" class="skeleton-pulse" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;"></div>';

    // 3. Medien-Element dynamisch erzeugen
    let overlayMedia;
    const sourceImg = sourceCard.querySelector('.offer-img, .similar-img');

    if (offer.video) {
        overlayMedia = document.createElement('video');
        overlayMedia.autoplay = true;
        overlayMedia.muted = true;
        overlayMedia.loop = true;
        overlayMedia.playsInline = true;
        
        // Zeit vom kleinen Video übernehmen (nahtloser Ton/Bild-Übergang)
        if (sourceImg && sourceImg.tagName.toLowerCase() === 'video') {
            overlayMedia.currentTime = sourceImg.currentTime;
        }
        
        overlayMedia.onloadeddata = () => {
            const skeleton = document.getElementById('product-overlay-skeleton');
            if (skeleton) skeleton.remove();
            overlayMedia.classList.add('media-loaded');
        };
        overlayMedia.onerror = () => {
            const skeleton = document.getElementById('product-overlay-skeleton');
            if (skeleton) skeleton.remove();
        };
        
        overlayMedia.src = offer.video;
    } else {
        overlayMedia = document.createElement('img');
        overlayMedia.alt = offer.title;
        
        overlayMedia.onload = () => {
            const skeleton = document.getElementById('product-overlay-skeleton');
            if (skeleton) skeleton.remove();
            overlayMedia.classList.add('media-loaded');
        };
        overlayMedia.onerror = () => {
            const skeleton = document.getElementById('product-overlay-skeleton');
            if (skeleton) skeleton.remove();
        };
        
        overlayMedia.src = offer.image || 'https://images.unsplash.com/photo-1575859431774-2e57ed632664?auto=format&fit=crop&w=800&q=80';
    }
    
    overlayMedia.className = 'product-overlay__image media-loading';
    overlayMedia.id = 'product-overlay-img';
    mediaWrapper.appendChild(overlayMedia);

    // --- Ähnliche Produkte (Tags-Matching) ---
    const similarContainer = overlay.querySelector('.product-overlay__similar');
    const similarSlider = overlay.querySelector('.product-overlay__similar-slider');

    if (typeof offersData !== 'undefined' && offer.tags) {
        // Finde Produkte mit geteilten Tags, absteigend sortiert nach Anzahl der Matches
        const similarProducts = offersData
            .filter(o => o.id !== offer.id && o.tags)
            .map(o => ({
                offer: o,
                matches: o.tags.filter(tag => offer.tags.includes(tag)).length
            }))
            .filter(item => item.matches > 0)
            .sort((a, b) => b.matches - a.matches)
            .map(item => item.offer);

        if (similarProducts.length > 0) {
            similarContainer.style.display = 'block';
            similarSlider.innerHTML = similarProducts.map(sim => {
                let mediaHtml = sim.video 
                    ? `<video class="similar-img" src="${sim.video}" autoplay muted loop playsinline></video>`
                    : `<img class="similar-img" src="${sim.image || 'https://images.unsplash.com/photo-1575859431774-2e57ed632664?auto=format&fit=crop&w=800&q=80'}" alt="${sim.title}">`;
                
                return `
                    <div class="similar-card" style="cursor: pointer;">
                        ${mediaHtml}
                        <div style="font-family: var(--ci-font-headline); font-size: 0.8rem; font-weight: 600; color: var(--ci-text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 2px;">${sim.title}</div>
                        <div style="font-family: var(--ci-font-headline); font-size: 0.75rem; font-weight: 700; color: var(--ci-primary-color);">${sim.price}</div>
                    </div>
                `;
            }).join('');

            // Klick-Logik auf "Ähnliche Produkte"
            const similarCards = similarSlider.querySelectorAll('.similar-card');
            similarCards.forEach((card, index) => {
                card.addEventListener('click', () => {
                    closeProductOverlay();
                    // Warte bis das alte Overlay heruntergefahren ist (410ms), dann starte das Neue
                    setTimeout(() => openProductOverlay(card, similarProducts[index]), 410);
                });
            });
        } else {
            similarContainer.style.display = 'none';
        }
    } else {
        similarContainer.style.display = 'none';
    }

    // 4. Overlay einblenden (keine Flug-Animation mehr)
    overlay.style.display = 'block';
    backdrop.style.opacity = '0';
    header.style.opacity = '0';

    content.style.transition = 'none'; // WICHTIG: Setzt alte Animationen zurück, damit der 2. Klick funktioniert
    content.style.opacity = '1';
    content.style.transform = 'translateY(100%)';
    content.style.pointerEvents = 'none';
    content.scrollTop = 0; 

    void overlay.offsetWidth; // Force Reflow
    
    isProductOverlayOpen = true;
    document.body.classList.add('body-no-scroll');

    const duration = '0.45s';
    const easing = 'cubic-bezier(0.32, 0.72, 0, 1)'; // High-End iOS-Kurve

    backdrop.style.transition = `opacity ${duration} ease`;
    backdrop.style.opacity = '1';
    header.style.transition = `opacity ${duration} ease`;
    header.style.opacity = '1';
    
    content.style.transition = `transform ${duration} ${easing}`;
    content.style.transform = 'translateY(0)';
    
    setTimeout(() => {
        if (isProductOverlayOpen) content.style.pointerEvents = 'auto'; 
    }, 450);
}

function closeProductOverlay() {
    if (!isProductOverlayOpen) return;
    const overlay = document.getElementById('product-overlay');
    const backdrop = overlay.querySelector('.product-overlay__backdrop');
    const header = overlay.querySelector('.product-overlay__header');
    const content = overlay.querySelector('.product-overlay__content');
    
    content.style.pointerEvents = 'none';
    backdrop.style.opacity = '0';
    header.style.opacity = '0';
    
    content.style.transition = `transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)`;
    content.style.transform = 'translateY(100%)';

    setTimeout(() => {
        overlay.style.display = 'none';
        isProductOverlayOpen = false;
        document.body.classList.remove('body-no-scroll');
        
        // Wrapper leeren, damit Videos im Hintergrund nicht weiterlaufen und Performance fressen
        const mediaWrapper = document.getElementById('product-overlay-media-wrapper');
        if (mediaWrapper) mediaWrapper.innerHTML = '';
        const badgesContainer = document.getElementById('product-overlay-badges');
        if (badgesContainer) badgesContainer.innerHTML = '';
    }, 400);
}
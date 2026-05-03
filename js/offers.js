// --- Offers / Product Slider Modul ---

function initOffersModule() {
    const root = document.getElementById('offers-root');
    if (!root || typeof offersData === 'undefined' || offersData.length === 0) return;

    // 1. Dynamisches Skeleton HTML generieren
    let skeletonHtml = `
        <section class="offers-section">
            <div class="offers-header container">
                <h2 class="offers-title">Top Angebote</h2>
                <button class="offers-view-all">Alle ansehen</button>
            </div>
            <div class="offers-slider no-scrollbar">
    `;
    
    // Platzhalter-Karten
    offersData.forEach(() => {
        skeletonHtml += `
            <div class="offer-card is-skeleton">
                <div class="offer-img-wrapper">
                    <div class="skeleton-pulse img-pulse" style="border-radius: 20px;"></div>
                </div>
                <div class="offer-info">
                    <div class="offer-price-row" style="margin-bottom: 6px;">
                        <div style="height: 22px; width: 60px; border-radius: 6px;"><div class="skeleton-pulse"></div></div>
                    </div>
                    <div style="height: 14px; width: 80%; border-radius: 4px; margin-bottom: 6px;"><div class="skeleton-pulse"></div></div>
                    <div style="height: 10px; width: 50%; border-radius: 4px;"><div class="skeleton-pulse"></div></div>
                </div>
            </div>
        `;
    });
    
    skeletonHtml += `
            </div>
        </section>
    `;
    root.innerHTML = skeletonHtml;

    const skeletonCards = root.querySelectorAll('.offer-card.is-skeleton');

    // 2. Karten hydrieren
    offersData.forEach((offer, index) => {
        const cardElement = skeletonCards[index];
        if (!cardElement) return;

        const imgWrapper = cardElement.querySelector('.offer-img-wrapper');
        const infoContainer = cardElement.querySelector('.offer-info');
        
        // 1. Text und Interaktion SOFORT laden (unabhängig vom Bild)
        const oldPriceHtml = offer.oldPrice ? `<span class="offer-price-old">${offer.oldPrice}</span>` : '';
        
        infoContainer.innerHTML = `
            <div class="offer-price-row">
                <span class="offer-price-current">${offer.price}</span>
                ${oldPriceHtml}
            </div>
            <h3 class="offer-title">${offer.title}</h3>
            <p class="offer-desc">${offer.desc}</p>
        `;
        
        // 2. Action-Buttons (Add to cart) direkt in den Image-Wrapper einfügen
        const actionHtml = `
            <div class="offer-action-wrapper">
                <button class="offer-add-btn" aria-label="Hinzufügen">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <div class="offer-stepper">
                    <button class="stepper-btn stepper-minus">&minus;</button>
                    <span class="stepper-count">1</span>
                    <button class="stepper-btn stepper-plus">&plus;</button>
                </div>
            </div>
        `;
        imgWrapper.insertAdjacentHTML('beforeend', actionHtml);

        // Interaktions-Logik: Plus-Button zu Stepper (jetzt im imgWrapper suchen)
        const addBtn = imgWrapper.querySelector('.offer-add-btn');
        const stepper = imgWrapper.querySelector('.offer-stepper');
        const minusBtn = imgWrapper.querySelector('.stepper-minus');
        const plusBtn = imgWrapper.querySelector('.stepper-plus');
        const countSpan = imgWrapper.querySelector('.stepper-count');
        let count = 1;

        addBtn.addEventListener('click', () => {
            addBtn.style.display = 'none';
            stepper.classList.add('is-active');
        });

        minusBtn.addEventListener('click', () => {
            if (count > 1) {
                count--;
                countSpan.textContent = count;
            } else {
                stepper.classList.remove('is-active');
                addBtn.style.display = 'flex';
            }
        });

        plusBtn.addEventListener('click', () => {
            count++;
            countSpan.textContent = count;
        });

        // Overlay öffnen beim Klick auf die Karte
        cardElement.addEventListener('click', (e) => {
            if (e.target.closest('.offer-action-wrapper') || e.target.closest('.offer-badges-wrapper')) return;
            if (typeof openProductOverlay === 'function') {
                openProductOverlay(cardElement, offer);
            }
        });

        // 2. Medium (Bild oder Video) im Hintergrund laden
        if (offer.video) {
            const video = document.createElement('video');
            video.className = 'offer-img media-loading';
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            video.playsInline = true; // WICHTIG: Damit Autoplay unter iOS Safari im Hintergrund funktioniert!

            // 'onloadeddata' feuert, sobald der erste Frame des Videos geladen wurde
            video.onloadeddata = () => {
                const pulse = imgWrapper.querySelector('.img-pulse');
                if (pulse) pulse.remove();
                
                if (offer.badges && offer.badges.length > 0) {
                    const badgesWrapper = document.createElement('div');
                    badgesWrapper.className = 'offer-badges-wrapper';
                    offer.badges.forEach(badgeHtml => {
                        const badge = document.createElement('div');
                        badge.className = 'offer-badge';
                        if (badgeHtml === 'Happy Hour') {
                            badge.classList.add('offer-badge--ci');
                        }
                        badge.innerHTML = badgeHtml;
                        badgesWrapper.appendChild(badge);
                    });
                    imgWrapper.appendChild(badgesWrapper);
                }
                
                imgWrapper.insertBefore(video, imgWrapper.firstChild);
                setTimeout(() => video.classList.add('media-loaded'), 10);
            };

            video.onerror = () => {
                const pulse = imgWrapper.querySelector('.img-pulse');
                if (pulse) pulse.remove();
                
                const fallback = document.createElement('div');
                fallback.style.cssText = 'position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: #e2e8f0; color: #94a3b8; font-size: 0.8rem; z-index: 1; border-radius: 20px;';
                fallback.textContent = 'Kein Video';
                imgWrapper.insertBefore(fallback, imgWrapper.firstChild);
            };

            video.src = offer.video;
        } else {
            const img = new Image();
            img.className = 'offer-img media-loading';
            img.alt = offer.title;
            img.loading = 'eager';

            img.onload = () => {
                const pulse = imgWrapper.querySelector('.img-pulse');
                if (pulse) pulse.remove();
                
                if (offer.badges && offer.badges.length > 0) {
                    const badgesWrapper = document.createElement('div');
                    badgesWrapper.className = 'offer-badges-wrapper';
                    offer.badges.forEach(badgeHtml => {
                        const badge = document.createElement('div');
                        badge.className = 'offer-badge';
                        if (badgeHtml === 'Happy Hour') {
                            badge.classList.add('offer-badge--ci');
                        }
                        badge.innerHTML = badgeHtml;
                        badgesWrapper.appendChild(badge);
                    });
                    imgWrapper.appendChild(badgesWrapper);
                }
                
                imgWrapper.insertBefore(img, imgWrapper.firstChild);
                setTimeout(() => img.classList.add('media-loaded'), 10);
            };

            img.onerror = () => {
                const pulse = imgWrapper.querySelector('.img-pulse');
                if (pulse) pulse.remove();
                
                const fallback = document.createElement('div');
                fallback.style.cssText = 'position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: #e2e8f0; color: #94a3b8; font-size: 0.8rem; z-index: 1; border-radius: 20px;';
                fallback.textContent = 'Kein Bild';
                imgWrapper.insertBefore(fallback, imgWrapper.firstChild);
            };

            img.src = offer.image;
        }
    });

    // 3. Globale Dummy-Countdown-Logik für Happy Hour Badges
    if (window.happyHourInterval) clearInterval(window.happyHourInterval);
    
    let countdownSeconds = 2 * 60 * 60; // 2 Stunden in Sekunden
    
    window.happyHourInterval = setInterval(() => {
        if (countdownSeconds > 0) countdownSeconds--;
        
        const hours = String(Math.floor(countdownSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((countdownSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(countdownSeconds % 60).padStart(2, '0');
        
        // Suchen wir dynamisch, da Badges erst nach dem Bild-Load im DOM landen
        const timers = document.querySelectorAll('.happy-hour-timer');
        timers.forEach(timer => {
            timer.textContent = `${hours}:${minutes}:${seconds}`;
        });
    }, 1000);
}
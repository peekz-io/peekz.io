// --- Hero Banner Modul ---

function initHeroBanner() {
    const root = document.getElementById('hero-root');
    if (!root || typeof heroData === 'undefined' || heroData.length === 0) return;

    // Dynamisches Skeleton HTML generieren
    let skeletonHtml = `
        <section class="hero-section">
            <div class="hero-slider no-scrollbar">
    `;
    heroData.forEach(() => {
        skeletonHtml += `<article class="hero-slide is-skeleton"><div class="skeleton-pulse"></div></article>`;
    });
    skeletonHtml += `
            </div>
            <div class="hero-pagination"></div>
        </section>
    `;
    root.innerHTML = skeletonHtml;

    const skeletonSlides = root.querySelectorAll('.hero-slide.is-skeleton');
    const paginationContainer = root.querySelector('.hero-pagination');

    // 1. Echte Pagination Dots generieren und einfügen
    const dotsHtml = heroData.map((_, index) => `
        <button class="hero-dot ${index === 0 ? 'hero-dot--active' : ''}" aria-label="Slide ${index + 1}"></button>
    `).join('');
    paginationContainer.innerHTML = dotsHtml;

    // 2. Slides hydrieren
    heroData.forEach((slideData, index) => {
        const slideElement = skeletonSlides[index];
        if (!slideElement) return;

        slideElement.classList.remove('is-skeleton');
        slideElement.style.opacity = 0; // Für Fade-in vorbereiten

        const img = new Image();

        img.onload = () => {
            slideElement.innerHTML = `
                <div class="hero-slide__content">
                    <h2 class="hero-slide__headline">${slideData.headline}</h2>
                    <p class="hero-slide__subline">${slideData.subline}</p>
                    <button class="hero-slide__btn">${slideData.btnText}</button>
                </div>
                <div class="hero-slide__visual"></div>
            `;
            slideElement.querySelector('.hero-slide__visual').appendChild(img);
            
            slideElement.style.background = `linear-gradient(115deg, ${slideData.bgLight} 55%, ${slideData.bgDark} 55%)`;
            
            // Fade-in auslösen
            slideElement.style.transition = 'opacity 0.4s ease';
            slideElement.style.opacity = '1';
        };
        
        // Fallback, falls das Bild nicht geladen werden kann (z.B. Adblocker)
        img.onerror = () => {
            slideElement.style.opacity = '1';
            slideElement.style.background = `linear-gradient(115deg, ${slideData.bgLight} 55%, ${slideData.bgDark} 55%)`;
        };

        img.alt = slideData.headline;
        img.src = slideData.image; // WICHTIG: src immer NACH onload setzen!
    });

    // 3. Scroll & Klick Logik (bleibt identisch)
    const slider = root.querySelector('.hero-slider');
    const dots = root.querySelectorAll('.hero-dot');
    const slides = root.querySelectorAll('.hero-slide');

    // Dot updaten beim Wischen
    slider.addEventListener('scroll', () => {
        const scrollPosition = slider.scrollLeft;
        const slideStep = slides[0].offsetWidth + 15;
        const activeIndex = Math.round(scrollPosition / slideStep);

        dots.forEach((dot, index) => {
            dot.classList.toggle('hero-dot--active', index === activeIndex);
        });
    }, { passive: true });

    // Zum Slide springen beim Klick auf Dot
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const slideStep = slides[0].offsetWidth + 15;
            slider.scrollTo({ left: slideStep * index, behavior: 'smooth' });
        });
    });
}
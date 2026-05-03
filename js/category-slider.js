// --- Category Slider Modul ---

function initCategorySlider() {
    const root = document.getElementById('category-root');
    if (!root || typeof categoryData === 'undefined' || categoryData.length === 0) return;

    // Dynamisches Skeleton HTML generieren
    let skeletonHtml = `
        <section class="cat-discovery">
            <h2 class="cat-discovery__title">Jetzt Entdecken</h2>
            <div class="cat-discovery__wrapper no-scrollbar">
    `;
    const widths = [120, 90, 150, 110, 130];
    categoryData.forEach((_, i) => {
        const w = widths[i % widths.length];
        skeletonHtml += `<div class="cat-item is-skeleton" style="width: ${w}px;"><div class="skeleton-pulse" style="border-radius: 50px;"></div></div>`;
    });
    skeletonHtml += `
            </div>
        </section>
    `;
    root.innerHTML = skeletonHtml;

    const skeletonItems = root.querySelectorAll('.cat-item.is-skeleton');

    categoryData.forEach((cat, index) => {
        const item = skeletonItems[index];
        if (!item) return;

        item.classList.remove('is-skeleton');
        item.style = ''; // Inline-Styles entfernen
        if (index === 0) {
            item.classList.add('cat-item--active');
        }

        const img = new Image();
        img.src = cat.icon;
        img.alt = cat.label;
        img.className = 'cat-item__icon';

        const label = document.createElement('span');
        label.className = 'cat-item__label';
        label.textContent = cat.label;

        item.innerHTML = ''; // Skeleton entfernen
        item.appendChild(img);
        item.appendChild(label);
    });

    // Drag- & Klick-Logik
    const wrapper = root.querySelector('.cat-discovery__wrapper');
    const items = root.querySelectorAll('.cat-item:not(.is-skeleton)');

    if (!wrapper) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    wrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        isDragging = false;
        startX = e.pageX - wrapper.offsetLeft;
        scrollLeft = wrapper.scrollLeft;
    });

    wrapper.addEventListener('mouseleave', () => {
        isDown = false;
    });

    wrapper.addEventListener('mouseup', () => {
        isDown = false;
    });

    wrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - wrapper.offsetLeft;
        const walk = (x - startX) * 2;
        
        if (Math.abs(walk) > 5) {
            isDragging = true;
        }
        
        wrapper.scrollLeft = scrollLeft - walk;
    });

    items.forEach(item => {
        item.addEventListener('click', (e) => {
            if (isDragging) {
                e.preventDefault();
                return;
            }

            items.forEach(i => i.classList.remove('cat-item--active'));
            item.classList.add('cat-item--active');

            const wrapperCenter = wrapper.offsetWidth / 2;
            const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
            const scrollPos = itemCenter - wrapperCenter;

            wrapper.scrollTo({ left: scrollPos, behavior: 'smooth' });
        });
    });
}
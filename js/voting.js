// --- Live Battle / Voting Modul ---

let battleTimerInterval = null;
let battleSimulationInterval = null;
let isBattleEnded = false;

function initBattleModule() {
    const root = document.getElementById('battle-root');
    if (!root || typeof battleData === 'undefined') return;

    // LocalStorage Check: Hat der User für DIESES Battle schon gevotet?
    const storageKey = `peekz_battle_vote_${battleData.id}`;
    const userVote = localStorage.getItem(storageKey); // 'opt1' oder 'opt2'

    // 1. Modul Grundgerüst aufbauen
    root.innerHTML = `
        <section class="battle-section">
            <div class="battle-header">
                <div class="battle-live-badge">
                    <div class="battle-live-dot"></div>
                    Live Battle
                </div>
                <div class="battle-timer" id="battle-timer">--:--</div>
            </div>
            
            <div class="battle-container" id="battle-container">
                <div class="battle-intro">
                    <h2 class="battle-intro__title">Battle of the Week</h2>
                    <p class="battle-intro__text">
                        Welcher Tabak ist heute der King?
                    </p>
                </div>
                <div class="battle-grid" id="battle-grid">
                    <!-- Optionen werden dynamisch generiert -->
                </div>
                
                <div class="battle-vs-wrapper" id="battle-vs-wrapper">
                    <div class="battle-vs-label">
                        <span id="battle-stat-opt1" class="battle-stat-text">50%</span>
                        <span class="battle-vs-text">VS</span>
                        <span id="battle-stat-opt2" class="battle-stat-text">50%</span>
                    </div>
                    <div class="battle-vs-bar">
                        <div class="battle-vs-fill battle-vs-fill--left" id="battle-fill-opt1" style="width: 50%;"></div>
                        <div class="battle-vs-fill battle-vs-fill--right" id="battle-fill-opt2" style="width: 50%;"></div>
                    </div>
                    <div class="battle-vs-votes">
                        <span id="battle-votes-opt1">0 Stimmen</span>
                        <span id="battle-votes-opt2">0 Stimmen</span>
                    </div>
                </div>
                <div class="battle-winner-banner" id="battle-winner-banner">
                    GEWONNEN! 🎉 Jetzt 2€ günstiger bestellen
                </div>
            </div>
        </section>
    `;

    renderBattleCards(userVote);
    updateProgressBars();
    startTimer();
    
    // Hilfreich für dich zum Testen: Klick auf das "Live Battle" Badge löscht den Vote!
    const liveBadge = root.querySelector('.battle-live-badge');
    if (liveBadge) {
        liveBadge.addEventListener('click', () => {
            localStorage.removeItem(storageKey);
            location.reload();
        });
    }
    
    // Realtime-Simulation starten (Zufällige Votes der "Community")
    startRealtimeSimulation();
}

function renderBattleCards(userVote) {
    const grid = document.getElementById('battle-grid');
    if (!grid) return;

    let cardsHtml = '';

    battleData.options.forEach((opt, index) => {
        const sideClass = index === 0 ? 'is-side-left' : 'is-side-right';
        const isVotedClass = (userVote === opt.id) ? 'is-voted' : '';
        const isDisabledClass = userVote ? 'is-disabled' : '';

        cardsHtml += `
            <div class="battle-card ${sideClass} ${isVotedClass} ${isDisabledClass}" data-opt-id="${opt.id}" id="battle-card-${opt.id}">
                <div class="battle-card__img" style="background-image: url('${opt.image}');"></div>
                <div class="battle-card__overlay">
                    <h3 class="battle-card__title">${opt.name}</h3>
                </div>
            </div>
        `;
    });

    grid.innerHTML = cardsHtml;

    // Event-Listener anhängen
    const cards = grid.querySelectorAll('.battle-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            handleVote(card.getAttribute('data-opt-id'));
        });
    });
}

function handleVote(optId) {
    if (isBattleEnded) return;
    
    const storageKey = `peekz_battle_vote_${battleData.id}`;
    const existingVote = localStorage.getItem(storageKey);

    // Wenn genau diese Option schon gewählt wurde, nichts tun
    if (existingVote === optId) return;

    // Wenn der User seine Meinung ändert (Switch Vote), alten Vote abziehen
    if (existingVote) {
        const oldOpt = battleData.options.find(o => o.id === existingVote);
        if (oldOpt && oldOpt.votes > 0) {
            oldOpt.votes -= 1;
        }
    }

    // Speichere neuen Vote im LocalStorage
    localStorage.setItem(storageKey, optId);

    // Optisches Feedback anpassen
    document.querySelectorAll('.battle-card').forEach(card => {
        card.classList.add('is-disabled'); // Alle Karten in den Hintergrund rücken
        card.classList.remove('is-voted'); // Alten Rahmen entfernen
        
        if (card.getAttribute('data-opt-id') === optId) {
            card.classList.add('is-voted'); // Neuer Rahmen hinzufügen
            
            // Haptisches Feedback (Vibration, falls vom Browser/Handy unterstützt)
            if (navigator.vibrate) navigator.vibrate(50);
        }
    });

    // Den neuen Vote-Count in den Mock-Daten hochzählen
    const selectedOpt = battleData.options.find(o => o.id === optId);
    if (selectedOpt) {
        selectedOpt.votes += 1;
    }

    // 0 oder 1 übergeben, damit wir wissen, welche Seite animieren soll
    const optIndex = battleData.options.findIndex(o => o.id === optId);
    updateProgressBars(optIndex);
}

function updateProgressBars(animateOptIndex = -1) {
    if (battleData.options.length !== 2) return;

    const opt1 = battleData.options[0];
    const opt2 = battleData.options[1];
    
    const totalVotes = opt1.votes + opt2.votes || 1; // || 1 verhindert Division durch 0

    const p1 = Math.round((opt1.votes / totalVotes) * 100);
    const p2 = 100 - p1; // Stellt sicher, dass es exakt 100% ergibt

    const fill1 = document.getElementById(`battle-fill-opt1`);
    const fill2 = document.getElementById(`battle-fill-opt2`);
    const stat1 = document.getElementById(`battle-stat-opt1`);
    const stat2 = document.getElementById(`battle-stat-opt2`);
    const votes1 = document.getElementById(`battle-votes-opt1`);
    const votes2 = document.getElementById(`battle-votes-opt2`);

    if (fill1) fill1.style.width = `${p1}%`;
    if (fill2) fill2.style.width = `${p2}%`;
    
    if (stat1) stat1.textContent = `${p1}%`;
    if (stat2) stat2.textContent = `${p2}%`;
    
    if (votes1) { votes1.textContent = `${opt1.votes} Stimmen`; if(animateOptIndex === 0) triggerPulse(votes1); }
    if (votes2) { votes2.textContent = `${opt2.votes} Stimmen`; if(animateOptIndex === 1) triggerPulse(votes2); }
}

function triggerPulse(element) {
    element.classList.remove('is-pulsing');
    void element.offsetWidth; // Reflow erzwingen
    element.classList.add('is-pulsing');
}

function startTimer() {
    const timerEl = document.getElementById('battle-timer');
    if (!timerEl) return;

    const tick = () => {
        const now = Date.now();
        const diff = battleData.endTime - now;

        if (diff <= 0) {
            clearInterval(battleTimerInterval);
            clearInterval(battleSimulationInterval);
            timerEl.textContent = "00:00";
            timerEl.classList.remove('is-urgent');
            endBattle();
            return;
        }

        // Umrechnung in Minuten und Sekunden
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        // Die letzten 60 Sekunden -> Rotes Pulsieren
        if (diff <= 60000 && !timerEl.classList.contains('is-urgent')) {
            timerEl.classList.add('is-urgent');
        }
    };

    tick(); // Sofortiger Start
    battleTimerInterval = setInterval(tick, 1000);
}

function startRealtimeSimulation() {
    // Simuliert zufällige Votes alle 3 bis 8 Sekunden
    battleSimulationInterval = setInterval(() => {
        if (isBattleEnded) {
            clearInterval(battleSimulationInterval);
            return;
        }

        // Entweder Option 1 oder Option 2 bekommt einen zufälligen Vote (1 bis 3)
        const randomOptIndex = Math.random() > 0.5 ? 0 : 1;
        const randomVotes = Math.floor(Math.random() * 3) + 1;
        
        battleData.options[randomOptIndex].votes += randomVotes;
        updateProgressBars(randomOptIndex);
        
    }, Math.floor(Math.random() * 4000) + 2000); 
}

function endBattle() {
    if (isBattleEnded) return;
    isBattleEnded = true;

    // Ermittle den Gewinner
    const opt1 = battleData.options[0];
    const opt2 = battleData.options[1];
    const winner = opt1.votes >= opt2.votes ? opt1 : opt2;
    const loser = opt1.votes < opt2.votes ? opt1 : opt2;

    // Styling anpassen
    const winnerCard = document.getElementById(`battle-card-${winner.id}`);
    const loserCard = document.getElementById(`battle-card-${loser.id}`);

    if (winnerCard) winnerCard.classList.add('is-winner');
    if (loserCard) loserCard.classList.add('is-loser');

    // VS-Balken verstecken und Gewinner-Banner einblenden
    const vsWrapper = document.getElementById('battle-vs-wrapper');
    if (vsWrapper) vsWrapper.style.display = 'none';

    const banner = document.getElementById('battle-winner-banner');
    if (banner) {
        banner.style.display = 'block';
        banner.innerHTML = `🏆 ${winner.name} GEWINNT! <br><span style="font-size:0.75rem; font-weight:normal;">Jetzt 2€ günstiger bestellen</span>`;
    }
}
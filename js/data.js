// Globale App- & Kunden-Konfiguration
const appConfig = {
    logo: `img/logo.png`
};

// Datenquelle für das "Now Playing" Modul im Header
const nowPlayingData = {
    title: "Midnight City",
    artist: "M83",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=100&q=80" // Platzhalter
};

// Datenquelle für das Story-Modul - einfach austauschbar für neue Kunden

const storyData = [
    { id: 1,  label: "Neu!", time: "1h", thumbnail: "img/moss-title.jpg", image: "img/moss-title-full.jpg" },
    { id: 2,  label:"Happy Hour", time: "3h", thumbnail: "img/happy-hour.jpg", image: "img/happy-hour.jpg" },
    { id: 3,  label: "Shisha Deal", time: "5h", thumbnail: "img/shisha.jpg", image: "img/shisha.jpg" },
    { id: 4,  label: "Ladies Night", time: "8h", thumbnail: "img/ladies-night.jpg", image: "img/ladies-night.jpg" },
    { id: 5,  label: "Couple Deal", time: "12h", thumbnail: "img/couple-deal.jpg", image: "img/couple-deal.jpg" },
];

// Datenquelle für das Kategorie-Slider-Modul
const categoryData = [
    { id: 1, label: "Shisha", icon: "img/icons/shisha.png" },
    { id: 2, label: "Softdrinks", icon: "img/icons/softdrink.png" },
    { id: 3, label: "Shisha", icon: "img/icons/shisha.png" },
    { id: 4, label: "Shisha", icon: "img/icons/shisha.png" },
];

// Datenquelle für das Hero Banner
const heroData = [
    {
        id: 1,
        headline: "Happy Hour",
        subline: "Alle Shishas -20%",
        btnText: "Jetzt Entdecken",
        image: "img/mojito.png",
        bgLight: "#fff9c4", // Hellgelb
        bgDark: "#cfe8e2"   // Beige/Dunkelgelb
    },
    {
        id: 2,
        headline: "Ladies Night",
        subline: "Gratis Prosecco",
        btnText: "Tisch sichern",
        image: "img/cocktail.png",
        bgLight: "#f8bbd0",
        bgDark: "#f48fb1"
    }
];

// Datenquelle für das Offers / Product Slider Modul
const offersData = [
    {
        id: 1,
        title: 'Mango Mojito',
        desc: 'Fruchtig & Erfrischend',
        price: '8,50€',
        oldPrice: '10,50€',
        // Array für mehrere Badges: Erst "Happy Hour", dann Countdown
        badges: [
            '<svg class="icon-clock" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> <span class="happy-hour-timer">02:00:00</span>',
            'Happy Hour'
        ],
        video: 'img/mojito.mp4',
        tags: ['Sommer', 'Kühl', 'Minze', 'Cocktail', 'Fruchtig'],
        category: 'Cocktails mit Alkohol',
        detailedDesc: 'Ein erfrischender Sommer-Cocktail mit frischer Minze, süßem Mango-Püree, feinstem weißen Rum und einem Schuss Limette. Perfekt für laue Sommerabende.'
    },
    {
        id: 2,
        title: 'Shisha Apfel',
        desc: 'Premium Tabak, Eis-Schlauch',
        price: '14,00€',
        oldPrice: '12,00€',
        // Interaktives HTML-Badge mit Flammen-Icon
        badges: ['<svg class="icon-flame" width="12" height="12" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg> Heute 23× bestellt'],
        video: 'img/shisha-apfel.mp4',
        tags: ['Sommer', 'Shisha', 'Fruchtig', 'Kühl'],
        category: 'Shisha',
        detailedDesc: 'Hochwertiger Virginia-Grundtabak mit intensivem Wassermelonen-Aroma und einer kühlen Ice-Note. Inklusive Premium-Eisschlauch für den perfekten Durchzug.'
    },
    {
        id: 3,
        title: 'Dark Espresso Martini',
        desc: 'Stark & Intensiv',
        price: '9.50€',
        oldPrice: '11,00€',
        badges: ['Neu'],
        video: 'img/mojito.mp4',
        tags: ['Kaffee', 'Cocktail', 'Abend', 'Stark'],
        category: 'Cocktails mit Alkohol',
        detailedDesc: 'Kräftiger Espresso trifft auf sanften Wodka und Kaffeelikör. Ein stilvoller Wachmacher für die späten Stunden.',
        allergens: ['Koffein']
    },
    {
        id: 4,
        title: 'Berry Mint',
        desc: 'Leicht & Süßlich',
        price: '12,50€',
        oldPrice: '15,00€',
        badges: ['-15%'],
        image: 'https://images.unsplash.com/photo-1575859431774-2e57ed632664?auto=format&fit=crop&w=300&q=80',
        tags: ['Minze', 'Shisha', 'Beere', 'Leicht'],
        category: 'Shisha',
        detailedDesc: 'Ein süßlicher Beeren-Mix gepaart mit einer erfrischenden Minznote. Mild im Geschmack und ideal für Einsteiger.'
    },
    {
        id: 5,
        title: 'Chili-Cheese Nuggets (6 Stk.)',
        desc: 'Knusprig gebacken mit feuriger Käsefüllung',
        price: '6,50€',
        badges: ['Beliebt'],
        image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=300&q=80',
        tags: ['Snack', 'Scharf', 'Käse', 'Heiß'],
        category: 'Snacks & Speisen',
        detailedDesc: 'Sechs goldbraun gebackene Nuggets mit einer cremig-scharfen Chili-Käse-Füllung. Werden frisch und heiß serviert. Perfekt als Snack zum Teilen.',
        allergens: ['Glutenhaltiges Getreide', 'Milch / Laktose', 'Scharf']
    }
];

// Datenquelle für das Live-Battle Modul
const battleData = {
    id: 'battle-001',
    title: 'Geschmacks-Battle',
    // Timer: Startet automatisch mit 60 Minuten ab dem Laden (Für Produktion durch festen Timestamp ersetzen)
    endTime: Date.now() + 60 * 60 * 1000, 
    options: [
        { 
            id: 'opt1', 
            name: 'Doppelapfel', 
            image: 'img/doppelapfel.jpg', 
            votes: 245 
        },
        { 
            id: 'opt2', 
            name: 'Love 66', 
            image: 'img/love66.jpg', 
            votes: 210 
        }
    ]
};

// Datenquelle für die untere Navigation (Bottom Menu)
const bottomMenuData = [
    { 
        id: 'discover', 
        label: 'Entdecken',
        active: true, 
        icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>' 
    },
    { 
        id: 'browse', 
        label: 'Suche', 
        active: false, 
        icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>' 
    },
    { 
        id: 'jukebox', 
        label: 'Jukebox',
        active: false, 
        icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>' 
    },
    { 
        id: 'lounge', 
        label: 'Lounge',
        active: false, 
        icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>' 
    },
    { 
        id: 'profile', 
        label: 'Profil',
        active: false, 
        icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>' 
    }
];

// Datenquelle für das "Suchen" / Speisekarten-Modul (3-Spalten Grid)
const browseCategoriesData = [
    { id: 'c1', title: 'Shisha Klassik', image: 'img/happy-hour.jpg' },
    { id: 'c2', title: 'Shisha Premium', image: 'img/happy-hour.jpg' },
    { id: 'c3', title: 'Köpfe & Zubehör', image: 'img/cat-zubehoer.png' },
    { id: 'c4', title: 'Kaffee-Spezialitäten', image: 'img/cat-kaffee.png' },
    { id: 'c5', title: 'Tee-Variationen', image: 'img/cat-tee.png' },
    { id: 'c6', title: 'Kuchen & Gebäck', image: 'img/cat-kuchen.png' },
    { id: 'c7', title: 'Alkoholfreie Drinks', image: 'img/cat-softdrinks.png' },
    { id: 'c8', title: 'Cocktails', image: 'img/cat-cocktails.png' },
    { id: 'c9', title: 'Longdrinks', image: 'img/cat-longdrinks.png' },
    { id: 'c10', title: 'Bier & Wein', image: 'img/cat-bier.png' },
    { id: 'c11', title: 'Spirituosen & Shots', image: 'img/cat-shots.png' },
    { id: 'c12', title: 'Snacks & Fingerfood', image: 'img/cat-snacks.png' }
];
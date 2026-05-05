// Globale App- & Kunden-Konfiguration
const appConfig = {
    logo: `<svg id="uuid-7ed19099-b261-4e0d-a520-0600c0ae94db" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 537.5 262.5">
  <g>
    <path d="M150.9,239.5c1.4,0,2.6.2,3.5.6.9.4,1.7.9,2.2,1.5s.9,1.2,1.1,1.9c.2.7.3,1.3.3,1.9s-.1,1.3-.3,2-.5,1.3-1,1.9-1.1,1-1.8,1.4-1.6.6-2.6.7v.1l.3.2c.3.1.5.3.7.5s.4.5.7.9.7,1,1.2,1.8,1.2,1.8,2,3.1c.3.4.6.8.8,1.2s.6.6.9.9c.3.2.6.4,1,.6.3.1.7.2,1.2.2h.6v1.2c-.3.2-.6.3-.9.3s-.7.1-1.1.1c-.6,0-1.2-.1-1.6-.3-.5-.2-.9-.4-1.2-.7-.4-.3-.7-.6-1-1s-.6-.8-.9-1.3l-2.5-3.7c-.4-.6-.7-1.1-1-1.5s-.6-.7-.9-1c-.3-.3-.7-.4-1.1-.5-.4-.1-.9-.2-1.5-.2h-1.4v9.8h-2.9v-22.2h7.2v-.4ZM146.6,250.4h3.3c.8,0,1.6-.1,2.2-.4.6-.3,1.2-.7,1.6-1.2.4-.5.8-1,1-1.6s.3-1.2.3-1.7c0-.7-.1-1.3-.4-1.9-.2-.6-.6-1.1-1.1-1.5s-1-.7-1.7-1c-.6-.2-1.4-.3-2.2-.3h-3.2v9.6h.2Z" fill="currentColor"/>
    <path d="M167.6,246.7c.5-1.4,1.2-2.6,2.1-3.7,1-1.1,2.2-2.1,3.7-2.8s3.3-1.1,5.4-1.1,3.9.4,5.5,1.1c1.6.8,2.8,1.7,3.9,2.8,1,1.1,1.8,2.4,2.3,3.7s.7,2.6.7,3.8c0,.8-.1,1.6-.3,2.5s-.5,1.7-1,2.6c-.4.9-1,1.7-1.7,2.4-.7.8-1.5,1.5-2.4,2s-2,1.1-3.1,1.4-2.4.5-3.9.5c-2.1,0-3.9-.4-5.4-1.1-1.5-.8-2.7-1.7-3.7-2.8s-1.7-2.4-2.1-3.7c-.5-1.3-.7-2.6-.7-3.8,0-1.1.3-2.4.7-3.8ZM170.7,254.6c.5,1.2,1.1,2.3,1.9,3.2.8.9,1.7,1.6,2.8,2.1s2.3.7,3.5.7,2.4-.2,3.5-.7,2.1-1.2,2.9-2.1c.8-.9,1.5-2,2-3.2s.7-2.6.7-4.1-.2-2.8-.7-4.1c-.5-1.2-1.1-2.3-2-3.2-.8-.9-1.8-1.6-2.9-2.1-1.1-.5-2.3-.7-3.5-.7-1.3,0-2.4.2-3.5.7s-2,1.2-2.8,2.1c-.8.9-1.4,2-1.9,3.2s-.7,2.6-.7,4.1.3,2.9.7,4.1Z" fill="currentColor"/>
    <path d="M197.7,246.7c.5-1.4,1.2-2.6,2.1-3.7,1-1.1,2.2-2.1,3.7-2.8s3.3-1.1,5.4-1.1,3.9.4,5.5,1.1c1.6.8,2.8,1.7,3.9,2.8,1,1.1,1.8,2.4,2.3,3.7s.7,2.6.7,3.8c0,.8-.1,1.6-.3,2.5s-.5,1.7-1,2.6c-.4.9-1,1.7-1.7,2.4-.7.8-1.5,1.5-2.4,2s-2,1.1-3.1,1.4-2.4.5-3.9.5c-2.1,0-3.9-.4-5.4-1.1-1.5-.8-2.7-1.7-3.7-2.8s-1.7-2.4-2.1-3.7c-.5-1.3-.7-2.6-.7-3.8,0-1.1.3-2.4.7-3.8ZM200.8,254.6c.5,1.2,1.1,2.3,1.9,3.2.8.9,1.7,1.6,2.8,2.1s2.3.7,3.5.7,2.4-.2,3.5-.7,2.1-1.2,2.9-2.1c.8-.9,1.5-2,2-3.2s.7-2.6.7-4.1-.2-2.8-.7-4.1c-.5-1.2-1.1-2.3-2-3.2-.8-.9-1.8-1.6-2.9-2.1-1.1-.5-2.3-.7-3.5-.7-1.3,0-2.4.2-3.5.7s-2,1.2-2.8,2.1c-.8.9-1.4,2-1.9,3.2s-.7,2.6-.7,4.1.3,2.9.7,4.1Z" fill="currentColor"/>
    <path d="M243.7,239.5v1.7h-11.4v8h9.8v1.5h-9.8v11h-2.9v-22.2h14.3Z" fill="currentColor"/>
    <path d="M271.3,261.7h-2.7v-1.3c-.8.4-1.8.8-3,1.2-1.2.3-2.6.5-4.2.5-2.1,0-3.9-.3-5.5-1-1.5-.7-2.8-1.6-3.8-2.7s-1.7-2.4-2.2-3.8-.7-2.9-.7-4.4c0-1.8.3-3.3.9-4.7.6-1.4,1.5-2.6,2.6-3.5,1.1-1,2.4-1.7,3.9-2.2s3.2-.8,5-.8c1.6,0,2.9.2,4.1.5s2.1.8,2.9,1.3,1.4,1.1,1.9,1.6c.5.6.8,1.1,1,1.6h-2.3c-.1-.4-.4-.9-.8-1.3-.4-.4-1-.8-1.7-1.2s-1.4-.6-2.3-.8-1.8-.3-2.8-.3c-1.5,0-2.8.2-3.9.7s-2.1,1.2-2.9,2.1-1.4,1.9-1.8,3.2c-.4,1.2-.6,2.6-.6,4,0,1.5.2,2.8.6,4.1.4,1.2,1,2.3,1.9,3.2.8.9,1.9,1.6,3.1,2.1s2.7.8,4.4.8c1.3,0,2.4-.1,3.4-.4s2-.8,2.9-1.4v-5.7h-3.6v-1.3h6.2v9.9Z" fill="currentColor"/>
    <path d="M281.1,255.1l-2.8,6.5h-1.5l9.4-22.2h1.6l10.3,22.2h-3.1l-3-6.5h-10.9ZM286.4,243h-.1l-4.6,10.7h9.7l-5-10.7Z" fill="currentColor"/>
    <path d="M312.8,239.5c1.4,0,2.6.2,3.5.6.9.4,1.7.9,2.2,1.5s.9,1.2,1.1,1.9c.2.7.3,1.3.3,1.9s-.1,1.3-.3,2-.5,1.3-1,1.9-1.1,1-1.8,1.4c-.7.4-1.6.6-2.6.7v.1l.3.2c.3.1.5.3.7.5s.4.5.7.9.7,1,1.2,1.8,1.2,1.8,2,3.1c.3.4.6.8.8,1.2s.6.6.9.9c.3.2.6.4,1,.6.3.1.7.2,1.2.2h.6v1.2c-.3.2-.6.3-.9.3s-.7.1-1.1.1c-.6,0-1.2-.1-1.6-.3-.5-.2-.9-.4-1.2-.7-.4-.3-.7-.6-1-1s-.6-.8-.9-1.3l-2.5-3.7c-.4-.6-.7-1.1-1-1.5s-.6-.7-.9-1-.7-.4-1.1-.5-.9-.2-1.5-.2h-1.4v9.8h-2.9v-22.2h7.2v-.4ZM308.5,250.4h3.3c.8,0,1.6-.1,2.2-.4s1.2-.7,1.6-1.2.8-1,1-1.6.3-1.2.3-1.7c0-.7-.1-1.3-.4-1.9-.2-.6-.6-1.1-1.1-1.5s-1-.7-1.7-1c-.6-.2-1.4-.3-2.2-.3h-3v9.6Z" fill="currentColor"/>
    <path d="M331.3,261.7v-22.2h7.3c1.8,0,3.4.3,4.8.8,1.5.6,2.7,1.3,3.8,2.3,1,1,1.9,2.2,2.4,3.5.6,1.4.9,2.8.9,4.4s-.3,3.1-.9,4.5-1.4,2.5-2.5,3.5c-1,1-2.3,1.8-3.7,2.3s-2.9.8-4.5.8h-7.6v.1ZM334.2,260.3h3.5c1.7,0,3.2-.3,4.4-.9,1.2-.6,2.2-1.3,3-2.3.8-.9,1.3-2,1.7-3.1.4-1.2.5-2.3.5-3.4,0-1.3-.2-2.5-.6-3.7s-1-2.2-1.9-3.1c-.8-.9-1.8-1.6-3-2.1s-2.6-.8-4.1-.8h-3.5v19.4Z" fill="currentColor"/>
    <path d="M372.3,239.5v1.7h-11.4v8h9.8v1.5h-9.8v9.3h11.4v1.7h-14.3v-22.2h14.3Z" fill="currentColor"/>
    <path d="M399,239.5v22.6h-.2l-17.6-17.3h-.1v17h-1.5v-22.6h.2l17.6,17.3h.1v-17h1.5Z" fill="currentColor"/>
  </g>
  <g>
    <path d="M0,160.4h7v4.6c3-4,6.9-5.4,10.1-5.4,8.3,0,9.8,6.3,9.8,10.8v36.6h-7v-33.3c0-3.6-1.4-7.2-5.9-7.2-5.7,0-6.9,5.6-6.9,8.6v32H.1v-46.7h-.1Z" fill="currentColor"/>
    <path d="M73.3,207h-7v-4.6c-3,4-6.9,5.4-10.1,5.4-8.3,0-9.8-6.3-9.8-10.8v-36.6h7v33.3c0,3.6,1.4,7.2,5.9,7.2,5.7,0,6.9-5.6,6.9-8.6v-32h7v46.7h.1Z" fill="currentColor"/>
    <path d="M99.9,141.2v54.1c0,1.9.8,5.2,5.2,5.2h1v6.5h-2.2c-7.1,0-11.1-4.2-11.1-10.3v-55.5h7.1Z" fill="currentColor"/>
    <path d="M129.2,141.2v54.1c0,1.9.8,5.2,5.2,5.2h1v6.5h-2.2c-7.1,0-11.1-4.2-11.1-10.3v-55.5h7.1Z" fill="currentColor"/>
    <path d="M169.3,172.7c-.5-5.3-3.4-6.4-6.3-6.4-3.5,0-6,1.3-6,6,0,3.7,2.5,5.2,5.5,6.6l5.8,2.8c4.3,2.2,8,4.9,8,12.7,0,3.9-1.4,13.3-13.6,13.3-10.4,0-13.4-6.9-13.6-13.3h7.1c.4,5,2.6,6.8,6.3,6.8,4.9,0,6.8-2.7,6.8-6.8,0-3.5-1.1-5.3-5.9-7.6l-5.7-2.8c-6.9-3.3-7.7-7.5-7.7-12.3,0-6.3,4.1-12,13.4-12,10.2,0,12.8,7.2,13,13.1h-7.1v-.1Z" fill="currentColor"/>
    <path d="M213.3,193.9h7v.7c0,4.6-2.2,13.2-13,13.2-11.7,0-13.6-9.5-13.6-13.5v-21.6c0-3.7,2-13,13.2-13s13.6,9.3,13.6,13.3v13.3h-19.7v7.4c0,5,2.3,7.1,6.6,7.1s5.9-2.5,5.9-6.4v-.5ZM213.5,181.1v-8c0-3-1.4-6.6-6.3-6.6s-6.4,4-6.4,7v7.6h12.7Z" fill="currentColor"/>
    <path d="M259.2,192.7h7v1.9c0,4.6-2.8,13.2-13.6,13.2-11.7,0-13.6-9.5-13.6-13.5v-21.1c0-3.9,2-13.4,13.6-13.4s13.6,8.6,13.6,13.1v2.1h-7v-.7c0-5.3-3-7.6-6.6-7.6s-6.6,2.4-6.6,7.6v19.2c0,5,2.3,7.6,6.6,7.6s6.6-2.5,6.6-7.6v-.8Z" fill="currentColor"/>
    <path d="M283.3,141.2h7v23.8c3-4,6.9-5.4,10.1-5.4,8.3,0,9.8,6.3,9.8,10.8v36.6h-7v-33.3c0-3.6-1.4-7.2-5.9-7.2-5.7,0-6.9,5.6-6.9,8.6v32h-7v-65.9h-.1Z" fill="currentColor"/>
    <path d="M347.7,172.7c-.5-5.3-3.4-6.4-6.3-6.4-3.5,0-6,1.3-6,6,0,3.7,2.5,5.2,5.5,6.6l5.8,2.8c4.3,2.2,8,4.9,8,12.7,0,3.9-1.4,13.3-13.6,13.3-10.4,0-13.4-6.9-13.6-13.3h7.1c.4,5,2.6,6.8,6.3,6.8,4.9,0,6.8-2.7,6.8-6.8,0-3.5-1.1-5.3-5.9-7.6l-5.7-2.8c-6.9-3.3-7.7-7.5-7.7-12.3,0-6.3,4.1-12,13.4-12,10.2,0,12.8,7.2,13,13.1h-7.1v-.1Z" fill="currentColor"/>
    <path d="M372.5,160.4h7v4.6c3-4,6.9-5.4,10.1-5.4,8.3,0,9.8,6.3,9.8,10.8v36.6h-7v-33.3c0-3.6-1.4-7.2-5.9-7.2-5.7,0-6.9,5.6-6.9,8.6v32h-7v-46.7h-.1Z" fill="currentColor"/>
    <path d="M438.1,193.9h7v.7c0,4.6-2.2,13.2-13,13.2-11.7,0-13.6-9.5-13.6-13.5v-21.6c0-3.7,2-13,13.2-13s13.6,9.3,13.6,13.3v13.3h-19.7v7.4c0,5,2.3,7.1,6.6,7.1s5.9-2.5,5.9-6.4v-.5ZM438.3,181.1v-8c0-3-1.4-6.6-6.3-6.6s-6.4,4-6.4,7v7.6h12.7Z" fill="currentColor"/>
    <path d="M491.1,207h-7v-4.6c-3,4-6.9,5.4-10.1,5.4-8.3,0-9.8-6.3-9.8-10.8v-36.6h7v33.3c0,3.6,1.4,7.2,5.9,7.2,5.7,0,6.9-5.6,6.9-8.6v-32h7v46.7h.1Z" fill="currentColor"/>
    <path d="M510.6,160.4h7v4.6c3-4,6.9-5.4,10.1-5.4,8.3,0,9.8,6.3,9.8,10.8v36.6h-7v-33.3c0-3.6-1.4-7.2-5.9-7.2-5.7,0-6.9,5.6-6.9,8.6v32h-7v-46.7h-.1Z" fill="currentColor"/>
  </g>
  <path d="M271.3,0l-34.9,31.6-.3,52.6c-.1,17.5,15.2,31.7,34.1,31.9h.2c9,0,17.5-3.2,24-9,6.6-5.9,10.2-13.9,10.3-22.4l.3-53.5L271.3,0ZM274.3,11l23.4,21.8-23.4,26.8V11ZM268.3,10.8v70.3l-26-32.1.1-14.7,25.9-23.5ZM242.1,84.3l.2-25.8,26.1,32.2v19.4c-14.8-1-26.4-12.2-26.3-25.8ZM290.3,102.7c-4.4,4-10,6.5-16,7.2v-41.3l24.6-28.1-.3,44.1c0,6.9-3,13.3-8.3,18.1Z" fill="currentColor"/>
</svg>`
};

// Datenquelle für das "Now Playing" Modul im Header
const nowPlayingData = {
    title: "Midnight City",
    artist: "M83",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=100&q=80" // Platzhalter
};

// Datenquelle für das Story-Modul - einfach austauschbar für neue Kunden

const storyData = [
    { id: 1,  label: "Neu!", thumbnail: "img/moss-title.jpg", image: "img/moss-title-full.jpg" },
    { id: 2,  label:"Happy Hour", thumbnail: "img/happy-hour.jpg", image: "img/happy-hour.jpg" },
    { id: 3,  label: "Shisha Deal", thumbnail: "img/shisha.jpg", image: "img/shisha.jpg" },
    { id: 4,  label: "Ladies Night", thumbnail: "img/ladies-night.jpg", image: "img/ladies-night.jpg" },
    { id: 5,  label: "Couple Deal", thumbnail: "img/couple-deal.jpg", image: "img/couple-deal.jpg" },
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
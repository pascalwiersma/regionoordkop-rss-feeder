# Regio Noordkop RSS Feed Ticker

Dit project bevat een RSS-feed ticker die regelmatig wordt bijgewerkt met gegevens uit een RSS-feed en extra content toont. De ticker toont nieuwsitems in een doorlopende tekststroom met visuele scheidingsteken tussen de items.

Overzicht

## Deze applicatie bestaat uit drie onderdelen:

    - HTML: Voor de structuur van de ticker op de pagina.
    - CSS: Voor de styling en animatie van de ticker.
    - JavaScript: Voor het ophalen en weergeven van RSS-feedgegevens en extra content.
  
## Belangrijke Functionaliteit:

    - fetchAndUpdateTicker: Deze functie haalt de RSS-feed op, verwerkt de items, voegt extra content toe op basis van de ingestelde configuratie, en update de ticker op de pagina.
    - setInterval: Zorgt ervoor dat de ticker elke 30 minuten opnieuw wordt bijgewerkt.
    - CONFIG: Bevat de configuratie-instellingen zoals de URL van de feed, aantal te tonen artikelen, extra content, en de interval voor het ophalen van de feed.

Hier is een README-bestand dat de werking van de gegeven HTML, CSS en JavaScript code uitlegt:
Regio Noordkop RSS Feed Ticker

Dit project bevat een RSS-feed ticker die regelmatig wordt bijgewerkt met gegevens uit een RSS-feed en extra content toont. De ticker toont nieuwsitems in een doorlopende tekststroom met visuele scheidingsteken tussen de items.
Inhoud

    Overzicht
    Installatie
    Configuratie
    Gebruik
    Licentie

Overzicht

Deze applicatie bestaat uit drie onderdelen:

    HTML: Voor de structuur van de ticker op de pagina.
    CSS: Voor de styling en animatie van de ticker.
    JavaScript: Voor het ophalen en weergeven van RSS-feedgegevens en extra content.

HTML

De HTML-bestand (index.html) bevat de basisstructuur van de ticker:

html

<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Regio Noordkop - RSS Feed</title>
    <link rel="stylesheet" href="/styles/style.css">
</head>
<body>
    <div class="ticker-wrapper">
        <div class="ticker">
            <div class="ticker__item">Laden...</div>
        </div>
    </div>
    <script src="/js/config.js"></script> 
    <script src="/js/main.js"></script>
</body>
</html>

CSS

De CSS (style.css) verzorgt de styling van de ticker:

css

body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
}

.ticker-wrapper {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: white;
    color: #0569FF;
    font-size: 1.5rem;
    overflow: hidden;
    white-space: nowrap;
    box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
}

.ticker {
    display: inline-block;
    padding: 15px 0;
    animation: ticker 80s linear infinite; 
}

.ticker__item {
    display: inline-block;
    padding: 0 1rem;
    position: relative; 
}

.ticker__extra__item {
    display: inline-block;
    padding: 0 1rem;
    position: relative; 
    font-weight: bold;
    color: #0569FF;
}

.ticker__item:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0rem; 
    top: 50%;
    transform: translateY(-50%);
    width: 2px; 
    height: 2rem; 
    background-color: #0569FF;
}

.ticker__extra__item:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0rem; 
    top: 50%;
    transform: translateY(-50%);
    width: 2px; 
    height: 2rem; 
    background-color: #0569FF;
}

@keyframes ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

Belangrijke CSS Klassen en Stijlen:

    .ticker-wrapper: Positioneert de ticker onderaan de pagina en zorgt voor de styling van de achtergrond en tekst.
    .ticker: Bevat de ticker-items en zorgt voor de doorlopende animatie.
    .ticker__item en .ticker__extra__item: Stijlen de individuele items in de ticker. Extra items krijgen een vetgedrukte stijl en andere kleur.
    ::after: Een pseudo-element dat wordt gebruikt om een scheidingslijn tussen items te tonen.

JavaScript

De JavaScript (main.js) handelt het ophalen en bijwerken van de ticker:

javascript

document.addEventListener('DOMContentLoaded', function() {
    const ticker = document.querySelector('.ticker');

    function fetchAndUpdateTicker() {
        fetch(CONFIG.feedUrl)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, 'application/xml');
                const items = xml.querySelectorAll('item');
                let tickerContent = '';

                items.forEach((item, index) => {
                    if (index < CONFIG.amountArticles) {
                        const title = item.querySelector('title').textContent;
                        tickerContent += `<div class="ticker__item">${title}</div>`;

                        if ((index + 1) % 3 === 0) {
                                const randomIndex = Math.floor(Math.random() * CONFIG.extraContent.length);
                                tickerContent += `<div class="ticker__extra__item">${CONFIG.extraContent[randomIndex]}</div>`;
                        }
                    }
                });

                ticker.innerHTML = tickerContent + tickerContent;
            })
            .catch(error => {
                console.error('Error fetching RSS feed:', error);
                ticker.innerHTML = `<div class="ticker__item">Error loading feed</div>`;
            });
    }

    fetchAndUpdateTicker();

    setInterval(fetchAndUpdateTicker, CONFIG.fetchInterval);
});

const CONFIG = {
    feedUrl: '../feed.xml', // Link naar het lokale RSS-bestand
    amountArticles: 8, // Aantal artikelen wat getoond mag worden uit de RSS-feed
    extraContent: [
        'Luister naar Regio Noordkop via 105.6MHz',
    ], // Array van extra content
    fetchInterval: 1800000, // Interval voor het ophalen van de feed in milliseconden (30 minuten)
};

## Belangrijke Functionaliteit:

    fetchAndUpdateTicker: Deze functie haalt de RSS-feed op, verwerkt de items, voegt extra content toe op basis van de ingestelde configuratie, en update de ticker op de pagina.
    setInterval: Zorgt ervoor dat de ticker elke 30 minuten opnieuw wordt bijgewerkt.
    CONFIG: Bevat de configuratie-instellingen zoals de URL van de feed, aantal te tonen artikelen, extra content, en de interval voor het ophalen van de feed.

## Installatie

1. Download de bestanden: Zorg ervoor dat je de HTML, CSS, en JavaScript-bestanden hebt.
2. Plaats de bestanden op je server: Zorg ervoor dat de bestanden toegankelijk zijn op de juiste paden (/styles/style.css, /js/config.js, /js/main.js).
3. Configureer de feed URL: Verander de feedUrl in de config.js naar de locatie van je RSS-feed.

## Gebruik

Open de HTML-pagina in een webbrowser. De ticker wordt geladen en toont de nieuwsitems uit de ingestelde RSS-feed url. De ticker wordt standaard elke 30 minuten bijgewerkt. Dit kan worden aangepast in de config.

## Licentie

Deze software is beschikbaar gesteld onder een vrijwillige licentie door Pascal Services. Raadpleeg de bijgevoegde licentieovereenkomst voor meer details over het gebruik en de aansprakelijkheid.

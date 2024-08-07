# Regio Noordkop RSS Feed Ticker

Dit project bevat een RSS-feed ticker die regelmatig wordt bijgewerkt met gegevens uit een RSS-feed en extra content toont. De ticker toont nieuwsitems in een doorlopende tekststroom met visuele scheidingsteken tussen de items.

# Overzicht

## Deze applicatie bestaat uit drie onderdelen:

    - HTML: Voor de structuur van de ticker op de pagina.
    - CSS: Voor de styling en animatie van de ticker.
    - JavaScript: Voor het ophalen en weergeven van RSS-feedgegevens en extra content.

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

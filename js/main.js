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

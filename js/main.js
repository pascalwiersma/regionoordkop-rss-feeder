document.addEventListener('DOMContentLoaded', function() {
    const ticker = document.querySelector(".ticker");
    let shuffledMessages = [];

    function fetchMessages() {
        return fetch("/messages.txt")
            .then((response) => response.text())
            .then((data) => {
                const messages = data.trim().split("\n");
                shuffledMessages = shuffleArray(messages);
                return shuffledMessages;
            })
            .catch((error) => {
                console.error("Error loading messages:", error);
                return [];
            });
    }

    // Functie om een array te schudden
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Functie om een bericht uit de geshufflede array te halen
    function getRandomMessage() {
        if (shuffledMessages.length === 0) {
            return "No messages available"; // Fallback als er geen berichten zijn
        }

        const message = shuffledMessages.pop(); // Haal het laatste bericht uit de array

        // Als de array leeg is, schud de berichten opnieuw
        if (shuffledMessages.length === 0) {
            fetchMessages(); // Optioneel: kan ook opnieuw schudden zonder opnieuw in te laden
        }

        return message;
    }

    function fetchAndUpdateTicker() {
        fetchMessages().then((messages) => {
            fetch(CONFIG.feedUrl)
                .then((response) => response.text())
                .then((data) => {
                    const parser = new DOMParser();
                    const xml = parser.parseFromString(data, "application/xml");
                    const items = xml.querySelectorAll("item");
                    let tickerContent = "";

                    items.forEach((item, index) => {
                        if (index < CONFIG.amountArticles) {
                            const title =
                                item.querySelector("title").textContent;
                            tickerContent += `<div class="ticker__item">${title}</div>`;

                            if ((index + 1) % 3 === 0 && messages.length > 0) {
                                const extraMessage = getRandomMessage();
                                tickerContent += `<div class="ticker__extra__item">${extraMessage}</div>`;
                            }
                        }
                    });

                    ticker.innerHTML = tickerContent + tickerContent;
                })
                .catch((error) => {
                    console.error("Error fetching RSS feed:", error);
                    ticker.innerHTML = `<div class="ticker__item">Error loading feed</div>`;
                });
        });
    }

    fetchAndUpdateTicker();

    setInterval(fetchAndUpdateTicker, CONFIG.fetchInterval);
});

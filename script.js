const SHORTENER_API = "https://inshorturl.com/api?api=2e7e4739d495b5fce0531b9dc8342c40762a3fa9&url=";

async function searchAnime() {
    const animeName = document.getElementById("anime-name").value;
    if (animeName === '') {
        alert("Please enter an anime name!");
        return;
    }

    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${animeName}&limit=5`);
    const data = await response.json();

    if (data.data.length > 0) {
        displayAnimeResults(data.data);
    } else {
        alert("Anime not found!");
    }
}

function displayAnimeResults(animeList) {
    const animeListContainer = document.getElementById("anime-list");
    animeListContainer.innerHTML = "";

    animeList.forEach(anime => {
        const animeDiv = document.createElement("div");
        animeDiv.classList.add("anime-item");

        animeDiv.innerHTML = `
            <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
            <h3>${anime.title}</h3>
            <a href="anime-detail.html?id=${anime.mal_id}">View More</a>
            <button onclick="redirectToDownload('${anime.title}')">Download</button>
        `;

        animeListContainer.appendChild(animeDiv);
    });
}

async function generateShortLink(originalLink) {
    try {
        const response = await fetch(SHORTENER_API + encodeURIComponent(originalLink));
        const data = await response.json();
        return data.shortenedUrl;  
    } catch (error) {
        console.error("Shortener Error:", error);
        return originalLink;
    }
}

async function redirectToDownload(animeTitle) {
    const formattedTitle = animeTitle.replace(/\s+/g, "-").toLowerCase();
    const zoroDownloadURL = `https://zoro.to/${formattedTitle}-download`;

    const shortLink = await generateShortLink(zoroDownloadURL);
    window.open(shortLink, "_blank");
}

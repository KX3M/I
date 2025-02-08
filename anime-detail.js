const urlParams = new URLSearchParams(window.location.search);
const animeId = urlParams.get('id');

async function getAnimeDetails() {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
    const data = await response.json();

    if (data.data) {
        displayAnimeDetails(data.data);
    } else {
        alert("Anime not found!");
    }
}

function displayAnimeDetails(anime) {
    const animeDetailContainer = document.getElementById("anime-detail-container");

    animeDetailContainer.innerHTML = `
        <div class="anime-detail">
            <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
            <h3>${anime.title}</h3>
            <p><strong>Episodes:</strong> ${anime.episodes ? anime.episodes : "N/A"}</p>
            <p><strong>Synopsis:</strong> ${anime.synopsis ? anime.synopsis : "No synopsis available."}</p>
            <button onclick="redirectToDownload('${anime.title}')">Download</button>
        </div>
    `;
}

async function redirectToDownload(animeTitle) {
    const formattedTitle = animeTitle.replace(/\s+/g, "-").toLowerCase();
    const zoroDownloadURL = `https://zoro.to/${formattedTitle}-download`;

    const shortLink = await generateShortLink(zoroDownloadURL);
    window.open(shortLink, "_blank");
}

getAnimeDetails();

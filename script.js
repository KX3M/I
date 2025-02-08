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
            <button onclick="redirectToZoro('${anime.title}')">Download</button>
        `;

        animeListContainer.appendChild(animeDiv);
    });
}

function redirectToZoro(animeTitle) {
    // Format anime title to match Zoro.to URL format
    const formattedTitle = animeTitle.replace(/\s+/g, "-").toLowerCase();
    
    // Construct the Zoro.to download page URL
    const zoroDownloadURL = `https://zoro.to/${formattedTitle}-download`;

    // Open Zoro.to in a new tab
    window.open(zoroDownloadURL, "_blank");
}

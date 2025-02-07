async function searchAnime() {
    const animeName = document.getElementById("anime-name").value;
    if (animeName === '') {
        alert("Please enter an anime name!");
        return;
    }

    // Show loading spinner while fetching data
    document.getElementById("loading-spinner").style.display = 'block';

    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${animeName}&limit=5`);
    const data = await response.json();

    document.getElementById("loading-spinner").style.display = 'none';

    if (data.data.length > 0) {
        displayAnimeDetails(data.data);
    } else {
        alert("Anime not found!");
    }
}

function displayAnimeDetails(animes) {
    const animeDetails = document.getElementById("anime-details");
    animeDetails.innerHTML = '';

    animes.forEach(anime => {
        const images = anime.images.jpg.large_image_url;
        const imageList = [images];

        animeDetails.innerHTML += `
            <div class="anime-card">
                <img src="${images}" alt="${anime.title}">
                <h3>${anime.title}</h3>
                <p><strong>Episodes:</strong> ${anime.episodes ? anime.episodes : "N/A"}</p>
                <p><strong>Rating:</strong> ${anime.rating ? anime.rating : "N/A"}</p>
                <p><strong>Synopsis:</strong> ${anime.synopsis ? anime.synopsis : "No synopsis available."}</p>

                <div class="image-slider">
                    ${imageList.map(image => `<img src="${image}" alt="Image">`).join('')}
                </div>

                <a href="/anime/${anime.mal_id}" class="view-more">View More</a>
            </div>
        `;
    });
}

const sections = document.querySelectorAll(".section");

function showSection(id) {
    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

const songs = [
    { title: "Song One", artist: "Artist A", file: "songs/song1.mp3" },
    { title: "Song Two", artist: "Artist B", file: "songs/song2.mp3" },
    { title: "Song Three", artist: "Artist C", file: "songs/song3.mp3" }
];

let favorites = [];

const songsContainer = document.getElementById("songsContainer");
const favoritesContainer = document.getElementById("favoritesContainer");

function renderSongs() {
    songsContainer.innerHTML = "";

    songs.forEach((song, index) => {
        const isFavorite = favorites.includes(song);

        songsContainer.innerHTML += `
            <div class="song">
                <p>
                    🎵 <strong>${song.title}</strong> - ${song.artist}
                    <button class="heart-btn" onclick="toggleFavorite(${index})">
                        ${isFavorite ? "❤️" : "🤍"}
                    </button>
                </p>
                <audio controls src="${song.file}"></audio>
            </div>
        `;
    });

    setupAudio();
}

renderSongs();

function toggleFavorite(index) {
    const song = songs[index];

    if (favorites.includes(song)) {
        favorites = favorites.filter(s => s !== song);
    } else {
        favorites.push(song);
    }

    renderSongs();
    renderFavorites();
}

function renderFavorites() {
    favoritesContainer.innerHTML = "";

    favorites.forEach(song => {
        favoritesContainer.innerHTML += `
            <div class="song">
                <p>❤️ <strong>${song.title}</strong> - ${song.artist}</p>
                <audio controls src="${song.file}"></audio>
            </div>
        `;
    });

    setupAudio();
}

function searchSongs() {
    const value = document.getElementById("search").value.toLowerCase();
    document.querySelectorAll(".song").forEach(song => {
        song.style.display = song.textContent.toLowerCase().includes(value)
            ? "block"
            : "none";
    });
}

function setupAudio() {
    const audios = document.querySelectorAll("audio");
    audios.forEach(audio => {
        audio.addEventListener("play", () => {
            audios.forEach(a => {
                if (a !== audio) a.pause();
            });
        });
    });
}

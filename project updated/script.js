// SECTIONS
const sections = document.querySelectorAll(".section");
function showSection(id) {
    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// SONG DATA
const songs = [
    { id: 1, title: "Physical", artist: "Dua Lipa", file: "songs/Dua Lipa - Physical.mp3" },
    { id: 2, title: "Bohemian Rapsody", artist: "Queen", file: "songs/Queen - Bohemian Rhapsody (Lyrics).mp3" },
    { id: 3, title: "It's my life", artist: "Bon Jovi", file: "songs/Bon Jovi - It's My Life (Official Music Video).mp3" },
    { id: 4, title: "Bad Guy", artist: "Billie Eilish", file: "songs/Billie Eilish - bad guy (Official Music Video).mp3" },
    { id: 5, title: "Hotel California", artist: "Eagles", file: "songs/Eagles - Hotel California (Live 1977) (Official Video) [HD] [09839DpTctU].mp3" },
    { id: 6, title: "Blinding Lights", artist: "The Weeknd", file: "songs/The Weeknd - Blinding Lights (Official Video).mp3" },

];


// STORAGE
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let playlists = JSON.parse(localStorage.getItem("playlists")) || [];

// PLAYER
const audio = document.getElementById("globalAudio");
const nowPlaying = document.getElementById("nowPlaying");
let currentList = songs;
let currentIndex = 0;

function playSong(list, index) {
    if (!list[index]) return;
    currentList = list;
    currentIndex = index;
    audio.src = list[index].file;
    audio.play();
    nowPlaying.textContent = `${list[index].title} - ${list[index].artist}`;
}

function togglePlay() {
    audio.paused ? audio.play() : audio.pause();
}

function nextSong() {
    currentIndex = (currentIndex + 1) % currentList.length;
    playSong(currentList, currentIndex);
}

function prevSong() {
    currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
    playSong(currentList, currentIndex);
}

audio.addEventListener("ended", nextSong);

// RENDER SONGS
function renderSongs() {
    songsContainer.innerHTML = "";
    songs.forEach((song, index) => {
        songsContainer.innerHTML += `
        <div class="song">
            <p>
                🎵 <strong>${song.title}</strong> - ${song.artist}
                <button class="heart-btn" onclick="toggleFavorite(${song.id})">
                    ${favorites.includes(song.id) ? "❤️" : "🤍"}
                </button>
                <button onclick="addToPlaylistPrompt(${song.id})">➕</button>
            </p>
            <button class="cta" onclick="playSong(songs, ${index})">▶ Play</button>
        </div>`;
    });
    renderFavorites();
}

// FAVORITES
function toggleFavorite(id) {
    favorites = favorites.includes(id)
        ? favorites.filter(f => f !== id)
        : [...favorites, id];
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderSongs();
}

function renderFavorites() {
    favoritesContainer.innerHTML = "";
    favorites.forEach(id => {
        const song = songs.find(s => s.id === id);
        favoritesContainer.innerHTML += `
        <div class="song">❤️ ${song.title} - ${song.artist}</div>`;
    });
}

// SEARCH
function searchSongs() {
    const value = search.value.toLowerCase();
    document.querySelectorAll("#songsContainer .song").forEach(song => {
        song.style.display = song.textContent.toLowerCase().includes(value)
            ? "block" : "none";
    });
}

// PLAYLISTS
function createPlaylist() {
    const name = playlistName.value.trim();
    if (!name) return;
    playlists.push({ id: Date.now(), name, songs: [] });
    localStorage.setItem("playlists", JSON.stringify(playlists));
    playlistName.value = "";
    renderPlaylists();
}

function addToPlaylistPrompt(songId) {
    if (!playlists.length) return alert("Create a playlist first");
    const name = prompt("Playlist name:");
    const playlist = playlists.find(p => p.name === name);
    if (!playlist) return alert("Playlist not found");
    if (!playlist.songs.includes(songId)) playlist.songs.push(songId);
    localStorage.setItem("playlists", JSON.stringify(playlists));
    renderPlaylists();
}

function renderPlaylists() {
    playlistsContainer.innerHTML = "";
    playlists.forEach(pl => {
        const listSongs = pl.songs.map(id => songs.find(s => s.id === id));
        playlistsContainer.innerHTML += `
        <div class="playlist-card">
            <h3>${pl.name}</h3>
            ${listSongs.map((s, i) => `
                <div class="song-mini">
                    ${s.title} - ${s.artist}
                    <button onclick='playSong(${JSON.stringify(listSongs)}, ${i})'>▶</button>
                </div>`).join("")}
        </div>`;
    });
}

// INIT
renderSongs();
renderPlaylists();

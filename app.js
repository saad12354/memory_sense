const movies = [
    { title: "Inception", genre: "Sci-Fi" },
    { title: "Interstellar", genre: "Sci-Fi" },
    { title: "The Notebook", genre: "Romance" },
    { title: "John Wick", genre: "Action" },
    { title: "The Matrix", genre: "Sci-Fi" },
    { title: "Titanic", genre: "Romance" },
    { title: "Avengers", genre: "Action" },
    { title: "Coco", genre: "Animation" },
    { title: "The Conjuring", genre: "Horror" },
    { title: "Joker", genre: "Drama" }
];

let watched = [];
let genreScore = {};

document.getElementById("watchMovie").addEventListener("click", () => {
    const input = document.getElementById("movieInput").value.trim();
    const movie = movies.find(m => m.title.toLowerCase() === input.toLowerCase());

    if (movie) {
        if (watched.some(w => w.title.toLowerCase() === movie.title.toLowerCase())) {
            alert("You've already watched this movie!");
            return;
        }
        watched.push(movie);
        genreScore[movie.genre] = (genreScore[movie.genre] || 0) + 1;
        updateWatchedList();
        document.getElementById("movieInput").value = "";
    } else {
        alert("Movie not found in database.");
    }
});

function updateWatchedList() {
    const container = document.getElementById("watched-list");
    container.innerHTML = "<h3>Watched Movies:</h3><ul>" +
        watched.map(m => `<li>${m.title} (${m.genre})</li>`).join("") +
        "</ul>";
}

document.getElementById("recommendBest").addEventListener("click", () => {
    if (!watched.length) return alert("Watch some movies first!");
    const favGenre = Object.keys(genreScore).reduce((a, b) => genreScore[a] > genreScore[b] ? a : b);
    const recs = movies.filter(m => m.genre === favGenre && !watched.some(w => w.title === m.title));
    displayRecommendations("Best Fit", favGenre, recs);
});

document.getElementById("recommendWorst").addEventListener("click", () => {
    if (!watched.length) return alert("Watch some movies first!");
    const allGenres = new Set(movies.map(m => m.genre));
    const unseen = [...allGenres].filter(g => !(g in genreScore));
    const targetGenre = unseen.length
        ? unseen[Math.floor(Math.random() * unseen.length)]
        : Object.keys(genreScore).reduce((a, b) => genreScore[a] < genreScore[b] ? a : b);
    const recs = movies.filter(m => m.genre === targetGenre && !watched.some(w => w.title === m.title));
    displayRecommendations("Worst Fit", targetGenre, recs);
});

function displayRecommendations(type, genre, recs) {
    const container = document.getElementById("recommendation");
    if (recs.length) {
        container.innerHTML = `<h3>${type} Recommendations (Genre: ${genre}):</h3><ul>` +
            recs.map(m => `<li>${m.title}</li>`).join("") + "</ul>";
    } else {
        container.innerHTML = `<h3>No ${type.toLowerCase()} recommendations available for genre: ${genre}</h3>`;
    }
}

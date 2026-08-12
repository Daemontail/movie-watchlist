const watchList = JSON.parse(localStorage.getItem('mywatchlist'))
const watchlistDisplay = document.getElementById('watchlist-display')
const watchlistObjs = []
document.addEventListener('click', removeWatchlist)
window.addEventListener('load', getWatchlist)
function getWatchlist() {
    if (watchList.length > 0) {
        for (let id of watchList) {
            getMovieDetails(id)
        }
    }
}
function removeWatchlist(e) {
    if (e.target.dataset.id) {
        const movieId = e.target.dataset.id
        watchList.splice(watchList.indexOf(movieId), 1)
        watchlistObjs.splice(watchList.indexOf(movieId),1)
        localStorage.setItem('mywatchlist', JSON.stringify(watchList))
        renderWatchlist(watchlistDisplay)
    }

}
async function getMovieDetails(id) {
    const response = await fetch(`http://www.omdbapi.com/?apikey=9fe11bc5&i=${id}`)
    const data = await response.json()
    if (!watchlistObjs.includes(data)) {
        watchlistObjs.push(data)
        renderWatchlist(watchlistDisplay)
    }
}
function renderWatchlist(div) {
    watchlistDisplay.innerHTML=''
    for (let obj of watchlistObjs) {
        const { Title, Runtime, Genre, Plot, imdbRating, Poster, imdbID } = obj
        if (Title && Runtime != "N/A" && Genre != "N/A" && Plot != "N/A" && imdbRating != "N/A" && Poster != "N/A") {
            div.innerHTML += `
    <section class="movie">
        <img src=${Poster} />
        <div id="details">
            <div id="details-1">
                <h3>${Title}</h3>
                <p class="star">${imdbRating} </p>
            </div>
            <div id="details-2">
                <p>${Runtime}</p>
                <p>${Genre}</p>
                <button class="watchlist remove" data-id=${imdbID}>
                Remove from watchlist
                </button>
            </div>
            <p class="faded">${Plot}</p>
        </div>
        </section>
        <hr class="faded">`
        }
    }
}
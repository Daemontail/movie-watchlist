const watchList = JSON.parse(localStorage.getItem('mywatchlist'))
const watchlistDisplay = document.getElementById('watchlist-display')
let watchlistObjs = []
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
        watchlistObjs.splice(watchList.indexOf(movieId), 1)
        localStorage.setItem('mywatchlist', JSON.stringify(watchList))
        renderWatchlist(watchlistDisplay)
    }

}
async function getMovieDetails(id) {
    const response = await fetch(`http://www.omdbapi.com/?apikey=9fe11bc5&i=${id}`)
    const data = await response.json()
    watchlistObjs.push(data)
    renderWatchlist(watchlistDisplay)
}
function renderWatchlist(div) {
    if (!watchList.length) {
        div.classList.add('lower')
        div.innerHTML = `
        <h2>Your watchlist is looking a little empty...</h2>
        <a class="nav" href="index.html">
        <img class="icon" src="./img/add.svg" />
        Let's find some movies!
        </a>
        `
    }
    else {
        div.classList.remove('lower')
        div.innerHTML = watchlistObjs.map((obj) => {
            const { Title, Runtime, Genre, Plot, imdbRating, Poster, imdbID } = obj
            if (Title && Runtime != "N/A" && Genre != "N/A" && Plot != "N/A" && imdbRating != "N/A" && Poster != "N/A") {
                return `
    <section class="movie">
        <img class="image" src=${Poster} />
        <div>
            <div>
                <h3>${Title}</h3>
                <p><img class="icon" src="./img/star.svg">${imdbRating}</p>
            </div>
            <div>
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
        }).join('')
    }
}
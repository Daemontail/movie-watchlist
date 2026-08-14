const movies = document.getElementById('movies')
const searchform = document.getElementById('search-form')
const searchbar = document.getElementById('search')
let watchList = JSON.parse(localStorage.getItem('mywatchlist'))
searchform.addEventListener('submit', getMovies)
document.addEventListener('click', toggleWatchlist)
document.addEventListener('DOMContentLoaded',initialiseWatchlist)

//If user has no watchlist in local storage, initialise as an empty array
function initialiseWatchlist(){
if (!watchList) {
            localStorage.setItem('mywatchlist',JSON.stringify([]))
        }
}

function toggleWatchlist(e) {
    if (e.target.dataset.id) {
        const btn = e.target
        const movieId = btn.dataset.id
        if (!watchList.includes(movieId)) {
            watchList.unshift(movieId)
            localStorage.setItem('mywatchlist', JSON.stringify(watchList))
            btn.classList.add('remove')
            btn.classList.remove('add')
            btn.textContent = "Remove from watchlist"
        }
        else {
            watchList.splice(watchList.indexOf(movieId), 1)
            btn.classList.add('add')
            btn.classList.remove('remove')
            btn.textContent = "Add to watchlist"
            localStorage.setItem('mywatchlist', JSON.stringify(watchList))
        }
    }
}
async function getMovies(e) {
    e.preventDefault()
    movies.innerHTML = ''
    movies.classList.remove('lower')
    const searchVal = searchbar.value.trim().replaceAll(" ","+")
    const response = await fetch(`https://www.omdbapi.com/?apikey=9fe11bc5&s=${searchVal}`)
    const data = await response.json()
    const movieArr = data.Search
    for (let movie of movieArr) {
        getMovieDetails(movie.imdbID)
    }
}

async function getMovieDetails(id) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=9fe11bc5&i=${id}`)
    const data = await response.json()
    const { Title, Runtime, Genre, Plot, imdbRating, Poster, imdbID } = data
    if (Title && Runtime != "N/A" && Genre != "N/A" && Plot != "N/A" && imdbRating != "N/A" && Poster != "N/A") {
        movies.innerHTML+= `
    <section class="movie">
        <img class="image" src=${Poster} alt="${Title}'s Movie Poster" />
        <div>
            <div>
                <h3>${Title}</h3>
                <p><img class="icon" src="./img/star.svg">${imdbRating}</p>
            </div>
            <div>
                <p>${Runtime}</p>
                <p>${Genre}</p>
                <button class="watchlist ${watchList.includes(imdbID) ? "remove" : "add"}" data-id=${imdbID}>
                ${watchList.includes(imdbID) ? "Remove from watchlist" : "Add to watchlist"}
                </button>
            </div>
            <p class="faded">${Plot}</p>
        </div>
        </section>
        <hr class="faded">`

    }

}






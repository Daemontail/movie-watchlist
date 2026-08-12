const movies = document.getElementById('movies')
const searchform = document.getElementById('search-form')
const searchbar = document.getElementById('search')
let watchList = JSON.parse(localStorage.getItem('mywatchlist'))
searchform.addEventListener('submit', getMovies)
document.addEventListener('click', toggleWatchlist)
function toggleWatchlist(e) {
    if (e.target.dataset.id) {
        const movieId = e.target.dataset.id
        if (!watchList) {
            watchList = []
        }
        if (!watchList.includes(movieId)) {
            watchList.push(movieId)
            localStorage.setItem('mywatchlist', JSON.stringify(watchList))
            console.log(JSON.parse(localStorage.getItem('mywatchlist')))
            e.target.classList.add('added')
            e.target.textContent="Remove from watchlist"
        }
        else{
            watchList.splice(watchList.indexOf(movieId),1)
            e.target.classList.remove('added')
            e.target.textContent="Add to watchlist"
            localStorage.setItem('mywatchlist', JSON.stringify(watchList))
            console.log(JSON.parse(localStorage.getItem('mywatchlist')))
        }
    }
}
async function getMovies(e) {
    e.preventDefault()
    movies.innerHTML = ''
    const searchVal = convertval(searchbar.value)
    const response = await fetch(`http://www.omdbapi.com/?apikey=9fe11bc5&s=${searchVal}`)
    const data = await response.json()
    const movieArr = data.Search
    for (let movie of movieArr) {
        getMovieDetails(movie.imdbID)
    }
}

async function getMovieDetails(id) {
    const response = await fetch(`http://www.omdbapi.com/?apikey=9fe11bc5&i=${id}`)
    const data = await response.json()
    const { Title, Runtime, Genre, Plot, imdbRating, Poster, imdbID } = data
    if (Title && Runtime!="N/A" && Genre!="N/A" && Plot!="N/A" && imdbRating!="N/A" && Poster!="N/A") {
        movies.innerHTML += `
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
                <button class="watchlist" data-id=${imdbID}>Add to watchlist</button>
            </div>
            <p class="faded">${Plot}</p>
        </div>
        </section>
        <hr class="faded">`
    }
}
function convertval(str) {
    let converted = ''
    for (let char of str) {
        if (char === " ") {
            converted += "+"
        }
        else {
            converted += char
        }
    }
    return converted;
}



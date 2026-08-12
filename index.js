const movies = document.getElementById('movies')
const searchform = document.getElementById('search-form')
const searchbar = document.getElementById('search')

searchform.addEventListener('submit', getMovies)
async function getMovies(e) {
    e.preventDefault()
    movies.innerHTML=''
    const searchVal = convertval(searchbar.value)
    const response = await fetch(`http://www.omdbapi.com/?apikey=9fe11bc5&s=${searchVal}`)
    const data = await response.json()
    const movieArr = data.Search 
    for(let movie of movieArr){
        getMovieDetails(movie.imdbID)
    }
}

async function getMovieDetails(id){
    const response = await fetch(`http://www.omdbapi.com/?apikey=9fe11bc5&i=${id}`)
    const data = await response.json()
    console.log(data)
    const { Title, Runtime, Genre, Plot, imdbRating, Poster } = data
    if(Title && Runtime && Genre && Plot && imdbRating && Poster){
    movies.innerHTML+= `
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
                <button class="watchlist">Watchlist</button>
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




const watchList = JSON.parse(localStorage.getItem('mywatchlist'))
const watchlistDisplay=document.getElementById('watchlist-display')
document.addEventListener('click', removeWatchlist)
window.addEventListener('load',checkWatchlist)
function checkWatchlist(){
    if(watchList.length>=0){
        watchlistDisplay.innerHTML=''
        for(let id of watchList){
            getMovieDetails(id,watchlistDisplay)
        }
    }
} 
function removeWatchlist(e) {
    if (e.target.dataset.id) {
        const movieId = e.target.dataset.id
        if (!watchList) {
            watchList = []
        }
        if (watchList.includes(movieId)) {
            watchList.splice(watchList.indexOf(movieId),1)
            e.target.classList.remove('added')
            e.target.textContent="Add to watchlist"
            localStorage.setItem('mywatchlist', JSON.stringify(watchList))
            checkWatchlist()
        }
    }

}
async function getMovieDetails(id,div) {
    const response = await fetch(`http://www.omdbapi.com/?apikey=9fe11bc5&i=${id}`)
    const data = await response.json()
    const { Title, Runtime, Genre, Plot, imdbRating, Poster, imdbID } = data
    if (Title && Runtime!="N/A" && Genre!="N/A" && Plot!="N/A" && imdbRating!="N/A" && Poster!="N/A") {
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
                <button class="watchlist added" data-id=${imdbID}>
                Remove from watchlist
                </button>
            </div>
            <p class="faded">${Plot}</p>
        </div>
        </section>
        <hr class="faded">`
    }

}
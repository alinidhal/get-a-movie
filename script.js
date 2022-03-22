// Titles: https://www.omdbapi.com/?s=batman&page=1&apikey=822d991b
// Details: http://www.omdbapi.com/?i=tt3896198&apikey=822d991b

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// Load movies from API

async function leodMovies(searchTerm) {
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=822d991b`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if (data.Response == "True") displayMovieList(data.Search);
}

function findMovies() {
    let searchTerm = (movieSearchBox.value).trim();
    if (searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list');
        leodMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies) {
    searchList.innerHTML = "";
    for (let idx = 0; idx < movies.length; idx++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID;
        movieListItem.classList.add('search-list-item');
        if (movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class="search-list-item d-flex">
            <div class="search-item-thumbnail">
                 <img src="${moviePoster}">
            </div>
            <div class="search-item-info">
                <h3>${movies[idx].Title}</h3>
                <p>${movies[idx].Year}</p>
            </div>
            </div>
            `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async() => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=822d991b`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        })
    });
}

function displayMovieDetails(details) {
    resultGrid.innerHTML = `
    <div class="movie-poster col-lg-4 d-flex justify-content-center">
           <img src="${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" class="img-fluid" alt="movie poster">
     </div>
     <div class="movie-info col-lg-8">
          <h3 class="movie-title">
                ${details.Title}
          </h3>
           <ul class="movie-misc-info">
                <li class="year">
                     Année : ${details.Year}
                </li>
                <li class="rated">Note : ${details.Rated}</li>
                <li class="released"> <b> Publié : </b> ${details.Released}</li>
            </ul>
            <p class="genre">
                <b>Genre : </b> ${details.Genre}
             </p>
              <p class="writer">
                  <b>Auteur : </b> ${details.Writer}
                </p>
             <p class="actors">
              <b>Acteurs : </b> ${details.Actors}
            </p>
            <p class="plot">
            <b>Plot : </b> ${details.Plot}
             </p>
             <p class="language">
                    <b>Langues : </b> ${details.Language}
                        </p>
                     <p class="awards">
                         <b><i class="fa-solid fa-award"></i></b> ${details.Awards}
                     </p>

                        </div>
`
}

window.addEventListener('click', (event) => {
    if (event.target.className != "form-control") {
        searchList.classList.add('hide-search-list');
    }
})
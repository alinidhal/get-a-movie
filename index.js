let url = "https://www.omdbapi.com/?s=batman&apikey=f6e256e1";
let movieData = [];

const fetchMovie = async() => {
    await fetch('https://www.omdbapi.com/?s=batman&apikey=f6e256e1')
        .then((res) => res.json())
        .then((resp) => {
            movieData = resp
            console.log(movieData);
        });
};

const movieDisplay = async() => {
    await fetchMovie();
    // document.getElementById("post").innerHTML = ``
};

movieDisplay();
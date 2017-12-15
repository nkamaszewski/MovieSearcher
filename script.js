const myApiKey = "1060572d";
const url = "http://www.omdbapi.com/?apikey=" + myApiKey + "&t=";
const findButton = document.querySelector('#findButton');
const findInput = document.querySelector('#findInput');
const detailsMovie = document.querySelector('#details')
const posterMovie = document.querySelector('#poster')



findButton.addEventListener("click", findMovie);

findInput.addEventListener("keydown", (event)=>{
    if(event.keyCode === 13)
        findMovie();
});

function findMovie(){
    let tempUrl = url + findInput.value;
    fetch(tempUrl)
        .then((response)=>  response.json())
        .then((movie)=> {
            if(movie.Response === "True"){
            let details = `<h2>${movie.Title}</h2>
            <ul>
                <li><b>Year:</b> ${movie.Year}</li>
                <li><b>Genre:</b> ${movie.Genre}</li>
                <li><b>Runtime:</b> ${movie.Runtime}</li>
                <li><b>Director:</b> ${movie.Director}</li>
                <li><b>Actors:</b> ${movie.Actors}</li>
                <li><b>Awards:</b> ${movie.Awards}</li>
                <li><b>Plot:</b> ${movie.Plot}</li>
            </ul>`;

            let poster = `<img src="${movie.Poster}">`;

            detailsMovie.innerHTML = details;
            posterMovie.innerHTML = poster;
            }else{
                let details = `<h5>That film is not avalaible in omdbAPI.</h5>`
                detailsMovie.innerHTML = "";
                posterMovie.innerHTML = details;     
            }
        })
}




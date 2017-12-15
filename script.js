const myApiKey = "1060572d";
const url = "http://www.omdbapi.com/?apikey=" + myApiKey + "&s=";
const findButton = document.querySelector('#findButton');
const findInput = document.querySelector('#findInput');
const tableWithMovies = document.querySelector('.results');


findButton.addEventListener("click", findMovie);

findInput.addEventListener("keydown", (event)=>{
    if(event.keyCode === 13)
        findMovie();
});

function findMovie(){
    let tempUrl = url + findInput.value;
    fetch(tempUrl)
        .then((response)=>  response.json())
        .then((data)=> {
            if(data.Response === "False"){
                let details = `<h5>That film is not avalaible in omdbAPI.</h5>`
                tableWithMovies.innerHTML = details; 
                return;
            }else{
               let myMovieList = data.Search;
               let details = "";
               for(let index in myMovieList){
                let i = index;
                i++;                
                details += `<tr>
                            <th scope="row">${i}</th>
                            <td><img src="${myMovieList[index].Poster}" class="minImg"></td>
                            <td>${myMovieList[index].Title}</td>
                            <td>${myMovieList[index].Year}</td>
                            </tr>`;
               } 
               tableWithMovies.innerHTML = details;
            }

        })
    }
           


// function findMovie(){
//     let tempUrl = url + findInput.value;
//     fetch(tempUrl)
//         .then((response)=>  response.json())
//         .then((movie)=> {
//             if(movie.Response === "True"){
//             let details = `<h2>${movie.Title}</h2>
//             <ul>
//                 <li><b>Year:</b> ${movie.Year}</li>
//                 <li><b>Genre:</b> ${movie.Genre}</li>
//                 <li><b>Runtime:</b> ${movie.Runtime}</li>
//                 <li><b>Director:</b> ${movie.Director}</li>
//                 <li><b>Actors:</b> ${movie.Actors}</li>
//                 <li><b>Awards:</b> ${movie.Awards}</li>
//                 <li><b>Plot:</b> ${movie.Plot}</li>
//             </ul>`;

//             let poster = `<img src="${movie.Poster}">`;

//             detailsMovie.innerHTML = details;
//             posterMovie.innerHTML = poster;
//             }else{
//                 let details = `<h5>That film is not avalaible in omdbAPI.</h5>`
//                 detailsMovie.innerHTML = "";
//                 posterMovie.innerHTML = details;     
//             }
//         })
// }




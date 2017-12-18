const myApiKey = "1060572d";
const url = "http://www.omdbapi.com/?apikey=" + myApiKey + "&s=";
const findButton = document.querySelector('#findButton');
const findInput = document.querySelector('#findInput');
const tableWithMovies = document.querySelector('.results');
var ids =[];

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
                
                // if there is no photo in API base
                myMovieList[index].Poster = myMovieList[index].Poster === "N/A" ? "assets/noImg.jpg" : myMovieList[index].Poster;              
                
                details += `<tr>
                            <th scope="row">${i}</th>
                            <td><img src="${myMovieList[index].Poster}" class="minImg"></td>
                            <td>${myMovieList[index].Title}</td>
                            <td>${myMovieList[index].Year}</td>
                            </tr>`;
                ids[index] = myMovieList[index].imdbID;
               } 
               tableWithMovies.innerHTML = details;
            }

        })
    }
           
   // http://www.omdbapi.com/?apikey=1060572d&s=

//  and pages add to result (up to 10), details

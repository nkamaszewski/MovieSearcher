const myApiKey = "1060572d";
const url = "http://www.omdbapi.com/?apikey=" + myApiKey + "&s=";
const findButton = document.querySelector('#findButton');
const findInput = document.querySelector('#findInput');
const tableWithMovies = document.querySelector('.results');
const pageCounter = document.querySelector('.pageCounter');
var ids =[];
var page = 1; //default value

findButton.addEventListener("click", findMovie);

findInput.addEventListener("keydown", (event)=>{
    if(event.keyCode === 13)
        findMovie();
});

function findMovie(){
    page = 1;
    let userUrl = url + findInput.value + "&page=" + page;
    renderMovieList(userUrl);
}

function renderMovieList(tempUrl){
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
                            <th scope="row">-</th>
                            <td><img src="${myMovieList[index].Poster}" class="minImg"></td>
                            <td>${myMovieList[index].Title}</td>
                            <td>${myMovieList[index].Year}</td>
                            </tr>`;
                ids[index] = myMovieList[index].imdbID;
               } 
               tableWithMovies.innerHTML = details;
            }
        })
    showPageCounter();
}


function changePage(value){
    if(value === "next"){
        page++;
        let userUrl = url + findInput.value + "&page=" + page;
        renderMovieList(userUrl);
    }else{
        page = page <= 1? 1: page-1;
        let userUrl = url + findInput.value + "&page=" + page;
        console.log(userUrl);
        renderMovieList(userUrl);
    }
showPageCounter();
}
  
function showPageCounter(){
    pageCounter.innerHTML = `<h5 class="text-center">Page ${page}</h5>`;
}
  

// details

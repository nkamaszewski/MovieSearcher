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
                details += `<tr data="${i}">
                            <th scope="row">-</th>
                            <td><img src="${myMovieList[index].Poster}" class="minImg"></td>
                            <td>${myMovieList[index].Title}</td>
                            <td>${myMovieList[index].Year}</td>
                            </tr>`;
                ids[i] = myMovieList[index].imdbID;
               } 
               tableWithMovies.innerHTML = details;
               listenOnRows();
            }
        })
    showPageCounter();
    
}


function changePage(value){
    if(value === "next"){
        page++;       
    }else{
        page = page <= 1? 1: page-1;
    }
    let userUrl = url + findInput.value + "&page=" + page;
    renderMovieList(userUrl);
    showPageCounter();
}
  
function showPageCounter(){
    pageCounter.innerHTML = `<h5 class="text-center">Page ${page}</h5>`;
}
  

function listenOnRows(){
    let rows = document.querySelectorAll('tr');
    for(let i = 1; i < rows.length; i++){
        rows[i].addEventListener("click", renderMovieDetails)
    }
}

function renderMovieDetails(){
    openDetails();
    // take id of table row user just clicked
    let parameterValue = this.getAttribute("data");
    let id = ids[parameterValue];

    let userUrl = "http://www.omdbapi.com/?apikey=" + myApiKey + "&i="+ id;

    fetch(userUrl)
        .then((response)=>  response.json())
        .then((data)=> {
            let movieDetails = `<button type="button" class="btn btn-dark myClose" onclick="closeDetails()">Close <span class="float-right" style="margin-right: 10px;">x</span></button>
            <img class="card-img-top detailImg" src="${data.Poster}" alt="Card image cap">
            <div class="card-body">
            <p class="card-text">
            <ul>
                <li><b>Title:</b> ${data.Title}</li>
                <li><b>Year:</b> ${data.Year}</li>
                <li><b>Genre:</b> ${data.Genre}</li>
                <li><b>Director:</b> ${data.Director}</li>
                <li><b>Actors:</b> ${data.Actors}</li>
            </ul>
            </p>
          </div>
          `;
          document.querySelector('.myCard').innerHTML = movieDetails;
        })
    

}



function openDetails(){
    document.querySelector('.details').style.width = "100vw";
    document.querySelector('.details').style.display = "initial";

    document.querySelector('.container').style.filter = "blur(5px)";
}



function closeDetails(){
    document.querySelector('.details').style.width = "0vw";
    document.querySelector('.details').style.display = "none";

    document.querySelector('.container').style.filter = "blur(0px)";
    
}
// details
//http://www.omdbapi.com/?apikey=1060572d&i=tt1285016
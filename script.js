const myApiKey = "1060572d";
const url = "http://www.omdbapi.com/?apikey=" + myApiKey + "&s=";
const findButton = document.querySelector('#findButton');
const findInput = document.querySelector('#findInput');
const tableWithMovies = document.querySelector('.results');
const pageCounter = document.querySelector('.pageCounter');
var page = 1; //default value

findButton.addEventListener("click", findMovie);
findButton.addEventListener("touchstart", findMovie);

findInput.addEventListener("keydown", (event)=>{
    if(event.keyCode === 13)
        findMovie();
});

function findMovie(){
    page = 1;

    if(findInput.value !== ""){
        document.querySelector('#errorMessage').innerHTML = "";
        let userUrl = url + findInput.value + "&page=" + page;
        renderMovieList(userUrl);
    } // if input is blank and user clicked find button
    else{
        let details = `<small id="smallErrorMessage">Enter Your movie title!</small>`
        document.querySelector('#errorMessage').innerHTML = details;    
    }
}

function renderMovieList(tempUrl){
    fetch(tempUrl)
        .then((response)=>  response.json())
        .then((data)=> {
            // if there is no any movies in the base
            if(data.Response === "False"){
                let details = `<small id="smallErrorMessage">That film is not avalaible in omdbAPI. Check if the title is correct.</small>`
                document.querySelector('#errorMessage').innerHTML = details; 
                return;
            }else{
               let myMovieList = data.Search;
               let details = "";
               for(let index in myMovieList){
                let i = index;
                i++;

                if(page>1){
                    i += (page*10);
                }
                // if there is no photo in API base
                myMovieList[index].Poster = myMovieList[index].Poster === "N/A" ? "assets/noImg.jpg" : myMovieList[index].Poster;                         
                details += `<tr data-id="${myMovieList[index].imdbID}">
                            <th scope="row">${i}</th>
                            <td><img src="${myMovieList[index].Poster}" class="minImg"></td>
                            <td>${myMovieList[index].Title}</td>
                            <td>${myMovieList[index].Year}</td>
                            </tr>`;
               } 
               tableWithMovies.innerHTML = details;
               listenOnRows();
               // shows page navigate buttons
               document.querySelector('.navigatePagesButtons').style.display = "initial";
               showPageCounter();
            }
        })
    
    
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
    let id = this.getAttribute("data-id");

    let userUrl = "http://www.omdbapi.com/?apikey=" + myApiKey + "&i="+ id;

    fetch(userUrl)
        .then((response)=>  response.json())
        .then((data)=> {
            let poster = data.Poster === "N/A" ? "assets/noImg.jpg" : data.Poster;
            let movieDetails = `<button type="button" class="btn btn-dark myClose" onclick="closeDetails()">Close <span class="float-right" style="margin-right: 10px;">x</span></button>
            <img class="card-img-top detailImg" src="${poster}" alt="Card image cap">
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

            <button class="btn btn-dark btn-block myButton" type="button" data-toggle="collapse" data-target="#filmDetail" aria-expanded="false" aria-controls="filmDetail">
            Review
            </button>
            <div class="collapse" id="filmDetail">
            <div class="card card-body">
            <p>${data.Plot}</p>
            </div>
            </div>
            </div>
          `;
          document.querySelector('.myCard').innerHTML = movieDetails;
        })
}



function openDetails(){
    document.querySelector('.details').style.width = "100%";
    document.querySelector('.details').style.display = "initial";

    document.querySelector('.container').style.filter = "blur(5px)";
}



function closeDetails(){
    document.querySelector('.details').style.width = "0vw";
    document.querySelector('.details').style.display = "none";

    document.querySelector('.container').style.filter = "blur(0px)";
    
}

// UX :
//  - header zmienic
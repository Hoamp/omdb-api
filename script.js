// error handling
// latihan tentang callback membuat ajax api

// untuk mencari ketika user memasukkan input di search button
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function(){
    try{
        const inputKeyword = document.querySelector('.input-keyword');
        const movies = await getMovies(inputKeyword.value);
        // console.log(movies);
        updateUI(movies);
    } catch(err){
        alert(err);
    };
});

function updateUI(movies){
    let cards = ``;
    movies.forEach(m => cards += showCards(m));
    
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards;
};

// ketika tombol detail di click
// event binding
document.addEventListener('click', async function(e){
    if(e.target.classList.contains('modal-detail-button')){
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetails(imdbid);
        updateUIDetail(movieDetail);
    };
});

function getMovies(keyword){
    return fetch('http://www.omdbapi.com/?apikey=369635b6&s=' + keyword)
        .then(response => {
            if(!response.ok){
                throw new Error(response.statusText);
            } else {
                return response.json();
            }
        })
        .then(response => {
            if(response.Response === "False"){
                throw new Error(response.Error);
            } else {
                return response.Search;
            }
        });
};

function getMovieDetails(imdbid){
    return fetch('http://www.omdbapi.com/?apikey=369635b6&i=' + imdbid)
    .then(response => {
        if(!response.ok){
            throw new Error(response.statusText)
        } else {
            return response.json();
        }
    })
    .then(m => m)
}

function updateUIDetail(m){
    const movieDetail = showMovieDetail(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}


function showCards(m){
    return `<div class="col-md-3 my-4">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top" >
                    <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="text-muted card-subtitle mb-2 ">Tahun rilis : ${m.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Details</a>
                    </div>
                </div>
            </div>`
};

// untuk menampilkan details
function showMovieDetail(m){
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid" alt="">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                            <li class="list-group-item"><strong>Director : ${m.Director}</strong></li>
                            <li class="list-group-item"><strong>Actors : ${m.Actors}</strong></li>
                            <li class="list-group-item"><strong>Writer : ${m.Writer}</strong></li>
                            <li class="list-group-item"><strong>Plot : <br> ${m.Plot}</strong>   </li>
                        </ul>
                    </div>
                </div>
            </div>`
};

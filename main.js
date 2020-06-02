const API_KEY = `325398b41b5a0de7c6c9daf789341666`
const API_URL = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}`
const input = document.querySelector('input');
const images = document.querySelector('.images');
const goButton = document.querySelector('.go-button');
const total_results = document.querySelector('#total_results')


async function getMovies() {
  window.onscroll = false;
  images.innerHTML = '';
  const searchTearm = input.value.toUpperCase();
  const url = `${API_URL}&query=${searchTearm}`;
  const response = await fetch(url);
  const json = await response.json();
  total_results.innerHTML = json.total_results + " Results";
  // validation the user input 
  if (json.total_results == 0 || searchTearm == "") {
    swal({
      title: "There are no movies that matched your query.",
      icon: "warning",
    }).then(function () {
      location.reload();
    });
  }
  json.results.forEach(results => {
    if (results.poster_path) {
      //   var test  = []
      //  test.push (results.poster_path);
      // console.log(test.length);
      const img = `https://image.tmdb.org/t/p/w500/${results.poster_path}`
      images.innerHTML += ` 
    <div class="column">
        <div class="card-image">
          <figure class="image">
            <img src="${img}" alt="Error">
          </figure>
        </div>
    </div>
    `;
    }
  });

  var counter = 1
  window.onscroll = async function (ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      counter++;
      const searchNextPage = `${API_URL}&query=${searchTearm}&page=${counter}`
      const response = await fetch(searchNextPage);
      const json = await response.json();

      json.results.forEach(result => {
        if (result.poster_path) {
          // console.log(searchNextPage);
          const nextPage_Img = `https://image.tmdb.org/t/p/w500/${result.poster_path}`
          images.innerHTML += ` 
      <div class="column">
          <div class="card-image">
            <figure class="image">
            <img src="${nextPage_Img}" alt="Error">
            </figure>
          </div>
      </div>
      `;
        }
      })
    }
  }
}
goButton.addEventListener('click', getMovies);
// fetch trending posters into html
async function trending() {
  url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
  const response = await fetch(url);
  const json = await response.json();
  // total_results.innerHTML = json.total_results + " Results";
  json.results.forEach(result => {
    // console.log(result.id);
    // localStorage.setItem("ID", result.id)
    const trending_Img = `https://image.tmdb.org/t/p/w500/${result.poster_path}`
    // const id = `https://api.themoviedb.org/3/movie/${result.id}?api_key=${API_KEY}`
    images.innerHTML += ` 
    <div class="column">
        <div class="card-image">
          <figure class="image">
          <!--< href="${localStorage.getItem("ID")}"> -->
          <!--<a href=  "">  
          </a>-->
           <img src="${trending_Img}" alt="Error">
        <!-- <h1>${localStorage.getItem("ID")}</h1>-->
          </figure>
        </div>
    </div>
    `;
  })

  var counter = 1
  window.onscroll = async function (ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      counter++;
      const nextPage = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${counter}`
      const response = await fetch(nextPage);
      const json = await response.json();
      json.results.forEach(result => {
         // console.log(result.id);
        // localStorage.setItem("ID", result.id)
        const trending_Img = `https://image.tmdb.org/t/p/w500/${result.poster_path}`
        // const id = `https://api.themoviedb.org/3/movie/${result.id}?api_key=${API_KEY}`
        images.innerHTML += ` 
      <div class="column">
          <div class="card-image">
            <figure class="image">
            <!--< href="${localStorage.getItem("ID")}"> -->
            <img src="${trending_Img}" alt="Error">
           <!--<h1>${localStorage.getItem("ID")}</h1>-->
            </figure>
          </div>
      </div>
      `;
      })
    }
  };
}
//Call fetch trending posters
trending()
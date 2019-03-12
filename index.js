const classification = document.querySelector('[data-alpha-pos="class"]')
const classList = {
  "1": "Action",
  "2": "Adventure",
  "3": "Animation",
  "4": "Comedy",
  "5": "Crime",
  "6": "Documentary",
  "7": "Drama",
  "8": "Family",
  "9": "Fantasy",
  "10": "History",
  "11": "Horror",
  "12": "Music",
  "13": "Mystery",
  "14": "Romance",
  "15": "Science Fiction",
  "16": "TV Movie",
  "17": "Thriller",
  "18": "War",
  "19": "Western"
}

const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const movieList = document.querySelector('[data-movie-list]')
let data = []

// 取分類資料
for (let list in classList) {
  let classdata = `
    <li class="nav-item">
      <a class="nav-link" href="#">${classList[list]}</a>
    </li>
  `
  classification.innerHTML += classdata
}

// 分類list監聽
classification.addEventListener('click', function (event) {
  let link = document.querySelectorAll('.nav-link')
  for (let i = 0; i < link.length; i++) {
    link[i].classList.remove('active')
  }
  event.target.classList.add('active')
  let content = event.target.innerHTML
  let results = []
  results = data.filter(item => getGenresName(item.genres).match(content))
  displayDataList(results)
})

axios.get(INDEX_URL)
  .then(response => {
    data.push(...response.data.results)
    displayDataList(data)
  })
  .catch(error => console.log(error))

function displayDataList(data) {
  let htmlContent = ''
  data.forEach(function (item) {
    htmlContent += `
      <div class="col-sm-3">
        <div class="card mb-2">
          <img class="card-img-top" src="${POSTER_URL}${item.image}" alt="Card image cap">

          <div class="card-body movie-item-body">
            <h6>${item.title}</h6>
            <p class="p">${getGenresName(item.genres)}</p>
          </div>
        </div>
      </div>
    `
  })
  movieList.innerHTML = htmlContent
}

function getGenresName(item) {
  let genresName = []
  for (let i = 0; i < item.length; i++) {
    let value = classList[item[i]]
    genresName.push(value)
  }
  return genresName.join(' ')
}
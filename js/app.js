const categoryData = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => categoryDisplay(data.data.news_category))
    .catch(error => console.log(error));
}

const categoryDisplay = (categories) => {
    const categoryContainer = document.getElementById("category-container");
    categories.forEach(category => {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category")
        categoryDiv.innerHTML = `
        <span onclick=articleData(${category.category_id})>${category.category_name}</span>
        `
        categoryContainer.appendChild(categoryDiv)
    })
}
categoryData();

function articleData(id) {
    const notFoundMessage = document.getElementById("article-not-found");
    notFoundMessage.classList.add("d-none")
    toggleSpinner(true)
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => articleDisplay(data.data))
    .catch(error => console.log(error))
}

const articleDisplay = (articles) => {
    // category item found display 
    const categoryItemFound = document.getElementById("category-item-found");
    if(articles.length <= 0) {
        categoryItemFound.innerText = `Not Available`
    }
    else{
        categoryItemFound.innerText = `${articles.length} items found for category`
    }
    // Article not found Message 
    if(articles.length <= 0) {
        const notFoundMessage = document.getElementById("article-not-found");
        notFoundMessage.classList.remove("d-none")
    }
    // Article display 
    console.log(articles)
    toggleSpinner(false)
    const articleContainer = document.getElementById("article-containe");
    articleContainer.textContent = '';
    articles.forEach(article => {
        const {image_url, title, details, author, rating, total_view} = article;
        const {name, img, published_date} = author;
        const articleRow = document.createElement("div");
        articleRow.classList.add("row", "mt-5", "border", "rounded", "py-3");
        articleRow.innerHTML = `
        <div class="col-md-4">
            <img src=${image_url} class="img-fluid h-100" alt="...">
        </div>
        <div class="col-md-8 py-3">
            <div class="card-body">
                <h4 class="card-title">${title}</h4>
                <p class="card-text mt-3">${details}</p>
                <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center">
                    <div class="d-flex align-items-center mb-sm-0 mb-4">
                        <img class="author-img" src=${img}>
                        <div class="ms-3">
                            <p class="mb-1 fw-semibold">${name}</p>
                            <span>${published_date}</span>
                        </div>
                    </div>
                    <div class="mb-sm-0 mb-4">
                        <i class="fa-regular fa-eye"></i>
                        <span class="fw-semibold">${total_view}M</span>
                    </div>
                    <div class="mb-sm-0 mb-4">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star-half-stroke"></i>
                        <span class="fw-semibold">${rating.number}</span>
                    </div>
                    <div class="mb-sm-0 mb-4">
                        <button class="btn btn-info text-light">Details</button>
                    </div>
                </div>
            </div>
        </div>
        `
        articleContainer.appendChild(articleRow)
    })
}

// Spinner 
const toggleSpinner = (isSpinner) => {
    const spinner = document.getElementById("spinner")
    if(isSpinner) {
        spinner.classList.remove("d-none")
    }
    else {
        spinner.classList.add("d-none")
    }
}
// Article not found 
// const articleNotFound = () => {
//     const notFoundMessage = document.getElementById("article-not-found");
//     if()
// }
articleData(01)
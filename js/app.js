const categoryData = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => categoryDisplay(data.data.news_category))
    .catch(error => console.log(error));
}
// Categories display 
const categoryDisplay = (categories) => {
    const categoryContainer = document.getElementById("category-container");
    categories.forEach(category => {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category")
        categoryDiv.innerHTML = `
        <span onclick="articleData(${category.category_id})">${category.category_name}</span>
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
// Article display 
const articleDisplay = (articles) => {
    // Previous Article clear 
    const articleContainer = document.getElementById("article-containe");
    articleContainer.textContent = '';
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
        toggleSpinner(false)
        const notFoundMessage = document.getElementById("article-not-found");
        notFoundMessage.classList.remove("d-none")
    }
    else {
        toggleSpinner(false)
        articles.forEach(article => {
        const {image_url, title, details, author, rating, total_view, _id} = article;
        const {name, img, published_date} = author;
        const articleRow = document.createElement("div");
        articleRow.classList.add("row", "mt-5", "border", "rounded", "py-3");
        articleRow.innerHTML = `
        <div class="col-md-4">
            <img src=${image_url} class="img-fluid h-100" alt="...">
        </div>
        <div class="col-md-8 py-3">
            <div class="card-body">
                <h4 class="card-title">${title ? title : "n/a"}</h4>
                <p class="card-text mt-3">${details ? details : "n/a"}</p>
                <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center">
                    <div class="d-flex align-items-center mb-sm-0 mb-4">
                        <img class="author-img" src=${img}>
                        <div class="ms-3">
                            <p class="mb-1 fw-semibold">${name ? name : "n/a"}</p>
                            <span>${published_date ? published_date : "n/a"}</span>
                        </div>
                    </div>
                    <div class="mb-sm-0 mb-4">
                        <i class="fa-regular fa-eye"></i>
                        <span class="fw-semibold">${total_view ? total_view: "n/a "}M</span>
                    </div>
                    <div class="mb-sm-0 mb-4">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star-half-stroke"></i>
                        <span class="fw-semibold">${rating.number ? rating.number : "n/a"}</span>
                    </div>
                    <div class="mb-sm-0 mb-4">
                        <button onclick="articleDetailsData('${_id}')" class="btn btn-info text-light" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                    </div>
                </div>
            </div>
        </div>
        `
        articleContainer.appendChild(articleRow)
    })
    }
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
// Article Details Modal data 
const articleDetailsData = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => articleDetailsDisplay(data.data[0]))
    .catch(error => console.log(error))
}

// Article Details Modal display
const articleDetailsDisplay = (article) => {
    console.log(article);
    const {thumbnail_url, title, details, author, rating, total_view, _id} = article;
    const {name, img} = author;
    const modalTitle = document.getElementById("exampleModalLabel");
    modalTitle.innerText = `${title}`;
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
    <div class="text-center">
        <img class="img-fluid w-75 mx-auto modal-img" src="${thumbnail_url}">
        <p class="card-text my-3 w-75 mx-auto">${details ? details : "n/a"}</p>
    </div>
    <div class="row align-items-center">
        <div class="col-6 text-center">
            <img class="author-img" src="${img}">
            <p class="mb-1 fw-semibold">${name ? name : "n/a"}</p>
        </div>
        <div class="col-6 text-center">
            <i class="fa-regular fa-eye"></i>
            <span class="fw-semibold">${total_view ? total_view: "n/a "}M</span>
        </div>
    </div>
    `
}
articleData(01)
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
    // Article display 
    const articleContainer = document.getElementById("article-containe");
    articleContainer.textContent = '';
    articles.forEach(article => {
        const {image_url, title, details, author, rating, total_view} = article;
        const articleRow = document.createElement("div");
        articleRow.classList.add("row", "mt-5", "border", "rounded", "py-3");
        articleRow.innerHTML = `
        <div class="col-md-4">
            <img src=${image_url} class="img-fluid" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h4 class="card-title">${title}</h4>
                <p class="card-text mt-3">${details}</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
        `
        articleContainer.appendChild(articleRow)
    })
}
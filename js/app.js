const categoryData = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => categoryDisplay(data.data.news_category))
    .catch(error => console.log(error))
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
    console.log(articles)
}
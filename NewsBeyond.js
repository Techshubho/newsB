const API_KEY = "44e45ca09279496aae04b160ca8760eb";
const url = "https://newsapi.org/v2/everything?q=";
const cardsContainer = document.getElementById('cards-container');
const newsCardTemplate = document.getElementById('template-news-card');
let curselectedNav = null;

window.addEventListener("load", () => fetchNews("India"));

function fetchNews(query) {
    fetch(`${url}${query}&apiKey=${API_KEY}`)
        .then((res) => {
            if (res.status === 426) {
                console.error("The server requires an upgrade to a newer version of the HTTP protocol.");
                return;
            }
            return res.json();
        })
        .then((data) => {
            if (data) {
                bindData(data.articles);
            }
        })
        .catch((error) => {
            console.error("An error occurred:", error);
        });
}

function bindData(articles) {
    cardsContainer.innerHTML = '';

    articles.forEach((article) => {
        if (!article.urlToImage) {
            return;
        }

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name}...  ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

function onNavItemclick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curselectedNav?.classList.remove('active');
    curselectedNav = navItem;
    curselectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-btn');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curselectedNav?.classList.remove('active');
    curselectedNav = null;
});

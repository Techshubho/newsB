const API_KEY = "pub_302802b725e9e3618b4dc8b6266eaf6c6a7a5";
const url = "https://newsdata.io/api/1/news?apikey=pub_302802b725e9e3618b4dc8b6266eaf6c6a7a5&q=pegasus&language=en";
const cardsContainer = document.getElementById('cards-container');
const newsCardTemplate = document.getElementById('template-news-card');
let curselectedNav = null;
// dkdkdk
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
            if (data && data.articles) {
                bindData(data.articles);
            } else {
                console.error("API response does not contain expected data.");
            }
        })
        .catch((error) => {
            console.error("An error occurred:", error);
        });
}

function bindData(articles) {
    cardsContainer.innerHTML = '';

    if (!Array.isArray(articles)) {
        console.error("Invalid data format: articles is not an array.");
        return;
    }

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

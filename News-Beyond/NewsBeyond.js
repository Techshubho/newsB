//Api key=44e45ca09279496aae04b160ca8760eb

const API_KEY="44e45ca09279496aae04b160ca8760eb";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    // console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer =document.getElementById('cards-container');
    const newsCardTemplate= document.getElementById('template-news-card');
    cardsContainer.innerHTML = '';

    articles.forEach(( article) => {
        if(!article.urlToImage){
            return;
        }
 
        const cardclone= newsCardTemplate.content.cloneNode(true);
        fillDataincard(cardclone,article);
        cardsContainer.appendChild(cardclone);
    });
}

function fillDataincard(cardclone,article) {
    const newsImg =cardclone.querySelector("#news-img");
    const newstitle =cardclone.querySelector("#news-title");
    const newssource =cardclone.querySelector("#news-source");
    const newsdesc =cardclone.querySelector("#news-desc");

    newsImg.src=article.urlToImage;
    newstitle.innerHTML=article.title;
    newsdesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta",
    });

    newssource.innerHTML= `${article.source.name}...  ${date}`;

    cardclone.firstElementChild.addEventListener( "click" , () => {
        window.open(article.url , "_blank");
    });
}

let curselectedNav=null;
function onNavItemclick(id){
    fetchNews(id);
    const navitem=document.getElementById(id);
    curselectedNav?.classList.remove('active');
    curselectedNav=navitem;
    curselectedNav.classList.add('active');
}

const searchbutton=document.getElementById('search-btn');
const searchtext=document.getElementById('search-text');

searchbutton.addEventListener('click' ,() => {
    const query =searchtext.value;
    if(!query) return;
    fetchNews(query);
    curselectedNav?.classList.remove('active');
    curselectedNav =null;
})
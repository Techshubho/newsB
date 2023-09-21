const API_KEY = "44e45ca09279496aae04b160ca8760eb";
const url = "https://newsapi.org/v2/everything?q=";

// Set the desired HTTP version in the headers
const headers = new Headers({
  "Sec-WebSocket-Version": "HTTP/1.1", // You can set this to "HTTP/2" if needed
});

window.addEventListener("load", () => fetchNews("India"));

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  try {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`, requestOptions);
    if (res.status === 426) {
      console.error("HTTP version not supported. Check your headers.");
      return;
    }
    const data = await res.json();
    bindData(data.articles);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Rest of your code remains unchanged...

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

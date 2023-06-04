const API_KEY ="6dc997c5d5fb499096c58678b69fc889";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("Goa"));

// it will take to the home page... clicking onn icone (the news source)
function reload(){
    window.location.reload();

    
}

async function fetchNews (query){ 
    // To bring news we are using fetch  
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    // we will get data we will convert into json formet
    const data = await res.json();
    console.log(data);
    // we are passing articles as a array
    bindData(data.articles);

}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML="";

    articles.forEach(article => {
        // if in the article, image is not showing i will retrun from here
        // we are not showing this article 
        if(!article.urlToImage)return;
        // in card as many as elements are there it will become clone of div
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        // as many as elements are created it will become clone
        cardsContainer.appendChild(cardClone);
     });

}

function fillDataInCard(cardClone, article){
    
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource= cardClone.querySelector('#news-source');
    const newsDecs = cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDecs.innerHTML=article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

     newsSource.innerHTML=`${article.source.name} .  ${date}`;

     cardClone.firstElementChild.addEventListener("click", ()=> {
        window.open(article.url, "_blank");


     });



}

let curSelectedNav = null;
function onNavItemClick(id){
    // it will fetch news also and binddata.
    fetchNews(id);
    // active it will change color 
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav= navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", ()=> {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav= null;


});




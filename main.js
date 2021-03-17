let news = document.querySelector('.news');
let showNewsBtn = document.querySelector('.btn');


function toggleNews() {
  let news = document.querySelector('.news')
  if (news.style.display === "none") {
      news.style.display = "block";
  } else {
        news.style.display = "none"
      }
}




const RSS_URL = `https://lenta.ru/rss/news`;

fetch(RSS_URL)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    const items = data.querySelectorAll("item");
    let html = ``;
    items.forEach(el => {
      html += `
          <div class="title">
          ` + getTitle(el) + `
          </div>
          <div class="author">
          ` + getAuthor(el) + `
          </div>
          <div class="date">
          ` + getDate(el) + `
          </div>
          <div class="link">

          <a href="`+ getLink(el) +`" target="_blank"> Читать... </a>
          </div>
      `
    });
    var news = document.getElementById('news')
    news.insertAdjacentHTML("afterbegin", html);
    });
    
    
function getTitle(el) {
  return el.getElementsByTagName("title")[0].innerHTML
}

function getAuthor(el) {
  return el.getElementsByTagName("author")[0].innerHTML
}

function getDate(el) {
  return el.getElementsByTagName("pubDate")[0].innerHTML
}
function getLink(el) {
  return el.getElementsByTagName("link")[0].innerHTML
}


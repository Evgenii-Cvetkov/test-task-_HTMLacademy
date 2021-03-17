let showNewsBtn = document.querySelector('.btn');
    newsFeed = new Array();

const RSS_URL = `https://lenta.ru/rss/news`;

fetch(RSS_URL)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    const items = data.querySelectorAll("item");
    console.log(items.length);
    let html = ``;
    items.forEach(el => {

      let news = createNewsEntry(el);
      newsFeed.push(news)

      console.log(newsFeed);

      news.template = createNewsTemplate(news)

      

      // news.template += `
      //     <div class="title">
      //     ` + getTitle(el) + `
      //     </div>
      //     <div class="author">
      //     ` + getAuthor(el) + `
      //     </div>
      //     <div class="date">
      //     ` + getDate(el) + `
      //     </div>
      //     <div class="link">

      //     <a href="`+ getLink(el) +`" target="_blank"> Читать... </a>
      //     </div>
      // `
    });
    // var newsSection = document.getElementById('news')
    // newsSection.insertAdjacentHTML("afterbegin", news.template);
    })
    
    
    
function createNewsEntry(rssFeedEntry) {
  return {
    title: rssFeedEntry.getElementsByTagName("title")[0].innerHTML,
    author: rssFeedEntry.getElementsByTagName("author")[0].innerHTML,
    date: rssFeedEntry.getElementsByTagName("pubDate")[0].innerHTML,
    link: rssFeedEntry.getElementsByTagName("link")[0].innerHTML,
    isRead: false,
  }
}

// function getTitle(el) {
//   return el.getElementsByTagName("title")[0].innerHTML
// }

// function getAuthor(el) {
//   return el.getElementsByTagName("author")[0].innerHTML
// }

// function getDate(el) {
//   return el.getElementsByTagName("pubDate")[0].innerHTML
// }
// function getLink(el) {
//   return el.getElementsByTagName("link")[0].innerHTML
// }

function createNewsTemplate(news) {
  let newsTemplate = document.createElement('div');
  newsTemplate.classList.add('.news');
  
  let author = document.createElement('div');
  author.innerHTML = news.author;
  author.classList.add('author')

  let title = document.createElement('div');
  title.innerHTML = news.title;
  title.classList.add('title')

  let date = document.createElement('div');
  date.innerHTML = news.date;
  date.classList.add('title')

  let link = document.createElement('div');
  link.innerHTML = news.link;
  link.classList.add('link')

  newsTemplate.appendChild(author)
  newsTemplate.appendChild(title)
  newsTemplate.appendChild(date)
  newsTemplate.appendChild(link)

  return newsTemplate;
}

function toggleNews() {
  let newsSection = document.querySelector('.news')
  if (newsSection.style.display === "none") {
    newsSection.style.display = "block";
  } else {
    newsSection.style.display = "none"
      }
}
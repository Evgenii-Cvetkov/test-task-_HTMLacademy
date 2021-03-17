let showNewsBtn = document.querySelector('.btn');
    newsFeed = new Array();
    newsSection = document.querySelector('.news');
    newsCount = document.querySelector('.news__count')

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

      let template = createNewsTemplate(news)
      newsSection.appendChild(template)

    });
    newsCount.innerHTML = items.length
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


function createNewsTemplate(news) {
  let newsTemplate = document.createElement('div');
  newsTemplate.classList.add('news__item');
  
  let title = document.createElement('div');
  title.innerHTML = news.title;
  title.classList.add('title')

  let author = document.createElement('div');
  author.innerHTML = news.author;
  author.classList.add('author')

  let date = document.createElement('div');
  date.innerHTML = news.date;
  date.classList.add('date')

  let link = document.createElement('a');
  link.href = `${news.link}`
  link.innerHTML = news.link
  link.classList.add('link')
  

  newsTemplate.appendChild(title)
  newsTemplate.appendChild(author)
  newsTemplate.appendChild(date)
  newsTemplate.appendChild(link)

  return newsTemplate;
}

function toggleNews() {
  
  if (newsSection.style.display === "none") {
    newsSection.style.display = "block";
  } else {
    newsSection.style.display = "none"
      }
}
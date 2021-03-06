let showNewsBtn = document.querySelector('.btn');
    newsFeed = new Array();
    newsSection = document.querySelector('.news');
    newsCount = document.querySelector('.news__count')
    

const RSS_URL = `https://www.sport-express.ru/services/materials/news/se/`;

fetch(RSS_URL)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    const items = data.querySelectorAll("item");
    // console.log(items.length);
    items.forEach(el => {

      let news = createNewsEntry(el);
      newsFeed.push(news)

      // console.log(newsFeed);

      let template = createNewsTemplate(news)
      newsSection.appendChild(template)

    });
    newsCount.innerHTML = items.length
    })
    
    
    
function createNewsEntry(rssFeedEntry) {
  return {
    title: rssFeedEntry.getElementsByTagName("title")[0].innerHTML,
    category: rssFeedEntry.getElementsByTagName("category")[0].innerHTML,
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

  let category = document.createElement('div');
  category.innerHTML = news.category;
  category.classList.add('category')

  let date = document.createElement('div');
  date.innerHTML = news.date;
  date.classList.add('date')

  let link = document.createElement('a');
  link.href = `${news.link}`
  link.innerHTML = news.link
  link.classList.add('news__link')
  link.setAttribute('target', '_blank')
  link.addEventListener("click", function() {
    news.isRead = true;
    newsTemplate.style.opacity = 0.5
    recalculateCounter();
  })

  newsTemplate.appendChild(title)
  newsTemplate.appendChild(category)
  newsTemplate.appendChild(date)
  newsTemplate.appendChild(link)

  return newsTemplate;
}

function recalculateCounter() {
  var unreadNews = 0;
  newsFeed.forEach(news => {
    if(!news.isRead)
        unreadNews++;
  }); 

  newsCount.innerHTML = unreadNews;
}


function toggleNews() {
  
  if (newsSection.style.display === "none") {
    newsSection.style.display = "block";
  } else {
    newsSection.style.display = "none"
      }
}

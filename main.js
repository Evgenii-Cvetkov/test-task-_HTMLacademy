const RSS_URL = `https://lenta.ru/rss/news`;

fetch(RSS_URL)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    console.log(data);
    const items = data.querySelectorAll("item");
    let html = ``;
    items.forEach(el => {
      
    });
    document.body.insertAdjacentHTML("beforeend", html);
    });
    
    



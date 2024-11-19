import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

const swiper1 = new Swiper(".swiper1", {
  direction: "horizontal",
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },
  autoplay: {
    delay: "5000",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const swiper2 = new Swiper(".swiper2", {
  direction: "horizontal",
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },
  autoplay: {
    delay: "15000",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

setInterval(() => {
  const time = new Date;
  document.querySelector(".time").innerHTML = `
  ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}
  `;





}, 1000);



let likeList = JSON.parse(localStorage.getItem("like"))
  ? JSON.parse(localStorage.getItem("like"))
  : [];

function setLike() {
  localStorage.setItem("like", JSON.stringify(likeList));
}

let buyList = JSON.parse(localStorage.getItem("buy"))
  ? JSON.parse(localStorage.getItem("buy"))
  : [];

function setBuy() {
  localStorage.setItem("buy", JSON.stringify(buyList));
}

const GET_PRODUCTS = "http://localhost:5000/products";

fetchProducts();

async function fetchProducts() {
  const res = await fetch(GET_PRODUCTS);
  const body = await res.json();
  cards(body.data);
}

function cards(a) {
  a.forEach((info) => {
    console.log(info);
    creat(info);
  });
}

function creat(info) {
  if (likeList.includes(info.id)) {
    document.querySelector(".popular").innerHTML += `
          <a href="/product.html?id=${info.id}" id="${info.id}" class="card">
            <img class="card__img" src="${info.image}" alt="" />
            <h2 class="card__title">
              ${info.name}
            </h2>
            <div class=" card__baho">


              <p>
                ${info.price} сом
              </p>
            </div>

            <p class="prise"></p>

            <button class="buy" onclick="buy(${info.id}), handleButtonClick(event)">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAaVBMVEX///8AAAC4uLjy8vK7u7tiYmL39/f6+vru7u7c3Nyamprg4OBOTk7o6OjU1NTr6+ssLCxCQkKLi4vIyMiysrJvb2+jo6NXV1cnJyeEhISSkpLOzs44ODgXFxcxMTFdXV0ODg55eXkfHx/Ue1uIAAADxklEQVRogeVZ6dKiMBA03CinCMgp8P4PuUzA74OQAwjZqq2dXxZgO056ejrhdvt3Iwwty1aEfUcI1X1muJYC8A5N0X5e14PH6Cfa5GrwII1+4S9P3nb8oDTnX8iuRp+iKjD65ZWZ4wXgsaMI3QDm3BWB36AyXqgI3IHCPBSB33J1hJm0IFUFnozgb1XgAfBFFfgjVriiuqlCYL4BTH+qAldKFwPk5aVdEgY52x4dui4KMvX3heAbUsfir+yOlgTvx4uRKR/NiFOS4Np4MZfixBSQeUBefIwXG3kLAyJV++TVEOgiP+qguhuy3HQPXTClLUDZyojd01biaCTDKN0UAcxG8I8seMagBdAllsS2PohuI6qxR6PNOh8LHzFY4Y892kiuKNirmOr54S9JOoCcUZWJonJ0sRomnWFe9FI9ijlBX7aKfWtnwKzsGffGW50rge3T2/MHfCtoByIAANb+UNYwwqJ5rJtPJOcAak5VsBZH57H5Pjygzdb9gZVPZ919tFLzwmS2J4ScYYTUeNokZRhxe3IaXMowiriG7cVJdQlrwQwORlWrTwqAC1TjJhaN6nJyXhTCkoJh1M6BR0KmpVyq8gIM28BXPZiB3qkVBaKZ/G/6Z1XXycUtYsEz7XEFsAuuaM0BTEd5dRA7hAYSt58N8oKGNDP2x6vHu5JGvEe2zm5fdvmpx+cc+M5SZvVh5Hex+5hJN8r+wBYrfWbH9MjW94eKs+D/L1xD04xkjwr4iaZpyYEjpsrEXGy8p2ip/CIGR97V6U66uPmCvxnvtYNVLJ409xA9aFfdwREjJ1096YlrE0zd2Xp5PeBPLC9/u3n4/hDn3nRUIzwLxrtr9MFj1C/xuT1rLmKVbTNAtF74a6YAHJ+k918zCTtT1rm6C78cf4eWj9VOoIvvdZmx7aUPbFjM9ncDpQMNTO5bJziiey9HKPx3qmN3IPHlLiQhv7qJO1k5fMRLywdP8pUXH0R1gURX21y8P6ONAfiP+epXUyTYUBXkA86HkQ8M8nQFXpCJ0TJfrd/BzLlmrSR70h3I0s4B7q1bSQ90tsEDhz9bL9sY9lAN7cmwIbCAtR13SFvRuuEhP3ohscWKfvsLHxEJvOJ91TW44gNdkBJI3fypWM9Tijl0rFsmvH+1dQ0LEoteGO5d6eOq6gHWFubO/BvVpIVmmU0ejeDbImZrFhf3ctLHVqy5yUqkea8D3bXxG/bYueUk6kruJOoXB/r5Psulv77DKBUlk5jzk57B3PNvUvKzZ1EaO97b245RFk/NV/WG/+/HH5SxLCmMthikAAAAAElFTkSuQmCC" alt="">
            </button>
            <button class="like color" onclick="like(${info.id}), handleButtonClick(event)" >
              <img src="./images/like.png" alt="">
            </button>
          </a>
    `;
  } else {
    document.querySelector(".popular").innerHTML += `
          <a href="/product.html?id=${info.id}" id="${info.id}" class="card">
            <img class="card__img" src="${info.image}" alt="" />
            <h2 class="card__title">
              ${info.name}
            </h2>
            <div class=" card__baho">

              <p>
                ${info.price} сом
              </p>
            </div>

            <p class="prise"></p>

            <button class="buy" onclick="buy(${info.id}), handleButtonClick(event)">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAaVBMVEX///8AAAC4uLjy8vK7u7tiYmL39/f6+vru7u7c3Nyamprg4OBOTk7o6OjU1NTr6+ssLCxCQkKLi4vIyMiysrJvb2+jo6NXV1cnJyeEhISSkpLOzs44ODgXFxcxMTFdXV0ODg55eXkfHx/Ue1uIAAADxklEQVRogeVZ6dKiMBA03CinCMgp8P4PuUzA74OQAwjZqq2dXxZgO056ejrhdvt3Iwwty1aEfUcI1X1muJYC8A5N0X5e14PH6Cfa5GrwII1+4S9P3nb8oDTnX8iuRp+iKjD65ZWZ4wXgsaMI3QDm3BWB36AyXqgI3IHCPBSB33J1hJm0IFUFnozgb1XgAfBFFfgjVriiuqlCYL4BTH+qAldKFwPk5aVdEgY52x4dui4KMvX3heAbUsfir+yOlgTvx4uRKR/NiFOS4Np4MZfixBSQeUBefIwXG3kLAyJV++TVEOgiP+qguhuy3HQPXTClLUDZyojd01biaCTDKN0UAcxG8I8seMagBdAllsS2PohuI6qxR6PNOh8LHzFY4Y892kiuKNirmOr54S9JOoCcUZWJonJ0sRomnWFe9FI9ijlBX7aKfWtnwKzsGffGW50rge3T2/MHfCtoByIAANb+UNYwwqJ5rJtPJOcAak5VsBZH57H5Pjygzdb9gZVPZ919tFLzwmS2J4ScYYTUeNokZRhxe3IaXMowiriG7cVJdQlrwQwORlWrTwqAC1TjJhaN6nJyXhTCkoJh1M6BR0KmpVyq8gIM28BXPZiB3qkVBaKZ/G/6Z1XXycUtYsEz7XEFsAuuaM0BTEd5dRA7hAYSt58N8oKGNDP2x6vHu5JGvEe2zm5fdvmpx+cc+M5SZvVh5Hex+5hJN8r+wBYrfWbH9MjW94eKs+D/L1xD04xkjwr4iaZpyYEjpsrEXGy8p2ip/CIGR97V6U66uPmCvxnvtYNVLJ409xA9aFfdwREjJ1096YlrE0zd2Xp5PeBPLC9/u3n4/hDn3nRUIzwLxrtr9MFj1C/xuT1rLmKVbTNAtF74a6YAHJ+k918zCTtT1rm6C78cf4eWj9VOoIvvdZmx7aUPbFjM9ncDpQMNTO5bJziiey9HKPx3qmN3IPHlLiQhv7qJO1k5fMRLywdP8pUXH0R1gURX21y8P6ONAfiP+epXUyTYUBXkA86HkQ8M8nQFXpCJ0TJfrd/BzLlmrSR70h3I0s4B7q1bSQ90tsEDhz9bL9sY9lAN7cmwIbCAtR13SFvRuuEhP3ohscWKfvsLHxEJvOJ91TW44gNdkBJI3fypWM9Tijl0rFsmvH+1dQ0LEoteGO5d6eOq6gHWFubO/BvVpIVmmU0ejeDbImZrFhf3ctLHVqy5yUqkea8D3bXxG/bYueUk6kruJOoXB/r5Psulv77DKBUlk5jzk57B3PNvUvKzZ1EaO97b245RFk/NV/WG/+/HH5SxLCmMthikAAAAAElFTkSuQmCC" alt="">
            </button>
            <button class="like" onclick="like(${info.id}), handleButtonClick(event)">
              <img src="./images/like.png" alt="">
            </button>
          </a>
    `;
  }
}

function like(id) {
  const parrent = document.getElementById(id);

  if (likeList.includes(id)) {
    likeList.splice(likeList.indexOf(id), 1);

    parrent.querySelector(".like").classList.remove("color");
  } else {
    likeList.push(id);
    parrent.querySelector(".like").classList.add("color");
  }

  setLike();
}

function buy(id) {
  if (buyList.includes(id)) {
    alert("tovar olib tashlandi");
    buyList.splice(buyList.indexOf(id), 1);
  } else {
    alert("tovar qoshildi");
    buyList.push(id);
  }

  setBuy();
}

function handleButtonClick(event) {
  event.stopPropagation(); // Останавливает дальнейшую обработку события
  event.preventDefault(); // Предотвращает переход по ссылке
  // Дальше можно добавить Вашу логику для лайка
}

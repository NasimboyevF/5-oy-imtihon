
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
    creat(info)

  });
}

function creat(info)
{
    if (likeList.includes(info.id)) {
      document.querySelector(".popular").innerHTML += `
          <a href="/product.html?id=${info.id}" id="${info.id}" class="card">
            <img class="card__img" src="${info.image}" alt="" />
            <h2 class="card__title">
              ${info.name}
            </h2>
            <div class=" card__baho">
              <svg
                width="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#fbff00"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M11.5245 3.46353C11.6741 3.00287 12.3259 3.00287 12.4755 3.46353L14.1329 8.56434C14.1998 8.77035 14.3918 8.90983 14.6084 8.90983H19.9717C20.4561 8.90983 20.6575 9.52964 20.2656 9.81434L15.9266 12.9668C15.7514 13.0941 15.678 13.3198 15.745 13.5258L17.4023 18.6266C17.552 19.0873 17.0248 19.4704 16.6329 19.1857L12.2939 16.0332C12.1186 15.9059 11.8814 15.9059 11.7061 16.0332L7.3671 19.1857C6.97524 19.4704 6.448 19.0873 6.59768 18.6266L8.25503 13.5258C8.32197 13.3198 8.24864 13.0941 8.07339 12.9668L3.73438 9.81434C3.34253 9.52964 3.54392 8.90983 4.02828 8.90983H9.39159C9.6082 8.90983 9.80018 8.77035 9.86712 8.56434L11.5245 3.46353Z"
                    fill="#fbff00"
                  ></path>
                </g>
              </svg>
              <p>
                ${info.price}
              </p>
            </div>

            <p class="prise"></p>

            <button class="buy" onclick="buy(${info.id}), handleButtonClick(event)">
              buy
            </button>
            <button class="like color" onclick="like(${info.id}), handleButtonClick(event)">
              like
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
              <svg
                width="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#fbff00"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M11.5245 3.46353C11.6741 3.00287 12.3259 3.00287 12.4755 3.46353L14.1329 8.56434C14.1998 8.77035 14.3918 8.90983 14.6084 8.90983H19.9717C20.4561 8.90983 20.6575 9.52964 20.2656 9.81434L15.9266 12.9668C15.7514 13.0941 15.678 13.3198 15.745 13.5258L17.4023 18.6266C17.552 19.0873 17.0248 19.4704 16.6329 19.1857L12.2939 16.0332C12.1186 15.9059 11.8814 15.9059 11.7061 16.0332L7.3671 19.1857C6.97524 19.4704 6.448 19.0873 6.59768 18.6266L8.25503 13.5258C8.32197 13.3198 8.24864 13.0941 8.07339 12.9668L3.73438 9.81434C3.34253 9.52964 3.54392 8.90983 4.02828 8.90983H9.39159C9.6082 8.90983 9.80018 8.77035 9.86712 8.56434L11.5245 3.46353Z"
                    fill="#fbff00"
                  ></path>
                </g>
              </svg>
              <p>
                ${info.price}
              </p>
            </div>

            <p class="prise"></p>

            <button class="buy" onclick="buy(${info.id}), handleButtonClick(event)">
              buy
            </button>
            <button class="like" onclick="like(${info.id}), handleButtonClick(event)">
              like
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







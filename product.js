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

let body;

async function fetchProducts() {
  const res = await fetch(GET_PRODUCTS);
  body = await res.json();
  cards(body.data);
}

function cards(a) {
  a.forEach((info) => {
    creat(info);
  });
}

koltox();
function koltox() {
  document.querySelector(
    ".cards h2"
  ).innerHTML = `в корзине ${buyList.length} товар`;
}

let narh = 0;

function creat(info) {
  if (buyList.includes(info.id)) {
    narh += info.price;

    document.querySelector(".cards").innerHTML += `
          <div id="${info.id}" class="card" style="display:flex; gap:20px; border: 1px solid #e8e8e8;border-radius: 12px;padding: 24px;">
            <img width='100px' src="${info.image}" alt="">
            <div class="info">
            <p style="max-width:476px;">
            ${info.description}
            </p>
            <button class="buy" onclick="buy(${info.id}), handleButtonClick(event)">
              удалить 
            </button>
            <button class="like color" onclick="like(${info.id}), handleButtonClick(event)">
              like
            </button>
            </div>
            <div class="num">
              <span class="minus" onclick="minus(${info.id})" >
                -
              </span>
              <p id="soni">
                1
              </p>
              <span class="plus"  onclick="plus(${info.id})">
                +
              </span>
            </div>

            <p class="price">
              ${info.price}
            </p>

          </div>
    
    
    `;
  }

  narhlar();
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
        console.log(document.getElementById(id));
    const parrent = document.getElementById(id);
    const elem = parrent.querySelector("#soni");
    console.log(id);
    
    console.log(parrent);
    console.log(elem);
    
    console.log(body.data[id - 1].price * (elem.innerHTML * 1));
    

    if (elem.innerHTML * 1 > 0) {
          console.log(body.data[id - 1].price * (elem.innerHTML * 1));
      elem.innerHTML = ` ${elem.innerHTML * 1 - 1}`;
      narh -= (body.data[id - 1].price * ((elem.innerHTML * 1)+1));
    }

    document.getElementById(id).remove();
    buyList.splice(buyList.indexOf(id), 1);

    narhlar();
  } else {
    alert("tovar qoshildi");
    buyList.push(id);
  }

  koltox();
  setBuy();
}

function handleButtonClick(event) {
  event.stopPropagation(); // Останавливает дальнейшую обработку события
  event.preventDefault(); // Предотвращает переход по ссылке
  // Дальше можно добавить Вашу логику для лайка
}

function minus(id) {
  const parrent = document.getElementById(id);
  const elem = parrent.querySelector("#soni");

  if (elem.innerHTML * 1 > 0) {
    elem.innerHTML = ` ${elem.innerHTML * 1 - 1}`;
    narh = narh - body.data[id - 1].price;
  }

  narhlar();
}

function plus(id) {
  const parrent = document.getElementById(id);
  const elem = parrent.querySelector("#soni");

  console.log(body.data[id - 1].stock);

  if (elem.innerHTML * 1 < body.data[id - 1].stock) {
    elem.innerHTML = ` ${elem.innerHTML * 1 + 1}`;
    narh = narh + body.data[id - 1].price;
  }

  narhlar();
}

function narhlar() {
  document.getElementById("narh").textContent = `${narh.toFixed(4)}  сом`;
}

let buyList = JSON.parse(localStorage.getItem("buy"))
  ? JSON.parse(localStorage.getItem("buy"))
  : [];

function setBuy() {
  localStorage.setItem("buy", JSON.stringify(buyList));
}

const id = window.location.href.split("=")[1];

const GET_PRODUCTS = "http://localhost:5000/products/" + id;

fetchProducts();

async function fetchProducts() {
  const res = await fetch(GET_PRODUCTS);
  const body = await res.json();

  cardInfo(body.data);
  cardos(body.data);
}

function cardInfo(info) {
  console.log(info);

  document.querySelector(".wrapper").innerHTML = `
      <h2 style="    align-items: baseline;color: #111;display: flex;font-size: 42px;font-weight: 600;line-height: 49px;" class="card-title">
      ${info.name}</h2>
      <div class="osenka"></div>

      <div
        class="inner"
        style="display: flex; align-items: center; justify-content: space-between;"
      >
        <img src="${info.image}" style="width: 460px; height: 460px; " />

        <div class="infos" style="    font-size: 14px;
    font-weight: 500;
    line-height: 20px;">
          Поддержка---------------------4K UHD Есть  <br>
          Жесткий диск------------------Есть, 1000 GB <br>
          Тип процессора---------------8-ядерный AMD  <br>
          Частота процессора---------3.50 ГГц  <br>
          Графический процессор---AMD Custom RDNA2 <br> 
          Оперативная память-------16384 Мб, GDDR6  <br>
          Видеопамять------------------2230 МГц <br>
        </div>

        <div
          class="card-inner"
          style=" max-width: 390px ; width: 100%;  border: 1px solid #e8e8e8; border-radius: 12px; padding: 24px;"
        >
          <p
            style="font-size: 22px; font-weight: 700; line-height: 32px; margin-bottom: 24px;"
          >
            ${info.price}$
          </p>

          <p style="    color: #999; font-size: 14px; font-weight: 500;">
            Информация о доставке:
          </p>

          <h3 style="margin: 0;">Стандартная доставка</h3>

          <p style="margin: 0; margin-bottom: 100px;">
            Доставка от 5 до 12 дней исходя от адреса доставки
          </p>

          <span
            style="display: block; width: 100%; border-top: 1px solid #e8e8e8; margin-bottom: 24px; "
          ></span>
          <button
            class="buy"
            style="width: 100%; border-radius: 10px; padding: 10px; border: 1px solid #000000; margin-bottom: 15px; "
            onclick="buy(${info.id}), handleButtonClick(event)"
          >
            buy
          </button>
          <button
            style="width: 100%; border-radius: 10px; padding: 10px; border: 1px solid #000000; "
          >
            Купить в одиин клик
          </button>
        </div>
      </div>
  
  `;
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

function cardos(info) {
  console.log();
  for (let x = 0; 4 - x >= 0; x++) {
    if (info.rating - x >= 1) {
      document.querySelector(".osenka").innerHTML += `
         <img style="width:24px;" src="data:image/png;base64,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" alt="">
      `;
    } else {
      document.querySelector(".osenka").innerHTML += `
         <img style="width:24px;" src="data:image/jpeg;base64,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" alt="">
      `;
    }
  }
}

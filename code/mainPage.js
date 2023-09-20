import { AJAX, FETCH, postData } from "./request.js";
import { randomProduct } from "./methods/methods.js";
import { url, urlAdd } from "./index.js"
import { exeptions, noPhoto } from "./exections.js";

let cartItemsQuantity = 0;
let currentProduct;


AJAX(url, "GET", show);

let dataMain = [];
function show(data) {
  if (Array.isArray(data)) {
    dataMain = data;
    showRandomProducts(randomProduct(dataMain, 4));
  } else {
    throw new Error("You get an error");
  }
}

const datalist = document.querySelector("#product-name");

const searchInput = document.getElementById("search-field");

searchInput.addEventListener("input", (event) => {
  datalist.innerHTML = ''
  const foundedItems = dataMain.filter((el) => {
    return el.productName.toLowerCase().includes(event.target.value.toLowerCase())
  })

  foundedItems.forEach((el) => {
    const option = document.createElement("option")
    option.value = el.productName;
    option.dataset.productId = el.id;
    datalist.append(option);
  })
});

function showRandomProducts(productsArr) {
  if (!Array.isArray(productsArr)) {
    console.warn("Отримано не масив");
    return;
  }

  productsArr.forEach((el) => {
    let card = `
        <div class="sale-products-card" data-product-id = "${el.id}">
          <div class="sale-products-card-img">
            <img src="${exeptions.includes(el.availableOptions[0].optionImages[0]) ? noPhoto : el.availableOptions[0].optionImages[0]}" alt="${el.productName}">
          </div>
          <div class="sale-products-card-name">${el.productName}</div>
          <div class="sale-products-card-stars">
            <img src="./img/market/stars.png" alt="stars">
          </div>
          <div class="sale-products-price">As low as <b>UAH ${el.availableOptions[0].prices[0].price}</b></div>
          <div class="add-to-cart">
            <img src="./img/market/bags.svg" alt="bags">
            <div>ADD TO CART</div>
          </div>
        </div> 
    `;
    document.querySelector('.sale-products').insertAdjacentHTML("beforeend", card)
  });
}


/* Отримання та відібраження кількості товарів у корзині */
FETCH(urlAdd, cartQuantity);

function cartQuantity(data) {
  cartItemsQuantity = data.length
  document.querySelector('.basket-counter').innerText = cartItemsQuantity
}

/*Відображення товару по натиску кнопки пошуку у нав меню*/
document.querySelector('.search-btn').addEventListener('click', (e) => {
  let searchValue = document.querySelector('#search-field').value;

  if (searchValue === '') {
    alert('Please enter name of product')
  }

  currentProduct = dataMain.filter(product => product.productName === searchValue)[0]

  showModalContent(currentProduct)
  openModal(e)
})

/*****************************************************/

FETCH(url, showProd)

function showProd(data) {
  document.querySelector(".sale-products").addEventListener('click', (e) => {
    showModalContent(getItem(e, data))
    openModal(e)
  })
}


/********Відібраження модалки*********/
function getItem(e, data) {
  let itemId;
  let currentItem;

  if (e.target.parentElement.parentElement.dataset.productId) {
    itemId = e.target.parentElement.parentElement.dataset.productId
  } else if (e.target.parentElement.dataset.productId) {
    itemId = e.target.parentElement.dataset.productId
  } else {
    itemId = e.target.dataset.productId
  }
  currentItem = data.filter(product => product.id === itemId)
  currentProduct = currentItem[0];
  return currentItem[0]
}

function openModal(e) {
  document.querySelector(".modal").classList.toggle("hide");
}

function closeModal() {
  document.querySelector(".modal").classList.toggle("hide");
}

function showModalContent(itemToShow = {}) {

  const itemSizes = [];
  const closeModalEl = document.createElement("div")

  closeModalEl.classList.add("close-modal")
  closeModalEl.innerHTML = "&#x2715"
  closeModalEl.onclick = closeModal

  itemToShow.availableOptions.map(option => {
    option.prices.map(price => {
      if (!itemSizes.includes(price.size)) {
        return itemSizes.push(price.size)
      }
    })
  })


  document.querySelector(".modal-product-about").innerHTML = ""
  document.querySelector(".modal-product-about").append(closeModalEl)

  let content = `
            <div class="modal-image-main">
                <div><img src="${exeptions.includes(itemToShow.availableOptions[0].optionImages[0]) ? noPhoto : itemToShow.availableOptions[0].optionImages[0] }" alt="${itemToShow.productName}"></div>
            </div>
            <div class="modal-product-description">
                <div class="modal-product-tiitle">
                    <div class="modal-product-name">
                        ${itemToShow.productName} 
                    </div>
                    <div class="modal-product-stars">
                        <img src="/img/market/stars.png" alt="img">
                        <span> ${Math.abs(getRandomInt(30, 255))} REVIEWS</span> 
                    </div>
                </div>
                <div class="modal-product-data">
                    <div class="modal-product-price">
                        As low as<br>
                        <span>${itemToShow.availableOptions[0].prices[0].price} UAH</span>
                    </div>
                    <div class="modal-product-colors">
                        <div>COLOR:</div>
                        <div class="color-wrapper">
                            ${itemToShow.availableOptions.map((el) => {
    return `<div class="modal-color" data-id="${el.option_id}" style ="background-color:#${el.optionColorCode}"></div>`
  }).join('')
    }
                        </div>
                    </div>
                    <div class="modal-product-sizes">
                        <span>SIZE:</span>
                        <div class="size-wrapper">
                            
                        </div>
                    </div>
                </div>
                <div class="modal-product-buttons">
                    <button class="add-to-bag">
                        <img src="/img/market/bags.svg" alt="bags">
                        <div>ADD TO BAG</div>
                    </button>
                    <button class="add-to-wishlist">
                        <img src="/img/market/heart.png" alt="bags">
                        <div>ADD TO WISHLIST</div>
                    </button>
                </div>
                <div class="modal-product-social">
                    <img src="/img/market/facebook 1.png" alt="face">
                    <img src="/img/market/twitter 1.png" alt="twitt">
                    <img src="/img/market/pinterest 1.png" alt="pint">
                    <img src="/img/market/link 1.png" alt="link">
                </div>
            </div>
            <div class="modal-image-secondary">
                <div><img src="${itemToShow.availableOptions[0].optionImages[1]}" alt="img"></div>
                <div><img src="${itemToShow.availableOptions[0].optionImages[2]}" alt="img"></div>
            </div>
            <div class="modal-shipping">
                <div><img src="/img/SVG/shopping.svg" alt=""></div>
            </div>
    `

  document.querySelector(".modal-product-about").insertAdjacentHTML("beforeend", content)

}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + min) - min)
}

/********************ADD TO BAG***************************/

// Обєкт, який буде додано на сервер
const productToServer = {
  product_id: "",
  option_id: "",
  price_id: "",
  quantity: 1,
}

// додати в корзину товар з модального вікна, кнопка ADD TO BAG
document.querySelector(".modal").addEventListener('click', (e) => {
  addToBag(e)
})

async function addToBag(e) {
  if (e.target.classList.contains("add-to-bag") || e.target.closest(".add-to-bag")) {
    productToServer.product_id = currentProduct.id
    if (productToServer.product_id !== "" && productToServer.option_id !== "" && productToServer.price_id !== "") {
      await postData(urlAdd, "POST", productToServer)
      clearObject(productToServer)
      closeModal()
      await FETCH(urlAdd, cartQuantity);
    } else {
      alert("Оберіть, будь ласка, колір та розмір!")
    }
  }
}

// очитска обєкта
function clearObject(obj) {
  obj.product_id = ""
  obj.option_id = ""
  obj.price_id = ""
}

// Вибір кольору

document.querySelector('.modal').addEventListener('click', (e) => {
  if (e.target.classList.contains("modal-color")) {

    const [...elColor] = document.querySelectorAll('.color-wrapper > div');
    let curOption;
    let priceIdToinsert = "";
    elColor.forEach((el) => {
      el.classList.add('filter');
    })
    e.target.classList.remove('filter')

    productToServer.option_id = e.target.dataset.id
    curOption = currentProduct.availableOptions.filter(option => option.option_id === e.target.dataset.id)[0]
    priceIdToinsert = curOption.prices.sort((a, b) => a.size > b.size ? 1 : -1)
      .map((el) => {
        return `<div class = "modal-size" data-id = "${el.price_id}">${el.size}</div>`
      }).join('')
    document.querySelector('.size-wrapper')
      .innerHTML = ''
    document.querySelector('.size-wrapper')
      .insertAdjacentHTML('beforeend', priceIdToinsert)
  }
})

// Вибір розміру

document.querySelector('.modal').addEventListener('click', (e) => {
  if (e.target.classList.contains("modal-size")) {
    const [...elSize] = document.querySelectorAll('.size-wrapper > div');
    let curSize = [];
    let sizes;
    elSize.forEach((el) => {
      el.classList.add('filter');
    })
    e.target.classList.remove('filter')

    productToServer.price_id = e.target.dataset.id
  }
})
import { FETCH } from "./request.js";
import { url, urlAdd } from "./index.js";
import { creatProductElement } from "./creatCards.js";
import { searchCetalogPage } from "./search.js"
import { filterColor, filterSize, sizeFilter, colorFilter } from "./filter-product.js";
import { changePage, createPaggination } from "./paggination.js";



const inputSearch = document.querySelector("[name='search-line']");
export let productList = [];
const pagginationButtons = document.querySelectorAll('.pag-digit')
let pagBtn = [];
let cartItemsQuantity = 0;
const datalist = document.querySelector("#product-name");
const searchInput = document.getElementById("search-field");

function getProduct(data) {

    showFilerColorSize(getColorsSizeProducts(data));

    productList = data;
    pagBtn = createPaggination(productList);

    pagBtn.forEach(button => {
        button.addEventListener('click', e => {
            changePage(e.target, productList)
        })
    })

    productList.slice(0, 10).forEach(element => {
        document.querySelector('.products-to-show')
            .append(creatProductElement(element))
    });

    //Фільтрація за розміром
    sizeFilter.addEventListener("click", e => {
        if (e.target.classList.contains("parameter-selected")) {
            document.location.reload();
        }

        productList = filterSize(e.target, data)
        pagBtn = createPaggination(productList);

        pagBtn.forEach(button => {
            button.addEventListener('click', e => {
                changePage(e.target, productList)
            })
        })
        productList.slice(0, 10).forEach(element => {
            document.querySelector('.products-to-show')
                .append(creatProductElement(element))
        });
    })

    //Фільтрація за кольором
    colorFilter.addEventListener("click", e => {
        if (e.target.classList.contains("parameter-selected")) {
            document.location.reload();
        }

        productList = filterColor(e.target, data)
        pagBtn = createPaggination(productList);

        pagBtn.forEach(button => {
            button.addEventListener('click', e => {
                changePage(e.target, productList)
            })
        })
        productList.slice(0, 10).forEach(element => {
            document.querySelector('.products-to-show')
                .append(creatProductElement(element))
        });
    })
}

// Пошук у полі search
inputSearch.addEventListener("input", (e) => {
    searchCetalogPage(e.target.value, productList)
})

// Пошук у нав меню
searchInput.addEventListener("input", (e) => {
    searchCetalogPage(e.target.value, productList)
})

FETCH(url, getProduct);

/********************************************************************/

const getColorsSizeProducts = (products = []) => {
    if (!Array.isArray(products)) return;
    const mainColorArr = [];
    const mainSizeArr = [];


    products.forEach((object) => {
        object.availableOptions.forEach((colors) => {
            if (!mainColorArr.includes(colors.optionColorCode)) {
                mainColorArr.push(colors.optionColorCode)
            }
        })
    })

    products.forEach((object) => {
        object.availableOptions.forEach((option) => {
            option.prices.forEach((sizeEl) => {
                if (!mainSizeArr.includes(sizeEl.size)) {
                    mainSizeArr.push(sizeEl.size)
                }
            })
        })
    })
    return { color: mainColorArr, size: mainSizeArr }
}

function showFilerColorSize(option) {
    const elColor = document.querySelector(".filter-parameters-color");
    const elSize = document.querySelector(".filter-parameters-size");

    option.color.forEach((color) => {
        const div = document.createElement("div");
        div.classList.add("color-parameter");
        div.style.backgroundColor = `#${color}`
        elColor.append(div)
    });

    option.size.forEach((size) => {
        const div = document.createElement("div");
        div.classList.add("size-parameter");
        div.innerText = size;
        elSize.append(div)
    })
}

// отримання кількості товарів у корзині
FETCH(urlAdd, cartQuantity);

export function cartQuantity(data) {
    cartItemsQuantity = data.length
    document.querySelector('.basket-counter').innerText = cartItemsQuantity
}


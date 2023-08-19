import { creatProductElement } from "./creatCards.js";

export const sizeFilter = document.querySelector(".filter-parameters-size")
export const colorFilter = document.querySelector(".filter-parameters-color")
let filteredItems = [];

function rgb(r, g, b) {
    let translatedR = r.toString(16).padStart(2, '0');
    let translatedG = g.toString(16).padStart(2, '0');
    let translatedB = b.toString(16).padStart(2, '0');
    let hexTranslation = translatedR + translatedG + translatedB;
    return hexTranslation.toUpperCase()
}


export function filterSize(target, data){
    if (!target.classList.contains("size-parameter")) return

    document.querySelectorAll(".color-parameter").forEach(el => {
        el.classList.remove("parameter-selected")
    })

    if (target.classList.contains("parameter-selected")) {
        document.querySelector('.products-to-show').innerHTML = ""

        filteredItems = data

        filteredItems.forEach(element => {
            document.querySelector('.products-to-show')
                .append(creatProductElement(element))
        });
        target.classList.remove("parameter-selected")
    } else {
        filteredItems = []

        document.querySelectorAll(".size-parameter").forEach(el => {
            el.classList.remove("parameter-selected")
        })
        target.classList.toggle("parameter-selected")

        document.querySelector('.products-to-show').innerHTML = ""

        data.map(product => {
            product.availableOptions.map(option => {
                option.prices.map(size => {
                    if (size.size === target.textContent) {
                        if (!filteredItems.includes(product)) {
                            return filteredItems.push(product)
                        }
                    }
                })
            })
        })

        return filteredItems
    }
}

export function filterColor (target, data){
    if (!target.classList.contains("color-parameter")) return

    document.querySelectorAll(".size-parameter").forEach(el => {
        el.classList.remove("parameter-selected")
    })

    if (target.classList.contains("parameter-selected")) {
        document.querySelector('.products-to-show').innerHTML = ""

        filteredItems = data

        filteredItems.forEach(element => {
            document.querySelector('.products-to-show')
                .append(creatProductElement(element))
        });
        target.classList.remove("parameter-selected")
    } else {
        filteredItems = []
        let selectedColor = rgb(+target.style.backgroundColor.slice(4, -1).split(',')[0],
            +target.style.backgroundColor.slice(4, -1).split(',')[1].trim(),
            +target.style.backgroundColor.slice(4, -1).split(',')[2].trim()
        )

        document.querySelectorAll(".color-parameter").forEach(el => {
            el.classList.remove("parameter-selected")
        })
        target.classList.toggle("parameter-selected")

        document.querySelector('.products-to-show').innerHTML = ""

        data.map(product => {
            product.availableOptions.map(option => {
                if (option.optionColorCode === selectedColor) {
                    if (!filteredItems.includes(product)) {
                        return filteredItems.push(product)
                    }
                }
            })
        })

        return filteredItems
    }
}
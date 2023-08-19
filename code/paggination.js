import { creatProductElement } from "./creatCards.js";


export function createPaggination(data) {
    
    let itemsOnPage = 10;
    let countOfPages = Math.ceil(data.length / itemsOnPage)
    let pages = [];

    document.querySelector(".pagination").innerHTML = ''

    for (let i = 0; i < countOfPages; i++) {
        const div = document.createElement("div");
        div.classList.add("pag");
        div.innerText = i + 1;
        if(i === 0){
            div.classList.add("pagination-selected");
        }
        document.querySelector(".pagination").append(div)
        pages.push(div)
    }
    return pages
}

export function changePage(target, data) {
    let itemsOnPage = 10;
    let numPage = +target.innerText
    let startItem = (numPage - 1) * itemsOnPage;
    let endItem = startItem + itemsOnPage;

    document.querySelector('.products-to-show').innerHTML = ''

    if (!target.classList.contains('pag')) return
    document.querySelectorAll(".pag").forEach(el => {
        if (el.classList.contains('pagination-selected')) {
            el.classList.remove('pagination-selected')
        }
    })
    target.classList.add('pagination-selected')

    data.slice(startItem, endItem)
        .forEach(element => {
            document.querySelector('.products-to-show')
                .append(creatProductElement(element))
        });
}


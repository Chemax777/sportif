export const searchCetalogPage = (value, products = []) => {
 const l = products.length;
 const arr =  products.filter((product)=>{
     return product.productName.toLowerCase().includes(value.toLowerCase())
 })
 .map((product)=>{
     return {
         productImg : product.availableOptions[0].optionImages[0],
         productName : product.productName,
         productId : product.id
     }
 })
 showProductSearchList(arr, l)
}

function showProductSearchList (products = [], l) {
    const ul = document.querySelector(".product-list");
    ul.innerHTML = "";

    if(products.length >= l){
        ul.innerHTML = "";
        return
    }

    products.forEach(({ productImg, productName, productId })=> {
        const li = document.createElement("li");
        const img = document.createElement("img");
        const p = document.createElement("p");
        
        li.classList.add('product-list__item')
        li.dataset.productId = productId;
        img.classList.add('item-img')
        img.src = productImg;
        img.alt = productName;
        img.dataset.productId = productId;
        p.classList.add('item-text')
        p.innerText = productName;
        p.dataset.productId = productId;

        li.append(img, p);
        ul.append(li);
    })
    // ul > li - product img + product name
}


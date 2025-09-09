let bagItems=[];

document.addEventListener('pageshow', onLoad);

onLoad();
function onLoad(){
    let bagItemsStr = localStorage.getItem('bagItems');
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
    dressItemsLoad();
    displayBagItemCount();
    
}

function addToBag(itemId){
bagItems.push(itemId);
localStorage.setItem('bagItems', JSON.stringify(bagItems));
displayBagItemCount();
}
function displayBagItemCount(){
    let bagItemsStr = localStorage.getItem('bagItems');
    let bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
    let bagItemsCount=document.querySelector(".bag_item_count");
    if (!bagItemsCount) return;
    if (bagItems.length>0) {
        bagItemsCount.style.visibility="visible";
        bagItemsCount.innerText=bagItems.length;
    } else {
        bagItemsCount.style.visibility="hidden";
    }
}

function dressItemsLoad(){
    let itemsContainerElement = document.querySelector('.items-container');
    if (!itemsContainerElement) {
        return;
      }
let dressInnerHTML=" ";
dressItems.forEach(item=>{
    dressInnerHTML+= `<div class="item-info">
            <img class="dress_img" src="./images/Dresses/${item.dress_img}" alt="img">
            <div class="rating">${item.rating.star_rating}★ ${item.rating.review_count}</div>
            <div class="dress-brand">${item.dress_brand}</div>
            <div class="dress-drescription">${item.dress_description}</div>
            <div class="price">
                <span class="current-price">Rs.${item.current_price}</span>
                <span class="strike-price">Rs.${item.strike_price}</span>
                <span class="discount">(${item.discount} OFF)</span>
            </div>
            <button class="add-to-bag" onclick=addToBag(${item.id})><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-handbag-fill" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2M5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0z"/>
              </svg>Add To Bag</button>
        </div>`
})
itemsContainerElement.innerHTML =dressInnerHTML;
}

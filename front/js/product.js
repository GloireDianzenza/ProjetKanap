const link = "http://localhost:3000/api/products";
const searchParam = new URL(window.location).searchParams;
if(searchParam.get("id")==null)window.location = "./index.html";

const id = searchParam.get("id");

fetch(link+"/"+id).then(response=>response.json()).then(data=>{
   let product = data;
   console.log(product);
   let productImg = document.createElement("img");
   productImg.alt = product.altTxt;
   productImg.src = product.imageUrl;

   title.innerText = product.name;
   price.innerText = product.price;
   description.innerText = product.description;

   for(let color of product.colors){
        let optDiv = document.createElement("option");
        optDiv.value = color;
        optDiv.innerText = color;
        colors.appendChild(optDiv);
   }

   document.querySelector(".item__img").appendChild(productImg);
}).catch(error=>{
    console.error("error",error);
});

addToCart.addEventListener("click",()=>{
    let newID=id,newQuantity=quantity.value,newColor=document.getElementById("colors").value;
    let newItem = {id:newID,quantity:parseInt(newQuantity),color:newColor};
    if(localStorage.getItem("array") === null)
    {
        localStorage.setItem("array",JSON.stringify([]));
        let currentArray = JSON.parse(localStorage.getItem("array"));
        currentArray.push(newItem);
        localStorage.setItem("array",JSON.stringify(currentArray));
    }
    else{
        if(contains(id,parseInt(newQuantity),newColor)){
            let currentArray = JSON.parse(localStorage.getItem("array"));
            let index = find(id,parseInt(newQuantity),newColor);
            let item = currentArray[index];
            let lastQuantity = item.quantity;
            newQuantity = parseInt(newQuantity);
            item.quantity = parseInt(item.quantity) + newQuantity;
            currentArray[index] = item;
            localStorage.setItem("array",JSON.stringify(currentArray));
        }
        else{
            let currentArray = JSON.parse(localStorage.getItem("array"));
            currentArray.push(newItem);
            localStorage.setItem("array",JSON.stringify(currentArray));
        }
    }

    window.location = "./cart.html";
});

/**
 * 
 * @param {string} id 
 * @param {number} quantity 
 * @param {string} color 
 * @returns {boolean}
 */
function contains(id,quantity,color){
    if(localStorage.getItem("array") === null)return false;
    for(let item of JSON.parse(localStorage.getItem("array"))){
        if(item.id === id && item.color === color){
            return true;
        }
    }
    return false;
}

/**
 * 
 * @param {string} id 
 * @param {number} quantity 
 * @param {string} color 
 * @returns {number|null}
 */
function find(id,quantity,color){
    if(!contains(id,quantity,color))return null;
    let currentArray = JSON.parse(localStorage.getItem("array"));
    let item = currentArray.filter((test)=>test.id === id && test.color === color)[0];
    return currentArray.indexOf(item);
}
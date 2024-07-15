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
    let newID="",newQuantity=0,newColor="";
    let newItem = {newID,newQuantity,newColor};
    if(localStorage.getItem("array") === null)
    {
        localStorage.setItem("array",JSON.stringify([]));
        let currentArray = JSON.parse(localStorage.getItem("array"));
        console.log(currentArray);
    }
    else{
        
    }
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
        if(item == {id,quantity,color}){
            return true;
        }
    }
    return false;
}
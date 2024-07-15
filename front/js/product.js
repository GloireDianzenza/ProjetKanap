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
   document.querySelector(".item__img").appendChild(productImg);
}).catch(error=>{
    console.error("error",error);
});
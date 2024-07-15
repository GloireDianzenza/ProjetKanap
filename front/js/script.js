const link = "http://localhost:3000/api/products";

fetch(link).then(response=>response.json()).then(data=>{
    let couches = data;
    for(let couch of couches){
        console.log(couch);
        let itemDiv = document.createElement("a");
        itemDiv.href = "./product.html?id="+couch._id;
        let articleDiv = document.createElement("article");

        let imgDiv = document.createElement("img");
        imgDiv.alt = couch.name;
        imgDiv.src = couch.imageUrl;

        let productName = document.createElement("h3");
        productName.innerText = couch.name;
        productName.classList.add("productName");
        
        let productDesc = document.createElement("p");
        productDesc.innerText = couch.description;
        productDesc.classList.add("productDescription");

        articleDiv.appendChild(imgDiv);
        articleDiv.appendChild(productName);
        articleDiv.appendChild(productDesc);

        itemDiv.appendChild(articleDiv);
        items.appendChild(itemDiv);
    }
}).catch(error=>{
    console.log("error",error);
    items.innerHTML = "";
})
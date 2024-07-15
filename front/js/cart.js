const link = "http://localhost:3000/api/products";
let cartItems = JSON.parse(localStorage.getItem("array"));
let items;
let correc = JSON.parse(localStorage.getItem("array")).filter((item)=>item.color.trim() !== "")
localStorage.setItem("array",JSON.stringify(correc));

fetch(link).then(response=>response.json()).then(data=>{
    items = data;
    console.log(items);
    let usedItems = [];

    function updatePrice(){
        let total = 0;
        let currentArray = JSON.parse(localStorage.getItem("array"));
        for(let item of currentArray){
            let quantity = item.quantity;
            let price = findObjectByID(item.id).price;
            quantity = parseInt(quantity)
            price = parseFloat(price);
            total += (quantity * price);
        }
        totalQuantity.innerHTML = currentArray.length;
        totalPrice.innerHTML = total;
    }

    for(let item of items){
        if(containsID(item._id)){
            usedItems.push(item);
        }
    }

    let currentArray = JSON.parse(localStorage.getItem("array"));

    for(let item of currentArray){
        let articleDiv = document.createElement("article");
        articleDiv.classList.add("cart__item");
        articleDiv.setAttribute("data-id",item.id);
        articleDiv.setAttribute("data-color",item.color);
        let completeItem = findObjectByID(item.id);

        articleDiv.innerHTML = `
            <div class="cart__item__img">
                  <img src="${completeItem.imageUrl}" alt="${completeItem.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${completeItem.name}</h2>
                    <p>${item.color}</p>
                    <p>${completeItem.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
        `;

        document.getElementById("cart__items").appendChild(articleDiv);
    }

    for(let input of document.querySelectorAll(".itemQuantity")){
        input.addEventListener("change",()=>{
            let currentArticle = input.closest("article");
            let id = currentArticle.getAttribute("data-id");
            let color = currentArticle.getAttribute("data-color");

            currentArray = JSON.parse(localStorage.getItem("array"));
            let index = 0;
            for(let item of currentArray){
                if(item.id == id && item.color == color){
                    currentArray[index].quantity = parseInt(input.value);
                }
                index++;
            }
            localStorage.setItem("array",JSON.stringify(currentArray));

            updatePrice();
        })
    }

    for(let button of document.querySelectorAll(".deleteItem")){
        button.addEventListener("click",()=>{
            let currentArticle = button.closest("article");
            let id = currentArticle.getAttribute("data-id");
            let color = currentArticle.getAttribute("data-color");
            currentArticle.remove();

            let index = 0;
            currentArray = JSON.parse(localStorage.getItem("array"));
            for(let item of currentArray){
                if(item.id == id && item.color == color){
                    currentArray.splice(index,1);
                    break;
                }
                index++;
            }
            localStorage.setItem("array",JSON.stringify(currentArray));

            updatePrice();
        })
    }

    updatePrice();

}).catch(error=>{
    console.log("error",error);
    document.getElementById("cart__items").innerHTML = "";
})

/**
 * 
 * @param {string} id
 * @returns {boolean} 
 */
function containsID(id){
    for(let item of JSON.parse(localStorage.getItem("array"))){
        if(item.id === id){
            return true;
        }
    }
    return false;
}

/**
 * 
 * @param {string} id 
 * @returns {Object|null}
 */
function findObjectByID(id){
    if(!containsID(id))return null;
    for(let item of items){
        if(item._id === id){
            return item;
        }
    }
    return null;
}

/**
 * 
 * @param {string} id 
 * @returns {number|null}
 */
function findIndexByID(id){
    if(!containsID(id))return -1;
    for(let item of items){
        if(item._id === id){
            return items.indexOf(item);
        }
    }
    return -1;
}

/**
 * @param {PointerEvent} event
 */
order.addEventListener("click",(event)=>{
    event.preventDefault();
    let formData = new FormData(document.querySelector(".cart__order__form"),order);
    if(firstName.value.trim()===""){
        firstNameErrorMsg.innerHTML = "Veuillez entrer un prénom";
    }else{
        firstNameErrorMsg.innerHTML = "";
    }
    if(lastName.value.trim()===""){
        lastNameErrorMsg.innerHTML = "Veuillez entrer un nom de famille";
    }else{
        lastNameErrorMsg.innerHTML = "";
    }
    if(address.value.trim()===""){
        addressErrorMsg.innerHTML = "Veuillez entrer une adresse";
    }else{
        addressErrorMsg.innerHTML = "";
    }
    if(city.value.trim()===""){
        cityErrorMsg.innerHTML = "Veuillez entrer une ville";
    }else{
        cityErrorMsg.innerHTML = "";
    }
    if(email.value.trim()==="" || !validateEmail(email.value)){
        emailErrorMsg.innerHTML = "Veuillez entrer une adresse mail valide";
    }else{
        emailErrorMsg.innerHTML = "";
    }

    var contact = {};
    formData.forEach((value,key)=>{
        if(value.trim()!=="")contact[key]=value;
    })
    if(Object.keys(contact).length === 5){
        let products = [];
        let currentArray = JSON.parse(localStorage.getItem("array"));
        for(let item of currentArray){
            products.push(item.id.toString());
        }
        
        fetch(link+"/order",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                contact:contact,
                products:products
            })
        }).then(response=>response.json()).then(data=>{
            let orderID = data.orderId;
            window.location = "./confirmation.html?orderId="+orderID;
        }).catch(error=>{
            console.error("error",error);
        })
    }
})

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
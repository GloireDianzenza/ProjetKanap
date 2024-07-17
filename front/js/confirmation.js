const params = new URL(window.location).searchParams;
if(params.get("orderId") == null || params.get("orderId") == undefined)window.location="./index.html";
let order = params.get("orderId");

orderId.innerHTML = order;
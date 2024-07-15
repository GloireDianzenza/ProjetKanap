const params = new URL(window.location).searchParams;
let order = params.get("orderId");

orderId.innerHTML = order;
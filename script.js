let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price){
  cart.push({name,price});
  localStorage.setItem("cart",JSON.stringify(cart));
  alert(name + " added to cart!");
}

function loadCart(){
  let list = document.getElementById("cart-list");
  if (!list) return;
  let html = "";
  let total = 0;
  cart.forEach(item=>{
    html += `<p>${item.name} - ₱${item.price}</p>`;
    total += item.price;
  });
  list.innerHTML = html;
  document.getElementById("total").innerText = "Total: ₱" + total;
}

function clearCart(){
  cart = [];
  localStorage.setItem("cart","[]");
  loadCart();
}

window.onload = loadCart;

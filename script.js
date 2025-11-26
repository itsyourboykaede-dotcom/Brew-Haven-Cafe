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

document.addEventListener('DOMContentLoaded', () => {
    // Check if the hamburger button exists on this page
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        // Toggle the 'open' class on click
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
        
        // OPTIONAL: Close the menu when a link is clicked (good for single-page apps)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }
});
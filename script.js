let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Updated structure: [{name: "Caramel Latte", price: 150, quantity: 2}]

function addToCart(name, price){
  // Check if item already exists in the cart
  let existingItem = cart.find(item => item.name === name);

  if(existingItem) {
    existingItem.quantity += 1; // Increment quantity
  } else {
    // Add new item with quantity 1
    cart.push({name, price, quantity: 1}); 
  }
  
  localStorage.setItem("cart",JSON.stringify(cart));
  
  // The alert() function has been removed from here.
}

// NOTE: loadCart and clearCart logic is now implemented in cart.html 
// and checkout.html to handle the new cart structure.

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
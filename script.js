let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Updated structure: [{name: "Caramel Latte", price: 150, quantity: 2}]

// Function to display the custom toast notification
function showToast(message) {
    const toast = document.getElementById("toast-notification");
    // Check if the toast element exists on the page before trying to use it
    if (!toast) return;

    toast.textContent = message; // Set the message text
    
    // Remove hidden class and add visible class to start animation
    toast.classList.remove('toast-hidden');
    toast.classList.add('toast-visible');

    // Hide the toast after 3 seconds
    setTimeout(function(){ 
        toast.classList.remove('toast-visible');
        toast.classList.add('toast-hidden');
    }, 3000);
}


function addToCart(name, price){
  // Check if item already exists in the cart
  let existingItem = cart.find(item => item.name === name);
  let message = ""; // Variable to hold the message for the toast

  if(existingItem) {
    existingItem.quantity += 1; // Increment quantity
    message = name + " quantity updated to " + existingItem.quantity + ".";
  } else {
    // Add new item with quantity 1
    cart.push({name, price, quantity: 1}); 
    message = name + " added to cart!";
  }
  
  localStorage.setItem("cart",JSON.stringify(cart));
  
  // 🟢 Call the custom toast notification instead of alert()
  showToast(message);
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
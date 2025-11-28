let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Global variables for the modal
const modal = document.getElementById('productModal');
const quantityInput = document.getElementById('modalQuantity');
let currentProduct = null; // Stores the product being viewed

// Function to display the custom toast notification
function showToast(message) {
    const toast = document.getElementById("toast-notification");
    if (!toast) return;

    toast.textContent = message; 
    
    toast.classList.remove('toast-hidden');
    toast.classList.add('toast-visible');

    setTimeout(function(){ 
        toast.classList.remove('toast-visible');
        toast.classList.add('toast-hidden');
    }, 3000);
}

// --------------------------------------------------------
// --- MODAL LOGIC (Restored functions) ---
// --------------------------------------------------------

// 1. Function to open the modal and populate data
function openModal(name, price, imageUrl) {
    // This sets the background image of the div element in the modal
    document.getElementById('modalImage').style.backgroundImage = 'url(\'' + imageUrl + '\')'; 

    // Set the product details in the modal
    document.getElementById('modalTitle').textContent = name;
    document.getElementById('modalPrice').textContent = '₱' + price.toFixed(2);
    
    // Reset quantity to 1
    quantityInput.value = 1;
    
    // Store the current product details
    currentProduct = { name, price };
    
    // Show the modal
    modal.style.display = 'flex'; 
}

// 2. Function to close the modal
function closeModal() {
    modal.style.display = 'none';
    currentProduct = null;
}

// 3. Quantity Increment/Decrement
function adjustQuantity(amount) {
    let currentQty = parseInt(quantityInput.value);
    let newQty = currentQty + amount;

    // Ensure quantity is never less than 1
    if (newQty >= 1) {
        quantityInput.value = newQty;
    }
}

// 4. Final Add to Cart from the modal
function addToCartFromModal() {
    if (!currentProduct) return;

    const name = currentProduct.name;
    const price = currentProduct.price;
    const quantity = parseInt(quantityInput.value);

    let existingItem = cart.find(item => item.name === name);
    let message = ""; 

    if (existingItem) {
        existingItem.quantity += quantity; 
        message = quantity + "x " + name + " added to cart! Total: " + existingItem.quantity;
    } else {
        cart.push({ name, price, quantity }); 
        message = quantity + "x " + name + " added to cart!";
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    
    showToast(message);
    closeModal(); // Close the modal after adding to cart
}

// 5. Close modal if clicking outside the content area
window.onclick = function(event) {
    if (modal && event.target == modal) { 
        closeModal();
    }
}

// --------------------------------------------------------
// --- ORIGINAL UTILITY/NAVIGATION LOGIC ---
// --------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // Check if the hamburger button exists on this page
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        // Toggle the 'open' class on click
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
        
        // OPTIONAL: Close the menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }

    // Attach listener to the main button inside the modal
    const addToCartBtn = document.getElementById('modalAddToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', addToCartFromModal);
    }
});
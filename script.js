// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Initialize cart from sessionStorage or empty array
let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

// Render product list
function renderProducts() {
  productList.innerHTML = '';
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Add event listeners to all "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = parseInt(e.target.getAttribute('data-id'));
      addToCart(productId);
    });
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = '';
  
  if (cart.length === 0) {
    return; // Leave the cart list completely empty
  }
  
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Check if product is already in cart
  const existingItem = cart.find(item => item.id === productId);
  if (!existingItem) {
    cart.push({...product});
    updateSessionStorage();
    renderCart();
  }
}

// Update session storage
function updateSessionStorage() {
  sessionStorage.setItem('cart', JSON.stringify(cart));
}

// Clear cart
function clearCart() {
  cart = [];
  sessionStorage.removeItem('cart');
  
  // Debug log after clearing
  console.log('After clearing - sessionStorage:', sessionStorage.getItem('cart'));
  console.log('Current cart state:', cart);
  
  renderCart();
}
// Event listeners
clearCartBtn.addEventListener('click', clearCart);

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderCart();
});
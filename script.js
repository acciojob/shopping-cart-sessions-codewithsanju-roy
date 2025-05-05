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

// Initialize cart from sessionStorage
let cart = loadCartFromStorage();

function loadCartFromStorage() {
  try {
    const cartData = sessionStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  } catch (e) {
    console.error('Failed to load cart from storage:', e);
    return [];
  }
}

function saveCartToStorage() {
  sessionStorage.setItem('cart', JSON.stringify(cart));
}

// Render product list
function renderProducts() {
  productList.innerHTML = '';
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = parseInt(e.target.getAttribute('data-id'));
      addToCart(productId);
    });
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Create new item with only necessary properties
  const cartItem = {
    id: product.id,
    name: product.name,
    price: product.price
  };

  // Check if product is already in cart
  if (!cart.some(item => item.id === productId)) {
    cart.push(cartItem);
    saveCartToStorage(); // Explicitly save after modification
    renderCart();
  }
}

// Clear cart
function clearCart() {
  cart = [];
  sessionStorage.removeItem('cart');
  renderCart();
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderCart();
});
console.log('Initial sessionStorage:', sessionStorage.getItem('cart'));
console.log('Initial cart state:', cart);
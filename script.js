
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];


const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");


let cart = JSON.parse(sessionStorage.getItem('cart')) || [];


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


function renderCart() {
  cartList.innerHTML = '';
  
  if (cart.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Your cart is empty";
    cartList.appendChild(li);
    return;
  }

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}


function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;


  const existingItem = cart.find(item => item.id === productId);
  if (!existingItem) {
    cart.push({...product});
    sessionStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
}


function clearCart() {
  cart = [];
  sessionStorage.removeItem('cart');
  renderCart();
}


clearCartBtn.addEventListener('click', clearCart);


renderProducts();
renderCart();
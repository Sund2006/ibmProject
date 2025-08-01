const addButtons = document.querySelectorAll('.add-btn');
const cartList = document.getElementById('cart-list');
const totalPrice = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');
const successMessage = document.getElementById('success-message');
const addressInput = document.getElementById('address');

let cart = [];
let total = 0;

// Add to Cart
addButtons.forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = parseInt(button.dataset.price);

    cart.push({ name, price });
    total += price;
    updateCart();
  });
});

// Update Cart
function updateCart() {
  cartList.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', () => {
      total -= item.price;
      cart.splice(index, 1);
      updateCart();
    });

    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });

  totalPrice.textContent = total;
}

// Checkout
checkoutBtn.addEventListener('click', () => {
  const address = addressInput.value.trim();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  if (address === "") {
    alert("Please enter a delivery address!");
    return;
  }

  successMessage.style.display = "block";
  successMessage.textContent = `✅ Food Delivered Successfully to ${address}`;
  
  cart = [];
  total = 0;
  addressInput.value = "";
  updateCart();

  setTimeout(() => {
    successMessage.style.display = "none";
  }, 10000);
});

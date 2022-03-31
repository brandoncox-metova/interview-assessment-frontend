const url = 'https://e7019d64-078b-4dfc-a340-910f5a467c4b.mock.pstmn.io';
const userId = Math.random() * 5000;

const myCart = {
  bread: 0,
  milk: 0,
  eggs: 0
};

function placeOrder() {
  const total = myCart.bread + myCart.milk + myCart.eggs;
  if (total === 0) {
    alert('You cannot submit an empty cart.');
    return;
  }

  saveCart();

  fetch(`${url}/checkout`, {
    body: JSON.stringify({ userId }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });

  const banner = document.getElementById('checkout-complete');
  banner.classList -= 'hidden';
}

function saveCart() {
  fetch(`${url}/cart`, {
    body: JSON.stringify({ userId, cart: myCart }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
}

function addToCart(id) {
  myCart[id] += 1;

  renderCart();
}

function renderCart() {
  const cartBody = document.getElementById('cart-body');
  cartBody.innerHTML = "";

  renderRow(cartBody, 'bread');
  renderRow(cartBody, 'milk');
  renderRow(cartBody, 'eggs');
}

function renderRow(cartBody, id) {
  const name = document.querySelector(`#${id} td:first-of-type`).innerText;

  const newRow = document.createElement('tr');
  const nameCell = document.createElement('td');
  nameCell.innerText = name;
  const quantityCell = document.createElement('td');
  quantityCell.innerText = myCart[id];
  newRow.appendChild(nameCell);
  newRow.append(quantityCell);

  cartBody.appendChild(newRow);
}


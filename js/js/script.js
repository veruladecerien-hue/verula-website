// 1. Phone menu button
const menu = document.getElementById('menu');
document.getElementById('menu-btn').onclick = () => menu.classList.toggle('open');
menu.onclick = () => menu.classList.remove('open');

// 2. Order form
const PRICE = 6;
const PHONE = '+639944720396';

const form = document.getElementById('order-form');
const quantity = document.getElementById('quantity');
const method = document.getElementById('method');
const roomLabel = document.getElementById('room-label');
const date = document.getElementById('date');

// Can't pick a date in the past
date.min = new Date().toISOString().slice(0, 10);

// Show the total
function updateTotal() {
    document.getElementById('total').textContent = '₱' + quantity.value * PRICE;
}
quantity.oninput = updateTotal;

// Show the room box only for delivery
method.onchange = () => {
    roomLabel.hidden = method.value !== 'Classroom delivery';
};

// Send the order as a text message
form.onsubmit = (e) => {
    e.preventDefault();

    const room = document.getElementById('room').value;
    if (method.value === 'Classroom delivery' && room.trim() === '') {
        alert('Please enter your grade, section and room.');
        return;
    }

    let message =
        'Hello YemaKal! I would like to order.\n' +
        'Name: ' + document.getElementById('name').value + '\n' +
        'Quantity: ' + quantity.value + ' pcs\n' +
        'Total: ₱' + quantity.value * PRICE + '\n' +
        'Date: ' + date.value + '\n' +
        'Method: ' + method.value;

    if (method.value === 'Classroom delivery') {
        message += '\nRoom: ' + room;
    }

    window.location.href = 'sms:' + PHONE + '?&body=' + encodeURIComponent(message);
};
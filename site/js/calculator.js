document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calc-form');
  const resultElem = document.getElementById('calc-result');

  const prices = {
    roll: 420,
    daynight: 650,
    horizontal: 300,
  };

  // Функция округления вверх до ближайшего 0.1
  function roundUpToTenth(num) {
    return Math.ceil(num * 10) / 10;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Заменяем запятую на точку и парсим
    let width = parseFloat(form.width.value.replace(',', '.'));
    let height = parseFloat(form.height.value.replace(',', '.'));
    let type = form.type.value;

    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      resultElem.textContent = 'Пожалуйста, введите корректные размеры.';
      resultElem.style.color = 'red';
      return;
    }

    let area = width * height;
    area = roundUpToTenth(area); // округляем вверх до 0.1

    let cost = area * prices[type];
    cost += 50; // добавляем 50 рублей к итоговой цене

    resultElem.textContent = `Стоимость заказа: ${cost.toFixed(2)} ₽`;
    resultElem.style.color = '#0078d4';
  });
});


const TELEGRAM_TOKEN = '8423424266:AAG3BkRALsEV3deuygXDrqseBzhoVT3JMAE';
const CHAT_ID = '830471832';

const form = document.getElementById('calc-form');
const fabricOptions = document.getElementById('fabric-options');
const typeSelect = document.getElementById('type');
const result = document.getElementById('calc-result');
const orderBtn = document.getElementById('order-btn');
const orderForm = document.getElementById('order-form');
const overlay = document.getElementById('overlay');
const cancelOrderBtn = document.getElementById('cancel-order');
const orderMessage = document.getElementById('order-message');

const fabricData = {
  roll: [
    { id: 'r1', name: 'Белая', price: 420, img: 'img/fabrics' },
    { id: 'r2', name: 'Серая', price: 480, img: 'img/2.jpg' }
  ],
  daynight: [
    { id: 'd1', name: 'Светлая', price: 450, img: 'img/day-light.jpg' },
    { id: 'd2', name: 'Тёмная', price: 500, img: 'img/day-dark.jpg' }
  ],
  horizontal: [
    { id: 'h1', name: 'Белые', price: 380, img: 'img/horizontal-white.jpg' },
    { id: 'h2', name: 'Серые', price: 410, img: 'img/horizontal-gray.jpg' }
  ]
};

let calcResult = {};

typeSelect.addEventListener('change', updateFabrics);

function updateFabrics() {
  const selectedType = typeSelect.value;
  fabricOptions.innerHTML = '';

  if (!fabricData[selectedType]) return;

  fabricData[selectedType].forEach(fabric => {
    const label = document.createElement('label');
    label.className = 'fabric-option';
    label.innerHTML = `
      <input type="radio" name="fabric" value="${fabric.id}" required />
      <span class="fabric-circle">
        <img src="${fabric.img}" alt="${fabric.name}" title="${fabric.name}" />
      </span>
      <span class="fabric-name">${fabric.name}</span>
    `;
    fabricOptions.appendChild(label);
  });

  fabricOptions.querySelectorAll('.fabric-option').forEach(option => {
    option.addEventListener('click', () => {
      fabricOptions.querySelectorAll('.fabric-option').forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      option.querySelector('input').checked = true;
    });
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const width = parseFloat(form.width.value.replace(',', '.'));
  const height = parseFloat(form.height.value.replace(',', '.'));
  const type = form.type.value;
  const fabricId = fabricOptions.querySelector('input[name="fabric"]:checked')?.value;

  if (isNaN(width) || isNaN(height) || !type || !fabricId) {
    result.textContent = '❌ Пожалуйста, заполните все поля.';
    orderBtn.style.display = 'none';
    return;
  }

  const fabric = fabricData[type].find(f => f.id === fabricId);
  const area = Math.ceil(width * height * 10) / 10;
  const total = Math.round(area * fabric.price);

  calcResult = {
    width,
    height,
    type,
    fabric,
    area,
    total
  };

  result.innerHTML = `
    <strong>Тип:</strong> ${typeSelect.options[typeSelect.selectedIndex].text}<br/>
    <strong>Ткань:</strong> ${fabric.name}<br/>
    <strong>Ширина:</strong> ${width} м<br/>
    <strong>Высота:</strong> ${height} м<br/>
    <strong>Итог:</strong> <span style="color:#2d6cdf">${total} ₽</span>
  `;

  orderBtn.style.display = 'inline-block';
});

orderBtn.addEventListener('click', () => {
  overlay.classList.remove('hidden');
  orderForm.classList.remove('hidden');
  orderMessage.style.display = 'none';
});

cancelOrderBtn.addEventListener('click', () => {
  overlay.classList.add('hidden');
  orderForm.classList.add('hidden');
  orderMessage.style.display = 'none';
});

orderForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const message = `
📦 Новый заказ!
👤 ФИО: ${orderForm.fullname.value}
📞 Телефон: ${orderForm.phone.value}
🏠 Адрес: ${orderForm.address.value}
📐 Размер: ${calcResult.width} x ${calcResult.height} м
🪟 Тип: ${typeSelect.options[typeSelect.selectedIndex].text}
🧵 Ткань: ${calcResult.fabric.name}
💰 Сумма: ${calcResult.total} ₽
  `;

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    orderMessage.textContent = '✅ Заказ отправлен!';
    orderMessage.style.display = 'block';
    setTimeout(() => {
      overlay.classList.add('hidden');
      orderForm.classList.add('hidden');
      form.reset();
      result.textContent = '';
      orderBtn.style.display = 'none';
      fabricOptions.innerHTML = '';
      orderMessage.style.display = 'none';
    }, 2000);
  } catch (error) {
    orderMessage.textContent = '❌ Ошибка отправки заказа.';
    orderMessage.style.display = 'block';
  }
});
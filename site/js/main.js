// Общий JS, например для формы обратной связи

document.addEventListener('DOMContentLoaded', () => {
  // Обработка формы обратной связи на странице контактов
  const form = document.getElementById('contact-form');
  const responseElem = document.getElementById('form-response');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        responseElem.textContent = 'Пожалуйста, заполните все поля.';
        responseElem.style.color = 'red';
        return;
      }

      // Здесь можно добавить реальную отправку на сервер, а пока имитация
      responseElem.textContent = 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.';
      responseElem.style.color = 'green';

      form.reset();
    });
  }
});


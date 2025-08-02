document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.toggle-fabrics');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const fabricList = button.nextElementSibling;
      fabricList.classList.toggle('hidden');
    });
  });
});

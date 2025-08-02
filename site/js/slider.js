document.addEventListener('DOMContentLoaded', () => {
  const slidesContainer = document.querySelector('.slides');
  const slides = slidesContainer ? slidesContainer.querySelectorAll('img') : [];
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentIndex = 0;

  function showSlide(index) {
    if (!slidesContainer) return;
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
  }

  if (prevBtn && nextBtn && slides.length > 0) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
      showSlide(currentIndex + 1);
    });

    // Автоматическая смена слайдов каждые 5 секунд
    setInterval(() => {
      showSlide(currentIndex + 1);
    }, 5000);
  }
});




const slider = document.getElementById('slider');
const images = slider.querySelectorAll('img');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const dotsContainer = document.getElementById('slider-dots');

let index = 0;

// Создание точек
images.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    index = i;
    updateSlider();
  });
  dotsContainer.appendChild(dot);
});

function updateDots() {
  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

function updateSlider() {
  slider.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

nextBtn.addEventListener('click', () => {
  index = (index + 1) % images.length;
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + images.length) % images.length;
  updateSlider();
});

// Автопрокрутка
let interval = setInterval(() => {
  index = (index + 1) % images.length;
  updateSlider();
}, 4000);

// Пауза при наведении
slider.parentElement.addEventListener('mouseenter', () => clearInterval(interval));
slider.parentElement.addEventListener('mouseleave', () => {
  interval = setInterval(() => {
    index = (index + 1) % images.length;
    updateSlider();
  }, 4000);
});

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('custom-modal-window');
  const closeBtn = modal.querySelector('.custom-modal-close-btn');
  const mapContainer = document.getElementById('custom-map-container');

  let map;
  let marker;

  // Координаты адресов
  const addresses = {
    "Бендеры, ул. Суворова 7": { lat: 46.830536, lng: 29.471529 },
    "Бендеры, ул. Суворова 4A": { lat: 46.831006, lng: 29.469850 },
    "Тирасполь, стройт рынок Спутник бутик 134А": { lat: 46.842481, lng: 29.636719 },
    "Рыбница, ул. Ленина ТЦ Люкс": { lat: 47.571200, lng: 29.156800 }
  };

  function initMap(lat, lng) {
    if (!map) {
      map = new google.maps.Map(mapContainer, {
        zoom: 16,
        center: { lat, lng },
      });
      marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
      });
    } else {
      map.setCenter({ lat, lng });
      marker.setPosition({ lat, lng });
    }
  }

  function openModal(address) {
    modal.classList.remove('custom-modal-hidden');
    if (addresses[address]) {
      initMap(addresses[address].lat, addresses[address].lng);
    } else {
      mapContainer.innerHTML = 'Координаты не найдены';
    }
  }

  function closeModal() {
    modal.classList.add('custom-modal-hidden');
  }

  closeBtn.addEventListener('click', closeModal);

  // Клик по адресу из списка
  const addressList = document.getElementById('custom-address-list');
  addressList.addEventListener('click', (e) => {
    if (e.target && e.target.tagName === 'LI') {
      const addr = e.target.getAttribute('data-address');
      openModal(addr);
    }
  });

  // Закрываем модалку при клике вне окна
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Закрываем по Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('custom-modal-hidden')) {
      closeModal();
    }
  });
});

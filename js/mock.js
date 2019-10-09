'use strict';

(function () {
  window.MOCK = {
    author: {
      avatar: {
        path: 'img/avatars/user0',
        extension: '.png'
      }
    },

    offer: {
      title: 'Заголовок №',
      address: '',
      price: {
        min: 100,
        max: 5000
      },
      type: ['palace', 'flat', 'house', 'bungalo'],
      rooms: {
        min: 1,
        max: 5
      },
      guests: {
        min: 1,
        max: 10
      },
      checkin: ['12:00', '13:00', '14:00'],
      checkout: ['12:00', '13:00', '14:00'],
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: 'Описание отеля №',
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    },

    location: {
      x: {
        min: 0,
        max: 1000
      },
      y: {
        min: 130,
        max: 630
      }
    }
  };
})();

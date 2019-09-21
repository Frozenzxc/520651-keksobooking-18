'use strict';

var mapWidth = document.querySelector('.map').offsetWidth;
var pins = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('button');

var MOCK = {
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
      min: 25,
      max: 1000
    },
    y: {
      min: 130,
      max: 630
    }
  }
};

function randomInt(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function randomElm(arr) {
  return Math.floor(Math.random() * arr.length);
}

function randomArr(data) {
  var count = randomInt(0, data.length - 1);
  var result = [];
  for (var i = 0; i < count; i++) {
    result[i] = data[i];
  }
  return result;
}

var generateData = function () {
  var arr = [];
  for (var i = 0; i < 8; i++) {
    arr[i] = {
      author: {
        avatar: MOCK.author.avatar.path + (i + 1) + MOCK.author.avatar.extension
      },
      offer: {
        title: MOCK.offer.title + (i + 1),
        address: '' + randomInt(MOCK.location.x.min, mapWidth) + ', ' + randomInt(MOCK.location.y.min, MOCK.location.y.max),
        price: randomInt(MOCK.offer.price.min, MOCK.offer.price.max),
        type: randomElm(MOCK.offer.type),
        rooms: randomInt(MOCK.offer.rooms.min, MOCK.offer.rooms.max),
        guests: randomInt(MOCK.offer.guests.min, MOCK.offer.guests.max),
        checkin: randomElm(MOCK.offer.checkin),
        checkout: randomElm(MOCK.offer.checkout),
        features: randomArr(MOCK.offer.features),
        description: MOCK.offer.description + (i + 1),
        photos: randomArr(MOCK.offer.photos)
      },
      location: {
        x: randomInt(MOCK.location.x.min, (mapWidth - 25)),
        y: randomInt(MOCK.location.y.min, MOCK.location.y.max)
      }
    };
  }
  return arr;
};

var templates = generateData();

function renderPin(obj) {
  var element = template.cloneNode(true);
  element.style.left = '' + (obj.location.x - 25) + 'px';
  element.style.top = '' + (obj.location.y - 70) + 'px';
  element.children[0].src = obj.author.avatar;
  element.children[0].alt = obj.offer.title;
  pins.appendChild(element);
}

for (var i = 0; i < templates.length; i++) {
  renderPin(templates[i]);
}

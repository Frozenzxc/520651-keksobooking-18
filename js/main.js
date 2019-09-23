'use strict';

var PIN_COUNT = 8;
var TYPE_TRANSLATE = ['Квартира', 'Бунгало', 'Дом', 'Дворец'];
var mapWidth = document.querySelector('.map').offsetWidth;
var pins = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('button');
var fragment = document.createDocumentFragment();
var cardTemplate = document.querySelector('#card').content.querySelector('article');
var cardFragment = document.createDocumentFragment();

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
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomArr(data) {
  var count = randomInt(1, data.length);
  var result = [];
  for (var i = 0; i < count; i++) {
    result[i] = data[i];
  }
  return result;
}

var generateData = function () {
  var arr = [];
  for (var i = 0; i < PIN_COUNT; i++) {
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
  fragment.appendChild(element);
}

function renderCard(obj) {
  var element = cardTemplate.cloneNode(true);
  var photosList = element.querySelector('.popup__photos');
  var photo = element.querySelector('.popup__photo');
  element.querySelector('.popup__title').textContent = obj.offer.title;
  element.querySelector('.popup__text--address').textContent = obj.offer.address;
  element.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';
  element.querySelector('.popup__type').textContent = TYPE_TRANSLATE[MOCK.offer.type.indexOf(obj.offer.type)];
  element.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.rooms + ' гостей';
  element.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;

  for (var i = 0; i < obj.offer.features.length; i++) {
    element.querySelector('.popup__features').children[i].textContent = obj.offer.features[i];
  }

  element.querySelector('.popup__description').textContent = obj.offer.description;

  photosList.removeChild(photosList.children[0]);
  for (var j = 0; j < obj.offer.photos.length; j++) {
    var elm = photo.cloneNode(true);
    elm.src = obj.offer.photos[j];
    photosList.appendChild(elm);
  }

  element.querySelector('.popup__avatar').src = obj.author.avatar;
  cardFragment.appendChild(element);
}

for (var i = 0; i < templates.length; i++) {
  renderPin(templates[i]);
  renderCard(templates[i]);
}

pins.appendChild(fragment);
pins.appendChild(cardFragment);

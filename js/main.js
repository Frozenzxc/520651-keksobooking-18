'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var PIN_COUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAINPIN_DIAMETER = 100;
var TYPE_TRANSLATE = ['Квартира', 'Бунгало', 'Дом', 'Дворец'];
var map = document.querySelector('.map');
var mapWidth = map.offsetWidth;
var pins = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('button');
var cardTemplate = document.querySelector('#card').content.querySelector('article');
var mainPin = document.querySelector('.map__pin--main');
var filterForm = document.querySelector('.map__filters');
var adForm = document.querySelector('.ad-form');
var addressField = document.querySelector('#address');

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
      min: 0,
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
        x: randomInt(MOCK.location.x.min, (mapWidth)),
        y: randomInt(MOCK.location.y.min, MOCK.location.y.max)
      }
    };
  }
  return arr;
};

var hotelData = generateData();

function renderPin(obj) {
  var element = template.cloneNode(true);
  element.style.left = '' + (obj.location.x + PIN_WIDTH / 2) + 'px';
  element.style.top = '' + (obj.location.y + PIN_HEIGHT) + 'px';
  element.children[0].src = obj.author.avatar;
  element.children[0].alt = obj.offer.title;
  element.tabIndex = 0;

  element.addEventListener('click', function () {
    cardCloseHandler();
    pins.appendChild(renderCard(obj));
  });

  element.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      cardCloseHandler();
      pins.appendChild(renderCard(obj));
    }
  });
  return element;
}

function renderCard(obj) {
  var element = cardTemplate.cloneNode(true);
  var photosList = element.querySelector('.popup__photos');
  var photo = element.querySelector('.popup__photo');
  var features = element.querySelector('.popup__features');
  features.innerHTML = '';

  element.querySelector('.popup__title').textContent = obj.offer.title;
  element.querySelector('.popup__text--address').textContent = obj.offer.address;
  element.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';
  element.querySelector('.popup__type').textContent = TYPE_TRANSLATE[MOCK.offer.type.indexOf(obj.offer.type)];
  element.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.rooms + ' гостей';
  element.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;

  for (var i = 0; i < obj.offer.features.length; i++) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature', 'popup__feature--' + obj.offer.features[i]);
    features.appendChild(feature);
  }

  element.querySelector('.popup__description').textContent = obj.offer.description;

  photosList.removeChild(photosList.children[0]);
  for (var j = 0; j < obj.offer.photos.length; j++) {
    var elm = photo.cloneNode(true);
    elm.src = obj.offer.photos[j];
    photosList.appendChild(elm);
  }

  element.querySelector('.popup__avatar').src = obj.author.avatar;

  var cardCloseBtn = element.querySelector('.popup__close');
  cardCloseBtn.addEventListener('click', cardCloseHandler);
  map.addEventListener('keydown', function (evt) {
    if (element && evt.keyCode === ESC_KEYCODE) {
      cardCloseHandler();
    }
  });
  return element;
}

function cardCloseHandler() {
  var elm = pins.querySelector('.map__card');
  if (elm) {
    pins.removeChild(elm);
  }
}

function activatePage() {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  activateForm(filterForm);
  activateForm(adForm);
  hotelData.forEach(function (item) {
    pins.appendChild(renderPin(item));
  });
}

function activateForm(form) {
  var selects = form.querySelectorAll('select');
  var fieldsets = form.querySelectorAll('fieldset');

  if (selects) {
    selects.forEach(function (item) {
      item.disabled = false;
    });
  }

  if (fieldsets) {
    fieldsets.forEach(function (item) {
      item.disabled = false;
    });
  }
}

addressField.value = '' + (mainPin.offsetLeft + MAINPIN_DIAMETER / 2) + ', ' + (mainPin.offsetTop + MAINPIN_DIAMETER / 2);

mainPin.addEventListener('mousedown', function () {
  activatePage();
  addressField.value = '' + (mainPin.offsetLeft + PIN_WIDTH / 2) + ', ' + (mainPin.offsetTop + PIN_HEIGHT);
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
  }
});

var room = document.querySelector('#room_number');
var guest = document.querySelector('#capacity');
var guestElements = guest.querySelectorAll('option');

var roomsValue = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

function disableOptions(evt) {
  var value = room.value;
  if (evt) {
    value = evt.target.value;
  }
  guestElements.forEach(function (item) {
    item.disabled = true;
  });
  roomsValue[value].forEach(function (item) {
    guestElements.forEach(function (itemValue) {
      if (+itemValue.value === item) {
        itemValue.disabled = false;
        itemValue.selected = true;
      }
    });
  });
}

disableOptions();

room.addEventListener('change', disableOptions);

var hotelType = document.querySelector('#type');
var hotelPrice = document.querySelector('#price');

var hotelValues = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

function onChangeHotelType() {
  hotelPrice.min = hotelValues[hotelType.value];
  hotelPrice.placeholder = hotelValues[hotelType.value];
}

onChangeHotelType();

hotelType.addEventListener('change', onChangeHotelType);

var checkinTime = document.querySelector('#timein');
var checkoutTime = document.querySelector('#timeout');

checkinTime.addEventListener('change', function () {
  checkoutTime.value = checkinTime.value;
});

checkoutTime.addEventListener('change', function () {
  checkinTime.value = checkoutTime.value;
});


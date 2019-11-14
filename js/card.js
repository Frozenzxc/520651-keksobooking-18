'use strict';

(function () {
  var HOUSING_TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var TYPES_TRANSLATE = ['Квартира', 'Бунгало', 'Дом', 'Дворец'];
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var pins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');

  function renderCard(obj) {
    var element = cardTemplate.cloneNode(true);
    var photosList = element.querySelector('.popup__photos');
    var photo = element.querySelector('.popup__photo');
    var features = element.querySelector('.popup__features');
    features.innerHTML = '';

    var title = element.querySelector('.popup__title');
    if (obj.offer.title !== undefined) {
      title.textContent = obj.offer.title;
    } else {
      title.classList.add('visually-hidden');
    }

    var address = element.querySelector('.popup__text--address');
    if (obj.offer.address !== undefined) {
      address.textContent = obj.offer.address;
    } else {
      address.classList.add('visually-hidden');
    }

    var price = element.querySelector('.popup__text--price');
    if (obj.offer.price !== undefined) {
      price.textContent = obj.offer.price + '₽/ночь';
    } else {
      price.classList.add('visually-hidden');
    }

    var type = element.querySelector('.popup__type');
    if (obj.offer.type !== undefined) {
      type.textContent = TYPES_TRANSLATE[HOUSING_TYPES.indexOf(obj.offer.type)];
    } else {
      type.classList.add('visually-hidden');
    }

    var capacity = element.querySelector('.popup__text--capacity');
    if (obj.offer.rooms === undefined || obj.offer.guests === undefined) {
      capacity.classList.add('visually-hidden');
    } else {
      capacity.textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    }

    var time = element.querySelector('.popup__text--time');
    if (obj.offer.checkin === undefined || obj.offer.checkout === undefined) {
      time.classList.add('visually-hidden');
    } else {
      time.textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    }

    if (obj.offer.features !== undefined) {
      obj.offer.features.forEach(function (it) {
        var feature = document.createElement('li');
        feature.classList.add('popup__feature', 'popup__feature--' + it);
        features.appendChild(feature);
      });
    } else {
      features.classList.add('visually-hidden');
    }

    var description = element.querySelector('.popup__description');
    if (obj.offer.description !== undefined) {
      description.textContent = obj.offer.description;
    } else {
      description.classList.add('visually-hidden');
    }

    if (obj.offer.photos !== undefined) {
      photosList.removeChild(photosList.children[0]);
      obj.offer.photos.forEach(function (it) {
        var elm = photo.cloneNode(true);
        elm.src = it;
        photosList.appendChild(elm);
      });
    } else {
      photosList.classList.add('visually-hidden');
    }

    var avatar = element.querySelector('.popup__avatar');
    if (obj.author.avatar !== undefined) {
      avatar.src = obj.author.avatar;
    } else {
      avatar.classList.add('visually-hidden');
    }
    var cardCloseBtn = element.querySelector('.popup__close');
    cardCloseBtn.addEventListener('click', window.card.close);

    function onEscPressCardClose(evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        window.card.close();
      }
      map.removeEventListener('keydown', onEscPressCardClose);
    }

    map.addEventListener('keydown', onEscPressCardClose);

    return element;
  }

  function cardClose() {
    var elm = pins.querySelector('.map__card');
    if (elm) {
      pins.removeChild(elm);
    }
  }
  window.card = {
    render: renderCard,
    close: cardClose
  };
})();

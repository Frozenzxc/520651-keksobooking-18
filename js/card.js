'use strict';

(function () {
  var housingType = ['flat', 'bungalo', 'house', 'palace'];
  var TYPE_TRANSLATE = ['Квартира', 'Бунгало', 'Дом', 'Дворец'];
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var pins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');

  function renderCard(obj) {
    var element = cardTemplate.cloneNode(true);
    var photosList = element.querySelector('.popup__photos');
    var photo = element.querySelector('.popup__photo');
    var features = element.querySelector('.popup__features');
    features.innerHTML = '';

    element.querySelector('.popup__title').textContent = obj.offer.title;
    element.querySelector('.popup__text--address').textContent = obj.offer.address;
    element.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';
    element.querySelector('.popup__type').textContent = TYPE_TRANSLATE[housingType.indexOf(obj.offer.type)];
    element.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
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
    cardCloseBtn.addEventListener('click', window.card.cardCloseHandler);
    map.addEventListener('keydown', function (evt) {
      if (element && evt.keyCode === window.util.ESC_KEYCODE) {
        window.card.cardCloseHandler();
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
  window.card = {
    renderCard: renderCard,
    cardCloseHandler: cardCloseHandler
  };
})();

'use strict';

(function () {
  var PIN_COUNT = 8;
  var map = document.querySelector('.map');
  var mapWidth = map.offsetWidth;

  var generateData = function () {
    var arr = [];
    for (var i = 0; i < PIN_COUNT; i++) {
      arr[i] = {
        author: {
          avatar: window.MOCK.author.avatar.path + (i + 1) + window.MOCK.author.avatar.extension
        },
        offer: {
          title: window.MOCK.offer.title + (i + 1),
          address: '' + window.util.getRandomInt(window.MOCK.location.x.min, mapWidth) + ', ' + window.util.getRandomInt(window.MOCK.location.y.min, window.MOCK.location.y.max),
          price: window.util.getRandomInt(window.MOCK.offer.price.min, window.MOCK.offer.price.max),
          type: window.util.getRandomElm(window.MOCK.offer.type),
          rooms: window.util.getRandomInt(window.MOCK.offer.rooms.min, window.MOCK.offer.rooms.max),
          guests: window.util.getRandomInt(window.MOCK.offer.guests.min, window.MOCK.offer.guests.max),
          checkin: window.util.getRandomElm(window.MOCK.offer.checkin),
          checkout: window.util.getRandomElm(window.MOCK.offer.checkout),
          features: window.util.getRandomArr(window.MOCK.offer.features),
          description: window.MOCK.offer.description + (i + 1),
          photos: window.util.getRandomArr(window.MOCK.offer.photos)
        },
        location: {
          x: window.util.getRandomInt(window.MOCK.location.x.min, (mapWidth)),
          y: window.util.getRandomInt(window.MOCK.location.y.min, window.MOCK.location.y.max)
        }
      };
    }
    return arr;
  };

  window.hotelData = generateData();
})();

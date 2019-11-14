'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_WIDTH = '70';
  var PHOTO_HEIGHT = '70';

  function uploadImage(fileChooser, preview) {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          if (fileChooser.id === 'avatar') {
            preview.src = reader.result;
          } else {
            var photo = document.createElement('img');
            photo.src = reader.result;
            photo.width = PHOTO_WIDTH;
            photo.height = PHOTO_HEIGHT;
            preview.appendChild(photo);
          }
        });

        reader.readAsDataURL(file);
      }
    });
  }

  var avatarFileChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');

  uploadImage(avatarFileChooser, avatarPreview);

  var photoFileChooser = document.querySelector('#images');
  var photoPreview = document.querySelector('.ad-form__photo');

  photoPreview.style.display = 'flex';

  uploadImage(photoFileChooser, photoPreview);

})();

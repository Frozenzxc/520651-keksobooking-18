'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('#images');
  var preview = document.querySelector('.ad-form__photo');

  preview.style.display = 'flex';

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var photo = document.createElement('img');
        photo.src = reader.result;
        preview.appendChild(photo);
      });

      reader.readAsDataURL(file);
    }
  });
})();

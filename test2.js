  $(document).ready(function () {
    // Инициализация Bloodhound для работы с источниками данных
    var addressSuggestions = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
        prepare: function (query, settings) {
          settings.url += '?query=' + encodeURIComponent(query);
          settings.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Token c07aee339a34c463e33470c0b2c219dd9f53c735'
          };
          return settings;
        },
        transform: function (response) {
          return response.suggestions;
        }
      }
    });

    // Инициализация Typeahead.js для вашей формы
    $('#gpa-3').typeahead(
      {
        hint: true,
        highlight: true,
        minLength: 1
      },
      {
        name: 'addresses',
        displayKey: 'value',
        source: addressSuggestions
      }
    );

    // Обработчик события для кнопки расчета расстояния
    $('.btn-delivery').click(function () {
      var startPoint = 'Пушкинский район,пос. Софрино, Ул. Ленина 4а'; // Замените на ваш адрес точки A
      var endPoint = $('#gpa-3').val(); // Значение из формы, которое представляет точку B

      // Запрос к Яндекс API для расчета расстояния
      $.ajax({
        url: 'https://geocode-maps.yandex.ru/1.x/',
        type: 'GET',
        dataType: 'json',
        data: {
          apikey: '9e8e06c8-ead0-4b76-a7b8-1629beb6f7bc',
          geocode: startPoint + ',' + endPoint,
          format: 'json'
        },
        success: function (response) {
          var distance = response.response.GeoObjectCollection.featureMember[0].GeoObject.description;
          // Вывод результата в нужное место, например, в элемент с классом result-price-delivery
          $('.result-price-delivery').text('Расстояние: ' + distance);
        },
        error: function (error) {
          console.log(error);
        }
      });
    });
  });

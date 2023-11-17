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

      // Запрос к Yandex API для расчета расстояния
      $.ajax({
        url: 'https://api-maps.yandex.ru/2.1/distancematrix',
        type: 'GET',
        dataType: 'json',
        data: {
          apikey: '734d6ffd-4057-4b0e-adea-99839e0fb7a6',
          origins: startPoint,
          destinations: endPoint,
          lang: 'ru-RU'
        },
        success: function (response) {
          var distance = response.rows[0].elements[0].distance.text;
          // Вывод результата в нужное место, например, в элемент с классом result-price-delivery
          $('.result-price-delivery').text('Расстояние: ' + distance);
        },
        error: function (error) {
          console.log(error);
        }
      });
    });
  });

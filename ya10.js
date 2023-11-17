// Функция для атоподбора адреса в форме Указать адрес
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
  });

// Функция карты yandex 
function init() {
    // Обработчик события для кнопки расчета расстояния
    $('.btn-delivery').click(function () {
      var startPoint = 'Пушкинский район, пос. Софрино, Ул. Ленина 4а'; // Замените на ваш адрес точки A
      var endPoint = $('#gpa-3').val(); // Значение из формы, которое представляет точку B
      var resultDistanceContainer = $('.result-distance');
      var resultPriceContainer = $('.result-price-delivery');

      ymaps.route([startPoint, endPoint]).then(
        function (route) {
          var distance = parseFloat(route.getHumanLength().replace(' км', '')); // Расстояние в километрах

          // Формулы
          var costPerTrip1 = 12000; // Стоимость за поездку для расстояния от 0 до 30 км
          var costPerKm2 = 70; // Стоимость за км для расстояния от 30 до 150 км
          var costPerKm3 = 110; // Стоимость за км для расстояния от 150 до 600 км

          // Применяем формулы
          var totalCost = (distance <= 30) ? costPerTrip1 : ((distance <= 150) ? (costPerTrip1 + (distance - 30) * costPerKm2) : (costPerTrip1 + 120 * costPerKm2 + (distance - 150) * costPerKm3));

          // Выводим результаты
          resultDistanceContainer.text("Расстояние: " + distance + " км");
          resultPriceContainer.text("Стоимость: " + totalCost.toLocaleString() + " руб.");
        },
        function (error) {
          resultDistanceContainer.text("");
          resultPriceContainer.text("Ошибка при расчете маршрута: " + error.message);
        }
      );
    });
  }

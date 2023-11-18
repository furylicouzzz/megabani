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
    $('#pointB').typeahead(
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
  
  
// API Яндекс.Карт для расчета расстояния и стоимости  
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('calculateButton').addEventListener('click', function () {
    calculateDistanceAndCost();
  });

  function calculateDistanceAndCost() {
    var pointA = "Пушкинский район, пос. Софрино, ул. Ленина 4а";
    var pointB = document.getElementById('pointB').value;
    var resultDiv = document.getElementById('result');

    // Проверка наличия значения в поле адреса
    if (!pointB.trim()) {
      resultDiv.innerHTML = '<span style="color: red;">Пожалуйста, введите адрес для расчета стоимости доставки.</span>';
      return;
    }

    ymaps.route([pointA, pointB]).then(
      function (route) {
        var distance = route.getLength() / 1000;

        // Формирование сообщения
        if (distance > 600) {
          resultDiv.innerHTML = '<span style="color: red;">К сожалению, стоимость рассчитывается до 600 км. Запросите стоимость доставки у менеджера.</span>';
        } else {
          // Рассчет стоимости
          var cost = 0;
          if (distance > 0 && distance <= 30) {
            cost = 12000;
          } else if (distance > 30 && distance <= 150) {
            cost = (distance * 70) + 12000;
          } else if (distance > 150) {
            cost = (distance * 110) + 12000;
          }

          function formatNumberWithSpaces(number) {
            return number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
          }

          resultDiv.innerHTML = 'Расстояние: ' + Math.floor(distance) + ' км<br>Стоимость: ' + formatNumberWithSpaces(cost) + ' ₽';
        }
      },
      function (error) {
        console.error('Ошибка при расчете расстояния:', error);
        resultDiv.innerHTML = '<span style="color: red;">Ошибка при расчете расстояния: ' + error.message + '</span>';
      }
    );
  }
});

 function init() {
    // Обработчик события для кнопки расчета расстояния
    $('.btn-delivery').click(function () {
      var startPoint = 'Пушкинский район, пос. Софрино, Ул. Ленина 4а'; // Замените на ваш адрес точки A
      var endPoint = $('#gpa-3').val(); // Значение из формы, которое представляет точку B
      var resultContainer = $('.result-price-delivery');

      ymaps.route([startPoint, endPoint]).then(
        function (route) {
          var distance = parseFloat(route.getHumanLength().replace(' км', '')); // Расстояние в километрах

          // Формулы
          var costPerTrip1 = 12000; // Стоимость за поездку для расстояния от 0 до 30 км
          var costPerKm2 = 70; // Стоимость за км для расстояния от 30 до 150 км
          var costPerKm3 = 110; // Стоимость за км для расстояния от 150 до 600 км

          // Применяем формулы
          var totalCost = (distance <= 30) ? costPerTrip1 : ((distance <= 150) ? (costPerTrip1 + (distance - 30) * costPerKm2) : (costPerTrip1 + 120 * costPerKm2 + (distance - 150) * costPerKm3));

          resultContainer.text("Расстояние: " + distance + " км\nСтоимость: " + totalCost.toLocaleString() + " руб.");
        },
        function (error) {
          resultContainer.text("Ошибка при расчете маршрута: " + error.message);
        }
      );
    });
  }

function calculateDistanceAndCost() {
      var pointA = "Пушкинский район, пос. Софрино, ул. Ленина 4а";
      var pointB = document.getElementById('pointB').value;
      var resultDiv = document.getElementById('result');

      // Используем Yandex Maps API для расчета маршрута
      ymaps.route([pointA, pointB]).then(
        function (route) {
          var distance = route.getLength() / 1000; // Получаем расстояние в километрах

          // Формирование сообщения
          if (distance > 600) {
            resultDiv.innerHTML = 'К сожалению, стоимость рассчитывается до 600 км. Запросите стоимость доставки у менеджера.';
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

            // Форматирование числа с разделителем тысяч
            function formatNumberWithSpaces(number) {
              return number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            }

            // Вывод расстояния и стоимости
            resultDiv.innerHTML = 'Расстояние: ' + Math.floor(distance) + ' км<br>Стоимость: ' + formatNumberWithSpaces(cost) + ' ₽';
          }
        },
        function (error) {
          console.error('Ошибка при расчете расстояния:', error);

          // Вывод сообщения об ошибке
          resultDiv.textContent = 'Ошибка при расчете расстояния: ' + error.message;
        }
      );
    }

function init() {
    var myMap = new ymaps.Map("map", {
      center: [55.753994, 37.622093], // Координаты центра карты (например, Москва)
      zoom: 9 // Уровень масштабирования карты
    });

    document.getElementById("calculateButton").addEventListener("click", function () {
      var startAddress = document.getElementById("startAddress").value;
      var endAddress = document.getElementById("endAddress").value;
      var resultContainer = document.getElementById("resultContainer");

      ymaps.route([startAddress, endAddress]).then(
        function (route) {
          var distance = parseFloat(route.getHumanLength().replace(' км', '')); // Расстояние в километрах
          var costPerKm = 0; // Инициализируем переменную для хранения стоимости за километр

          // Применяем формулы
          if (distance > 0 && distance <= 30) {
            costPerKm = 12000;
          } else if (distance > 30 && distance < 150) {
            costPerKm = (distance * 70) + 12000;
          } else if (distance >= 150 && distance <= 600) {
            costPerKm = (distance * 110) + 12000;
          }

          var totalCost = costPerKm * distance;
          resultContainer.innerHTML = "Расстояние: " + distance + " км<br>Стоимость: " + totalCost.toLocaleString() + " руб.";
        },
        function (error) {
          resultContainer.innerHTML = "Ошибка при расчете маршрута: " + error.message;
        }
      );
    });
  }

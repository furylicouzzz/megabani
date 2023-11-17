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
          var costPerTrip1 = 12000; // Стоимость за поездку для расстояния от 0 до 30 км
          var costPerKm2 = 70; // Стоимость за км для расстояния от 30 до 150 км
          var costPerTrip2 = 12000 + (distance - 30) * costPerKm2; // Стоимость за поездку для расстояния от 30 до 150 км
          var costPerKm3 = 110; // Стоимость за км для расстояния от 150 до 600 км
          var costPerTrip3 = 12000 + (150 - 30) * costPerKm2 + (distance - 150) * costPerKm3; // Стоимость за поездку для расстояния от 150 до 600 км

          // Применяем формулы
          var totalCost = (distance <= 30) ? costPerTrip1 : ((distance <= 150) ? costPerTrip2 : costPerTrip3);
          resultContainer.innerHTML = "Расстояние: " + distance + " км<br>Стоимость: " + totalCost.toLocaleString() + " руб.";
        },
        function (error) {
          resultContainer.innerHTML = "Ошибка при расчете маршрута: " + error.message;
        }
      );
    });
  }

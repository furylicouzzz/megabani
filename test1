// Обработчик события для кнопки расчета расстояния
$('.btn-delivery').click(function () {
  var startPoint = 'Пушкинский район,пос. Софрино, Ул. Ленина 4а'; // Замените на ваш адрес точки A
  var endPoint = $('#gpa-3').val(); // Значение из формы, которое представляет точку B

  // Запрос к OpenRouteService API для расчета расстояния
  $.ajax({
    url: 'https://api.openrouteservice.org/v2/directions/driving-car',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      coordinates: [[37.68191, 55.734490], [37.59027, 55.73344], [37.690, 55.63344]],
      format: 'geojson',
      profile: 'driving-car'
    }),
    headers: {
      'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
      'Authorization': '5b3ce3597851110001cf6248edbca6a9915d4da8844ef741ffb9f766'
    },
    success: function (response) {
      var distance = response.features[0].properties.segments[0].distance;
      // Вывод результата в нужное место, например, в элемент с классом result-price-delivery
      $('.result-price-delivery').text('Расстояние: ' + distance + ' метров');
    },
    error: function (error) {
      console.log(error);
    }
  });
});

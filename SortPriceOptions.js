  $(document).ready(function () {
    // Выбрать все группы parametrs-content-items
    $('.parametrs-content-items').each(function () {
      var currentGroup = $(this);

      // Получить все элементы с классом options-name-price-value и отсортировать их по стоимости
      var priceElements = currentGroup.find('.radio-button-field-2 .options-name-price-value');
      priceElements.sort(function (a, b) {
        var priceA = parsePrice($(a).text()); // Извлечь числовое значение стоимости
        var priceB = parsePrice($(b).text());
        return priceA - priceB;
      });

      // Очистить контейнер и добавить элементы в порядке от меньшего к большему
      var dynList = currentGroup.find('.w-dyn-list');
      dynList.empty();
      priceElements.each(function() {
        dynList.append($(this).closest('.radio-list-items'));
      });
    });
  });

  function parsePrice(priceString) {
    // Извлечь числовое значение стоимости из строки в формате (4 500 ₽)
    var match = priceString.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }


$(window).on('load', function () {
  // Выбрать все группы parametrs-content-items
  $('.parametrs-content-items').each(function () {
    var currentGroup = $(this);

    // Получить значения из .dublicate-radio-button-field
    var radioHiddenOption = currentGroup.find('.dublicate-radio-button-field .options-name-item-dublicate').text().trim();
    var radioHiddenPrice = currentGroup.find('.dublicate-radio-button-field .options-name-price-value-dublicate').text().trim();

    // Пройти по всем радиокнопкам в .radio-button-field-2
    currentGroup.find('.radio-button-field-2 .options-name-item').each(function () {
      var radioCurrentOption = $(this).text().trim();

      // Сравнить текстовые значения с учетом регистра
      if (radioCurrentOption.toLowerCase() === radioHiddenOption.toLowerCase()) {
        // Найдено совпадение, сделать радиокнопку активной и применить стили
        $(this).closest('.radio-button-field-2').find('input[type="radio"]').prop('checked', true);
        $(this).closest('.radio-button-field-2').find('.w-form-formradioinput').addClass('w--redirected-checked');

        // Также установить значение цены для радиокнопки
        var radioPrice = parseFloat(radioHiddenPrice) || 0;
        // Добавьте код для использования значения цены по своему усмотрению

        // Выход из цикла, если совпадение найдено
        return false;
      }
    });

    // Получить значения из .dublicate-checkbox-field
    var checkboxHiddenOptions = currentGroup.find('.dublicate-checkbox-field .options-name-item-dublicate');
    var checkboxHiddenPrices = currentGroup.find('.dublicate-checkbox-field .options-name-price-value-dublicate');

    // Пройти по всем чекбоксам в .checkbox-button-field-2
    currentGroup.find('.checkbox-button-field-2 .options-name-item').each(function () {
      var checkboxCurrentOption = $(this).text().trim();

      // Сравнить текстовые значения с учетом регистра
      if (checkboxHiddenOptions.filter(function() { return $(this).text().trim().toLowerCase() === checkboxCurrentOption.toLowerCase(); }).length > 0) {
        // Найдено совпадение, сделать чекбокс активным и применить стили
        $(this).closest('.checkbox-button-field-2').find('input[type="checkbox"]').prop('checked', true);
        $(this).closest('.checkbox-button-field-2').find('.w-checkbox-input').addClass('w--redirected-checked');
        // Добавить свой класс для стилей (если требуется)
        // $(this).closest('.checkbox-button-field-2').find('.your-custom-class').addClass('your-custom-class');

        // Получить индекс совпавшей опции
        var optionIndex = checkboxHiddenOptions.index($(this));
        // Получить значение цены для совпавшей опции
        var checkboxPrice = parseFloat(checkboxHiddenPrices.eq(optionIndex).text().trim()) || 0;
        // Добавьте код для использования значения цены по своему усмотрению
      }
    });
  });
});

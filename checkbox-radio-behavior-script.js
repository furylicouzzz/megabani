// Инициализация выбора опций для групп parametrs-content-items.
// Активирует checkbox-field-hidden и применяет стили для checkbox-button-field-2 с совпадающими значениями.
// Также активирует radio-button-field-hidden и применяет стили для radio-button-field-2 с совпадающими значениями.
// Поведение cheсkbox и radio button


$(document).ready(function () {
    // Выбрать все группы parametrs-content-items
    $('.parametrs-content-items').each(function () {
      var currentGroup = $(this);

      // Сделать checkbox-field-hidden активным
      currentGroup.find('.checkbox-field-hidden input[type="checkbox"]').prop('checked', true);

      var checkboxHiddenOption = currentGroup.find('.checkbox-field-hidden .options-name-item').text().trim();
      currentGroup.find('.checkbox-button-field-2 .options-name-item').each(function () {
        var checkboxCurrentOption = $(this).text().trim();
        if (checkboxCurrentOption === checkboxHiddenOption) {
          // Найдено одинаковое значение, сделать checkbox-button-field-2 активным и применить стили
          $(this).closest('.checkbox-button-field-2').find('input[type="checkbox"]').prop('checked', true);
          $(this).closest('.checkbox-button-field-2').find('.w-checkbox-input').addClass('w--redirected-checked');
        }
      });

      // Сделать radio-button-field-hidden активным
      currentGroup.find('.radio-button-field-hidden input[type="radio"]').prop('checked', true);

      var radioHiddenOption = currentGroup.find('.radio-button-field-hidden .options-name-item').text().trim();
      currentGroup.find('.radio-button-field-2 .options-name-item').each(function () {
        var radioCurrentOption = $(this).text().trim();
        if (radioCurrentOption === radioHiddenOption) {
          // Найдено одинаковое значение, сделать radio-button-field-2 активным и применить стили
          $(this).closest('.radio-button-field-2').find('input[type="radio"]').prop('checked', true);
          $(this).closest('.radio-button-field-2').find('.w-form-formradioinput').addClass('w--redirected-checked');
        }
      });
    });
  });

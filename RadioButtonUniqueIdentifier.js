  document.addEventListener('DOMContentLoaded', function() {
    // Для каждой группы радиокнопок
    document.querySelectorAll('.radio-list').forEach(function(group, groupIndex) {
      // Для каждой радиокнопки в группе
      group.querySelectorAll('input[type="radio"]').forEach(function(radio, radioIndex) {
        // Генерация уникального идентификатора
        var uniqueIdentifier = 'radio_' + groupIndex + '_' + radioIndex;
        
        // Присваивание уникального идентификатора и имени
        radio.id = uniqueIdentifier;
        radio.name = 'radioGroup_' + groupIndex;

        // Присваивание соответствующего for атрибута для label
        var label = radio.parentElement;
        if (label.tagName.toLowerCase() === 'label') {
          label.setAttribute('for', uniqueIdentifier);
        }
      });
    });
  });

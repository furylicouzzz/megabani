document.addEventListener('DOMContentLoaded', function () {
  // ... ваш текущий код

  // Получаем все элементы с классом "radio-list-item"
  const radioListItems = document.querySelectorAll('.radio-list-item');

  // Сортируем элементы сразу после загрузки страницы
  const sortedElements = Array.from(radioListItems).sort(function (a, b) {
    const priceA = parseInt(a.querySelector('.options-name-price-value').getAttribute('data-original-value'), 10);
    const priceB = parseInt(b.querySelector('.options-name-price-value').getAttribute('data-original-value'), 10);
    return priceA - priceB;
  });

  // Пересчитываем общую стоимость на основе всех активных радиокнопок и чекбоксов
  const totalPrice = calculateTotalPrice();

  // Обновляем порядок элементов и их текст
  updatePriceElements(sortedElements, totalPrice);

  // ... ваш текущий код
});

document.addEventListener('DOMContentLoaded', function () {
  // Получаем все элементы списка с радио-кнопками
  const radioListItems = document.querySelectorAll('.radio-list-items');

  // Проходимся по каждому элементу и форматируем цену
  radioListItems.forEach(function (item) {
    const priceElement = item.querySelector('.options-name-price-value');
    const priceText = priceElement.textContent.trim();

    // Форматируем всегда, сохраняя скобки с пробелами, даже если текст не содержит числа
    const formattedPrice = formatPrice(priceText);

    // Обновляем текст с отформатированной ценой
    priceElement.innerHTML = formattedPrice;
  });
});

function formatPrice(price) {
  // Функция для форматирования цены в виде (23 500 ₽)
  const numericValue = parseInt(price.replace(/\s+/g, ''), 10);

  // Проверяем, есть ли число в тексте
  if (!isNaN(numericValue)) {
    const formattedPrice = new Intl.NumberFormat('ru-RU').format(numericValue);
    return ` ${formattedPrice} ₽ `;
  } else {
    // Если числа нет, возвращаем исходный текст с добавленными скобками и пробелами
    return `( ${price} )`;
  }
}

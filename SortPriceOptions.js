// Находим все контейнеры с группами
var containers = document.querySelectorAll('.items-list-options');

containers.forEach(function(container) {
    // Находим все элементы в текущем контейнере
    var paramItems = container.querySelectorAll('.radio-list-items');
    var paramArray = Array.from(paramItems);

    paramArray.sort(function(a, b) {
        var priceA = parseFloat(a.querySelector('.options-name-price-value').textContent.replace(/[^\d]/g, ''));
        var priceB = parseFloat(b.querySelector('.options-name-price-value').textContent.replace(/[^\d]/g, ''));

        return priceA - priceB;
    });

    // Удаляем текущие элементы из контейнера
    paramArray.forEach(function(param) {
        container.appendChild(param);
    });
});

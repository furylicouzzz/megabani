document.addEventListener("DOMContentLoaded", function () {
    // Функция для обновления общей стоимости
    function updateTotalPrice() {
        // Находим выбранную радиокнопку размера бани
        var selectedSizeRadioButton = document.querySelector('input[name="radioGroup_0"]:checked');
        var sizePriceText = selectedSizeRadioButton ? selectedSizeRadioButton.nextElementSibling.querySelector('.options-name-price-value').textContent : '0';

        // Находим выбранную радиокнопку типа каркаса
        var selectedFrameRadioButton = document.querySelector('input[name="radioGroup_1"]:checked');
        var framePriceText = selectedFrameRadioButton ? selectedFrameRadioButton.nextElementSibling.querySelector('.options-name-price-value').textContent : '0';

        // Извлекаем числовые значения из текста
        var sizePrice = extractPriceValue(sizePriceText);
        var framePrice = extractPriceValue(framePriceText);

        // Обработка чекбоксов и радиокнопок (исключая "Размер бани")
        var checkboxesAndRadioButtons = document.querySelectorAll('.parametrs-content-items .radio-list-item input[type="checkbox"]:checked, .parametrs-content-items .radio-list-item input[type="radio"]:checked:not([name="radioGroup_0"])');
        var additionalOptionsPrice = 0;

        checkboxesAndRadioButtons.forEach(function (input) {
            var inputPriceText = input.nextElementSibling.querySelector('.options-name-price-value').textContent;
            var inputPrice = extractPriceValue(inputPriceText);
            additionalOptionsPrice += inputPrice; // Добавляем цену чекбокса или радиокнопки к общей стоимости
        });

        // Обновляем стоимость в классе base-options-price-value
        var baseOptionsPriceElement = document.querySelector('.base-options-price-value');
        var formattedSizePrice = formatCurrency(sizePrice);
        baseOptionsPriceElement.textContent = formattedSizePrice;

        // Суммируем цены и обновляем total-price
        var totalPriceElement = document.querySelector('.total-price');
        var totalPrice = sizePrice + additionalOptionsPrice;
        var formattedTotalPrice = formatCurrency(totalPrice); // Функция для форматирования валюты
        totalPriceElement.textContent = formattedTotalPrice;

        // Обновляем стоимость в классе price-options
        var priceOptionsElement = document.querySelector('.price-options');
        var formattedAdditionalOptionsPrice = formatCurrency(additionalOptionsPrice);
        priceOptionsElement.textContent = formattedAdditionalOptionsPrice;

        var priceCardHighElements = document.querySelectorAll('.price-card-high');
        var formattedTotalPriceWithCurrency = formatCurrency(totalPrice);
        priceCardHighElements.forEach(function (element) {
            element.textContent = formattedTotalPriceWithCurrency;
        });
    }

    function extractPriceValue(priceText) {
        return parseFloat(priceText.replace(/\D+/g, '')) || 0;
    }

    function formatCurrency(number) {
        return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(number);
    }

    function clearOptions() {
        var checkboxes = document.querySelectorAll('.parametrs-content-items .radio-list-item input[type="checkbox"]:checked');
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });

        var nonSizeRadioButtons = document.querySelectorAll('.parametrs-content-items .radio-list-item input[type="radio"]:not([name="radioGroup_0"]):checked');
        nonSizeRadioButtons.forEach(function (radioButton) {
            radioButton.checked = false;
        });

        clearCustomButtons();

        updateTotalPrice();
    }

    function clearCustomButtons() {
        var customRadioButtons = document.querySelectorAll('.w-form-formradioinput.w--redirected-checked');
        customRadioButtons.forEach(function (radioButton) {
            var isSizeRadioButton = radioButton.closest('.radio-list-item').querySelector('input[name="radioGroup_0"]');
            if (!isSizeRadioButton) {
                radioButton.classList.remove('w--redirected-checked');
            }
        });

        var customCheckboxes = document.querySelectorAll('.w-checkbox-input.w--redirected-checked');
        customCheckboxes.forEach(function (checkbox) {
            checkbox.classList.remove('w--redirected-checked');
        });
    }

    var frameRadioInputs = document.querySelectorAll('input[name="radioGroup_0"]');
    frameRadioInputs.forEach(function (input) {
        input.addEventListener('change', updateTotalPrice);
    });
    
    var frameRadioInputs = document.querySelectorAll('input[name="radioGroup_1"]');
    frameRadioInputs.forEach(function (input) {
        input.addEventListener('change', updateTotalPrice);
    });

    var checkboxInputs = document.querySelectorAll('.parametrs-content-items input[type="checkbox"]');
    checkboxInputs.forEach(function (input) {
        input.addEventListener('change', updateTotalPrice);
    });

    var clearOptionsButton = document.querySelector('.btn-clear-options');
    if (clearOptionsButton) {
        clearOptionsButton.addEventListener('click', clearOptions);
    }

    setTimeout(updateTotalPrice, 700);
});

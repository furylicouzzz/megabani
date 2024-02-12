document.addEventListener('DOMContentLoaded', function () {
    emailjs.init("GIRdx4ipJgH3lDIa8");

    function extractPriceValue(priceText) {
        return parseFloat(priceText.replace(/\D+/g, '')) || 0;
    }

    function formatCurrency(number) {
        return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(number);
    }

    function collectCheckedValues(selector) {
        var checkedElements = document.querySelectorAll('.parametrs-content-items ' + selector);
        var values = [];
        checkedElements.forEach(function (element) {
            var groupHeading = element.closest('.parametrs-content-items').querySelector('.heading');
            if (groupHeading) {
                var groupName = groupHeading.textContent.trim();
                var paramName = element.nextElementSibling.querySelector('.options-name-item').textContent.trim();
                values.push(groupName + ': ' + paramName);
            }
        });
        return values;
    }

    function collectPriceValues() {
        var priceElements = document.querySelectorAll('.parametrs-content-items-price .total-price');
        var priceValues = [];
        priceElements.forEach(function (element) {
            var priceLabel = element.closest('.parametrs-content-items').querySelector('.heading').textContent.trim();
            var priceValue = element.textContent.trim();
            priceValues.push(priceLabel + ' ' + priceValue);
        });
        return priceValues;
    }

    function showNotification(message, color) {
        var notification = document.createElement('div');
        notification.textContent = message;
        notification.style.color = color;
        var container = document.getElementById('success-message-container');
        container.innerHTML = '';
        container.appendChild(notification);
    }

    function updateButtonText(button, newText) {
        button.textContent = newText;
    }

    function isValidPhoneNumber(phoneNumber) {
        // Регулярное выражение для проверки номера телефона
        var phoneRegex = /^\+?[0-9()-]+$/;
        return phoneRegex.test(phoneNumber);
    }

    document.getElementById('btn-submit').addEventListener('click', function (event) {
        event.preventDefault();

        var submitButton = event.target;
        var originalButtonText = submitButton.textContent;

        // Изменение текста на кнопке перед отправкой
        updateButtonText(submitButton, 'ПОЖАЛУЙСТА ПОДОЖДИТЕ...');

        // Проверка обязательных полей
        var nameInput = document.querySelector('#Name');
        var phoneInput = document.querySelector('#Phone');

        var isError = false;

        if (!nameInput.value.trim()) {
            nameInput.classList.add('error');
            isError = true;
        } else {
            nameInput.classList.remove('error');
        }

        if (!phoneInput.value.trim() || !isValidPhoneNumber(phoneInput.value)) {
            phoneInput.classList.add('error');
            isError = true;
        } else {
            phoneInput.classList.remove('error');
        }

        if (isError) {
            showNotification('Пожалуйста, заполните все обязательные поля корректно.', 'red');
            // Возврат изначального текста на кнопке после отправки
            updateButtonText(submitButton, originalButtonText);
            return;
        }

        var bathhouseName = document.querySelector('.h1-name-bathhouse-card');
        var radioValues = collectCheckedValues('.radio-list-item input[type="radio"]:checked');
        var checkboxValues = collectCheckedValues('.radio-list-item input[type="checkbox"]:checked');
        var priceValues = collectPriceValues();

        console.log("Name input value:", nameInput.value);
        console.log("Phone input value:", phoneInput.value);
        console.log("Bathhouse name value:", bathhouseName.innerText);
        console.log("Selected radio values:", radioValues);
        console.log("Selected checkbox values:", checkboxValues);
        console.log("Price values:", priceValues);

        var templateParams = {
            name: nameInput.value,
            phone: phoneInput.value,
            bathhouseName: bathhouseName.innerText,
            radioValues: radioValues.join('\r'),
            checkboxValues: checkboxValues.join('\r'),
            priceValues: priceValues.join('\r'),
            // Добавьте другие свойства по необходимости
        };

        console.log("Template params:", templateParams);

        // Отправка электронной почты
        emailjs.send("service_9vdsf4a", "template_xue43ri", templateParams)
            .then(function (response) {
                console.log("Email sent successfully", response);
                showNotification('Ваша заявка успешно отправлена!', 'green');
            })
            .catch(function (error) {
                console.error("Error sending email", error);
                showNotification('Ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.', 'red');
            })
            .finally(function () {
                // Возврат изначального текста на кнопке после отправки
                updateButtonText(submitButton, originalButtonText);
            });

        // Подготовка данных для отправки в Telegram
        var telegramMessage = `✅ ЗАЯВКА С САЙТА | ${bathhouseName.innerText} \nИмя: ${nameInput.value}\nТелефон: ${phoneInput.value}\n${bathhouseName.innerText}\n${radioValues.join('\n')}\n${checkboxValues.join('\n')}\n${priceValues.join('\n')}`;

        // Замените YOUR_BOT_TOKEN на токен вашего бота
        // Замените YOUR_CHAT_ID на chat_id вашего чата или канала
        var botToken = "6429778706:AAGDoSu0evQ8w7QUMS_opgcld1ujCSh9NW4";
        var chatId = "-1002011104350";

        // Отправка сообщения в Telegram
        var xhr = new XMLHttpRequest();
        xhr.open("POST", `https://api.telegram.org/bot${botToken}/sendMessage`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            chat_id: chatId,
            text: telegramMessage,
            reply_to_message_id: "7"
        }));
    });

    // Обработчик событий для поля номера телефона, чтобы предотвратить ввод недопустимых символов
    document.getElementById('Phone').addEventListener('input', function (event) {
        var inputValue = event.target.value;
        // Удаление всех символов, кроме цифр, "-", "(", ")"
        event.target.value = inputValue.replace(/[^0-9()-]/g, '');
    });
});

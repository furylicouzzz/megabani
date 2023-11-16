<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.11.1/typeahead.bundle.min.js"></script>

<script>
  $(document).ready(function () {
    // Инициализация Bloodhound для работы с источниками данных
    var addressSuggestions = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
        prepare: function (query, settings) {
          settings.url += '?query=' + encodeURIComponent(query);
          settings.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Token c07aee339a34c463e33470c0b2c219dd9f53c735'
          };
          return settings;
        },
        transform: function (response) {
          return response.suggestions;
        }
      }
    });
    // Инициализация Typeahead.js для вашей формы
    $('#gpa-3').typeahead(
      {
        hint: true,
        highlight: true,
        minLength: 1
      },
      {
        name: 'addresses',
        displayKey: 'value',
        source: addressSuggestions
      }
    );
  });
</script>


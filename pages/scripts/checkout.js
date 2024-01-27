var Checkout = function () {

    return {
        init: function () {
            
            $('#checkout').on('change', '#checkout-content input[name="account"]', function() {

              var title = '';

              if ($(this).attr('value') == 'register') {
                title = 'Etapa 2:  Conta &amp; Detalhe de Cobrança';
              } else {
                title = 'Etapa 2: Detalhe de Cobrança';
              }    

              $('#payment-address .accordion-toggle').html(title);
            });

        }
    };

}();
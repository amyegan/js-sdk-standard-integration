/* eslint-disable consistent-return, new-cap, no-alert, no-console */

  paypal.Button.render(
    {
      env: "local", // sandbox | production

      // PayPal Client IDs - replace with your own
      // Create a PayPal app: https://developer.paypal.com/developer/applications/create
      client: {
        sandbox:
          "AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R",
        stage: "alc_client1",
        local: "AfVbnP9mKT39nNXe5fKLFQbZL35rubGf0USdrsv6sjvAab-d0uwuGq2D3l0-tYDjjARxMoxhtWryx6BR",
        production: "<insert production client id>",
      },

      // Show the buyer a 'Pay Now' button in the checkout flow
      commit: true,

      style: {
        layout: "vertical",
        size: "large",
      },

      // payment() is called when the button is clicked
      payment: function (data, actions) {
        console.log('actions.payment functions', actions.payment);
        // return paypal.Promise.delay(500).then(() =>  'abc123')

        // Make a call to the REST api to create the payment
        return actions.payment.create({
          // payment: {
            transactions: [
              {
                amount: { total: "0.01", currency: "USD" },
              },
            ],
            redirect_urls: {
                return_url: '/approve.html',
                cancel_url: '/cancel.html'
            }
          // },
        });
      },

      // onAuthorize() is called when the buyer approves the payment
      onAuthorize: function (data, actions) {
        console.warn("execute payment", data, actions);
        console.log('execute function', actions.payment.execute ? actions.payment.execute : 'na');
        // Tried get() and saw same type of error as execute()
        // actions.payment.get().then(function (payment) {
        //   console.info('payment info', payment);
        // })

        // Make a call to the REST api to execute the payment
        return actions.payment.execute().then(function () {
          window.alert("Payment Complete!");
        });
      },
      onCancel: function(data, actions) {
          console.log('cancel in merchant integration', data, actions);
          // actions.redirect();
      }
    },
    "#paypal-button-container"
  );
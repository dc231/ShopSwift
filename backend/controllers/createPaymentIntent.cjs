const stripe = require('stripe')(
    'sk_test_51MfGEmSFoYXjK6ahXHaOpShrl6R3to2bfcztP6UBw1zdRjM8VnEnVBFYnxIg0m8mZZFCDpvxlFyAkdujS0x3rjAn00Q8XCIp0u'
)

const paymentIntent = () =>
    stripe.paymentIntents.create({
        amount: 1099,
        description: 'Payment is intended to ShopSwift for tech things',
        currency: 'usd',
        shipping: {
            name: 'bharat bhammar',
            address: {
                line1: '510 Townsend St',
                postal_code: '98140',
                city: 'San Francisco',
                state: 'CA',
                country: 'US',
            },
        },
        metadata: {
            company: 'ShopSwift',
        },
    })
module.exports = { paymentIntent }

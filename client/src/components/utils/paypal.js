import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
    render() {

        const onSuccess = (payment) => {
            this.props.onSuccess(payment);
            // console.log("The payment was succeeded!", JSON.stringify(payment));
            // {
            //     "paid": true,
            //     "cancelled": false,
            //     "payerID": "69BESPD49L5F2",
            //     "paymentID": "PAYID-LREDMJA39918848E4457823N",
            //     "paymentToken": "EC-1A0359332N7230725",
            //     "returnUrl": "https://www.sandbox.paypal.com/?paymentId=PAYID-LREDMJA39918848E4457823N&token=EC-1A0359332N7230725&PayerID=69BESPD49L5F2",
            //     "address": {
            //         "recipient_name": "test buyer",
            //         "line1": "calle Vilamarï¿½ 76993- 17469",
            //         "city": "Albacete",
            //         "state": "Albacete",
            //         "postal_code": "02001",
            //         "country_code": "ES"
            //     },
            //     "email": "alfonzzo7-buyer@gmail.com"
            // }            
        }

        const onCancel = (data) => {
            console.log('The payment was cancelled!', JSON.stringify(data));
            this.props.transCanceled(data);
        }
 
        const onError = (err) => {
            console.log("Error!", JSON.stringify(err));
            this.props.transErr(err);
        }

        let env = 'sandbox';
        let currency = 'EUR';
        let total = this.props.toPay;

        const client = {
            sandbox: 'AQDR52YzCKesV3T5V8n6UMZiWkk50QkKpWc061NYxZJnHhQylXtXx9wkk-q37FQyqrSxOr7F0wzgS50x',
            production: ''
        }

        return (
            <div>
                <PaypalExpressBtn
                    env={env}
                    client={client}
                    currency={currency}
                    total={total}
                    onError={onError}
                    onSuccess={onSuccess}
                    onCancel={onCancel}
                    style={{
                        size:'large',
                        color:'blue',
                        shape:'rect',
                        label:'checkout'
                    }}
                />
            </div>
        );
    }
}

export default Paypal;
import React from "react";
import {
  PaymentRequestButtonElement,
  injectStripe
} from "react-stripe-elements";

class AddressSection extends React.Component {
  constructor(props) {
    super(props);

    const paymentRequest = props.stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        label: "Demo total",
        amount: 1000
      }
    });

    paymentRequest.on("token", ({ complete, token, ...data }) => {
      console.log("Received Stripe token: ", token);
      console.log("Received customer information: ", data);
      complete("success");
    });

    paymentRequest.canMakePayment().then(result => {
      this.setState({ canMakePayment: !!result });
    });

    this.state = {
      canMakePayment: false,
      paymentRequest
    };
  }

  render() {
    return this.state.canMakePayment ? (
      <PaymentRequestButtonElement
        className="PaymentRequestButton"
        paymentRequest={this.state.paymentRequest}
        style={{
          paymentRequestButton: {
            theme: "dark",
            height: "64px",
            type: "donate"
          }
        }}
      />
    ) : null;
  }
}
export default injectStripe(AddressSection);

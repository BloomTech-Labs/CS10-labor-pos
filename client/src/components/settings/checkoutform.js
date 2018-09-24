import React, { Component } from 'react';
import { CardElement, injectStripe } from "react-stripe-elements";

class CheckoutForm extends Component {
  state = {
  resp_message: "",
  card_errors: ""
};
handleCardErrors = (card_deets) => {
  console.log("Card Deets", card_deets);
    if(card_deets.error) {
      this.setState({ card_errors: card_deets.error.message });
    } else {
      this.setState({ card_deets});
    }
};

//here in the submit method we tokenize the card info 
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ card_errors: "", resp_message: ""});

  return this.props.stripe 
    .createToken({ type: "card", name: "Name" })
    .then(result => {
      if (result.error) {
        alert("We are unable to process your payment, please make sure card information is accurate.", result.error);
        return this.setState({ card_errors: result.error.message });
      } else {
        console.log("Recieved Stripe token, communicating with server: ",
        result.token 
        );
    let formData = new FormData();
    formData.append("description", "Premium Subscription");
    formData.append("currency", "usd");
    formData.append("amount", 99);
    formData.append("source", result.token.id);
    
    return fetch('http:localhost:8000/graphql/', { //TODO double check endpoint
    method: "POST",
    headers: {
      accept: "application/json"
    },
    body: formData
  })
  
    .then(response => response.json())
    .then(json => this.setState({ resp_message: json.message }));
  };
});
};

render() {
  return (
    <div>
      {this.state.resp_message && <h1>{this.state.resp_message}</h1>}
      <form onSubmit={this.handleSubmit}>
        <label>
          <h2>Card Details</h2>
          <CardElement
            style={{
              base: {
                color: "#32325d",

                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                  color: "#aab7c4"
                }
              },
              invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
              }
            }}
            onChange={this.handleCardErrors}
          />
          <div role="alert">
            <h2>{this.state.card_errors}</h2>
          </div>
        </label>
        <button className="form-btn">Subscribe to premium content!</button>
      </form>
    </div>
    // CardElement will mount on page when component renders - includes inputs for card number, exp, CVC
  );
};
}

// injectStripe wraps the component, creating new component with a stripe prop that contains stripe object 
export default injectStripe(CheckoutForm);
import React from "react";
import { injectStripe, CardElement } from "react-stripe-elements";

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: "18px",
        color: "#424770",
        letterSpacing: "0.1em",
        fontFamily: "Source Code Pro, monospace",
        "::placeholder": {
          color: "#aab7c4"
        },
        padding: "5rem"
      },
      invalid: {
        color: "#9e2146"
      }
    }
  };
};

class CardSection extends React.Component {
  render() {
    return (
      <div>
        <label>
          Card details
          <CardElement
            style={{ base: { fontSize: "18px" } }}
            {...createOptions(this.props.fontSize)}
          />
        </label>
      </div>
    );
  }
}

export default injectStripe(CardSection);

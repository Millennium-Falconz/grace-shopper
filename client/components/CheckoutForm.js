import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { connect } from 'react-redux';

import '../../public/stripe_styles.css';

const CheckoutForm = (props) => {
  // react hooks, since this is a functional component
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    // prevent browser form submission
    event.preventDefault();
    if (!stripe || !elements) {
      // stripe.js hasn't loaded yet. Make sure to disable
      // form submission until stripe.js has loaded
      return;
    }
    // This gets a ref to a mounted CardElement. Elements are
    // prebuilt UI components that handle the sensitive info
    // without our server having to touch it. Can only be
    // one of each type of element. The CardElement collects
    // all credit card info in one element. Are other elements we
    // can add if we want
    const cardElement = elements.getElement(CardElement);

    // Call the stripe APIs with the info entered into our CardElement
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (!error) {
      console.log('PaymentMethod:', paymentMethod);
      // need to get the orderId and the items being purchased
      // so guessing our state should be an array of OrderItems? Objects?
      if (cart) {
        // don't have cart state yet
      } else {
        // create some dummy data as fallback for testing
        orderId = 24;
        // orderItems = [
        //   { productId: 23, price: 2000, qty: 2 },
        //   { productId: 2, price: 1550, qty: 1 },
        //   { productId: 4, price: 1250, qty: 1 },
        //   { productId: 18, price: 8000, qty: 1 },
        // ];
      }
      dispatch(submitPayment(orderId, paymentMethod.id));
    } else {
      console.error('ERROR creating payment method', error);
    }
  };

  // render the form
  return (
    <Fragment>
      {!success ? (
        <form id="checkout-form" onSubmit={handleSubmit}>
          <label htmlFor="name"></label>
          <input type="text" id="name" placeholder="name" />
          <label htmlFor="email"></label>
          <input type="email" id="email" placeholder="email" />
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
          <button type="submit" disabled={!stripe}>
            Pay
          </button>
        </form>
      ) : (
        <h2>Success! You have purchased a pokemon!</h2>
      )}
    </Fragment>
  );
};

const mapState = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    submitPayment: dispatch(submitPayment(orderId, paymentId)),
  };
};

export default connect(mapState, mapDispatch)(CheckoutForm);

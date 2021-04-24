import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../../public/stripe_styles.css';

const CheckoutForm = () => {
  // react hooks, since this is a functional component
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState(false);

  // move the contents of this out to redux
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
    // all card info with one element. Are other elements we
    // can add if we want
    const cardElement = elements.getElement(CardElement);

    // Call the stripe APIs with the info entered into our CardElement
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (!error) {
      console.log('PaymentMethod:', paymentMethod);
      try {
        const response = await axios.post(
          '/api/payment/create-payment-intent',
          {
            amount: 1000,
            id: paymentMethod.id,
          }
        );
        console.log('STATUS', response.status);
        setSuccess(true);
      } catch (err) {
        console.error('Error submitting payment', error);
      }
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

export default CheckoutForm;

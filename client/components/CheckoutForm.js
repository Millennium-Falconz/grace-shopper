import React, { Fragment } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './stripe_styles.css';

const CheckoutForm = () => {
  // react hooks, since this is a functional component
  const stripe = useStripe();
  const elements = useElements();

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

    if (error) {
      console.error('ERROR', error);
    } else {
      console.log('PaymentMethod:', paymentMethod);
    }
  };

  // render the form
  return (
    <Fragment>
      <form id="checkout-form" onSubmit={handleSubmit}>
        <label htmlFor="name"></label>
        <input type="text" id="name" placeholder="name" />
        <label htmlFor="email"></label>
        <input type="email" id="email" placeholder="email" />
        <CardElement
          options={{
            style: {
              base: {
                width: '500px',
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
    </Fragment>
  );
};

export default CheckoutForm;

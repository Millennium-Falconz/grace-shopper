import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { connect } from 'react-redux';
import { submitPayment } from '../store/checkout';
import { clearCart } from '../store/cart';
import history from '../history';
import '../../public/stripe_styles.css';
// import CheckoutComplete from "./CheckoutComplete";
import { Redirect } from 'react-router-dom';

const CheckoutForm = (props) => {
  console.log('CheckoutForm props:', props);
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
      // console.log('CheckoutForm props:', props);
      try {
        const response = await axios.post(
          '/api/payment/create-payment-intent',
          {
            amount: props.orderTotal,
            id: paymentMethod.id,
          }
        );
        console.log('STATUS', response.status);
        setSuccess(true);

        props.resetCart(props.cart.id);
      } catch (err) {
        console.error('Error submitting payment', error);
      }
    } else {
      console.error('ERROR creating payment method', error);
    }
  };

  // render the form
  console.log('CHECKOUT RENDERING');
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
        <div>SUCCESS!</div>
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
    sendPayment: (orderId, paymentId) =>
      dispatch(submitPayment(orderId, paymentId)),
    resetCart: (orderId) => {
      console.log('dispatchin clear cart');
      dispatch(clearCart(orderId));
    },
  };
};

export default connect(mapState, mapDispatch)(CheckoutForm);

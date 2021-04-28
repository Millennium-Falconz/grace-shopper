import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const PUBLIC_KEY =
  'pk_test_51IjIF5FozE1WH5iOJ2x462GKjMMvpugVuL5XTb8u05Ie0hiZ8V3WSWxvLFQMEjHU5MRok5oRhAMnGwv0UmQHc05I00rCT0aU3p';
const stripePromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer(props) {
  console.log('StripeContainer props', props);
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm orderTotal={props.orderTotal} />
    </Elements>
  );
}

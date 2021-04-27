import axios from 'axios';
import cart from './cart';

const GET_ORDER_TOTAL_SUCCESS = 'GET_ORDER_TOTAL_SUCCESS';
const GET_ORDER_TOTAL_FAIL = 'GET_ORDER_TOTAL_FAIL';
const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
const PAYMENT_FAIL = 'PAYMENT_FAIL';

export const getOrderTotalSuccess = (orderTotal) => {
  return { type: GET_ORDER_TOTAL_SUCCESS, orderTotal };
};

export const getOrderTotalFail = (orderTotal) => {
  return { type: GET_ORDER_TOTAL_FAIL, orderTotal };
};

export const paymentSuccess = () => {
  return { type: PAYMENT_SUCCESS };
};

export const paymentFail = (error) => {
  return { type: PAYMENT_FAIL, error };
};

// thunks

export const getOrderTotal = (cart) => {
  return async (dispatch) => {
    try {
      // stripe recommends calculating order total on the server
      const { data: orderTotal } = await axios.get('/order_total', cart);
      dispatch(GET_ORDER_TOTAL_SUCCESS, orderTotal);
    } catch (error) {
      console.error('Could not get order total.', error);
      dispatch(getOrderTotalSuccess());
    }
  };
};

export const submitPayment = (orderId, paymentId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/payment/create-payment-intent', {
        orderId: orderId,
        paymentId: paymentId,
      });
      console.log('STATUS', response.status);
      dispatch(paymentSuccess());
      // TO DO: need the order id for this. Where can we get that?
      // dispatch(setOrderStatusPaid(orderId));
    } catch (err) {
      const error = new Error('Error submitting payment', err);
      dispatch(paymentFail(error));
    }
  };
};

export const setOrderStatusPaid = (orderId) => {
  return async (dispatch) => {
    try {
      const response = await axios.put('./order_status', { status: 'paid' });
      console.log(`Order ${orderId} status updated to 'paid'`);
    } catch (error) {
      console.error('Could not update order status', error);
    }
  };
};

// reducer
const defaultState = { paymentSuccess: false, orderTotal: 0, error: null };
export default function checkoutReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_ORDER_TOTAL_SUCCESS:
      return { ...state, orderTotal: action.orderTotal };
    case GET_ORDER_TOTAL_FAIL:
      return { ...state, orderTotal: action.orderTotal, error: action.error };
    case CHECKOUT_SUCCESS:
      return { ...state, paymentSuccess: true };
    case CHECKOUT_FAIL:
      return { ...state, paymentSuccess: false, error: action.error };
    default:
      return state;
  }
}

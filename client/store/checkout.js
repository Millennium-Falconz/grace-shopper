import axios from 'axios';
import cart from './cart';

const ORDER_STATUS_PAID = 'ORDER_STATUS_PAID';
const RESET_CART = 'RESET_CART';

export const orderStatusPaid = () => {
  return { type: ORDER_STATUS_PAID };
};

export const resetCart = () => {
  return { type: RESET_CART };
};

// thunks

export const submitPayment = (orderId, paymentId) => {
  return (dispatch) = async () => {
    try {
      const response = await axios.post(
        '/api/payment/create-payment-intent',
        {
          orderId: orderId,
          paymentId: paymentId
        }
      );
      console.log('STATUS', response.status);
      // setSuccess(true); component remnant, do we need to restore somrthing there?
      // can we get the orderId from response or do we need to pass it from the component?
      dispatch(setOrderStatusPaid(orderId))
    } catch (err) {
      console.error('Error submitting payment', error);
    }
  }
}

export const setOrderStatusPaid = (orderId) => {
  return (dispatch) = async () => {
    try {
      const response = await axios.put('./order_status', { status: 'paid' });
      console.log(`Order ${orderId} status updated to 'paid'`);
    } catch (error) {
      console.error('Could not update order status', error);
    }
  });
};

// // needed route for orders.js
// // when you have to change an item in the cart(like the quantity)
// router.put("/order_status", async (req, res, next) => {
//   try {
//     const {orderId, status} = req.body;
//     const item = await OrderItems.findOne({
//       where: {
//         orderId: orderId,
//       }
//     });
//     item.update({status: status});
//   } catch (err) {
//     next(err);
//   }
// });

// reducer
// not sure there's any specific state to be returned from checkout
// mostly it just affects other states...?
export default function checkoutReducer(state = {}, action) {
  switch (action.type) {
    case ORDER_STATUS_PAID:

    case RESET_CART:

    default:
      return state;
  }
}

import React from "react";
import { connect } from "react-redux"; // this is to connect to redux state
import { Link } from "react-router-dom"; // this is to link to checkout
import { removeItem, incrementQty, decrementQty, getCart } from "../store/cart";
import StripeContainer from "./StripeContainer";

class Cart extends React.Component {
  constructor() {
    super();
    this.state = { showCheckout: false };
    this.toggleCheckout = this.toggleCheckout.bind(this);
    this.calculateOrderTotal = this.calculateOrderTotal.bind(this);
  }

  componentDidMount() {
    this.props.loadCart();
  }
  handleDelete(productid, orderid) {
    this.props.removeItem(productid, orderid);
  }

  handleAdd(productId, orderId) {
    this.props.addQty(productId, orderId)
  }
  handleMinus(productId, orderId) {
    this.props.minusQty(productId, orderId)
  }

  calculateOrderTotal() {
    return this.props.cart.products.reduce((sum, product) => {
      const qty = product.orderItems.quantity;
      const price = product.price / 100.0;
      return sum + price * qty;
    }, 0);
  }

  toggleCheckout() {
    this.setState({ showCheckout: !this.state.showCheckout });
  }

  render() {
    const products = this.props.cart.products;
    console.log("STATE", this.props);
    if (!products) {
      return <div>There are no items here to show</div>;
    } else {
      return (
        <div>
          <h1>Your Cart</h1>
          <div className="cartItem">
            {products.map((product) => {
              return (
                <div key={product.id}>
                  <p>{product.name}</p>
                  <img src={product.imageURL} />
                  <p>Price: {product.price / 100}</p>
                  <div>
                    <p>Quantity: {product.orderItems.quantity}</p>
                    <button onClick = {() => this.handleAdd(product.id, this.props.cart.id)}>+</button> <button onClick = {() => this.handleMinus(product.id, this.props.cart.id)}>-</button>
                  </div>
                  <button
                    onClick={() =>
                      this.handleDelete(product.id, this.props.cart.id)
                    }
                  >
                    X
                  </button>
                </div>
              );
            })}
            {/* show order total */}
            <div>Order Total: ${this.calculateOrderTotal()}.00</div>
            {this.state.showCheckout && (
              <StripeContainer orderTotal={this.calculateOrderTotal() * 100} />
            )}
          </div>

          <button onClick={this.toggleCheckout}>Checkout</button>
        </div>
      );
    }
  }
}

//connect to state when ready

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    auth: state.auth,
    isLoggedIn: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  console.log('dispatch: ', dispatch)
  return {
    loadCart: () => dispatch(getCart()),
    removeItem: (productid, orderid) =>
      dispatch(removeItem(productid, orderid)),
    addQty: (productid, orderid) => {
    dispatch(incrementQty(productid, orderid))},
    minusQty: (productid, orderid) => {
      dispatch(decrementQty(productid, orderid))
    }
  };
};
// // here - anon function calls thunk to retrieve data + update state via reducer (PUT route for users)
// const mapDispatchToProps = () => {}
// two anon functions attached to two buttons .... ugh do these buttons also have to distinguish btwn logged in and not logged in?

// don't forget to export!!!
export default connect(mapStateToProps, mapDispatch)(Cart);

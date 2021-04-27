import React from 'react';
import { connect } from 'react-redux'; // this is to connect to redux state
import { Link } from 'react-router-dom'; // this is to link to checkout
import { removeItem, adjustQuantity, getCart } from '../store/cart';
import StripeContainer from './StripeContainer';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = { showCheckout: false };
    this.toggleCheckout = this.toggleCheckout.bind(this);
  }

  componentDidMount() {
    this.props.loadCart();
  }
  handleDelete(productid, orderid) {
    this.props.removeItem(productid, orderid);
  }

  toggleCheckout() {
    this.setState({ showCheckout: !this.state.showCheckout });
  }

  render() {
    const products = this.props.cart.products;
    //console.log("these prods", products[0].name);
    if (!products) {
      return <div>There are no items here to show</div>;
    } else {
      return (
        <div>
          <h1>the cart</h1>
          <div className="cartItem">
            {products.map((product) => {
              return (
                <div key={product.id}>
                  <p>{product.name}</p>
                  <img src={product.imageURL} />
                  <p>Price: {product.price / 100}</p>
                  <div>
                    <p>Quantity: {product.orderItems.quantity}</p>
                    <button>+</button> <button>-</button>
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
            {/* {this.state.showCheckout && <StripeContainer />} */}
            {this.state.showCheckout && (
              <StripeContainer cart={this.props.cart} />
            )}
          </div>

          {/* <Link to={'/checkout'}> */}
          <button onClick={this.toggleCheckout}>Checkout</button>
          {/* </Link> */}
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
  return {
    loadCart: () => dispatch(getCart()),
    removeItem: (productid, orderid) =>
      dispatch(removeItem(productid, orderid)),
  };
};
// // here - anon function calls thunk to retrieve data + update state via reducer (PUT route for users)
// const mapDispatchToProps = () => {}
// two anon functions attached to two buttons .... ugh do these buttons also have to distinguish btwn logged in and not logged in?

// don't forget to export!!!
export default connect(mapStateToProps, mapDispatch)(Cart);

import React from "react";
import { connect } from "react-redux"; // this is to connect to redux state
import { Link } from "react-router-dom"; // this is to link to checkout
import { removeItem, adjustQuantity, getCart } from "../store/cart";
class Cart extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // if (this.props.cart.length < 1){
    // this.props.loadCart()
    // }
    this.props.loadCart();
  }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.robot.id !== this.props.robot.id) {
  //     this.setState({
  //       name: this.props.robot.name || "", // update our state with the todo I fetched from the server
  //       // simulates auto-populate
  //       fuelLevel: this.props.robot.fuelLevel || "",
  //     });
  //   }
  // }

  render() {
    const products = this.props.cart.products;
    //console.log("these prods", products[0].name);
    if (!products) {
      return <div>There are no items here to show</div>;
    } else {
      return (
        <div>
          <h1>hello i shall be the cart</h1>
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
                  <button>X</button>
                </div>
              );
            })}
          </div>

          <Link to={"/checkout"}>
            <button>Checkout</button>
          </Link>
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
  };
};
// // here - anon function calls thunk to retrieve data + update state via reducer (PUT route for users)
// const mapDispatchToProps = () => {}
// two anon functions attached to two buttons .... ugh do these buttons also have to distinguish btwn logged in and not logged in?

// don't forget to export!!!
export default connect(mapStateToProps, mapDispatch)(Cart);

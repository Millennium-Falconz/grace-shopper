import React from "react";
import { connect } from "react-redux"; // this is to connect to redux state
import { Link } from "react-router-dom"; // this is to link to checkout
import { removeItem, adjustQuantity } from "../store/cart";
class Cart extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {}
  // make sure to

  render() {
    console.log("props: ", this.props);
    return (
      <div>
        <h1>hello i shall be the cart</h1>
        <ul>
          {/* here -  this.props.map over items in state.cart. make it a div 
                so that there can be qty and remove (both need event handlers)
                goal is to show list of items in cart. can divs be part of ul? */}
        </ul>
        {/* here - need to add react link to redirect to checkout */}
        <Link to={"/checkout"}>
          <button>Checkout</button>
        </Link>
      </div>
    );
  }
}

//connect to state when ready

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

// // here - anon function calls thunk to retrieve data + update state via reducer (PUT route for users)
// const mapDispatchToProps = () => {}
// two anon functions attached to two buttons .... ugh do these buttons also have to distinguish btwn logged in and not logged in?

// don't forget to export!!!
export default connect(mapStateToProps, null)(Cart);

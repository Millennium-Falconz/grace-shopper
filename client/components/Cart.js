import React from "react";
import { connect } from "react-redux"; // this is to connect to redux state
import { Link } from "react-router-dom"; // this is to link to checkout
// need to import thunk from cart.js

class Cart extends React.Component {
  render() {
    <div>
      <ul>
        {/* here -  this.props.map over items in state.cart. make it a div 
                so that there can be qty and remove (both need event handlers)
                goal is to show list of items in cart. can divs be part of ul? */}
      </ul>
      {/* here - need to add react link to redirect to checkout */}
      <button>Checkout</button>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return state;
};

// here - anon function calls thunk to retrieve data + update state via reducer (PUT route for users)
const mapDispatchToProps = () => {};

// don't forget to export!!!
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

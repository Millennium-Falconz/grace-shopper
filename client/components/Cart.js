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
    this.props.loadCart()
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
    console.log("rendering ", this.props);
    return (
      <div>
        <h1>hello i shall be the cart</h1>
        <div>
          {/* {this.props.cart.products.map((item,index) => {
            console.log('itemsssssss', item)
            return <p key = {index}>{item.id} HELLO WE MAPPING</p>
          })} */}
          {/* here -  this.props.map over items in state.cart. make it a div 
                so that there can be qty and remove (both need event handlers)
                goal is to show list of items in cart. can divs be part of ul? */}
        </div>
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
    auth: state.auth,
    isLoggedIn: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
return {
  loadCart: () => dispatch(getCart())
}
}
// // here - anon function calls thunk to retrieve data + update state via reducer (PUT route for users)
// const mapDispatchToProps = () => {}
// two anon functions attached to two buttons .... ugh do these buttons also have to distinguish btwn logged in and not logged in?

// don't forget to export!!!
export default connect(mapStateToProps, mapDispatch)(Cart);

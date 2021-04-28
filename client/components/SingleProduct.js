import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { addItem } from "../store/cart";

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    try {
      this.props.loadProduct(this.props.match.params.id);
    } catch (err) {
      console.log(err);
    }
  }
  handleClick(event) {
    event.preventDefault();
    // const test = event.tartget.value;
    //HERE - before calling thunk for adding/adjusting, call getCart. if there is an order w/in cart status, put. if not post.
    this.props.addToCart(this.props.match.params.id);
  }
  //first - check (isLoggedIn) OR (username)
  //if true => call thunk
  // if not => update state and ....save to local storage?

  render() {
    const pokemon = this.props.singlePokemon;

    // const { handleClick } = this;
    console.log('state', this.props)
    console.log('types: ', pokemon.types)
    return (
      <div className="singlePoke">
        <h1>Name: {pokemon.name}</h1>
        {/* <h3>Description: {pokemon.description}</h3> */}
        <h2>Price: ${pokemon.price/100}.00</h2>
        <img id = 'singlePokeImage' src={pokemon.imageURL} />
        <h3>Type: 
          {pokemon.types}
          </h3>
        <button onClick={(event) => this.handleClick(event)}>
          Add To Cart
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    singlePokemon: state.singlePokemon,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("in mapDispatch");
  return {
    loadProduct: (id) => dispatch(fetchSingleProduct(id)),

    addToCart: (productId) => dispatch(addItem( productId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

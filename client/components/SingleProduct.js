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
    // console.log("event.target.value: ", this.props);
    // console.log("this is props: ", this.props);

    // console.log("this is props.singlePokemon", this.props.singlePokemon);
    // if(this.props.cart) {

    // }
    this.props.addToCart(event.target.value);
  }
  //first - check (isLoggedIn) OR (username)
  //if true => call thunk
  // if not => update state and ....save to local storage?

  render() {
    const pokemon = this.props.singlePokemon;

    return (
      <div className="singlePoke">
        <h1>Name: {pokemon.name}</h1>
        <h3>Description: {pokemon.description}</h3>
        <h2>Price: {pokemon.price}</h2>
        <img src={pokemon.imageURL} />
        <h3>Type: {pokemon.types}</h3>
        <button value={pokemon} onClick={this.handleClick}>
          Add To Cart
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    singlePokemon: state.singlePokemon,
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("in mapDispatch");
  return {
    loadProduct: (id) => dispatch(fetchSingleProduct(id)),
    addToCart: (pokemon) => dispatch(addItem(pokemon)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

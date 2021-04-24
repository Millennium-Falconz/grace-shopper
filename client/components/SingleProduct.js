import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { addItem } from "../store/cart";

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    try {
      this.props.loadProduct(this.props.match.params.id);
    } catch (err) {
      console.log(err);
    }
  }
  handleClick() {}
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
        <button onClick={this.handleClick}>Add To Cart</button>
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
  return {
    loadProduct: (id) => dispatch(fetchSingleProduct(id)),
    // here addCart: (id) => dispatch(addItem(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";

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
  render() {
    const pokemon = this.props.singlePokemon;
    return (
      <div className='singlePoke'>
        <h1>Name: {pokemon.name}</h1>
        <h3>Description: {pokemon.description}</h3>
        <h2>Price: {pokemon.price}</h2>
        <img src={pokemon.imageURL} />
        <h3>Type: {pokemon.type}</h3>
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

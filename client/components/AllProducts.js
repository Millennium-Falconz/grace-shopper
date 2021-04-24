import React from 'react';
import { connect } from 'react-redux';
import { loadAllPokemon } from '../store/allproducts';
import { Link } from 'react-router-dom';

export class AllProducts extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    return (
      <div className="pokemonlist">
        <h1>All Pokemon</h1>
        {this.props.pokemon.map((pokemon) => {
          return (
            <div key={pokemon.id} className="pokemonContainer">
              <img className="pokeimage" src={pokemon.imageURL} />
              <Link to={`/pokemon/${pokemon.id}`}>
                <h3>{pokemon.name}</h3>
              </Link>

              <h4>Type:</h4>
              <ul>
                <p>
                  {pokemon.types.map((type) => {
                    return <li key={type}>{type}</li>;
                  })}
                </p>
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  pokemon: state.pokemon,
});

const mapStateToDispatch = (dispatch) => {
  return {
    loadProducts: () => dispatch(loadAllPokemon()),
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(AllProducts);

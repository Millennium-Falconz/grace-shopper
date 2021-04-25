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
        {this.props.pokemon.map((pokemon) => {
          return (
            <Link to={`/pokemon/${pokemon.id}`}>
            <div key={pokemon.id} className="pokemonContainer">
              <img className="pokeimage" src={pokemon.imageURL} />
              
                <h3>{pokemon.name}</h3>
              
              <div className='here'>
                <p>
                  {pokemon.types.map((type) => {
                    return <div key={type}>{type}</div>;
                  })}
                </p>
              </div>
            </div>
            </Link>
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

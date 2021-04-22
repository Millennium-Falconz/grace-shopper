import React from "react";
import { connect } from "react-redux";
import { loadAllPokemon } from "../store/allproducts";
import { Link } from "react-router-dom";

export class AllProducts extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    console.log("all", this.props);
    return (
      <div>
        <h1>All Pokemon</h1>
        {this.props.pokemon.map((pokemon) => {
          return (
            <div key={pokemon.id}>
              <img src={pokemon.imageURL} />
              <Link to={`/pokemon/${pokemon.id}`}>
                <h1>{pokemon.name}</h1>
              </Link>
              <ul>
                <h3>
                  Type:{" "}
                  {pokemon.types.map((type) => {
                    return <li key={type}>{type}</li>;
                  })}
                </h3>{" "}
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

import React from "react";
import { connect } from "react-redux";
import {
  loadAllPokemon,
  createNewPokemon,
  deleteThePokemon,
  updateThePokemon,
} from "../store/allproducts";
import { Link } from "react-router-dom";

export class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
  }

  componentDidMount() {
    this.props.loadProducts();
  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.addPokemon({ ...this.state });
  }

  handleSubmitEdit(event) {
    event.preventDefault();
    this.props.editPokemon({ ...this.props.pokemon, ...this.state });
  }
  render() {
    let color = "";
    const { handleSubmit, handleChange, handleSubmitEdit } = this;
    const { name } = this.state;
    const pokemon = this.props.pokemon;

    const amAdmin =
      this.props.auth.userType === "admin" 
    return (
      <>
       
        <div className="pokemonlist">
        {amAdmin ? (
                <>
                <>
                        <button
                          type="button"
                          className="create"
                          onClick={function myFunction() {
                            var x = document.getElementById("myForm");
                            if (x.style.display === "none") {
                              x.style.display = "block";
                            } else {
                              x.style.display = "none";
                            }
                          }}
                        >
                          Create New Pokemon
                        </button>
                      </>
                  <div className="form-popup" id="myForm">
                    <form id="pokemon-form" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="pokemonname">Create New Pokemon </label>
                  <input
                    name="name"
                    onChange={handleChange}
                    value={name}
                    placeholder="New Pokemon Name"
                  />
                  <button type="submit" onClick={() => {
                              var x = document.getElementById("myForm");
                              if (x.style.display === "none") {
                              x.style.display = "block";
                            } else {
                              x.style.display = "none";
                            }
                            }}> Submit</button>
                </div>
              </form>
                  </div>
                  </>
                ) : (
                  <></>
                )}
          {this.props.pokemon.map((pokemon) => {
            return (
              <div key={pokemon.id}>
                <div className="pokemonContainer">
                  {amAdmin ? (
                    <React.Fragment>
                      <button
                        type="button"
                        className="allpokedel"
                        onClick={() => this.props.deletePokemon(pokemon.id)}
                      >
                        
                        x
                      </button>
                    </React.Fragment>
                  ) : (
                    <></>
                  )}
                  <Link to={`/pokemon/${pokemon.id}`}>
                    <img className="pokeimage" src={pokemon.imageURL} />
                    <h3>{pokemon.name}</h3>
                    <div className="here">
                      <div>
                        {pokemon.types.map((type) => {
                          if (type === "grass") {
                            color = "rgb(119, 199, 81)";
                          }
                          if (type === "water") {
                            color = "rgb(101, 145, 240)";
                          }
                          if (type === "poison") {
                            color = "rgb(160, 63, 160)";
                          }
                          if (type === "ground") {
                            color = "rgb(225,191,101)";
                          }
                          if (type === "bug") {
                            color = "rgb(170, 182, 34)";
                          }
                          if (type === "fire") {
                            color = "rgb(239, 126, 50)";
                          }
                          if (type === "fighting") {
                            color = "rgb(179, 59, 45)";
                          }
                          if (type === "normal") {
                            color = "rgb(166, 168, 119)";
                          }
                          if (type === "flying") {
                            color = "rgb(168, 145, 235)";
                          }
                          if (type === "psychic") {
                            color = "rgb(249 ,84 , 140)";
                          }
                          if (type === "electric") {
                            color = "rgb(243, 208, 44)";
                          }
                          if (type === "fairy") {
                            color = "rgb(236, 153, 173)";
                          }
                          if (type === "rock") {
                            color = "rgb(182, 161, 56)";
                          }
                          if (type === "steel") {
                            color = "rgb(184, 185, 206)";
                          }
                          if (type === "ice") {
                            color = "rgb(151, 215, 215)";
                          }
                          return (
                            <div
                              key={type}
                              id="type"
                              style={{ background: color }}
                            >
                              {type}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  pokemon: state.pokemon,
  auth: state.auth,
});

const mapStateToDispatch = (dispatch, { history }) => {
  return {
    loadProducts: () => dispatch(loadAllPokemon()),
    addPokemon: (pokemon) => dispatch(createNewPokemon(pokemon, history)),
    editPokemon: (pokemon) => dispatch(updateThePokemon(pokemon, history)),
    deletePokemon: (id) => dispatch(deleteThePokemon(id, history)),
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(AllProducts);

import axios from "axios";
// action types
const FETCH_POKEMON = "FETCH_POKEMON";
const ADD_POKEMON = "ADD_POKEMON";
const EDIT_POKEMON = "EDIT_POKEMON";
const DELETE_POKEMON = "DELETE_POKEMON";
// action creators

const fetchPokemon = (pokemon) => ({
  type: FETCH_POKEMON,
  pokemon,
});
const deletePokemon = (pokemon) => ({
  type: DELETE_POKEMON,
  pokemon,
});

const createPokemon = (pokemon) => ({
  type: ADD_POKEMON,
  pokemon,
});

const updatePokemon = (pokemon) => ({
  type: EDIT_POKEMON,
  pokemon,
});

export const createNewPoke = (pokemon, history) => {
  return async (dispatch) => {
    const { data: created } = await axios.post("/api/robots/create", robot);
    dispatch(createRobot(created));
    history.push("/robots");
  };
};
//

export const deleteTheRobot = (id, history) => {
  return async (dispatch) => {
    const { data: robot } = await axios.delete(`/api/robots/${id}`);
    dispatch(deleteRobot(robot));
    history.push("/");
    history.push("/robots");
  };
};

export const updateTheRobot = (robot, history) => {
  return async (dispatch) => {
    const { data: updated } = await axios.put(
      `/api/robots/edit/${robot.id}`,
      robot
    );
    dispatch(updateRobot(updated));
    history.push("/");
  };
};
//thunks
export const loadAllPokemon = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/pokemon");
      dispatch(fetchPokemon(data));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];
//reducer
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POKEMON:
      return action.pokemon;

    default:
      return state;
  }
}

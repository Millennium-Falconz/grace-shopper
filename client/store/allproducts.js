import axios from 'axios'
import getAuthHeaderWithToken from "./helpers";
// action types 
const FETCH_POKEMON = 'FETCH_POKEMON'
const ADD_POKEMON = 'ADD_POKEMON'
const EDIT_POKEMON = 'EDIT_POKEMON'
const DELETE_POKEMON = 'DELETE_POKEMON'
// action creators

const fetchPokemon = (pokemon) => ({
type: FETCH_POKEMON,
pokemon
})
const deletePokemon = (pokemon) => ({
type: DELETE_POKEMON,
pokemon
})

const createPokemon = (pokemon) => ({
type: ADD_POKEMON,
pokemon
})

const updatePokemon = (pokemon) => ({
type: EDIT_POKEMON,
pokemon
})
//create thunk
export const createNewPokemon = (pokemon, history) => {
  console.log("pokemon", pokemon)
    return async (dispatch) => {
        const headers = getAuthHeaderWithToken();
      const {data: created} = await axios.post('/api/pokemon', pokemon, headers)
      dispatch(createPokemon(created))
       history.push('/pokemon')
    }}

//delete thunk
export const deleteThePokemon = (id, history) => {
      return async (dispatch) => {
        const headers = getAuthHeaderWithToken();
        const {data: pokemon} = await axios.delete(`/api/pokemon/${id}`, headers)
        dispatch(deletePokemon(pokemon))
        history.push('/')
        history.push('/pokemon')
      }
    }
//update thunk
export const updateThePokemon = (pokemon, history) => {
      return async (dispatch) => {
        const headers = getAuthHeaderWithToken();
        const {data: updated} = await axios.put(`/api/pokemon/${pokemon.id}`, headers)
        dispatch(updatePokemon(updated));
        history.push('/pokemon')
      }
    }
//thunk
export const loadAllPokemon = () => { return async (dispatch) => {
    try {
        const {data} = await axios.get('/api/pokemon')
        dispatch(fetchPokemon(data))
    } catch (err) {
        console.log(err)
    }
}}

const initialState = []
//reducer 
 export default function productsReducer(state = initialState, action){
    switch(action.type){
         case FETCH_POKEMON: 
         return action.pokemon
         
         case DELETE_POKEMON:
            return state.filter((pokemon) => pokemon.id !== action.pokemon.id)
         
         case ADD_POKEMON:
            return [...state, action.pokemon]
        
         case EDIT_POKEMON:
            state = []
            return state.map((pokemon) => {return pokemon.id === action.pokemon.id ? action.pokemon : pokemon})
        default: 
         return state
        }
 }
import axios from 'axios'
// action types 
const FETCH_POKEMON = 'FETCH_POKEMON'

// action creators

const fetchPokemon = (pokemon) => {
    return {
    type: FETCH_POKEMON,
    pokemon
    }
}

//thunks 
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
         
         default: 
         return state
        }
 }
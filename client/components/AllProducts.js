import React from 'react'
import { connect } from 'react-redux'
import { loadAllPokemon } from '../store/allproducts'
export class AllProducts extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount () {
    this.props.loadProducts()
    }

    render(){
        return(
            <div>
                <h1>All Pokemon</h1>
                {this.props.pokemon.map((pokemon) => {
                    return (
                        <div key= {pokemon.id}>
                            <img src={pokemon.imageURL} />
                            <h1>{pokemon.name}</h1>
                            <h3>Type: {pokemon.type}</h3>
                        </div>
                    )
                })}
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
pokemon: state.pokemon
})

const mapStateToDispatch = (dispatch) => {
return {
loadProducts : () => dispatch(loadAllPokemon())
}}

export default connect(mapStateToProps, mapStateToDispatch)(AllProducts)
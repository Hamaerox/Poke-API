import React from 'react'
import PickGeneration from './PickGeneration'
import Pokemon from './Pokemon'

class PokemonList extends React.Component {
    constructor(props) {
        super(props)
        this.handleGenChange = this.handleGenChange.bind(this)
        this.state = {
            pokemon: [],
            generation: "Generation One",
            currentPokemon: 0
        }
    }

    handleGenChange(generation) {
        this.setState({ generation })
    }

    getPokemon() {
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=386", {
        method: "GET"
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                this.setState({
                    pokemon: json.results
                })
                })
            }
        })
    }

    componentDidMount() {
        this.getPokemon()
    }

    render() {
        let { pokemon, generation } = this.state;
        if (generation === "Generation One") {
        pokemon = pokemon.slice(0, 151);
        } else if (generation === "Generation Two") {
        pokemon = pokemon.slice(151, 251);
        } else {
        pokemon = pokemon.slice(251, 386);
        }

        let pokemonList;
        pokemonList = (
        <div>
            <PickGeneration onGenerationChange={this.handleGenChange} />
            <div className="pokemon-container">
            {pokemon.map((monster, index) =>
                <Pokemon key={monster.name} id={index + 1} pokemon={monster.name} />
            )}
            </div>
        </div>
        )
        return (
            <div>
                {pokemonList}
            </div>
        )}
}

export default PokemonList
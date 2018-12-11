import React, {Component} from 'react'
import axios from 'axios'
import PropTypes from "prop-types"
import uuid from 'uuid/v4'

class Home extends Component{
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array)
      }
      static defaultProps = {
        suggestions: []
      }
      constructor(props) {
        super(props)
        this.state = {
            suggestions: [],
            name: [],
            pokemon: [],
            found: '',
            pokePic: '',
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: "",
            
        }
    }

    handleChange = e => {
        const { name, value} = e.target
        const { suggestions } = this.props
        const filteredSuggestions = suggestions.filter(
          suggestion =>
            suggestion.name.slice(0, this.state.userInput.length) === this.state.userInput.toLowerCase()
            // suggestion.name.toLowerCase().indexOf(this.state.userInput.toLowerCase()) > -1
        )
        this.setState({
          activeSuggestion: 0,
          filteredSuggestions,
          showSuggestions: true,
          [name]: value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        const id = this.state.userInput.toLowerCase()
        const found = this.state.pokemon.find(poke => poke.name === id)
        if(found){
            this.setState(prevState => {
                return {
                    found: prevState.pokemon.find(poke => poke.name === id)
                }
        })
            axios.get(found.url).then(response => {
                this.setState({pokePic: response.data.sprites.front_shiny})
            }) 
        } else {
            alert('No Pokemon by that name found. Please check your spelling and try again.')
        }
    }

    componentDidMount(){
        axios.get(`https://pokeapi.co/api/v2/pokemon-form/`).then(response => {
            this.setState({
                pokemon: response.data.results
            })
        })
    }
  
    onClick = e => {
        this.setState({
          activeSuggestion: 0,
          filteredSuggestions: [],
          showSuggestions: false,
          userInput: e.currentTarget.innerText
        })
      }
     
      onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state
        if (e.keyCode === 9) {
          this.setState({
            activeSuggestion: 0,
            showSuggestions: false,
            userInput: filteredSuggestions[activeSuggestion]
          })
        } else if (e.keyCode === 38) {
        if (activeSuggestion === 0) {
            return
        }
            this.setState({ activeSuggestion: activeSuggestion - 1 })
        } else if (e.keyCode === 40) {
        if (activeSuggestion - 1 === filteredSuggestions.length) {
            return
        }
          this.setState({ activeSuggestion: activeSuggestion + 1 })
        }
      }

    render(){
        const {
            handleChange,
            onClick,
            onKeyDown,
            state: {
              activeSuggestion,
              filteredSuggestions,
              showSuggestions,
              userInput
            }
          } = this
          let suggestionsListComponent
          if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
              suggestionsListComponent = (
                <ul className="suggestions">
                  {filteredSuggestions.map((suggestion, index) => {
                    let className
                    if (index === activeSuggestion) {
                      className = "suggestion-active"
                    }
                    return (
                      <li
                        className={className}
                        key={suggestion.id}
                        onClick={onClick}
                      >
                        {suggestion.name}
                      </li>
                    )
                  })}
                </ul>
              )
            } else {
              suggestionsListComponent = (
                <div className="no-suggestions">
                  <em>No suggestions, you're on your own!</em>
                </div>
              )
            }
        }

        this.state.pokemon.forEach((pokemons) => {
            const obj = {
                name: pokemons.name,
                id: uuid()
            }
            this.props.suggestions.push(obj)
        })

        return(
            <div className='pokeContainer'>   
                    <h1>Welcome to the Poke Search</h1>
                    <br></br>
                    <h3>Here, you can search your favorite pokemon</h3>
                    <div className='searchDiv'>
                        <form className='searchForm' onSubmit={this.handleSubmit}>
                            <input 
                                autoComplete='off'
                                type='text' 
                                placeholder='Pokemon Name' 
                                name='userInput'
                                onChange={handleChange}
                                value={userInput}
                                onKeyDown={onKeyDown}/>
                                {suggestionsListComponent}
                            <button className='pokeBut'><img className='pokeball' src='https://sickr.files.wordpress.com/2013/09/pokeball.png'/></button>
                        </form>
                    </div>
                    <div className='pokeSearch'>
                        <h2>{this.state.found.name}</h2>
                    </div>
                    <div className='pokeImg'>
                        <img src={this.state.pokePic} alt=""/>
                    </div>
            </div>
        )
    }
}

export default Home
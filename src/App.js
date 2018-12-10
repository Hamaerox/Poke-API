import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import Menubar from './Menubar'
import Popup from 'reactjs-popup'
import PokemonList from './PokemonList'

class App extends Component{
    render(){
        const styles = {
            fontFamily: "sans-serif",
            textAlign: "center",
            marginTop: "40px"
          };
          const contentStyle = {
            background: "rgba(255,255,255,0",
            width: "80%",
            border: "none"
          };
    return(
        <div>
            <header></header>
            <div style={styles}>
                <Popup
                    modal
                    overlayStyle={{ background: "rgba(255,255,255,0.98" }}
                    contentStyle={contentStyle}
                    closeOnDocumentClick={false}
                    trigger={open => <Menubar open={open} />}
                >
                    {close => <Navbar close={close}/>}
                </Popup>
            </div>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/pokemonlist' component={PokemonList}/>
                    <Route path='/about' component={About}/>
                    <Route path='/contact' component={Contact}/>
                </Switch>
        </div>
    )
}
}

export default App
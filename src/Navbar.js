import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = (props) => {
    return (
        <div>
            <div className='navColor'>
            <Link to='/' onClick={props.close}>Home</Link>
            <Link to='/pokemonlist' onClick={props.close}>PokeDex</Link>
            <Link to='/about' onClick={props.close}>About</Link>
            <Link to='/contact' onClick={props.close}>Contact</Link>
            </div>
        </div>
    )
}


export default Navbar
import React from 'react'

const Contact = () => {
    return(
        <div>
            <div className='contactDiv'>
            <img className='articuno' src='http://pokestadium.com/sprites/xy/articuno.gif'/>
                <div className='contactForm'>
                    <form id='order' method='post' action='mailto: timd1026@gmail.com'>
                        <input className='fName' type='text' placeholder='First Name' name='fName' /><br></br>
                        <input className='lName' type='text' placeholder='Last Name' name='lName' /><br></br>
                        <input className='email' type='text' placeholder='Email Address' name='email' /><br></br>
                        <textarea className='description' type='text' placeholder='Brief Description of why you are contacting me(:' name='description'></textarea><br></br>
                        <input type='submit'  value='Send'/>
                    </form>
                </div>
                <img className='lugia' src='http://pokestadium.com/sprites/xy/lugia.gif'/>
            </div>
            <img className='moltres' src='http://pokestadium.com/sprites/xy/moltres.gif'/>
            <img className='zapdos' src='http://pokestadium.com/sprites/xy/zapdos.gif'/>
        </div>
    )
}

export default Contact
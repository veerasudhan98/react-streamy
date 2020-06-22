import React from 'react'
import {Link} from 'react-router-dom'
import GoogleAuth from './GoogleAuth'

const Header = () =>{
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">
                Streamers
            </Link>
            <Link to="/streams/show" className="item">
                All Streams
            </Link>
            <div className="right menu">
                <GoogleAuth/>    
            </div>    
            
        </div>
    )
}

export default Header
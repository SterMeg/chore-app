import React from 'react';
import Nav from './Nav';
import Login from './Login';

const Navbar = (props) => {
    return (
        <div className="navbar">
            <Nav />
            <Login 
                loggedIn={props.loggedIn}
                loginWithGoogle={props.loginWithGoogle}
                logout={props.logout}
            />
        </div>
    )
}

export default Navbar;
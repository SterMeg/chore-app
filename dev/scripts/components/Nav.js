import React from 'react';
import {
    Link,
    NavLink
} from "react-router-dom";
import Login from './Login';


const Nav = (props) => {
    return (
    <ul className="nav">
        <li className="nav-item">
            <NavLink exact
                to="/"
                activeStyle={{
                    fontWeight: 'bold',
                    color: '#F0C808'
                }}
                className="nav-link">Home</NavLink>
        </li>
        {props.loggedIn &&
        <React.Fragment>
        <li className="nav-item">
            <NavLink to="/DayView" activeStyle={{
                fontWeight: 'bold',
                color: '#F0C808'
            }} className="nav-link">Today's Chores</NavLink>
        </li>
        <li className="nav-item">
            <NavLink to="/EditList" activeStyle={{
                fontWeight: 'bold',
                color: '#F0C808'
            }} className="nav-link">Edit Lists</NavLink>
        </li>
        <li className="nav-item">
            <NavLink to="/Users" activeStyle={{
                fontWeight: 'bold',
                color: '#F0C808'
            }} className="nav-link">Users</NavLink>
        </li>
        </React.Fragment>
        }
        <li className="nav-item">  
            <Login
                loggedIn={props.loggedIn}
                loginWithGoogle={props.loginWithGoogle}
                logout={props.logout} />
        </li>
    </ul>
    
    )
}

export default Nav;
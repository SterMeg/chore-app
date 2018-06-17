import React from 'react';
import {
    Link,
    NavLink
} from "react-router-dom";

const Nav = (props) => {
    return (
    <ul className="nav">
        <li className="nav-item">
            <NavLink exact
                to="/"
                activeStyle={{
                    fontWeight: 'bold',
                    color: 'red'
                }}
                className="nav-link">Home</NavLink>
        </li>
        <li className="nav-item">
            <NavLink to="/DayView" activeStyle={{
                fontWeight: 'bold',
                color: 'red'
            }} className="nav-link">Today's Chores</NavLink>
        </li>
        <li className="nav-item">
            <NavLink to="/EditList" activeStyle={{
                fontWeight: 'bold',
                color: 'red'
            }} className="nav-link">Edit Lists</NavLink>
        </li>
        <li className="nav-item">
            <NavLink to="/Users" activeStyle={{
                fontWeight: 'bold',
                color: 'red'
            }} className="nav-link">Users</NavLink>
        </li>
    </ul>
    )
}

export default Nav;
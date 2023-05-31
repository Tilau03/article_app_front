import React from 'react'
import { NavLink } from 'react-router-dom'

export const Nav = () => {
    return (
        <nav className="nav">
            <ul>
                <li><NavLink to="/inicio">Home</NavLink></li>
                <li><NavLink to="/articulos">Articles</NavLink></li>
                <li><NavLink to="/crear">Create</NavLink></li>
                <li><a href='https://www.linkedin.com/in/lautaro-ricagni-33a57b214/'>Contact</a></li>
            </ul>
        </nav>
    )
}

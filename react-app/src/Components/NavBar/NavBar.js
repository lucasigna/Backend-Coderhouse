import React from 'react'
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  return (
    <header>
        <h1>Aurora</h1>
        <nav>
            <ul>
                <li><NavLink>Remeras</NavLink></li>
                <li><NavLink>Pantalones</NavLink></li>
                <li><NavLink>Zapatillas</NavLink></li>
            </ul>
        </nav>
    </header>
  )
}

import React from "react"
import { NavLink } from "react-router-dom"

const Header = () => (
    //NavLink exact, it works exactly like Route. Another exact in NavLink to override the previous
    <header>
        <h1>Expensify</h1>
        <p><NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink></p>
        <p><NavLink to="/create" activeClassName="is-active">Create expense</NavLink></p>
        <p><NavLink to="/help" activeClassName="is-active">Help</NavLink></p>
    </header>
)

export default Header
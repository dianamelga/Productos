import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
            <NavLink to="/productos" className="navbar-brand" activeClassName="active">
                React CRUD & Routing
                
            </NavLink>

            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink 
                    to="/productos"
                    className="nav-link"
                    activeClassName="active"
                    >Productos</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink 
                    to="/nuevo-producto"
                    className="nav-link"
                    activeClassName="active"
                    >Nuevo Producto</NavLink>
                </li>
            </ul>
        </div>
    </nav>
);

export default Header;
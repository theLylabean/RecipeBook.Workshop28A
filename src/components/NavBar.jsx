import React from "react";
import { Link } from "react-router-dom";
import '../css/navbar.css'

function NavBar(){

    return (
        <nav className='navbar-container'>
            <h2> My Recipe Book</h2>
            <div className='nav-links'>
                <Link to='/'>
                    Home 
                </Link>
                <Link to='recipeList'>
                    Recipe List
                </Link>
                <Link to='login'>
                    Login
                </Link>
                <Link to='account'>
                    Your Account
                </Link>
                <Link to='signUpForm'>
                    Sign Up
                </Link>
            </div>
        </nav>
    )
}

export default NavBar
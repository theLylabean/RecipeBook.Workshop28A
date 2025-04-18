import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import '../css/navbar.css'

function NavBar({ setSearchKeyword }){
    const [searchInput, setSearchInput] = useState('');
    const handleChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        setSearchKeyword(value);
    }

    return (
        <nav className='navbar-container'>
            <h2> My Recipe Book</h2>
            <label>
                Search:
            </label>
            <input
                className='searchbar'
                placeholder='Search by keyword'
                type='text'
                id='search'
                name='search'
                value={searchInput}
                onChange={handleChange}
            />
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
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useNavigate, Routes, Route } from "react-router-dom";
import '../css/navbar.css'

function NavBar({ recipes, currentUser, setCurrentUser }){
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        const filteredRecipes = recipes.filter((recipe) => {
            return recipe.strMeal?.toLowerCase().includes(searchInput.toLowerCase()) ||
            recipe.strArea?.toLowerCase().includes(searchResults) || 
            (recipe.strTags && recipe.strTags.toLowerCase().includes(searchInput.toLowerCase()))
          });
          console.log(filteredRecipes);
          
          setSearchInput(value);
          setSearchResults(filteredRecipes);
        };
        
        const handleLogout = () => {
            setCurrentUser(null);
            localStorage.removeItem('token');
            navigate('/');
        };
        
        return (
            <div>
            <h2> My Recipe Book</h2>
            <nav className='navbar-container'>
                <div className='search-container'>
                    <label htmlFor='search'>
                        Search:
                    <input
                        className='searchbar'
                        placeholder='Search by keyword'
                        type='text'
                        id='search'
                        name='search'
                        value={searchInput}
                        onChange={handleChange}
                        onBlur={(e) => {
                            setTimeout(() => {
                                if (
                                    dropdownRef.current &&
                                    !dropdownRef.current.contains(document.activeElement)
                                ) {
                                    setSearchInput('')
                                    setSearchResults([]);
                                }
                            }, 150);
                        }}
                        />
                    </label>
                        {searchInput.length > 0 && searchResults.length > 0 && (
                            <ul ref={dropdownRef} className='dropdown'>
                                {searchResults && searchResults.map((result) => (
                                    <li 
                                    key={result.idMeal}
                                    onMouseDown={() => {
                                        setSearchInput('');
                                        setSearchResults([]);
                                        navigate(`/recipe/${result.idMeal}`)
                                        console.log('Clicked:', result);
                                    }}
                                    >
                                        {result.strMeal}
                                    </li>
                                ))}
                            </ul>
                        )}
            </div>
                <div className='nav-links'>
                    <Link to='/'>
                        Home 
                    </Link>
                    <Link to='recipeList'>
                        Recipe List
                    </Link>
                    {currentUser ? (
                        <>
                            <Link to='/newuser-recipe'>
                                CYOR
                            </Link>
                            <Link to='account'>
                                Your Account
                            </Link>
                            <button 
                                className='logout-button' 
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to='login'>
                                Login
                            </Link>
                            <Link to='signUpForm'>
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
        </nav>
        </div>
    );
}

export default NavBar
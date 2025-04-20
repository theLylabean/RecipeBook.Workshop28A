import React, { useRef } from "react";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import '../css/navbar.css'

function NavBar({ recipes, setSelectedRecipe }){
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
    }

    return (
        <nav className='navbar-container'>
            <h2> My Recipe Book</h2>
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
                                setSearchResults([]);
                            }
                        }, 100);
                    }}
                />
                </label>
                    {searchInput.length > 0 && searchResults.length > 0 && (
                        <ul ref={dropdownRef} className='dropdown'>
                            {searchResults && searchResults.map((result) => (
                                <li 
                                    key={result.idMeal}
                                    onClick={() => {
                                        setSelectedRecipe(result)
                                        setSearchInput('');
                                        setSearchResults([]);
                                        navigate(`/recipe/${result.idMeal}`)
                                    }}
                                >
                                    {result.strMeal}
                                </li>
                            ))}
                        </ul>
                    )}
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
    );
}

export default NavBar
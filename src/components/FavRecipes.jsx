import { useState, useEffect } from 'react';
import '../css/favRecipes.css'
import { useNavigate } from 'react-router-dom';
import fallbackImage from '../pictures/kirb4.webp'

const FavRecipes = ({ favRecipes, setFavRecipes, token, handleClick }) => {
    const navigate = useNavigate();
    const [isLoadingFaves, setIsLoadingFaves] = useState(true);

    const removeFavourite = async (favouriteId) => {
        try {
            const res = await fetch(`https://fsa-recipe.up.railway.app/api/favorites/${favouriteId}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            });

            if (!res.ok) throw new Error('Failed to delete favourite');
            setFavRecipes((prev) => prev.filter((fav) => fav.id !== favouriteId));
        } catch (error) {
            console.error('Error removing favourite:', error);
        }
    };

    
    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                const res = await fetch("https://fsa-recipe.up.railway.app/api/favorites", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                const result = await res.json();
                console.log('Fetched favourites:', result);
                setFavRecipes(result.data);
            } catch (error) {
                console.error('Failed to fetch favourite recipes:', error);
            } finally {
                setIsLoadingFaves(false);
            }
        };
        
        if (token) fetchFavourites();
    }, [token, isLoadingFaves, setFavRecipes]);
    
    if (isLoadingFaves) return <p>Loading your favourite recipes!</p>

    return (
        <div className='favRecipes-container'>
            <h1>Your Favourite Recipes</h1>
            {Array.isArray(favRecipes) && favRecipes.length === 0 ? (
                <div className='empty-favourites'>
                    <p>You do not have any favourite recipes yet!</p>
                    <p>Please go back to the recipe list and mark your favourite recipe, then come back and it will appear here.</p>
                    <button className='favRecipes-button' onClick={() => navigate('/recipeList')}>
                        Go to Recipe List
                    </button>
                </div>
            ) : (
                <div className='recipes-container'>
                    {favRecipes.map((recipe) => (
                        <div key={recipe.id} className='recipe-card'>
                                <h2>
                                    <u>{recipe.strMeal}</u>
                                </h2>
                                <img 
                                    className='recipe-img'
                                    src={recipe.strMealThumb}
                                    onError={(e) => {
                                        e.target.onerror = null; // Prevent infinite loop in case fallback fails
                                        e.target.src = fallbackImage; 
                                    }} />
                                <br />
                                <button onClick={() => removeFavourite(recipe.id)}>
                                    Remove Favourite
                                </button>
                                &nbsp;
                                <button onClick={() => navigate(`/recipe/${recipe.idMeal}`)}>
                                    More Info
                                </button>
                            </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavRecipes
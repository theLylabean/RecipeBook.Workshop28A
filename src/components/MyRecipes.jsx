import { useState, useEffect } from 'react';
import '../css/favRecipes.css'
import { useNavigate } from 'react-router-dom';
import fallbackImage from '../pictures/kirb4.webp'

const MyRecipes = ({ token, newUserRecipe, setNewUserRecipe, favRecipes, setFavRecipes }) => {
    const navigate = useNavigate();
    const [isLoadingUserRecipes, setIsLoadingUserRecipes] = useState(true);

    const addToFavourites = async (addUserRecipe) => {
        try {
            const res = await fetch("https://fsa-recipe.up.railway.app/api/favorites", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  mealId: addUserRecipe.idMeal,
                  name: addUserRecipe.strMeal,
                  imageUrl: addUserRecipe.strMealThumb,
                  strArea: addUserRecipe.strArea,
                })
            });

            const result = await res.json();
            console.log(result.message);
            setFavRecipes((prev) => [...prev, result.data])
        } catch (error) {
            console.error('Error adding favourite:', error);
        }
    };

    const removeUserRecipe = async (deleteUserRecipe) => {
        try {
            const res = await fetch(`https://fsa-recipe.up.railway.app/api/recipes/user-recipes/${deleteUserRecipe.idMeal}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            });

            // if (!res.ok) throw new Error('Failed to delete User Created Recipe');
            // setNewUserRecipe((prev) => prev.filter((ucRecipe) => ucRecipe.id !== deleteUserRecipe));
            setIsLoadingUserRecipes(!isLoadingUserRecipes)
        } catch (error) {
            console.error(error);
        }
    };
 
    useEffect(() => {
        const fetchUserRecipes = async () => {
            try {
                const res = await fetch('https://fsa-recipe.up.railway.app/api/recipes/user-recipes', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                const result = await res.json();
                console.log('Fetched user recipes:', result);
                setNewUserRecipe(result);
                console.log("🧪 API raw response:", result);
                console.log("🧪 result.data:", result);

            } catch (error) {
                console.error('Failed to fetch user created recipes:', error);
            } finally {
                setIsLoadingUserRecipes(false);
            }
        };
        
        if (token) fetchUserRecipes();
    }, [token, isLoadingUserRecipes, setNewUserRecipe]);
    
    if (isLoadingUserRecipes) return <p>Loading your favourite recipes!</p>

    return (
        <div className='myrecipes-container'>
            <h1>Your Created Recipes</h1>
            {Array.isArray(newUserRecipe) && newUserRecipe.length === 0 ? (
                <div className='empty-user-recipes'>
                    <p>You have not created any recipes yet!</p>
                    <p>Please go back to the Create Your Own Recipe Form, then come back and it will appear here.</p>
                    <button className='user-recipe-button' onClick={() => navigate('/account/newuser-recipe')}>
                        Go to Create Your Own Recipe Form
                    </button>
                </div>
            ) : (
                <div className='recipes-container'>
                    {Array.isArray(newUserRecipe) && newUserRecipe.map((userRecipe) => (
                        <div key={userRecipe.id} className='recipe-card'>
                                <h2>
                                    <u>{userRecipe.strMeal}</u>
                                </h2>
                                <img 
                                    className='recipe-img'
                                    src={userRecipe.strMealThumb}
                                    onError={(e) => {
                                        e.target.onerror = null; // Prevent infinite loop in case fallback fails
                                        e.target.src = fallbackImage; 
                                    }} />
                                <br />
                                {Array.isArray(favRecipes) && favRecipes.some(fav => fav.idMeal === userRecipe.idMeal)
                                ? <button className='unfavourite-button' onClick={() => removeFavourite(userRecipe)}>Unfavourite</button>
                                : <button onClick={() => addToFavourites(userRecipe)}>Favourite</button>}
                                &nbsp;
                                <button onClick={() => removeUserRecipe(userRecipe)}>
                                    Delete Recipe
                                </button>
                                &nbsp;
                                <button onClick={() => navigate(`/recipe/${userRecipe.idMeal}`)}>
                                    More Info
                                </button>
                            </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyRecipes
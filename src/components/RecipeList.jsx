import { useNavigate } from "react-router-dom";
import '../css/recipeList.css'
import fallbackImage from '../pictures/kirby3.jpg'

const RecipeList = ({ recipes, setFavRecipes, setSingleRecipe, token }) => {
    const navigate = useNavigate();

    const handleClick = (recipe) => {
        setSingleRecipe(recipe);
        navigate(`/recipe/${recipe.idMeal}`)
    };

    const addToFavourites = async (recipe) => {
        try {
            const res = await fetch("https://fsa-recipe.up.railway.app/api/favorites", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  mealId: recipe.idMeal,
                  name: recipe.strMeal,
                  imageUrl: recipe.strMealThumb,
                  strArea: recipe.strArea,
                })
            });

            const result = await res.json();
            console.log(result.message);
            setFavRecipes((prev) => [...prev, result.data])
        } catch (error) {
            console.error('Error adding favourite:', error);
        }
    };

    return (
        <div>
            <div className='recipes-header-container'>
                <h1>
                    Recipe List
                </h1>
                <p>
                    Browse through our list of recipes and add the ones you like the most or want to remember for later to your favourites list! If you want to read more about the recipe like the ingredients, where it comes from, and the instructions, click more info.
                </p>
            </div>
            <div className='recipes-container'>
                {recipes.map((recipe) => {
                    const {strMeal, idMeal, strMealThumb} = recipe;
                    return (
                        <div key={idMeal} className='recipe-card'>
                            <h2>
                                <u>{strMeal}</u>
                            </h2>
                            <img 
                                className='recipe-img'
                                src={strMealThumb}
                                onError={(e) => {
                                    e.target.onerror = null; // Prevent infinite loop in case fallback fails
                                    e.target.src = fallbackImage; 
                                }} />
                            <br />
                            <button onClick={() => addToFavourites(recipe)}>
                                Favourite
                            </button>
                            &nbsp;
                            <button onClick={() => handleClick(recipe)}>
                                More Info
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RecipeList
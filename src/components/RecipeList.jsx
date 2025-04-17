import { useNavigate } from "react-router-dom";
import '../css/recipeList.css'

const RecipeList = ({ recipes, setFavRecipes, setSingleRecipe }) => {
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
                  Authorization: "Bearer your_token_here"
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
                                e.target.src = 'https://kirbyandtheforgottenland.nintendo.com/assets/images/gameplay/kirby-sleeping.png'; 
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
    )
}

export default RecipeList
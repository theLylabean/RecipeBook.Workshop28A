import { useNavigate } from "react-router-dom";
import '../css/recipeList.css'

const RecipeList = ({ recipes, setFavRecipe, setSingleRecipe }) => {
    const navigate = useNavigate();

    const handleClick = (recipe) => {
        setSingleRecipe(recipe);
        navigate(`/recipe/${recipe.idMeal}`)
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
                        <button onClick={() => setFavRecipe(recipe)}>
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
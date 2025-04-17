import { useNavigate } from "react-router-dom";
import '../css/favRecipes.css'

const FavRecipes = ({ favRecipes, setFavRecipes }) => {

    return (
        <div className='recipes-container'>
            {favRecipes.map((recipe) => {
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
                        <button 
                            onClick={() => {
                                setFavRecipes(prev => {
                                    const updated = prev.filter((fav) => fav.ideMeal !== recipe.idMeal);
                                    console.log('Favourites updated:', updated);
                                    return updated
                                });
                            }}
                        >
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

export default FavRecipes
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../css/singleRecipe.css'

const SingleRecipe = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
          try{
            const res = await fetch(`https://fsa-recipe.up.railway.app/api/recipes/${id}`);
            const info = await res.json();
            console.log(info);
            setRecipe(info);
          } catch (error) {
            console.error('Error fetching recipe data:', error);
          }
        }
        fetchRecipe();
      }, [])

    return (
                <div className='single-recipe-container'>
                    {
                        recipe && (
                            <div key={recipe.idMeal}>
                                <h1>{recipe.strMeal}</h1>
                                <img 
                                    className='single-recipe-img'
                                    src={recipe.strMealThumb} 
                                    onError={(e) => {
                                        e.target.onerror = null; // Prevent infinite loop in case fallback fails
                                        e.target.src = 'https://kirbyandtheforgottenland.nintendo.com/assets/images/gameplay/kirby-sleeping.png'; 
                                }} />
                                <p>{recipe.strArea}</p>
                                <p>{recipe.strCategory}</p>
                                <p>{recipe.ingredients}</p>
                                <p>{recipe.strInstructions}</p>
                                {recipe.strTags && <p>Tags: {recipe.strTags}</p>}
                            </div>
                        )
                    }
                    <button className='back-button' onClick={() => navigate('/recipeList')}>
                        Go Back
                    </button>
                </div>
    );
}

export default SingleRecipe
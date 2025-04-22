import { useState } from "react";
import MyRecipes from "./MyRecipes";
import { useNavigate } from "react-router-dom";
import '../css/newRecipeForm.css';

const NewRecipeForm = ({ token, newUserRecipe, setNewUserRecipe }) => {
    const navigate = useNavigate();
    const [newRecipeError, setNewRecipeError] = useState('');
    

    const handleNewUserRecipeChange = (e) => {
        const { name, value } = e.target;
        setNewUserRecipe(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // const handleNewUserRecipeSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log("🔍 FORM SUBMITTED");
      
    //     alert("Submitted the form!");
      
    //     setTimeout(() => {
    //       console.log("✅ Still inside the form function after 1 second");
    //     }, 1000);
    //   };

    const handleNewUserRecipeSubmit = async (e) => {
        e.preventDefault();
        // console.log('Form Submitted ✅');

        for (const key in newUserRecipe) {
            const value = newUserRecipe[key];
            if (!value) {
              console.warn(`🚨 Missing value for "${key}" → Value was:`, value);
              setNewRecipeError(`Please fill out the "${key}" field before submitting.`);
              return;
            }
          }
          
// console.log('Using token:', token)
console.log("🔥 FORM DATA:", newUserRecipe);
console.log("🔥 Sending JSON:", JSON.stringify(newUserRecipe));
console.log("🔥 Token:", token);

        try {
            const res = await fetch("https://fsa-recipe.up.railway.app/api/recipes/user-recipes", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    strMeal: newUserRecipe.strMeal,
                    strCategory: newUserRecipe.strCategory,
                    strArea: newUserRecipe.strArea,
                    strInstructions: newUserRecipe.strInstructions,
                    strMealThumb: newUserRecipe.strMealThumb,
                    strTags: newUserRecipe.strTags,
                    strYoutube: 'https://youtube.com',
                    ingredients: newUserRecipe.ingredients
                })
              });
            const result = await res.json();
            console.log('RESULT:', result);
            console.log('STATUS:', res.status);
                setNewUserRecipe(result);
                alert("Recipe Created!");
                navigate('/account/myrecipes');
        } catch (err) {
            console.error('New Recipe Error:', err);
            setNewRecipeError('New Recipe not created. Please try again.')
        }
    };

    return (
        <div className='newRecipe-container'>
            <h1>Click Below to Add Your Own Recipe! </h1>
            <form className='newRecipe-form-colums' onSubmit={handleNewUserRecipeSubmit}>
                <div className='newRecipe-form-row'>
                    <div className='form-field'>
                        <label>
                            Name of Meal:&nbsp;
                        </label>
                        <input
                            placeholder='Enter the name of your meal here'
                            type='text'
                            name='strMeal'
                            value={newUserRecipe.strMeal}
                            onChange={handleNewUserRecipeChange}
                        />
                    </div>
                    
                    <div className='form-field'>
                        <label>
                            Meal Category:&nbsp;
                        </label>
                        <input
                            placeholder='Ex: dessert, beef, chicken'
                            type='text'
                            name='strCategory'
                            value={newUserRecipe.strCategory}
                            onChange={handleNewUserRecipeChange}
                        />
                    </div>
                </div>
                   
                <div className='newRecipe-form-row'>
                    <div className='form-field'>
                        <label>
                            Meal Area:&nbsp;
                        </label>
                        <input
                            placeholder='Ex: Italian, French, Mexican'
                            type='text'
                            name='strArea'
                            value={newUserRecipe.strArea}
                            onChange={handleNewUserRecipeChange}
                        />
                    </div>

                    <div className='form-field'>
                        <label>
                            Meal Tags:&nbsp;
                        </label>
                        <input
                            placeholder='Ex: Beef, Curry, Lemon, Dessert'
                            type='text'
                            name='strTags'
                            value={newUserRecipe.strTags}
                            onChange={handleNewUserRecipeChange}
                        />
                    </div>
                </div>

                <div className='newRecipe-form-row'>
                    <div className='form-field'>
                        <label>
                            Picture of Your Meal:&nbsp;
                        </label>
                        <input
                            placeholder='Paste URL here'
                            type='text'
                            name='strMealThumb'
                            value={newUserRecipe.strMealThumb}
                            onChange={handleNewUserRecipeChange}
                        />
                    </div>
                </div>

                <div className='newRecipe-form-row'>
                    <div className='form-field'>
                        <label>
                            Ingredients:&nbsp;
                        </label>
                        <textarea
                            placeholder='2 apples,1 cup of flour...'
                            type='text'
                            name='ingredients'
                            value={newUserRecipe.ingredients}
                            onChange={handleNewUserRecipeChange}
                        />
                    </div>

                    <div className='form-field'>
                        <label>
                            Recipe Instructions:&nbsp;
                        </label>
                        <textarea
                            placeholder='1. Peel apples... 2.Make crust...'
                            type='text'
                            name='strInstructions'
                            value={newUserRecipe.strInstructions}
                            onChange={handleNewUserRecipeChange}
                        />
                    </div>
                </div>
                <div className='newRecipe-form-button-container'>
                    <button type='submit'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NewRecipeForm
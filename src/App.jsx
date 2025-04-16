import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import './css/App.css';
import RecipeList from './components/RecipeList';
import SingleRecipe from './components/SingleRecipe';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [singleRecipe, setSingleRecipe] = useState([]);
  const [favRecipe, setFavRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try{
        const res = await fetch('https://fsa-recipe.up.railway.app/api/recipes');
        const info = await res.json();
        console.log(info);
        setRecipes(info);
      } catch (error) {
        console.error('Error fetching recipe data:', error);
      }
    }
    fetchRecipes();
  }, [])

  return (
    <div>
      <Router>
        <NavBar />
          <Routes>
            <Route 
              path='/' 
              element={ <Home /> } 
          />
            <Route 
              path='recipeList' 
              element={ 
                <RecipeList 
                  recipes={recipes} 
                  setRecipes={setRecipes} 
                  setFavRecipe={setFavRecipe}
                  setSingleRecipe={setSingleRecipe} /> 
            } />
            <Route 
              path='/recipe/:id' 
              element={ 
                <SingleRecipe 
                  singleRecipe={singleRecipe} 
                  setSingleRecipe={setSingleRecipe} /> 
            } />
            <Route 
              path='signupForm' 
              element={'signupForm' } 
            />
          </Routes>
      </Router>
    </div>
  )
}

export default App

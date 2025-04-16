import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import './css/App.css';

function App() {
  const [recipes, setRecipes] = useState({});
  const [singleRecipe, setSingleRecipe] = useState({});

  useEffect(() => {
    const fetchRecipes = async () => {
      try{
        const res = await fetch('https://fsa-recipe.up.railway.app/api/recipes');
        const info = await res.json();
        console.log(info);
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
            <Route path='/' element={ <Home /> } />
            <Route path='recipeList' element={'reciepList' } />
            <Route path='signupForm' element={'signupForm' } />
          </Routes>
      </Router>
    </div>
  )
}

export default App

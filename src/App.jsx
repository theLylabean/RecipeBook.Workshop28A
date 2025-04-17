import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import './css/App.css';
import RecipeList from './components/RecipeList';
import SingleRecipe from './components/SingleRecipe';
import FavRecipes from './components/FavRecipes';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Authenticate from './components/Authenticate';
import AccountPage from './components/AccountPage';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [singleRecipe, setSingleRecipe] = useState([]);
  const [favRecipes, setFavRecipes] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [isLoading, setIsLoading] = useState(true);

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
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    setIsLoading(false);
  }, [token]);
 

  useEffect(() => {
    console.log('Current user after restore:', currentUser);
  }, [currentUser]);

  console.log(favRecipes);

  return (
    <div>
      <Router>
        <Authenticate
          token={token}
          setCurrentUser={setCurrentUser}
        />
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
                  setFavRecipes={setFavRecipes}
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
              path='/account/favRecipes'
              element={
                <FavRecipes
                  favRecipes={favRecipes}
                  setFavRecipes={setFavRecipes} />
              }
            />
            <Route 
              path='signUpForm' 
              element={
                <SignUpForm
                  setCurrentUser={setCurrentUser}
                  token={token}
                  setToken={setToken}
                />
              } 
            />
            <Route
              path='login'
              element={
                <LoginForm
                  setCurrentUser={setCurrentUser}
                  token={token}
                  setToken={setToken}
                />
              }  
            />
            <Route
              path='account'
              element={
                <AccountPage
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  isLoading={isLoading}
                />
              }
            />
          </Routes>
      </Router>
    </div>
  )
}

export default App

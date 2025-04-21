import { Link, useNavigate } from "react-router-dom";
import '../css/accountPage.css';

const AccountPage = ({ currentUser, isLoading, token, newUserRecipe, setNewUserRecipe, addToFavourites }) => {
    const navigate = useNavigate();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    console.log('Current User:', currentUser);

    return (
        <div className='favRecipes-container'>
            <div className='aboutPage-links'>
                <h1>Welcome, {currentUser?.username}!</h1>
                <Link to='/account/favRecipes'>
                    Favourite Recipes
                </Link>
                <Link to='/account/myrecipes'>
                    My Recipes
                </Link>
            </div>
        </div>
    );
}

export default AccountPage
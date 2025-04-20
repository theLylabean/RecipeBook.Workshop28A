import { Link } from "react-router-dom";
import '../css/accountPage.css';

const AccountPage = ({ currentUser, setCurrentUser, isLoading }) => {

    if (isLoading) {
        return <p>Loading...</p>;
    }
console.log('Current Userr:', currentUser);
    return (
        <div className='favRecipes-container'>
            <div className='aboutPage-links'>
                <h1>Welcome, {currentUser?.username}!</h1>
                <Link to='/account/favRecipes'>
                    Favourite Recipes
                </Link>
            </div>
        </div>
    );
}

export default AccountPage
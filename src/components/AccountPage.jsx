import { Link } from "react-router-dom";
import '../css/accountPage.css';

const AccountPage = ({ currentUser, setCurrentUser, isLoading }) => {

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='favRecipes-container'>
            <div className='aboutPage-links'>
                <h1>Welcome, {currentUser?.firstName}!</h1>
                <Link to='/account/favRecipes'>
                    Favourite Recipes
                </Link>
            </div>
        </div>
    );
}

export default AccountPage
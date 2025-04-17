import { useEffect } from "react";
import { Link } from "react-router-dom";

const AccountPage = ({ currentUser, setCurrentUser, isLoading }) => {

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Link to='/account/favRecipes'>
                Favourite Recipes
            </Link>
        </div>
    );
}

export default AccountPage
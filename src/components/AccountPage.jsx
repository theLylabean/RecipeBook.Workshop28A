import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const AccountPage = ({ currentUser, setCurrentUser, isLoading }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoading && !currentUser) {
            navigate('/login');
        }
    }, [isLoading, setCurrentUser, navigate]);

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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        <h1>Welcome to Your Account Page</h1>

    );
}

export default AccountPage
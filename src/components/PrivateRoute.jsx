import { Navigate } from "react-router-dom";

const PrivateRoute = ({ currentUser, isLoading, children }) => {
    if (isLoading) {
        return <p>Loading...</p>
    }
    return currentUser ? children : <Navigate to='/login' replace />
};

export default PrivateRoute
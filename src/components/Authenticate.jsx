import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Authenticate({ setCurrentUser, token }){
    const navigate = useNavigate();

    useEffect(() => {
    if (!token) {
        navigate('/login');
        return;
    }

    const fetchUser = async () => {
          try {
            const res = await fetch("https://fsa-recipe.up.railway.app/api/auth/me", {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
    
            if (!res.ok) throw new Error('Invalid token');
    
            const result = await res.json();
            console.log(result);
            setCurrentUser(result);
          } catch (error) {
            console.error('Authentication failed:', error);
            setCurrentUser(null);
            navigate('/login');
          }
        };
    
          fetchUser();
      }, [token, setCurrentUser]);

    return null;
};

export default Authenticate
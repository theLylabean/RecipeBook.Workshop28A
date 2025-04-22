import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Authenticate({ setCurrentUser, token, setIsLoading }){
    const navigate = useNavigate();

    useEffect(() => {
    const fetchUser = async () => {
          try {
            const res = await fetch("https://fsa-recipe.up.railway.app/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Auth response status:', res.status)
    
            if (!res.ok) throw new Error('Invalid token');
    
            const result = await res.json();
            console.log(result);
            setCurrentUser(result);
          } catch (error) {
            console.error('Authentication failed:', error);
            setCurrentUser(null);
            navigate('/login');
          } finally {
            setIsLoading(false);
          }
        };

        if (token) {
          fetchUser();
        } else {
          setIsLoading(false);
        }
          console.log('Authenticating with token:', token);
      }, [token]);

    return null;
};

export default Authenticate
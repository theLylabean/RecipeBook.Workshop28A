import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/loginForm.css';

function LoginForm({ setCurrentUser, setToken }){
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const [login, setLogin] = useState({
        email: '',
        password: '',
      });

    const handleLoginChange = (e) => {
        setLogin(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');

        try {
            const res = await fetch("https://fsa-recipe.up.railway.app/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  username: login.email,
                  password: login.password
                })
            });
            const result = await res.json();
            console.log(result)
            if (result.token && result.username) {
                setToken(result.token)
                setCurrentUser(result);
                navigate('/account');
        } else {
            setLoginError(result.message || '** Invalid username or password **');
        }
        } catch (err) {
            console.error('Login error:', err);
            setLoginError('Login failed. Please try again.')
        }
    };

      return (
        <div className='login-form-container'>
            <form className='login-form' onSubmit={handleLoginSubmit}>
            <label>
                Username:&nbsp;
            </label>
            <input
                placeholder='Enter Email Here'
                type='text'
                name='email'
                value={login.email}
                onChange={handleLoginChange}
            />
            <label>
                Password:&nbsp;
            </label>
            <input
                placeholder='Enter Password Here'
                type='password'
                name='password'
                value={login.password}
                onChange={handleLoginChange}
            />
            <div className='form-button'>
                    <button type='submit'>
                        Submit
                    </button>
                </div>
            </form>
            <div className='error-container'>
                {loginError && <p className='error-message'>{loginError}</p>}
            </div>
        </div>
      )
}

export default LoginForm
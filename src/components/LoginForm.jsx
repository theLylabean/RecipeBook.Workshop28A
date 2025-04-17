import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/loginForm.css';

function LoginForm({ setCurrentUser }){
    const navigate = useNavigate();
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
            const res = await fetch("https://fsa-recipe.up.railway.app/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  username: login.email,
                  password: login.password
                })
            });
            const info = res.json();
            console.log(info)
            setCurrentUser({ username: info.username });
            navigate('/account');
        }

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
        </div>
      )
}

export default LoginForm
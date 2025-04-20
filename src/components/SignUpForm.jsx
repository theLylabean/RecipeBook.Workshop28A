import { useState } from "react";
import '../css/signUpForm.css';
import { useNavigate } from "react-router-dom";

function SignUpForm({ setCurrentUser, setToken }){
    const navigate = useNavigate();
    const [signUpError, setSignUpError] = useState('');
    const [createUserAccount, setCreateUserAccount] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setCreateUserAccount(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSignUpError('');

        const { firstName, lastName, email, password, confirmPassword } = createUserAccount;
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setSignUpError('Please fill in all fields.')
            return;
        }
        if (password !== confirmPassword) {
            setSignUpError('Passwords do not match.')
            return;
        }

        try{
            const res = await fetch("https://fsa-recipe.up.railway.app/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: createUserAccount.email,
                    password: createUserAccount.password,
                })
            })
            const result = await res.json();
            console.log(result);

            if (!res.ok) {
                setSignUpError(result.error) || 'Registration failed. Please try again.'
                return;
            }

            setCurrentUser({ username: result.username, name: result.firstName });
            setToken(result.token);
            navigate('/account')
            
        } catch (error) {
            console.error('Registration Error:', error);
            setSignUpError('Server error. Please try again later.')
        }
    }

    return (
        <div className='form-container'>
            <form className='form-columns' onSubmit={handleSubmit}>
            <div className='form-row'>
                <div className='form-field'>
                <label>First Name:</label>
                <input
                    type='text'
                    name='firstName'
                    value={createUserAccount.firstName}
                    onChange={handleChange}
                    placeholder='Enter First Name Here'
                />
                </div>

                <div className='form-field'>
                <label>Last Name:</label>
                <input
                    type='text'
                    name='lastName'
                    value={createUserAccount.lastName}
                    onChange={handleChange}
                    placeholder='Enter Last Name Here'
                />
                </div>
            </div>

            <div className='form-row'>
                <div className='form-field'>
                <label>Email:</label>
                <input
                    type='text'
                    name='email'
                    value={createUserAccount.email}
                    onChange={handleChange}
                    placeholder='Enter Email Here'
                />
                </div>

                <div className='form-field'>
                <label>Password:</label>
                <input
                    type='password'
                    name='password'
                    value={createUserAccount.password}
                    onChange={handleChange}
                    placeholder='Enter Password Here'
                />
                </div>
            </div>

            <div className='form-row'>
                <div className='form-field'>
                <label>Confirm Password:</label>
                <input
                    type='password'
                    name='confirmPassword'
                    value={createUserAccount.confirmPassword}
                    onChange={handleChange}
                    placeholder='Confirm Password'
                />
                </div>
            </div>

            <div className='form-button'>
                <button type='submit'
                // disabled={
                //     !createUserAccount.firstName ||
                //     !createUserAccount.lastName ||
                //     !createUserAccount.email ||
                //     !createUserAccount.password ||
                //     !createUserAccount.confirmPassword
                // }
                >
                    Submit
                </button>
            </div>
            </form>
            <div className='error-container'>
                {signUpError && <p className='error-message'>{signUpError}</p>}
            </div>
        </div>
    );
}

export default SignUpForm
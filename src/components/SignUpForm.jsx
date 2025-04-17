import { useState } from "react";
import '../css/signUpForm.css';

function SignUpForm({ registerUser, setCurrentUser }){
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

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(createUserAccount);
        console.log('Form submitted:', createUserAccount);
        setCurrentUser(createUserAccount);
    }

    return (
        <div className='form-container'>
            <form className='form-colums' onSubmit={handleSubmit}>
                <div className='form-left-column'>
                    <label>
                        First Name:&nbsp;
                    </label>
                    <input
                        placeholder='Enter First Name Here'
                        type='text'
                        name='firstName'
                        value={createUserAccount.firstName}
                        onChange={handleChange}
                    />
                    <br />
                    <label>
                        Email:&nbsp;
                    </label>
                    <input
                        placeholder='Enter Email Here'
                        type='text'
                        name='email'
                        value={createUserAccount.email}
                        onChange={handleChange}
                    />
                    <br />
                    <label>
                        Password:&nbsp;
                    </label>
                    <input
                        placeholder='Enter Password Here'
                        type='password'
                        name='password'
                        value={createUserAccount.password}
                        onChange={handleChange}
                    />
                </div>

                <div className='form-right-column'>
                    <label>
                        Last Name:&nbsp;
                    </label>
                    <input
                        placeholder='Enter Last Name Here'
                        type='text'
                        name='lastName'
                        value={createUserAccount.lastName}
                        onChange={handleChange}
                    />
                    <br />
                    <label>
                        Confirm Password:&nbsp;
                    </label>
                    <input
                        placeholder='Confirm Password'
                        type='password'
                        name='confirmPassword'
                        value={createUserAccount.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-button'>
                    <button type='submit'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignUpForm
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Login() {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname === "/login" ? '/trainingsession' : location.state?.from?.pathname || '/trainingsession';

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoginSelected, setIsLoginSelected] = useState(true);

    const onButtonClick = async () => {
        // Set initial error values to empty
        setEmailError('')
        setPasswordError('')
      
        // Check if the user has entered both fields correctly
        if ('' === email) {
          setEmailError('Please enter your email')
          return
        }
      
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
          setEmailError('Please enter a valid email')
          return
        }
      
        if ('' === password) {
          setPasswordError('Please enter a password')
          return
        }
      
        if (password.length < 7) {
          setPasswordError('The password must be 8 characters or longer')
          return
        }
      
        try {
            let response;
            if (isLoginSelected) {
                response = await axios.post('http://localhost:3000/api/auth/login', {
                    email, 
                    password,
                });
            } else {
                response = await axios.post('http://localhost:3000/api/auth/signup', {
                    email, 
                    password,
                    username,
                });
            }

            const { token, user } = response.data;
            setAuth({ user_id: user.id, token });
            console.log("hej", user.id, token);
            navigate(from, { replace: true });
            console.log("from, ",from);
            console.log(from);

        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    function toggleOption() {
        setIsLoginSelected(prevIsLoginSelected => !prevIsLoginSelected);
    }

    return (
        <div className="app">
            <div className='login-container'>
                <div className='login-header'><h1>Login Form</h1></div>
                    <div className='login-details'>
                        <div className='login-option'>
                            <div onClick={toggleOption} className={isLoginSelected ? "selected" : "" }><p>Login</p></div>
                            <div onClick={toggleOption} className={!isLoginSelected ? "selected" : ""}><p>Signup</p></div>
                        </div>
                        <input className='login-input' 
                            value={email} 
                            placeholder='email'
                            onChange={(ev) => setEmail(ev.target.value)}>   
                            </input>
                        <input className='login-input'
                            value={password} 
                            placeholder='password'
                            onChange={(ev) => setPassword(ev.target.value)}>  
                        </input>
                        {!isLoginSelected && ( // Render input only if signup selected
                            <input className='login-input'
                                value={username}
                                placeholder='username'
                                onChange={(ev) => setUsername(ev.target.value)}>
                            </input>
                        )}
                        <label className="errorLabel">{passwordError}</label>
                        <input className={'login-button'} type="button" onClick={onButtonClick} value={'Log in'} />
                </div>
            </div>
        </div>
    )
}

export default Login;
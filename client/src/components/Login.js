import React, { useState } from 'react';
import signinpic from './login.png';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch('/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = res.json();

        if (res.status === 400 || !data) {
            window.alert("Invalid details");
            console.log("Invalid details");
        } else {
            window.alert("Login Successfull");
            console.log("Login Successfull");

            navigate('/');
        }
    }

    return (
        <>
            <section className='signin'>
                <div className='container1'>
                    <div className='signin-image'>
                        <figure>
                            <img src={signinpic} alt="login pic" />
                        </figure>
                        <NavLink className='signup-image-link' to='/signup'>
                            Create an account
                        </NavLink>
                    </div>
                    <div className='signin-content'>
                        <div className='signin-form'>
                            <h2 className='form-title'>Sign In</h2>
                            <form method='POST' className='login-form' id='login-form'>
                                <div className='form-group'>
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email material-icons-name"></i>
                                    </label>
                                    <input type="email" name='email' id='email' autoComplete='off '
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Your Email' />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" name='password' id='password' autoComplete='off '
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='Your Password' />
                                </div>
                                <div className='form-button'>
                                    <input type="submit" name='signup' id='signup' className='form-submit'
                                        value={"Log In"}
                                        onClick={loginUser}
                                    />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login

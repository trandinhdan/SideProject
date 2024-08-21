import React, { useState } from 'react';
import userService from "../../../services/userService";
import style from "../SignUpLayout/SignUpPageUI.module.css";

function SignUpPageUI() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'email') {
            if (!validateEmail(value)) {
                setEmailError('Invalid email format');
            } else {
                setEmailError('');
            }
        }

        if (name === 'password' && formData.confirmPassword) {
            if (value !== formData.confirmPassword) {
                setPasswordError('Passwords do not match');
            } else {
                setPasswordError('');
            }
        }

        if (name === 'confirmPassword' && formData.password) {
            if (formData.password !== value) {
                setPasswordError('Passwords do not match');
            } else {
                setPasswordError('');
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (formData.password !== formData.confirmPassword) {
        //     setPasswordError('Passwords do not match');
        //     return;
        // }

        if (!validateEmail(formData.email)) {
            setEmailError('Invalid email format');
            return;
        }

        // Clear previous errors
        setPasswordError('');
        setEmailError('');
        setError('');

        // Add form submission logic here
        userService.regesterUser(formData)
            .then(() => {
                console.log('User registered successfully');
                // Optionally redirect or show success message
            })
            .catch(error => {
                setError('Failed to register user: ' + error.message);
            });
    };

    const validateEmail = (email) => {
        // Regular expression for basic email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                {error && <div className={style.errorMessage}>{error}</div>}

                <div className={style["input-container"]}>
                    <label className={style.label} htmlFor="name">Full Name:</label>
                    <input
                        className={style.input}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        required={true}
                        onChange={handleChange}
                    />
                </div>

                <div className={style["input-container"]}>
                    <label className={style.label} htmlFor="email">Email:</label>
                    <input
                        className={style.input}
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        required={true}
                        onChange={handleChange}
                    />
                    {emailError && <div className={style.errorMessage}>{emailError}</div>}
                </div>

                <div className={style["input-container"]}>
                    <label className={style.label} htmlFor="password">Password:</label>
                    <input
                        className={style.input}
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        required={true}
                        onChange={handleChange}
                    />
                </div>

                <div className={style["input-container"]}>
                    <label className={style.label} htmlFor="confirmPassword">Confirm password:</label>
                    <input
                        className={style.input}
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required={true}
                        onChange={handleChange}
                    />
                    {formData.password && passwordError && <div className={style.errorMessage}>{passwordError}</div>}
                </div>

                <div className={style["button-container"]}>
                    <button className={style["button"]} type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default SignUpPageUI;

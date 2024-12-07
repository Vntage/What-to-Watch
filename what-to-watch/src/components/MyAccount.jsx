import { React, useState } from 'react';
//import {Link, useNavigate} from 'react-router-dom';
import './MyAccount.css';

const MyAccount = () => {
    //const navigate = useNavigate();
    
    const[isEditing, setIsEditing] = useState(false);

    const [user_info, setUserInfo] = useState({
        username: 'temp_user',
        password: '********',
        email: 'temp_user@email.com'
    });

    const handleEditClick = (e) => {
        setIsEditing(!isEditing);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState=> ({
            ...prevState,
            [name]: value
        }));
    };
//add "onClick={handleLogout" to logout-button
    // const handleLogout = (e) => {
    //     e.preventDefault()
    //     //localStorage.clear()
    //     navigate('/Login')
    // }

    return (
        <div className="my-account-container">
            <div className="header-container">
                <h1>My Account</h1>
                <button className="edit-button" onClick={handleEditClick}>
                    {isEditing ? 'Save' : 'Edit'}
                </button>
            </div>
            <div className="my-account-info">
                {isEditing ? (
                    <>
                        <label className="label">
                            Username:
                            <input
                                type="text"
                                name="username"
                                value={user_info.username}
                                onChange={handleChange}
                                className="input"
                            />
                        </label>
                        <br />
                        <label className="label">
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={user_info.password}
                                onChange={handleChange}
                                className="input"
                            />
                        </label>
                        <br />
                        <label className="label">
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={user_info.email}
                                onChange={handleChange}
                                className="input"
                            />
                        </label>
                    </>) : (
                    <>
                        <p>Username: {user_info.username}</p>
                        <p>Password: {user_info.password}</p>
                        <p>Email: {user_info.email}</p>
                    </>
                )}
            </div>
            <div className="content">
                <div className="section">
                    <div className="section-header">
                        <h2>Favorites</h2>
                    </div>
                    
                    <div className="card-container">
                        <div className="card">
                            <div className="picture">Picture</div>
                            <div className="label">Movie/TV Show</div>
                        </div>
                        <div className="card">
                            <div className="picture">Picture</div>
                            <div className="label">Movie/TV Show</div>
                        </div>
                        <div className="card">
                            <div className="picture">Picture</div>
                            <div className="label">Movie/TV Show</div>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="section-header">
                        <h2>Watch History</h2>
                    </div>
                    
                    <div className="card-container">
                        <div className="card">
                            <div className="picture">Picture</div>
                            <div className="label">Movie/TV Show</div>
                        </div>
                        <div className="card">
                            <div className="picture">Picture</div>
                            <div className="label">Movie/TV Show</div>
                        </div>
                        <div className="card">
                            <div className="picture">Picture</div>
                            <div className="label">Movie/TV Show</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="logout">
                <button className="logout-button">
                    Logout
                </button>
            </div>
        </div>
    )
};

export default MyAccount;
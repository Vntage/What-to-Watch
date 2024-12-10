import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Uncomment to use navigation
import './MyAccount.css';

const MyAccount = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    // User information state, now includes watchLater
    const [user_info, setUserInfo] = useState({
        username: 'temp_user',
        password: '********',
        email: 'temp_user@email.com',
        watchLater: []  // Array to hold saved movies/shows
    });

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogout = (e) => {
        e.preventDefault();
        // Clear session data or authentication tokens
        localStorage.clear(); // Example: Clearing all local storage data
        // Redirect user to the login page
        navigate('/Login');
    };

    // Handle saving movie/show to watchLater list
    const handleSaveToWatchLater = (show) => {
        setUserInfo((prevState) => ({
            ...prevState,
            watchLater: [...prevState.watchLater, show]  // Add to the watchLater list
        }));
    };

    // Example movie/show data (replace with actual data from your app)
    const exampleShow = {
        title: 'Example Movie',
        image: 'https://via.placeholder.com/150'
    };

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
                    </>
                ) : (
                    <>
                        <p>Username: {user_info.username}</p>
                        <p>Password: {user_info.password}</p>
                        <p>Email: {user_info.email}</p>
                    </>
                )}
            </div>
            <div className="content">
                {/* Watch Later Section */}
                <div className="section">
                    <div className="section-header">
                        <h2>Watch Later</h2>
                    </div>
                    <div className="card-container">
                        {user_info.watchLater.length > 0 ? (
                            user_info.watchLater.map((show, index) => (
                                <div className="card" key={index}>
                                    <div className="picture">
                                        <img src={show.image} alt={show.title} />
                                    </div>
                                    <div className="label">{show.title}</div>
                                </div>
                            ))
                        ) : (
                            <p>No shows saved for later.</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="logout">
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default MyAccount;

import React, { useContext, useState } from 'react';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';
import { SfNav } from 'react-sf-building-blocks';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from '../pages/Home';

import Profile from '../pages/Profile';



const Navbar = () => {
    const { currentUser } = useContext(AuthContext);
    const [friendRequestMessage, setFriendRequestMessage] = useState(null);

    const handleFriendRequest = () => {
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    };

    return (
        <div>
            <SfNav
                brand="Work'n Meet"
                enableRouting={true}
                showProfile={true}
                profilePicture={currentUser.photoURL}
                homeMenu={{ component: <Home />, caption: 'home', link: 'home' }}
                menu={[
                    { caption: 'Home', link: 'Home', component: <Home /> },
                    { caption: 'Profile', link: 'Profile', component: <Profile /> },
                  
                    {
                        
                    },
                ]}
                profilePreamble={
                    <div
                        style={{
                            width: '100%',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                        }}
                    >
                        <small>Hi {currentUser.displayName}!</small>
                        <br />
                        <small></small>
                    </div>
                }
                profileComponent={
                    <div
                        style={{
                            width: '100%',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                        }}
                    >
                        <small>
                            {' '}
                            <button onClick={() => signOut(auth)}>Logout</button>
                        </small>
                    </div>
                }
            />

            {friendRequestMessage && (
                <div className="friend-request-message">
                    {friendRequestMessage}
                </div>
            )}
        </div>
    );
};

export default Navbar;

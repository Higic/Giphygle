import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom"

function AuthDetails(props) {
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null);
            }
        });

        return() => {
            listen();
        }
    }, [])

    const userSignOut = () => {
        localStorage.setItem('uid', 'null')
        signOut(auth).then(() => {
            console.log('sign out succesful')
            navigate("/");
        }).catch(error => console.log(error))
    }
    return (
        <div className="signedIn">
            { authUser ?
                <>
                    <p>{`Signed in as ${authUser.email}`}</p>
                    <button className="logOutBtn" onClick={userSignOut}>Log out</button>
                </>
                : <p>Signed Out</p>
            }
            {props.children}
        </div>
    );
}

export default AuthDetails;
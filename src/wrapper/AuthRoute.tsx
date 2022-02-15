import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import UserService from '../services/userService';
import { globalContext } from './GlobalContext';


function AuthRoute({ element }: { element: JSX.Element }) {
    const navigate = useNavigate();
    const userService = new UserService();
    const { currentUser, setCurrentUser } = useContext(globalContext);

    const isAuthenticated = () => AuthService.hasToken();

    const authHandler = () => {
        if (isAuthenticated() && currentUser) {
            return <>{element}</>;
        } else {
            return null;
        }
    }

    const loadUser = async () => {
        try {
            const user = await userService.authUser();
            setCurrentUser(user);
        } catch {
            navigate("/login");
        }
    }

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        } else {
            loadUser();
        }
    }, []);

    return authHandler();
}

export default AuthRoute

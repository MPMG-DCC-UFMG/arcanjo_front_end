import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import toast from 'react-hot-toast';
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
        initInterceptor();
        if (!isAuthenticated()) {
            navigate("/login");
        } else {
            loadUser();
        }
    }, []);

    const initInterceptor = () => {
        axios.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.response.status === 401) {
                toast.error("Sessão finalizada");
                navigate("/login");
            }
            return error;
        });
    }

    return authHandler();
}

export default AuthRoute

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import { globalContext } from '../wrapper/GlobalContext';

function Greeting() {
    const { currentUser } = useContext(globalContext);
    const navigate = useNavigate();

    const logout = () => {
        AuthService.clearToken();
        navigate("/login");
    }

    return (<div
        className="font-bold">
        Olá, {currentUser?.name}
        <small className='ml-2'>
            <a className='text-gray-600 hover:underline cursor-pointer' onClick={logout}>
                <i className="ri-login-box-line"></i> sair
            </a>
        </small>
    </div>);
}

export default Greeting;

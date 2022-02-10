import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import Divider from '../components/Divider';
import Input from '../components/Input';
import AuthService from '../services/authService';
import CenterVertical from '../templates/CenterVertical';

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean | undefined>(false);
    const authService = new AuthService();

    const login = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
        };

        setLoading(true);
        try {
            const response = await authService.login(target.email.value, target.password.value);
            AuthService.setToken(response.token);
            setTimeout(() => {
                navigate("/");
            }, 500);
        } catch (err: any) {
            toast.error(err);
        }
        setLoading(false);
    }

    return (
        <CenterVertical>
            <div className="w-full max-w-lg">
                <Card>
                    <div className='text-center'>
                        <h1 className='title'>Login</h1>
                        <form onSubmit={login}>
                            <div className='my-3'>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="E-mail"
                                />
                            </div>
                            <div className='my-3'>
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="Senha"
                                />
                            </div>
                            <div className='my-3'>
                                <Button loading={loading} type='submit' full>Entrar</Button>
                            </div>
                        </form>
                        <Divider />
                        <div className='my-3'>
                            <Link to="/register">
                                <Button full outline>Ainda não sou cadastrado</Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </CenterVertical >
    );
}

export default Login;

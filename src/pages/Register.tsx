import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import Divider from '../components/Divider';
import Input from '../components/Input';
import UserService from '../services/userService';
import CenterVertical from '../templates/CenterVertical';
import { UserData } from '../types/types';

function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean | undefined>(false);
    const userService = new UserService();
    const [formData, setFormData] = useState<UserData>({
        name: "",
        email: "",
        password: ""
    })

    const handleFormChange = (ev: React.FormEvent<HTMLInputElement>) => {
        setFormData({
            ...formData, ...{
                [ev.currentTarget.name]: ev.currentTarget.value
            }
        })
    }

    const registerUser = async (ev: React.SyntheticEvent) => {
        ev.preventDefault();

        setLoading(true);
        try {
            await userService.create(formData);
            toast.success("Usuário cadastrado com sucesso!");
            navigate("/login");
        } catch (er: any) {
            toast.error(er);
        }
        setLoading(false);
    }

    return (
        <CenterVertical>
            <div className="w-full max-w-lg">
                <Card>
                    <div className='text-center'>
                        <h1 className='title'>Cadastre-se</h1>
                        <form onSubmit={registerUser}>
                            <div className='my-3'>
                                <Input
                                    name="name"
                                    value={formData["name"]}
                                    placeholder="Nome"
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                            <div className='my-3'>
                                <Input
                                    name="email"
                                    value={formData["email"]}
                                    onChange={handleFormChange}
                                    required
                                    placeholder="E-mail"
                                    type='email'
                                />
                            </div>
                            <div className='my-3'>
                                <Input
                                    name="password"
                                    value={formData["password"]}
                                    onChange={handleFormChange}
                                    required
                                    placeholder="Senha"
                                    type='password'
                                />
                            </div>
                            <div className='my-3'>
                                <Button type='submit' loading={loading} full>Cadastrar</Button>
                            </div>
                            <Divider />
                            <div className='my-3'>
                                <Link to="/login">
                                    <Button full outline>Já sou cadastrado</Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        </CenterVertical >
    );
}

export default Register;

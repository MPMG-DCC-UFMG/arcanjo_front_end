import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import Divider from '../components/Divider';
import Input from '../components/Input';
import Subtitle from '../components/Subtitle';
import Title from '../components/Title';
import UserService from '../services/userService';
import Sidebar from '../templates/Sidebar';
import { UserData } from '../types/types';

function UsersForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean | undefined>(false);
    const [changePassword, setChangePassword] = useState<boolean>(false);
    const [data, setData] = useState<UserData | undefined>();
    const params = useParams();
    const userService = new UserService();

    const save = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (data && data.id) {
            const newData: UserData = {
                name: data.name,
                email: data.email,
                role: data.role,
            }

            if (changePassword) newData.password = data.password;

            setLoading(true);
            try {
                const response = await userService.save(data.id, newData);
                toast.success("Usuário editado com sucesso!");
                navigate("/users");
            } catch (err: any) {
                toast.error(err);
            }
            setLoading(false);
        }
    }

    const load = async () => {
        if (params.id) {
            const response = await userService.getById(params.id);
            setData({
                ...response,
                ...{
                    password: undefined,
                    createdAt: undefined,
                    updatedAt: undefined
                }
            });
        }
    }

    const onChange = (ev: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData({
            ...data,
            ...{
                [ev.currentTarget.name]: ev.currentTarget.value
            }
        } as UserData)
    }

    useEffect(() => {
        load();
    }, [])

    return (
        <Sidebar>
            <div className='w-full max-w-lg'>
                <Title>Editar Usuário</Title>

                <form onSubmit={save} className='mt-8'>
                    <Subtitle>Dados da análise</Subtitle>

                    <div className="my-3">
                        <Input required name='name' placeholder='Nome' value={data?.name} onChange={onChange} />
                    </div>

                    <div className="my-3">
                        <Input required type='email' name='email' placeholder='E-mail' value={data?.email} onChange={onChange} />
                    </div>

                    <div className="my-3">
                        <label>Tipo de usuário</label>
                        <select className='input placeholder' name='role' value={data?.role} onChange={onChange}>
                            <option value="user">Usuário</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="my-3">
                        <label>
                            <input type="checkbox" checked={changePassword} onClick={() => setChangePassword(!changePassword)} /> Alterar senha
                        </label>
                    </div>


                    {changePassword ?
                        <>
                            <div className="my-3">
                                <Input required name='password' placeholder='Nova senha' value={data?.password} onChange={onChange} />
                            </div>
                        </> : null}

                    <Divider />

                    <Button loading={loading} type='submit' full>Salvar</Button>

                </form>
            </div>
        </Sidebar>
    );
}

export default UsersForm;

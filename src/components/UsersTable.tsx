import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/userService';
import { UserData } from '../types/types';
import AnalysisStatus from './AnalysisStatus';
import EmptyState from './EmptyState';
import Loading from './Loading';

function UsersTable() {
    const [data, setData] = useState<UserData[] | null>(null);
    const userService = new UserService();
    const navigate = useNavigate();

    const loadData = async () => {
        const response = await userService.list();
        setData(response);
    }

    const clickUser = (user: UserData) => {
        navigate(`/users/${user.id}`);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (<>
        {data === null ? <Loading /> : <>
            {data?.length === 0 ?
                <EmptyState text='Nenhuma análise cadastrada' />
                :
                <table className='clickable'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className='text-left'>Nome da Análise</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map(user => <tr key={user.id} onClick={() => clickUser(user)}>
                            <td width={40}>{user.id}</td>
                            <td className='text-left'>{user.name}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            } </>
        }
    </>);
}

export default UsersTable;

import React from 'react';
import AnalysisTable from '../components/AnalysisTable';
import Title from '../components/Title';
import UsersTable from '../components/UsersTable';
import Sidebar from '../templates/Sidebar';

function Users() {
    return (
        <Sidebar >
            <>
                <Title>Usuários</Title>
                <UsersTable />
            </>
        </Sidebar>
    );
}

export default Users;

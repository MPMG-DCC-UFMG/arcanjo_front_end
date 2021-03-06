import React from 'react';
import AnalysisTable from '../components/AnalysisTable';
import Title from '../components/Title';
import Sidebar from '../templates/Sidebar';

function Home() {
    return (
        <Sidebar>
            <>
                <Title>Análises</Title>
                <AnalysisTable />
            </>
        </Sidebar>
    );
}

export default Home;

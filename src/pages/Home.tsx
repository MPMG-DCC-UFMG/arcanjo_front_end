import React, { useState } from 'react';
import AnalysisTable from '../components/AnalysisTable';
import Input from '../components/Input';
import Title from '../components/Title';
import Sidebar from '../templates/Sidebar';

function Home() {
    const [filter, setFilter] = useState<string>("");
    return (
        <Sidebar>
            <>
                <div className="grid grid-cols-3 items-end">
                    <div>
                        <Title>Análises</Title>
                    </div>
                    <div></div>
                    <div className='text-right'>
                        <Input value={filter} onChange={(ev) => setFilter((ev.target as any).value)} placeholder='Buscar análise' />
                    </div>
                </div>
                <AnalysisTable filter={filter} />
            </>
        </Sidebar>
    );
}

export default Home;

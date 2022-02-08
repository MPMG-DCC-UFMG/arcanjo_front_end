import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnalysisService from '../services/analysisService';
import { AnalysisData } from '../types/types';
import AnalysisStatus from './AnalysisStatus';
import EmptyState from './EmptyState';
import Loading from './Loading';

function AnalysisTable() {
    const [data, setData] = useState<AnalysisData[] | null>(null);
    const analysisService = new AnalysisService();
    const navigate = useNavigate();

    const loadData = async () => {
        const response = await analysisService.getAll();
        setData(response);
    }

    const clickAnalysis = (analysis: AnalysisData) => {
        if (analysis.status === "completed") {
            navigate(`/analysis/${analysis.id}/report`)
        } else {
            navigate(`/analysis/${analysis.id}/logs`)
        }
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
                            <th>Nome da Análise</th>
                            <th>Status</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map(analysis => <tr key={analysis.id} onClick={() => clickAnalysis(analysis)}>
                            <td>{analysis.id}</td>
                            <td>{analysis.name}</td>
                            <td><AnalysisStatus status={analysis.status} /></td>
                            <td>{new Date(analysis.createdAt || "").toLocaleString()}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            } </>
        }
    </>);
}

export default AnalysisTable;

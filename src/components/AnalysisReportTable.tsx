import React, { useEffect, useState } from 'react';
import AnalysisService from '../services/analysisService';
import { AnalysisReportData } from '../types/types';

function AnalysisReportTable({ id }: { id: number | string }) {
    const [data, setData] = useState<AnalysisReportData[] | null>();
    const analysisService = new AnalysisService();

    const loadReport = async () => {
        const response = await analysisService.report(id);
        setData(response);
    }

    useEffect(() => {
        loadReport();
    }, [id]);

    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Arquivo</th>
                    <th>Hash</th>
                    <th>NSFW</th>
                    <th>Faces</th>
                    <th>Idades</th>
                    <th>Crianças</th>
                    <th>Classe</th>
                </tr>
            </thead>
            <tbody>
                {data?.map(item => <tr key={item.hash}>
                    <td>{item.id}</td>
                    <td>{item.file}</td>
                    <td title={item.hash}><div className='inline-block truncate w-32'>{item.hash}</div></td>
                    <td>{item.nsfw}</td>
                    <td>{item.faces}</td>
                    <td>{item.ages}</td>
                    <td>{item.children}</td>
                    <td>{item.classification}</td>
                </tr>)}
            </tbody>
        </table>
    );
}

export default AnalysisReportTable;

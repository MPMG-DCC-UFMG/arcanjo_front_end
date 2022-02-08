import React from 'react';
import { AnalysisData } from '../types/types';
import AnalysisStatus from './AnalysisStatus';

function AnalysisSummary({ analysis }: { analysis: AnalysisData }) {

    const fileTypes = () => {
        const types = [];
        if (analysis?.image) types.push("Imagens");
        if (analysis?.video) types.push("Vídeos");

        return types.join(" e ");
    }

    return (
        <ul className='mt-4 text-sm font-bold'>
            <li className='text-xl'>{analysis.name}</li>
            <li>Diretório: {analysis.path}</li>
            <li>{fileTypes()}</li>
            <li><AnalysisStatus status={analysis.status} /></li>
        </ul>
    );
}

export default AnalysisSummary;

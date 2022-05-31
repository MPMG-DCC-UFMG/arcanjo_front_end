import React from 'react';
import { AnalysisData } from '../types/types';
import AnalysisStatus from './AnalysisStatus';

function AnalysisSummary({ analysis, hideStatus }: { analysis: AnalysisData | null | undefined, hideStatus?: boolean }) {

    const fileTypes = () => {
        const types = [];
        if (analysis?.image) types.push("Imagens");
        if (analysis?.video) types.push("Vídeos");

        return types.join(" e ");
    }

    return (
        <ul className='mt-4 text-sm font-bold'>
            <li className='text-xl'>{analysis?.name}</li>
            <li>Diretório: {analysis?.path}</li>
            <li>{fileTypes()}</li>
            {!hideStatus ? <li><AnalysisStatus status={analysis?.status} /></li> : null}
        </ul>
    );
}

export default AnalysisSummary;

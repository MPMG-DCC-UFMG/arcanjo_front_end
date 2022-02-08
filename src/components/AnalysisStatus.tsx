import React from 'react';

function AnalysisStatus({ status }: { status: string | undefined }) {

    const renderStatus = () => {
        switch(status) {
            case "completed":
                return <span className='text-green-600'><i className="ri-checkbox-circle-fill"></i> Processamento completo</span>
            case "processing":
                return <span className='text-blue-600'><i className="ri-loader-2-line animate-spin inline-block"></i> Processando análise</span>
            default:
                return <span><i className="ri-asterisk"></i> Análise cadastrada</span>
        }
    }

    return renderStatus()
}

export default AnalysisStatus;
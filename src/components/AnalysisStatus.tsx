import React from 'react';

function AnalysisStatus({ status }: { status: string | undefined }) {

    const renderStatus = () => {
        switch(status) {
            case "completed":
                return <span className='text-primary'><i className="ri-checkbox-circle-fill"></i> Processamento completo</span>
            case "error":
                return <span className='text-red-700'><i className="ri-error-warning-fill"></i> Erro ao processar análise</span>
            case "canceled":
                return <span className='text-gray-400'><i className="ri-close-circle-fill"></i> Processamento cancelado</span>
            case "processing":
                return <span className='text-secondary'><i className="ri-loader-2-line animate-spin inline-block"></i> Processando análise</span>
            default:
                return <span><i className="ri-asterisk"></i> Análise cadastrada</span>
        }
    }

    return renderStatus()
}

export default AnalysisStatus;

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import AnalysisReportTable from '../components/AnalysisReportTable';
import AnalysisSummary from '../components/AnalysisSummary';
import Title from '../components/Title';
import AnalysisService from '../services/analysisService';
import Sidebar from '../templates/Sidebar';
import { AnalysisData } from '../types/types';

function AnalysisReport() {
    const [analysis, setAnalysis] = useState<AnalysisData | null>();
    const [showAlert, setShowAlert] = useState<boolean>(true);
    const { id } = useParams();
    const analysisService = new AnalysisService();

    const loadAnalysis = async () => {
        try {
            const response = await analysisService.getById(parseInt(id || '0'));
            setAnalysis(response);
        } catch (err: any) {
            toast.error(err);
        }
    }

    useEffect(() => {
        loadAnalysis();
    }, []);

    return (
        <Sidebar>
            {analysis
                ? <div className='w-full'>
                    <Title>Log do processamento</Title>
                    <AnalysisSummary analysis={analysis} />

                    {showAlert
                        ? <Alert><div className='flex items-center'>
                            <div className='text-4xl mr-4'>
                                <i className="ri-alert-fill"></i>
                            </div>
                            <div className='flex-1'>
                                Os resultados a seguir são fruto de um modelo probabilístico, com o objetivo de auxílio em triagem, e portanto podem haver falso positivos e/ou falso negativos. Favor verificá-los visualmente.
                            </div>
                            <div className='ml-4 text-base'><i onClick={() => setShowAlert(false)} className="ri-close-fill cursor-pointer opacity-50 hover:opacity-100"></i></div>
                        </div></Alert>
                        : null}

                    <AnalysisReportTable id={id || 0} analysis={analysis} />

                </div>
                : <></>
            }
        </Sidebar>
    );
}

export default AnalysisReport;

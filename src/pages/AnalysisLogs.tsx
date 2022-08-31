import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import AnalysisSummary from '../components/AnalysisSummary';
import Title from '../components/Title';
import AnalysisService from '../services/analysisService';
import Sidebar from '../templates/Sidebar';
import { AnalysisData } from '../types/types';
import nl2br from 'react-nl2br';
import Button from '../components/Button';

function AnalysisLogs() {
    const [analysis, setAnalysis] = useState<AnalysisData | null>();
    const [stickBottom, setStickBottom] = useState<boolean>(true);
    const { id } = useParams();
    const analysisService = new AnalysisService();
    let interval: NodeJS.Timer;

    const loadAnalysis = async () => {
        try {
            const response = await analysisService.getById(parseInt(id || '0'));
            setAnalysis(response);

            if (response.status === 'created')
                startProcess();
            if (response.status === 'processing')
                startRefresh();

        } catch (err: any) {
            toast.error(err);
        }
    }

    const startRefresh = () => {
        interval = setTimeout(() => {
            loadAnalysis();
        }, 1000);
    }

    const stopRefresh = () => {
        clearInterval(interval);
    }

    const startProcess = async () => {
        await analysisService.process(parseInt(id || '0'));
        startRefresh();
        loadAnalysis();
    }

    const cancelProcess = async () => {
        await analysisService.cancel(parseInt(id || '0'));
        startRefresh();
        loadAnalysis();
    }

    useEffect(() => {
        loadAnalysis();

        return () => {
            stopRefresh()
        }
    }, []);

    useEffect(() => {
        if (!stickBottom) return;

        const objDiv = document.getElementById("log");
        if (objDiv)
            objDiv.scrollTop = objDiv.scrollHeight;
    }, [analysis])

    return (
        <Sidebar>
            {analysis
                ? <div className='w-full'>
                    <Title>Log do processamento</Title>
                    <AnalysisSummary analysis={analysis} />

                    {analysis.status === 'completed' ? <div className='my-4'>
                        <Link to={`/analysis/${id}/report`}><Button>Acessar relatório</Button></Link>
                    </div> :
                        <div className='my-4 grid grid-cols-2 items-end'>
                            <div>
                                <label>
                                    <input type="checkbox" checked={stickBottom} onChange={() => setStickBottom(!stickBottom)} /> Fixar barra de rolagem no fim
                                </label>
                            </div>
                            <div className='text-right'>
                                {analysis.status === "processing" ? <Button onClick={() => cancelProcess()} outline>Cancelar processamento</Button> : null}
                            </div>
                        </div>
                    }

                    <div id='log' className="mt-8 w-full bg-slate-900 text-white p-4 rounded-lg overflow-auto h-log">
                        {nl2br(analysis.log || "Processando, aguarde...")}
                    </div>
                </div>
                : <></>
            }
        </Sidebar>
    );
}

export default AnalysisLogs;

import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import AnalysisReportTable from '../components/AnalysisReportTable';
import AnalysisSummary from '../components/AnalysisSummary';
import Button from '../components/Button';
import Title from '../components/Title';
import AnalysisService from '../services/analysisService';
import Sidebar from '../templates/Sidebar';
import { AnalysisData, AnalysisReportData } from '../types/types';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import ApiRequest from '../services/apiRequest';

function AnalysisReport() {
    const [analysis, setAnalysis] = useState<AnalysisData | null>();
    const [reportCount, setReportCount] = useState<number>(-1);
    const [showAlert, setShowAlert] = useState<boolean>(true);
    const { id } = useParams();
    const analysisService = new AnalysisService();
    const reportRef = useRef();

    const loadAnalysis = async () => {
        try {
            const response = await analysisService.getById(parseInt(id || '0'));
            setAnalysis(response);
            loadReport(response.id);
        } catch (err: any) {
            toast.error(err);
        }
    }


    const loadReport = async (id: number | string) => {
        let response = await analysisService.report(id);
        setReportCount(response?.length || 0);
    }

    useEffect(() => {
        loadAnalysis();
    }, []);

    const exportReport = () => {
        if (id) {
            const exportData = analysisService.reportDownloadLink(id);
            ApiRequest.openWindowWithPost(exportData.url, exportData.data);
        }
    }

    const exportAll = () => {
        if (id) {
            const exportData = analysisService.reportDownloadLink(id);
            ApiRequest.openWindowWithPost(exportData.url, exportData.data)
        }
    }

    const exportSelected = () => {
        if (reportRef && reportRef.current) {
            const ids = (reportRef.current as any).getSelectedIds();
            if (id) {
                const exportData = analysisService.reportDownloadLink(id, ids);
                ApiRequest.openWindowWithPost(exportData.url, exportData.data)
            }
        }
    }

    const exportFiltered = () => {
        if (reportRef && reportRef.current) {
            const ids = (reportRef.current as any).getFilteredIds();
            if (id) {
                const exportData = analysisService.reportDownloadLink(id, ids);
                ApiRequest.openWindowWithPost(exportData.url, exportData.data)
            }
        }
    }

    const exportPdf = (type?: string) => {
        let ids = null;
        switch (type) {
            case "selected":
                ids = (reportRef.current as any).getSelectedIds();
                break;
            case "filtered":
                ids = (reportRef.current as any).getFilteredIds();
                break;
            default:
                ids = [];
                break;
        }
        if (id) {
            const exportData = analysisService.reportDownloadPdfLink(id, ids);
            ApiRequest.openWindowWithPost(exportData.url, exportData.data)
        }
    }

    if (reportCount === 0) {
        return (<Sidebar>
            <>
                <Title>Resultado da análise</Title>
                <div className="flex">
                    <div className="flex-1">
                        <AnalysisSummary analysis={analysis} hideStatus />
                    </div>
                    <div className="flex-1 text-right">
                        <Link to={`/analysis/${id}/logs`}><Button>Log</Button>&nbsp;&nbsp;</Link>
                    </div>
                </div>
                <div>
                    <div className="my-4 card danger text-xs">
                        <div className='flex items-center'>
                            <div className='text-4xl mr-4'>
                                <i className="ri-alert-fill"></i>
                            </div>
                            <div className='flex-1'>
                                A análise NÃO foi executada com sucesso, verifique com o administrador se o Arcanjo possui permissão de execução sobre os dados selecionados.
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </Sidebar>)
    }

    return (
        <Sidebar>
            {analysis
                ? <div className='w-full'>
                    <Title>Resultado da análise</Title>
                    <div className="flex">
                        <div className="flex-1">
                            <AnalysisSummary analysis={analysis} />
                        </div>
                        <div className="flex-1 text-right">
                            <Link to={`/analysis/${id}/logs`}><Button outline>Log</Button>&nbsp;&nbsp;</Link>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger >
                                    <Button><>
                                        <i className="ri-file-download-fill"></i> Exportar Relatório
                                    </></Button>
                                </DropdownMenu.Trigger>

                                <DropdownMenu.Content sideOffset={5} className="bg-white w-72 text-center rounded shadow-card">
                                    <DropdownMenu.Item className='p-2 bg-gray-100 font-bold text-slate-500 text-sm'>
                                        Exportar em PDF
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item onClick={() => exportPdf()} className='cursor-pointer p-2 hover:bg-gray-100'>
                                        Exportar relatório completo
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item onClick={() => exportPdf('selected')} className='cursor-pointer p-2 hover:bg-gray-100'>
                                        Exportar itens selecionados
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item onClick={() => exportPdf('filtered')} className='cursor-pointer p-2 hover:bg-gray-100'>
                                        Exportar resultado da busca/filtro
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item className='p-2 bg-gray-100 font-bold text-slate-500 text-sm'>
                                        Exportar em XLSX
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item onClick={() => exportAll()} className='cursor-pointer p-2 hover:bg-gray-100'>
                                        Exportar relatório completo
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item onClick={() => exportSelected()} className='cursor-pointer p-2 hover:bg-gray-100'>
                                        Exportar itens selecionados
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item onClick={() => exportFiltered()} className='cursor-pointer p-2 hover:bg-gray-100'>
                                        Exportar resultado da busca/filtro
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>

                            </DropdownMenu.Root>
                        </div>
                    </div>

                    {showAlert
                        ? <Alert><div className='flex items-center'>
                            <div className='text-4xl mr-4'>
                                <i className="ri-alert-fill"></i>
                            </div>
                            <div className='flex-1'>
                                Os resultados a seguir são fruto de um modelo probabilístico, com o objetivo de auxiliar na triagem de imagens e vídeos. Portanto, podem ocorrer falsos positivos ou falsos negativos. Necessário executar a verificação visual.
                            </div>
                            <div className='ml-4 text-base'><i onClick={() => setShowAlert(false)} className="ri-close-fill cursor-pointer opacity-50 hover:opacity-100"></i></div>
                        </div></Alert>
                        : null}

                    <AnalysisReportTable id={id || 0} analysis={analysis} ref={reportRef} />

                </div>
                : <></>
            }
        </Sidebar>
    );
}

export default AnalysisReport;

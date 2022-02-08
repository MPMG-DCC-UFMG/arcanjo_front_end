import React, { useEffect, useState } from 'react';
import AnalysisService from '../services/analysisService';
import { AnalysisData, AnalysisReportData } from '../types/types';
import Modal from '../components/Modal';
import Button from './Button';

function AnalysisReportTable({ id, analysis }: { id: number | string, analysis: AnalysisData }) {
    const [data, setData] = useState<AnalysisReportData[] | null>();
    const [showModal, setShowModal] = useState<string | number | null>();
    const analysisService = new AnalysisService();

    const loadReport = async () => {
        const response = await analysisService.report(id);
        setData(response);
    }

    const fileUrl = (item: AnalysisReportData) => {
        return `${process.env.REACT_APP_BACKEND_URL}/storage?file=${analysis.path}/${item.file}`;
    }

    useEffect(() => {
        loadReport();
    }, [id]);

    const getRowClass = (item: AnalysisReportData) => {
        const hasChild = item.classification.indexOf("Pode conter menores de idade") >= 0;
        const hasPorn = item.classification.indexOf("Pode conter pornografia") >= 0;

        if (hasChild && hasPorn) {
            return 'child-porn';
        } else if (hasPorn) {
            return 'porn';
        } else if (hasChild) {
            return 'child';
        } else {
            return '';
        }
    }

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
                {data?.map(item => <tr key={item.hash} className={getRowClass(item)}>
                    <td>{item.id}</td>
                    <td>
                        <a className='link' onClick={() => setShowModal(item.id)}>
                            {item.file}
                        </a>

                        {showModal === item.id ?
                            <Modal><>
                                <div className='max-h-[80vh] overflow-y-auto'>
                                    <img src={fileUrl(item)} width="100%" />
                                </div>
                                <div className='mt-4 text-right'>
                                    <Button outline onClick={() => setShowModal(null)}>Fechar</Button>
                                </div>
                            </></Modal>
                            : null}
                    </td>
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

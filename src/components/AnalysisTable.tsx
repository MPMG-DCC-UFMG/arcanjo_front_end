import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnalysisService from '../services/analysisService';
import { AnalysisData } from '../types/types';
import AnalysisStatus from './AnalysisStatus';
import EmptyState from './EmptyState';
import Loading from './Loading';
import TableRowOrderIcon from './TableRowOrderIcon';

interface AnalysisTableProps {
    filter?: string
}

function AnalysisTable({ filter }: AnalysisTableProps) {
    const [data, setData] = useState<AnalysisData[] | null>(null);
    const [orderedBy, setOrderedBy] = useState<string>("id DESC");
    const analysisService = new AnalysisService();
    const navigate = useNavigate();

    const loadData = async () => {
        const response = await analysisService.getAll();
        setData(response);
    }

    const filteredData = () => filter ? data?.filter(item =>
        item.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0
        || (item.id || 0).toString().indexOf(filter.toLowerCase()) >= 0
        || new Date(item.createdAt || "").toLocaleString('pt-BR').indexOf(filter) >= 0
    ) : data;

    const orderedData = () => filteredData()?.sort((a, b) => {
        switch (orderedBy) {
            case "id ASC":
                return (a.id && b.id && a.id > b.id) ? 1 : -1
            case "id DESC":
                return (a.id && b.id && a.id > b.id) ? -1 : 1
            case "name ASC":
                return (a.name && b.name && a.name > b.name) ? 1 : -1
            case "name DESC":
                return (a.name && b.name && a.name > b.name) ? -1 : 1
            case "status ASC":
                return (a.status && b.status && a.status > b.status) ? 1 : -1
            case "status DESC":
                return (a.status && b.status && a.status > b.status) ? -1 : 1
            case "createdAt ASC":
                return (a.createdAt && b.createdAt && a.createdAt > b.createdAt) ? 1 : -1
            case "createdAt DESC":
                return (a.createdAt && b.createdAt && a.createdAt > b.createdAt) ? -1 : 1
            default:
                return (a.id && b.id && a.id > b.id) ? 1 : -1
        }
    });

    const selectOrder = (type: string) => {
        if (orderedBy === `${type} ASC`) {
            setOrderedBy(`${type} DESC`)
        } else {
            setOrderedBy(`${type} ASC`)
        }
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
                            <th
                                className='cursor-pointer'
                                onClick={() => selectOrder("id")}
                            >
                                ID
                                <TableRowOrderIcon sort={orderedBy} type="id" />
                            </th>
                            <th
                                className='cursor-pointer'
                                onClick={() => selectOrder("name")}
                            >
                                Nome da Análise
                                <TableRowOrderIcon sort={orderedBy} type="name" />

                            </th>
                            <th
                                className='cursor-pointer'
                                onClick={() => selectOrder("status")}
                            >
                                Status
                                <TableRowOrderIcon sort={orderedBy} type="status" />

                            </th>
                            <th
                                className='cursor-pointer'
                                onClick={() => selectOrder("createdAt")}
                            >
                                Data
                                <TableRowOrderIcon sort={orderedBy} type="createdAt" />

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderedData()?.map(analysis => <tr key={analysis.id} onClick={() => clickAnalysis(analysis)}>
                            <td>{analysis.id}</td>
                            <td>{analysis.name}</td>
                            <td><AnalysisStatus status={analysis.status} /></td>
                            <td>{new Date(analysis.createdAt || "").toLocaleString('pt-BR')}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            } </>
        }
    </>);
}

export default AnalysisTable;

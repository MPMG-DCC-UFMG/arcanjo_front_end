import React, { SyntheticEvent, useEffect, useState } from 'react';
import AnalysisService from '../services/analysisService';
import { AnalysisData, AnalysisReportData } from '../types/types';
import Modal from '../components/Modal';
import Button from './Button';
import Card from './Card';

interface filtersInterface {
    filter: string;
    type: string;
    class: string;
}

const videoExtensions: string[] = ['wav', 'qt', 'mpeg', 'mpg', 'avi', 'mp4', '3gp', 'mov', 'lvl', 'm4v', 'wmv'];
const imageExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'tiff'];

function AnalysisReportTable({ id, analysis }: { id: number | string, analysis: AnalysisData }) {
    const [data, setData] = useState<AnalysisReportData[] | null>();
    const [filters, setFilters] = useState<filtersInterface | null>({
        filter: "",
        type: "",
        class: ""
    });
    const [showModal, setShowModal] = useState<string | number | null>();
    const analysisService = new AnalysisService();

    const loadReport = async () => {
        const response = await analysisService.report(id);
        setData(response);
    }

    const fileUrl = (item: AnalysisReportData) => {
        return `${process.env.REACT_APP_BACKEND_URL}/storage?file=${item.file}`;
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

    const changeFilters = (ev: SyntheticEvent) => {
        const { name, value } = (ev.target as HTMLFormElement);
        setFilters({
            ...filters,
            ...{ [name]: value }
        } as filtersInterface);
    }

    const filteredData = (): AnalysisReportData[] | null => {
        if (!data) return null;
        let filtered = [...data];

        if (filters?.filter)
            filtered = filtered.filter(item => (
                item.file.indexOf(filters.filter) >= 0
                || item.hash.indexOf(filters.filter) >= 0
                || item.nsfw.indexOf(filters.filter) >= 0
                || item.ages.indexOf(filters.filter) >= 0
            ));

        if (filters?.type)
            filtered = filtered.filter(item => {
                const filename = item.file.split(".");
                const extension = filename[filename.length - 1];
                const extensions: string[] = filters.type === 'image' ? imageExtensions : videoExtensions;
                return extensions.includes(extension);
            });

        if (filters?.class)
            filtered = filtered.filter(item => {
                if (filters.class === 'child') return item.classification.indexOf('menores de idade') >= 0;
                if (filters.class === 'nsfw') return item.classification.indexOf('pornografia') >= 0;
                if (filters.class === 'child_nsfw')
                    return item.classification.indexOf('pornografia') >= 0 && item.classification.indexOf('pornografia') >= 0;
            });

        return filtered;
    }

    const fileName = (path: string): string => {
        const arr = path.split("/");
        return arr[arr.length - 1];
    }

    return (<>
        <div className="my-2">
            <Card>
                <div className="flex filter-card">
                    <div>
                        <label htmlFor='filter'>Buscar</label>
                        <input placeholder='Digite uma palavra para buscar nos resultados' onChange={changeFilters} value={filters?.filter} type="text" name='filter' id='filter' />
                    </div>
                    <div>
                        <label htmlFor='type'>Tipo</label>
                        <select onChange={changeFilters} name='type' id='type'>
                            <option value="">Imagens e Vídeos</option>
                            <option value="image">Apenas Imagens</option>
                            <option value="video">Apenas Vídeos</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='class'>Classe</label>
                        <select onChange={changeFilters} id='class' name='class'>
                            <option value="">Todos</option>
                            <option value="child">Pode conter menores de idade.</option>
                            <option value="nsfw">Pode conter pornografia.</option>
                            <option value="nsfw_child">Pode conter menores de idade e pornografia.</option>
                        </select>
                    </div>
                </div>
            </Card>
        </div>
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
                {filteredData()?.map(item => <tr key={item.hash} className={getRowClass(item)}>
                    <td>{item.id}</td>
                    <td>
                        <a className='link' onClick={() => setShowModal(item.id)} title={item.file}>
                            {fileName(item.file)}
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
    </>);
}

export default AnalysisReportTable;

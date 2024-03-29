import React, { SyntheticEvent, useEffect, useImperativeHandle, useState } from 'react';
import AnalysisService from '../services/analysisService';
import { AnalysisData, AnalysisReportData } from '../types/types';
import Modal from '../components/Modal';
import Button from './Button';
import Card from './Card';
import ApiRequest from '../services/apiRequest';
import { Pagination } from '@mui/material';

interface filtersInterface {
    filter: string;
    type: string;
    class: string;
}

const videoExtensions: string[] = ['wav', 'qt', 'mpeg', 'mpg', 'avi', 'mp4', '3gp', 'mov', 'lvl', 'm4v', 'wmv'];
const imageExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'tiff'];

const tooltipText = {
    id: "Para os arquivos de vídeo são disponibilizadas thumbnails, que são imagens do vídeo (frames) em que ocorrem as classes identificadas.",
    file: "Mídia analisada.",
    hash: "Hash MD5 dos arquivos analisados",
    nsfw: "Confiança na ocorrência de pornografia.",
    faces: "Quantidade de faces identificadas.",
    age: "Faixa etária estimada para as faces identificadas.",
    childs: "Quantidade de crianças identificadas.",
    timestamp: "Disponível para arquivos de vídeos: são indicados (amostralmente) os instantes de tempo em que ocorrem as classes identificadas.",
    classification: "Classe atribuída à mídia pelo modelo neural: “Pode conter menores de idade”; “Pode conter pornografia”; “Pode conter pornografia. Pode conter menores de idade”; “Pode não conter menores de idade ou pornografia”."
}

function AnalysisReportTable({ id, analysis }: { id: number | string, analysis: AnalysisData }, ref: any) {
    const [pageSize, setPageSize] = useState<number>(100);
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<AnalysisReportData[] | null>();
    const [filters, setFilters] = useState<filtersInterface | null>({
        filter: "",
        type: "",
        class: ""
    });
    const [showModal, setShowModal] = useState<{ url: string, type: string } | null>();
    const analysisService = new AnalysisService();

    const loadReport = async () => {
        let response = await analysisService.report(id);
        response = response.map(r => {
            r.selected = true;
            return r;
        });
        setData(response);
    }

    const fileUrl = (item: AnalysisReportData, forceFile?: boolean) => {
        return item.type === "image" || forceFile
            ? `${ApiRequest.host}/storage?file=${item.file}`
            : `${ApiRequest.host}/storage?file=${item.thumbnail}&removeStoragePrefix=true`;
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
                item.file?.indexOf(filters.filter) >= 0
                || item.hash?.indexOf(filters.filter) >= 0
                || item.nsfw?.indexOf(filters.filter) >= 0
                || item.ages?.indexOf(filters.filter) >= 0
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
                if (filters.class === 'none') return !item.classification || item.classification.indexOf('não') >= 0;
                if (filters.class === 'child') return item.classification.indexOf('menores de idade') >= 0;
                if (filters.class === 'nsfw') return item.classification.indexOf('pornografia') >= 0;
                if (filters.class === 'nsfw_child')
                    return item.classification.indexOf('menores de idade') >= 0 && item.classification.indexOf('pornografia') >= 0;
            });

        return filtered;
    }

    const pageCount = () => Math.ceil((filteredData() || []).length / pageSize);
    const paginateData = (array: AnalysisReportData[]) => array.slice((page - 1) * pageSize, page * pageSize);

    const fileName = (path: string): string => {
        const arr = path.split("/");
        return arr[arr.length - 1];
    }

    const toggleSelected = (id: number) => {
        if (data) {
            const d = [...data];
            const index = d.findIndex(ard => ard.id === id);
            d[index].selected = !d[index].selected;
            setData(d);
        }
    }

    const toggleAllSelected = () => {
        if (data) {
            let d = [...data];
            const isChecked = !isAllSelected();
            d = d.map(temp => {
                temp.selected = isChecked;
                console.log(temp);
                return temp;
            })
            setData(d);
        }
    }

    const isAllSelected = (): boolean => data?.every(d => d.selected) || false;

    const getSelectedIds = (): string[] => data?.filter(d => d.selected).map(d => d.id.toString()) || [];
    const getFilteredIds = (): string[] => filteredData()?.map(d => d.id.toString()) || [];
    const getDataLength = (): number => !data ? -1 : data.length;

    useImperativeHandle(
        ref,
        () => {
            return {
                getSelectedIds,
                getFilteredIds,
                getDataLength
            }
        }
    );

    const fixClassification = (classification: string): string => {
        if (!classification || classification == "['']")
            return "Pode não conter menores de idade ou pornografia"
        else return classification
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
                            <option value="none">Pode não conter menores de idade ou pornografia</option>
                        </select>
                    </div>
                </div>
            </Card>
        </div>
        <table>
            <thead>
                <tr>
                    <th>
                        <input type="checkbox" checked={isAllSelected()} onClick={() => toggleAllSelected()} />
                    </th>
                    <th className="cursor-help" title={tooltipText.id}>#</th>
                    <th className="cursor-help" title={tooltipText.file}>Arquivo</th>
                    <th className="cursor-help" title={tooltipText.hash}>Hash</th>
                    <th className="cursor-help" title={tooltipText.nsfw}>NSFW</th>
                    <th className="cursor-help" title={tooltipText.faces}>Faces</th>
                    <th className="cursor-help" title={tooltipText.age}>Idades</th>
                    <th className="cursor-help" title={tooltipText.childs}>Crianças</th>
                    <th className="cursor-help" title={tooltipText.timestamp}>Timestamp</th>
                    <th className="cursor-help" title={tooltipText.classification}>Classe</th>
                </tr>
            </thead>
            <tbody>
                {paginateData(filteredData() || []).map((item) => <tr key={`${item.id}${item.hash}`} className={getRowClass(item)}>
                    <td>
                        <input type="checkbox" checked={item.selected} onClick={() => toggleSelected(item.id)} />
                    </td>
                    <td>
                        {
                            item.type === "video"
                                ? <a className='link' onClick={() => setShowModal({
                                    url: fileUrl(item),
                                    type: "image"
                                })} title={item.file}>
                                    {item.id}
                                </a>
                                : item.id
                        }
                    </td>
                    <td>
                        <a className='link' onClick={() => setShowModal({
                            url: fileUrl(item, item.type === "video"),
                            type: item.type
                        })} title={item.file}>
                            {fileName(item.file)}
                        </a>
                    </td>
                    <td title={item.hash}><div className='inline-block truncate w-32'>{item.hash}</div></td>
                    <td>{item.nsfw || "-"}</td>
                    <td>{item.faces || "-"}</td>
                    <td>{item.ages || "-"}</td>
                    <td>{item.children || "-"}</td>
                    <td>{item.timestamp || "-"}</td>
                    <td>{fixClassification(item.classification)}</td>
                </tr>)}
            </tbody>
        </table>

        {showModal ?
            <Modal><>
                <div className='max-h-[80vh] overflow-y-auto'>
                    {showModal.type === "image"
                        ? <img src={showModal.url} width="100%" />
                        : <video src={showModal.url} autoPlay controls width="100%" />
                    }
                </div>
                <div className='mt-4 text-right'>
                    <Button outline onClick={() => setShowModal(null)}>Fechar</Button>
                </div>
            </></Modal>
            : null}

        {pageCount() > 1 ?
            <div className="flex justify-center">
                <Pagination count={pageCount()} boundaryCount={2} siblingCount={2} shape="rounded" size='large' defaultPage={page} onChange={(ev, page) => setPage(page)} />
            </div>
            : null}

    </>);
}

export default React.forwardRef(AnalysisReportTable);

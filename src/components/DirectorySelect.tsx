import React, { useEffect, useRef, useState } from 'react';
import DirectoryService from '../services/directoryService';
import { DirData } from '../types/types';
import Button from './Button';
import Modal from './Modal';
import Subtitle from './Subtitle';

interface DirectorySelectProps {
    onSelect?: (path: string) => void | undefined,
}

function DirectorySelect({ onSelect }: DirectorySelectProps) {
    const [dir, setDir] = useState<DirData | null>(null);
    const [selectedDir, setSelectedDir] = useState<string | null | undefined>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const dirService = new DirectoryService();

    const selectDirectory = async (newPath?: string) => {
        setDir(null);
        const data = await dirService.getDir(newPath);
        setDir(data);
    }

    const changeDirectory = (folder: string) => {
        const currentPath = dir?.path || "";
        const newPath = currentPath.substring(-1) === "/"
            ? `${dir?.path}${folder}`
            : `${dir?.path}/${folder}`
        selectDirectory(newPath)
    }

    const changeDirectoryBreadcrumb = (index: number) => {
        const path = (dir?.path || "").split("/").slice(0, index + 1);
        selectDirectory(path.join("/"));
    }

    const renderPathBreadcrumb = () => {
        const path: string[] = dir ? dir.path.split("/").filter(p => !!p) : [];
        path.unshift("~");

        const elements = path.map((p: string, index: number) => <>
            {index > 0 ? <span> / </span> : null}
            <a onClick={() => changeDirectoryBreadcrumb(index)} className='hover:underline cursor-pointer'>{p}</a>
        </>);
        return elements;
    }

    const selectCurrentDirectory = () => {
        setSelectedDir(dir?.path);
        if (onSelect) onSelect(dir?.path || "");
        setShowModal(false);
    }

    useEffect(() => {
        selectDirectory();
    }, []);

    return (<>
        {showModal ?
            <Modal>
                <div className='-mt-4'>
                    <Subtitle>Selecionar diretório</Subtitle>
                    <div className='p-2 bg-gray-100 rounded my-4 overflow-x-auto whitespace-nowrap'>
                        {renderPathBreadcrumb()}
                    </div>
                    <ul className='divide-y my-4 overflow-y-auto max-h-[50vh]'>
                        {
                            dir?.contents.map(content =>
                                <li className='p-2' key={content}>
                                    <a onClick={() => changeDirectory(content)} className='text-gray-700 hover:text-gray-900 cursor-pointer'>
                                        <i className="ri-folder-fill"></i> {content}
                                    </a>
                                </li>
                            )
                        }
                        {dir?.contents.length === 0 ? <li className='text-center py-8 font-bold text-gray-400'>
                            O diretório selecionado não possui subdiretórios
                        </li> : null}
                    </ul>
                    <div className='text-right mt-4'>
                        <Button onClick={selectCurrentDirectory} outline>Selecionar diretório</Button>
                    </div>
                </div>
            </Modal>
            : null}

        <div className='relative'>
            <div className='input flex items-center'>
                <div className='flex-1 truncate'>
                    {selectedDir || 'Selecione um diretório'}
                </div>
                <button onClick={() => setShowModal(true)} type='button' className='button flat button-sm'>Selecionar diretório</button>
            </div>
        </div>
    </>
    );
}

export default DirectorySelect;

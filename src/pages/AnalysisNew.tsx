import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import DirectorySelect from '../components/DirectorySelect';
import Divider from '../components/Divider';
import Input from '../components/Input';
import Label from '../components/Label';
import Subtitle from '../components/Subtitle';
import Title from '../components/Title';
import AnalysisService from '../services/analysisService';
import DirectoryService from '../services/directoryService';
import Sidebar from '../templates/Sidebar';
import { AnalysisData } from '../types/types';

function AnalysisNew() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean | undefined>(false);
    const [selectedDir, setSelectedDir] = useState<string>("");
    const [typeAvailability, setTypeAvailability] = useState<{ images: number; videos: number; } | null>();
    const analysisService = new AnalysisService();
    const dirService = new DirectoryService();

    useEffect(() => {
        checkTypeAvailability();
    }, [selectedDir])

    const checkTypeAvailability = async () => {
        setTypeAvailability(null);
        try {
            const availability = await dirService.getAvailability(selectedDir);
            setTypeAvailability(availability);
        } catch {
            setTypeAvailability({ images: 0, videos: 0 });
        }
    }

    const saveAnalysis = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            name: { value: string };
            path: { value: string };
            image: { checked: boolean };
            video: { checked: boolean };
            porn_threshold: { value: number };
            face_threshold: { value: number };
            child_threshold: { value: number };
            age_threshold: { value: number };
        };

        setLoading(true);
        try {
            const data: AnalysisData = {
                name: target.name.value,
                path: selectedDir,
                image: target.image.checked,
                video: target.video.checked,
                porn_threshold: target.porn_threshold.value,
                face_threshold: target.face_threshold.value,
                child_threshold: target.child_threshold.value,
                age_threshold: target.age_threshold.value
            };
            const response = await analysisService.save(data);
            navigate(`/analysis/${response.id}/logs`);
        } catch (err: any) {
            toast.error(err);
        }
        setLoading(false);
    }

    return (
        <Sidebar>
            <div className='w-full max-w-lg'>
                <Title>Nova Análise</Title>

                <form onSubmit={saveAnalysis} className='mt-8'>
                    <Subtitle>Dados da análise</Subtitle>

                    <div className="my-3">
                        <Input required name='name' placeholder='Nome da Análise' />
                    </div>
                    <div className="my-3">
                        <DirectorySelect onSelect={(path) => setSelectedDir(path)} />
                    </div>
                    <div className="my-3">
                        <Label>Tipos de arquivos a serem analisados</Label>
                        {typeAvailability
                            ? <div className="flex gap-6">
                                <div>
                                    <label><input name='image' className='accent-primary' type='checkbox' disabled={typeAvailability?.images === 0} /> Imagens</label>
                                </div>
                                <div>
                                    <label><input name='video' className='accent-primary' type='checkbox' disabled={typeAvailability?.videos === 0} /> Vídeos</label>
                                </div>
                            </div>
                            : <i className="ri-loader-2-line inline-block animate-spin"></i>
                        }
                    </div>

                    <Divider />

                    <Subtitle>Configurações</Subtitle>
                    <div className="flex flex-wrap -mx-2">
                        <div className='w-1/2 p-2'>
                            <Input name='porn_threshold' defaultValue={0.3} placeholder='Limiar de Pornografia' />
                        </div>
                        <div className='w-1/2 p-2'>
                            <Input name='face_threshold' defaultValue={0.8} placeholder='Limiar de Detecção de Face' />
                        </div>
                        <div className='w-1/2 p-2'>
                            <Input name='child_threshold' defaultValue={0.7} placeholder='Limiar de Detecção de Crianças' />
                        </div>
                        <div className='w-1/2 p-2'>
                            <Input name='age_threshold' defaultValue={0.7} placeholder='Limiar de estimativa de idade' />
                        </div>
                    </div>

                    <Divider />

                    <Button loading={loading} type='submit' full>Iniciar processamento</Button>

                </form>
            </div>
        </Sidebar>
    );
}

export default AnalysisNew;

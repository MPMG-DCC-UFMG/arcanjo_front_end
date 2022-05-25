import { AnalysisData, AnalysisReportData } from '../types/types';
import ApiRequest from './apiRequest';

export default class AnalysisService extends ApiRequest {

    constructor() {
        super('analysis');
    }

    async getAll() {
        return await this.get();
    }

    async getById(id: number) {
        return await this.get(id);
    }

    async save(data: AnalysisData) {
        return await this.post(data);
    }

    async process(id: number) {
        return await this.postUrl(`${id}/process`);
    }

    async report(id: number | string): Promise<AnalysisReportData[]> {
        return await this.get(`${id}/report`);
    }

    reportDownloadLink(id: number | string, ids: string[] = []) {
        return `${this.getHost()}/analysis/${id}/report/download?ids=${ids.join(",")}`;
    }

    reportDownloadPdfLink(id: number | string, ids: string[] = []) {
        return `${this.getHost()}/analysis/${id}/report/pdf?ids=${ids.join(",")}`;
    }

}
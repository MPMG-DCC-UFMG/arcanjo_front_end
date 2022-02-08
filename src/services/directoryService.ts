import { UserData } from '../types/types';
import ApiRequest from './apiRequest';

export default class DirectoryService extends ApiRequest {

    constructor() {
        super('dir');
    }

    async getDir(path?: string) {
        return await this.get("", path ? `path=${path}` : undefined);
    }

}
import { UserData } from '../types/types';
import ApiRequest from './apiRequest';

export default class UserService extends ApiRequest {

    constructor() {
        super('users');
    }

    async authUser() {
        return await this.get("me");
    }

    async create(data: UserData) {
        return await this.post(data);
    }

    async save(id: number, data: UserData) {
        return await this.put(id, data);
    }

    async getById(id: string) {
        return await this.get(id);
    }

    async list() {
        return await this.get();
    }

}
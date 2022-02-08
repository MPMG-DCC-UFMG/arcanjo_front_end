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

}
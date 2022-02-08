import ApiRequest from './apiRequest';

export default class AuthService extends ApiRequest {

    static LOCAL_STORAGE_KEY: string = "ARCANJO_TOKEN";

    constructor() {
        super('login');
    }

    async login(email: string, password: string) {
        return this.post({ email, password });
    }

    static hasToken = () => Boolean(localStorage.getItem(AuthService.LOCAL_STORAGE_KEY));
    static getToken = () => localStorage.getItem(AuthService.LOCAL_STORAGE_KEY);
    static setToken = (token: string) => localStorage.setItem(AuthService.LOCAL_STORAGE_KEY, token);
    static clearToken = () => localStorage.removeItem(AuthService.LOCAL_STORAGE_KEY);




}
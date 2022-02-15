import axios, { AxiosRequestHeaders } from 'axios';

export default class ApiRequest {

    constructor(
        private _endpoint: string,
        private _requireAuth = true
    ) { }

    protected getToken = () => localStorage.getItem("ARCANJO_TOKEN");
    protected getHost = () => {
        return `http://${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}`;
    }

    protected getHeaders(): AxiosRequestHeaders {
        const headers: AxiosRequestHeaders = {};

        if (this._requireAuth)
            headers.Authorization = `Bearer ${this.getToken()}`

        return headers;
    }

    protected async get(id?: string | number, params?: string) {
        try {
            const response = await axios.get(`${this.getHost()}/${this._endpoint}${id ? '/' + id : ''}${params ? '?' + params : ''}`, {
                headers: this.getHeaders()
            });
            return response.data;
        } catch (error: any) {
            throw error.response.data.message.join(", ");
        }
    }

    protected async post(data: any) {
        try {
            const response = await axios.post(`${this.getHost()}/${this._endpoint}`, data, {
                headers: this.getHeaders()
            });
            return response.data;
        } catch (error: any) {
            throw error.response.data.message.join(", ");
        }
    }

    protected async postUrl(url: string) {
        try {
            const response = await axios.post(`${this.getHost()}/${this._endpoint}/${url}`, null, {
                headers: this.getHeaders()
            });
            return response.data;
        } catch (error: any) {
            throw error.response.data.message.join(", ");
        }
    }

    protected async put(id: number, data: any) {
        return await axios.put(`${this.getHost()}/${this._endpoint}/${id}`, data, {
            headers: this.getHeaders()
        });
    }

    protected async delete(id: number) {
        return await axios.delete(`${this.getHost()}/${this._endpoint}/${id}`, {
            headers: this.getHeaders()
        });
    }

}
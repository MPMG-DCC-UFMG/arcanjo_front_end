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

    static get host() {
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

    protected async deleteUrl(url: string) {
        return await axios.delete(`${this.getHost()}/${this._endpoint}/${url}`, {
            headers: this.getHeaders()
        });
    }

    static openWindowWithPost(url: string, data: any) {
        var form = document.createElement("form");
        form.target = "_blank";
        form.method = "POST";
        form.action = url;
        form.style.display = "none";

        for (var key in data) {
            var input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = data[key];
            form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    }

}
/**
 * Reference https://medium.com/@zitko/structuring-a-vue-project-authentication-87032e5bfe16
 */
import axios from 'axios';

export class ApiService {
    public static init(baseURL: string) {
        axios.defaults.baseURL = baseURL;
    }

    public static get(url: string, params: any) {
        return axios.get(url, params);
    }

    public static post(resource: any, data: any) {

        return axios.post(resource, data);
    }

    public static put(resource: any, data: any) {
        return axios.put(resource, data);
    }

    public static delete(url: string, params: any) {
        return axios.delete(url, params);
    }
}

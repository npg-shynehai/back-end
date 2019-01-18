import { MyHttpResponse } from './Response';

export interface FormResponse extends MyHttpResponse {
    id?: number | string;
}

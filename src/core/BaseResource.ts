import { IHttpClient } from './IHttpClient';
import { URLSearchParams } from 'url';

export abstract class BaseResource {
    protected readonly httpClient: IHttpClient;

    constructor(httpClient: IHttpClient) {
        this.httpClient = httpClient;
    }

    protected buildQueryString(params: Record<string, any>): string {
        const queryParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                queryParams.append(key, String(value));
            }
        });

        const queryString = queryParams.toString();
        return queryString ? `?${queryString}` : '';
    }
}

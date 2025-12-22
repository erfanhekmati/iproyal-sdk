import { HttpClient } from '../core/HttpClient';

export class Mobile {
    constructor(private readonly httpClient: HttpClient) { }

    async getBalance(): Promise<number> {
        return this.httpClient.get<number>('/balance');
    }

    async rotateIP(key: string): Promise<void> {
        return this.httpClient.post<void>(`/orders/4g/rotate-ip/${key}`);
    }
}

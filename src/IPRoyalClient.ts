import { HttpClient } from './core/HttpClient';
import { IPRoyalConfig } from './types';
import { Residential } from './resources/Residential';
import { Datacenter } from './resources/Datacenter';
import { ISP } from './resources/ISP';
import { Mobile } from './resources/Mobile';

export class IPRoyalClient {
    private readonly httpClient: HttpClient;
    public readonly residential: Residential;
    public readonly datacenter: Datacenter;
    public readonly isp: ISP;
    public readonly mobile: Mobile;

    constructor(config: IPRoyalConfig) {
        if (!config.apiToken) {
            throw new Error('API token is required');
        }

        this.httpClient = new HttpClient(config);
        this.residential = new Residential(this.httpClient);
        this.datacenter = new Datacenter(this.httpClient);
        this.isp = new ISP(this.httpClient);
        this.mobile = new Mobile(this.httpClient);
    }
}

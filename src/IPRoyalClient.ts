import { HttpClient } from './core/HttpClient';
import { IPRoyalConfig } from './types';
import { Residential } from './resources/Residential';
import { Datacenter } from './resources/Datacenter';
import { ISP } from './resources/ISP';
import { Mobile } from './resources/Mobile';

const DEFAULT_RESIDENTIAL_BASE_URL = 'https://resi-api.iproyal.com/v1';
const DEFAULT_PROXY_API_BASE_URL = 'https://apid.iproyal.com/v1/reseller';

export class IPRoyalClient {
    public readonly residential: Residential;
    public readonly datacenter: Datacenter;
    public readonly isp: ISP;
    public readonly mobile: Mobile;

    constructor(config: IPRoyalConfig) {
        if (!config.apiToken) {
            throw new Error('API token is required');
        }

        const residentialClient = new HttpClient(config, {
            baseURL: config.residentialBaseURL ?? config.baseURL ?? DEFAULT_RESIDENTIAL_BASE_URL,
            authHeader: 'bearer',
        });
        const datacenterClient = new HttpClient(config, {
            baseURL: config.datacenterBaseURL ?? DEFAULT_PROXY_API_BASE_URL,
            authHeader: 'x-access-token',
        });
        const ispClient = new HttpClient(config, {
            baseURL: config.ispBaseURL ?? DEFAULT_PROXY_API_BASE_URL,
            authHeader: 'x-access-token',
        });
        const mobileClient = new HttpClient(config, {
            baseURL: config.mobileBaseURL ?? DEFAULT_PROXY_API_BASE_URL,
            authHeader: 'x-access-token',
        });

        this.residential = new Residential(residentialClient);
        this.datacenter = new Datacenter(datacenterClient);
        this.isp = new ISP(ispClient);
        this.mobile = new Mobile(mobileClient);
    }
}

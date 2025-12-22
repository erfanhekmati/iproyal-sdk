export interface EntryNode {
    dns: string;
    ips: string[];
    ports: Array<{
        name: string;
        port: number;
        alternative_ports: number[];
    }>;
}

export interface Country {
    code: string;
    name: string;
    prefix: string;
    cities?: City[];
    states?: State[];
    isps?: ISP[];
}

export interface City {
    name: string;
    prefix: string;
}

export interface State {
    name: string;
    prefix: string;
}

export interface ISP {
    name: string;
    prefix: string;
}

export interface Region {
    code: string;
    name: string;
    prefix: string;
}

export interface CountrySet {
    name: string;
    prefix: string;
    countries: string[];
}

export interface GenerateProxyListParams {
    format?: string;
    hostname?: string;
    port?: string;
    rotation?: string;
    subuser_hash?: string;
    location?: string;
    proxy_count?: number;
    username?: string;
    password?: string;
    lifetime?: string;
}

export interface ProxyList {
    proxies: string[];
}

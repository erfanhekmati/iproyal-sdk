export interface EntryNode {
    dns: string;
    ips: string[];
    ports: Array<{
        name: "http|https" | "socks5";
        port: number;
        alternative_ports: number[];
    }>;
}

/** Wrapper for API option groups (cities, states, isps) */
export interface OptionsGroup<T> {
    prefix: string;
    options: T[];
}

export interface ISPOption {
    code: string;
    name: string;
}

export interface CityOption {
    code: string;
    name: string;
    isps: OptionsGroup<ISPOption>;
}

export interface StateOption {
    code: string;
    name: string;
    cities: OptionsGroup<CityOption>;
    isps: OptionsGroup<ISPOption>;
}

export interface CountryOption {
    code: string;
    name: string;
    cities: OptionsGroup<CityOption>;
    states: OptionsGroup<StateOption>;
}

/** Response shape for GET /access/countries */
export interface CountriesResponse {
    prefix: string;
    countries: CountryOption[];
}

export interface RegionOption {
    code: string;
    name: string;
}

/** Response shape for GET /access/regions */
export interface RegionsResponse {
    prefix: string;
    regions: RegionOption[];
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

export interface CountrySetOption {
    code: string;
    name: string;
}

/** Response shape for GET /access/country-sets */
export interface CountrySetsResponse {
    prefix: string;
    countrySets: CountrySetOption[];
}

export interface CountrySet {
    name: string;
    prefix: string;
    countries: string[];
}

export interface GenerateProxyListParams {
    format?: string;
    hostname?: string;
    port?: "http|https" | "socks5";
    rotation?: "sticky" | "random";
    subuser_hash?: string;
    location?: string;
    proxy_count?: number;
    username?: string;
    password?: string;
    lifetime?: string;
}

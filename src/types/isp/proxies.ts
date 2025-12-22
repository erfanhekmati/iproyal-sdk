export interface ISPProxyAvailability {
    country_code: string;
    country_name: string;
    available_ips: number;
}

export interface ISPProxyAvailabilityList {
    data: ISPProxyAvailability[];
}

export interface ISPChangeCredentialsParams {
    order_id: number;
    proxies: string[];
    username?: string;
    password?: string;
    random_password?: boolean;
    is_reset?: boolean;
}

export interface DatacenterProxyAvailability {
    country_code: string;
    country_name: string;
    available_ips: number;
}

export interface DatacenterProxyAvailabilityList {
    data: DatacenterProxyAvailability[];
}

export interface DatacenterChangeCredentialsParams {
    order_id: number;
    proxies: string[];
    username?: string;
    password?: string;
    random_password?: boolean;
    is_reset?: boolean;
}

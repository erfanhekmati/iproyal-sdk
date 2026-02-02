export interface SubUserLimits {
    daily_limit?: number;
    monthly_limit?: number;
    lifetime_limit?: number;
}

export interface ResidentialSubUser {
    hash: string;
    username: string;
    password: string;
    traffic: number;
    traffic_available: number;
    traffic_used: number;
}

export interface ResidentialSubUserList {
    data: ResidentialSubUser[];
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

export interface ResidentialCreateSubUserParams {
    username: string;
    password: string;
    traffic: number;
    limits?: SubUserLimits;
}

export interface ResidentialUpdateSubUserParams {
    username?: string;
    password?: string;
    traffic?: number;
    limits?: SubUserLimits;
}

export interface ResidentialSubUserTrafficParams {
    amount: number;
}

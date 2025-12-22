export interface SubUserLimits {
    daily_limit?: number;
    monthly_limit?: number;
    lifetime_limit?: number;
}

export interface ResidentialSubUser {
    hash: string;
    username: string;
    traffic: number;
    used_traffic: number;
    limits?: SubUserLimits;
    created_at: string;
    updated_at: string;
}

export interface ResidentialSubUserList {
    data: ResidentialSubUser[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
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

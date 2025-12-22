export interface ResidentialWhitelistEntry {
    hash: string;
    ip: string;
    port: number;
    configuration: string;
    note?: string;
    created_at: string;
    updated_at: string;
}

export interface ResidentialWhitelistEntryList {
    data: ResidentialWhitelistEntry[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export interface ResidentialCreateWhitelistEntryParams {
    ip: string;
    port: number;
    configuration: string;
    note?: string;
}

export interface ResidentialUpdateWhitelistEntryParams {
    configuration?: string;
    note?: string;
}

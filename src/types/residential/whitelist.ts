export interface ResidentialWhitelistEntry {
    hash: string;
    ip: string;
    port: number;
    type: string;
    configuration: string;
    note: string | null;
}

export interface ResidentialWhitelistEntryList {
    data: ResidentialWhitelistEntry[];
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

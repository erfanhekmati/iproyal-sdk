export interface ResidentialIPSkippingList {
    hash: string;
    title: string;
    ip_ranges?: string[];
    created_at: string;
    updated_at: string;
}

export interface ResidentialCreateIPSkippingListParams {
    title: string;
}

export interface ResidentialUpdateIPSkippingListParams {
    title?: string;
    ip_ranges?: string[];
}

export interface ResidentialIPSkippingItem {
    hash: string;
    ip_range: string;
}

export interface ResidentialIPSkippingList {
    hash: string;
    title: string;
    items: ResidentialIPSkippingItem[];
}

export interface ResidentialIPSkippingListResponse {
    data: ResidentialIPSkippingList[];
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

export interface ResidentialCreateIPSkippingListParams {
    title: string;
}

export interface ResidentialUpdateIPSkippingListParams {
    title?: string;
    ip_ranges?: string[];
}

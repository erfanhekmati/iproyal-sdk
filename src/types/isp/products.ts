export interface ISPPlan {
    id: number;
    name: string;
    price: number;
    min_quantity: number;
    max_quantity: number;
}

export interface ISPChildLocation {
    id: number;
    name: string;
    out_of_stock: boolean;
    available_proxies_count?: number;
}

export interface ISPLocation {
    id: number;
    name: string;
    out_of_stock: boolean;
    available_proxies_count?: number;
    child_locations: ISPChildLocation[];
}

export interface ISPQuestion {
    id: number;
    text: string;
    is_required: boolean;
}

export interface ISPQuantityDiscount {
    quantity_from: number;
    discount_percent: number;
}

export interface ISPProduct {
    id: number;
    name: string;
    plans: ISPPlan[];
    locations: ISPLocation[];
    questions: ISPQuestion[];
    quantity_discounts: ISPQuantityDiscount[];
}

export interface ISPProductList {
    data: ISPProduct[];
}

export interface DatacenterPlan {
    id: number;
    name: string;
    price: number;
    min_quantity: number;
    max_quantity: number;
}

export interface DatacenterChildLocation {
    id: number;
    name: string;
    out_of_stock: boolean;
}

export interface DatacenterLocation {
    id: number;
    name: string;
    out_of_stock: boolean;
    child_locations: DatacenterChildLocation[];
}

export interface DatacenterQuestion {
    id: number;
    text: string;
    is_required: boolean;
}

export interface DatacenterQuantityDiscount {
    quantity_from: number;
    discount_percent: number;
}

export interface DatacenterProduct {
    id: number;
    name: string;
    plans: DatacenterPlan[];
    locations: DatacenterLocation[];
    questions: DatacenterQuestion[];
    quantity_discounts: DatacenterQuantityDiscount[];
}

export interface DatacenterProductList {
    data: DatacenterProduct[];
}

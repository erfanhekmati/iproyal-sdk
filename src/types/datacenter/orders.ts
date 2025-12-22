export interface DatacenterQuestionAnswer {
    question_id: number;
    answer: string;
}

export interface DatacenterSelectionLocation {
    location_id: number;
    quantity: number;
}

export interface DatacenterSelection {
    locations: DatacenterSelectionLocation[];
}

export interface DatacenterOrder {
    id: number;
    product_id: number;
    product_plan_id: number;
    product_location_id: number;
    quantity: number;
    status: string;
    auto_extend: boolean;
    created_at: string;
    expires_at: string;
    note?: string;
}

export interface DatacenterOrderList {
    data: DatacenterOrder[];
    meta?: {
        current_page: number;
        per_page: number;
        total: number;
    };
}

export interface DatacenterGetOrdersParams {
    product_id?: number;
    page?: number;
    per_page?: number;
    location_id?: number;
    status?: string;
    note_search?: string;
    order_ids?: number[];
    sort_by?: string;
    order?: 'asc' | 'desc';
    statuses?: string[];
    status_is_expiring_soon?: boolean;
    order_billing_type?: string;
}

export interface DatacenterCalculatePricingParams {
    product_id: number;
    product_plan_id: number;
    product_location_id: number;
    quantity: number;
    coupon_code?: string;
    order_id?: number;
    order_billing_type?: string;
    product_question_answers?: DatacenterQuestionAnswer[];
}

export interface DatacenterPricingResult {
    total: number;
    subtotal: number;
    discount?: number;
    tax?: number;
}

export interface DatacenterCreateOrderParams {
    product_id: number;
    product_plan_id?: number;
    product_location_id?: number;
    quantity?: number;
    coupon_code?: string;
    auto_extend?: boolean;
    product_question_answers?: DatacenterQuestionAnswer[];
    card_id?: number;
    selection?: DatacenterSelection;
}

export interface DatacenterExtendOrderParams {
    product_plan_id: number;
    card_id?: number;
    proxies?: string[];
}

export interface DatacenterToggleAutoExtendParams {
    auto_extend: boolean;
}

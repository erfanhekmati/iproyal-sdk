export interface ISPQuestionAnswer {
    question_id: number;
    answer: string;
}

export interface ISPSelectionLocation {
    location_id: number;
    quantity: number;
}

export interface ISPSelection {
    locations: ISPSelectionLocation[];
}

export interface ISPOrder {
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

export interface ISPOrderList {
    data: ISPOrder[];
    meta?: {
        current_page: number;
        per_page: number;
        total: number;
    };
}

export interface ISPGetOrdersParams {
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

export interface ISPCalculatePricingParams {
    product_id: number;
    product_plan_id: number;
    product_location_id: number;
    quantity: number;
    coupon_code?: string;
    order_id?: number;
    order_billing_type?: string;
    product_question_answers?: ISPQuestionAnswer[];
}

export interface ISPPricingResult {
    total: number;
    subtotal: number;
    discount?: number;
    tax?: number;
}

export interface ISPCreateOrderParams {
    product_id: number;
    product_plan_id?: number;
    product_location_id?: number;
    quantity?: number;
    coupon_code?: string;
    auto_extend?: boolean;
    product_question_answers?: ISPQuestionAnswer[];
    card_id?: number;
    selection?: ISPSelection;
}

export interface ISPExtendOrderParams {
    product_plan_id: number;
    card_id?: number;
    proxies?: string[];
}

export interface ISPToggleAutoExtendParams {
    order_id: number;
    is_enabled: boolean;
    product_plan_id?: number;
    payment_type?: 'balance' | 'card';
    card_id?: number;
}

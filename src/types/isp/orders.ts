export type ISPOrderStatus = 'unpaid' | 'in-progress' | 'confirmed' | 'refunded' | 'expired';
export type ISPOrderBillingType = 'subscription' | 'regular';

export interface ISPQuestionAnswer {
    question: string;
    answer: string;
}

export interface ISPProxyDataPorts {
    socks5: number;
    'http|https': number;
}

export interface ISPProxyData {
    ports: ISPProxyDataPorts;
    proxies: string[];
    extended_proxies?: string[];
}

export interface ISPOrder {
    id: number;
    note: string | null;
    product_name: string;
    expire_date: string;
    plan_name: string;
    status: ISPOrderStatus;
    location: string;
    locations: string;
    quantity: number;
    questions_answers: ISPQuestionAnswer[];
    proxy_data: ISPProxyData;
    auto_extend_settings: unknown | null;
    extended_history: unknown[];
}

export interface ISPOrderListMeta {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface ISPOrderList {
    data: ISPOrder[];
    meta: ISPOrderListMeta;
}

export interface ISPGetOrdersParams {
    product_id?: number;
    page?: number;
    per_page?: number;
    location_id?: number;
    status?: ISPOrderStatus;
    note_search?: string;
    order_ids?: number[];
    sort_by?: string;
    order?: 'asc' | 'desc';
    statuses?: ISPOrderStatus[];
    status_is_expiring_soon?: boolean;
    order_billing_type?: ISPOrderBillingType;
}

export interface ISPCalculatePricingQuestionAnswer {
    question_id: number;
    answer: string;
}

export interface ISPCalculatePricingParams {
    product_id: number;
    product_plan_id: number;
    product_location_id: number;
    quantity: number;
    coupon_code?: string;
    order_id?: number;
    order_billing_type?: ISPOrderBillingType;
    product_question_answers?: ISPCalculatePricingQuestionAnswer[];
}

export interface ISPPricingResult {
    pre_discount_price: number;
    price_with_vat: number;
    vat: number | null;
    price: number;
    pre_discount_price_per_item: number;
    price_per_item: number;
    plan_discount_percent: number;
    location_discount_percent: number;
    coupon_discount_percent: number;
    quantity_discount_percent: number;
    total_discount_percent: number;
    quantity_required_for_next_discount: {
        quantity: number;
        discount: number;
    } | null;
    message: string | null;
}

export interface ISPSelectionLocation {
    product_location_id: number;
    quantity: number;
}

export interface ISPSelection {
    locations: ISPSelectionLocation[];
}

export interface ISPCreateOrderParams {
    product_id: number;
    product_plan_id: number;
    product_location_id?: number;
    quantity?: number;
    coupon_code?: string;
    auto_extend?: boolean;
    product_question_answers?: Record<number, string>;
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
    payment_type?: 'card' | 'balance';
    card_id?: number;
}

export interface ISPToggleAutoExtendResult {
    order_id: number;
    is_enabled: boolean;
    product_plan_id: number;
    payment_type: string;
    card_id: number | null;
}

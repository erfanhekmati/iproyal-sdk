/** Question id to answer mapping: { [questionId]: answer } */
export type DatacenterProductQuestionAnswers = Record<number, string>;

export interface DatacenterSelectionLocation {
    product_location_id: number;
    quantity: number;
}

export interface DatacenterSelection {
    locations: DatacenterSelectionLocation[];
}

export type DatacenterOrderStatus = 'unpaid' | 'in-progress' | 'confirmed' | 'refunded' | 'expired';

export interface DatacenterQuestionAnswer {
    question: string;
    answer: string;
}

export interface DatacenterProxyDataPorts {
    socks5: number;
    'http|https': number;
}

export interface DatacenterProxyData {
    ports: DatacenterProxyDataPorts;
    proxies: string[];
    extended_proxies?: string[];
}

export interface DatacenterOrder {
    id: number;
    note: string | null;
    product_name: string;
    plan_name: string;
    expire_date: string;
    status: DatacenterOrderStatus;
    location: string;
    locations: string;
    quantity: number;
    questions_answers: DatacenterQuestionAnswer[];
    proxy_data: DatacenterProxyData;
    auto_extend_settings: unknown;
    extended_history: unknown[];
}

export interface DatacenterOrderListMeta {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface DatacenterOrderList {
    data: DatacenterOrder[];
    meta?: DatacenterOrderListMeta;
}

export type DatacenterOrderBillingType = 'subscription' | 'regular';

export interface DatacenterGetOrdersParams {
    product_id?: number;
    page?: number;
    per_page?: number;
    location_id?: number;
    status?: DatacenterOrderStatus;
    note_search?: string;
    order_ids?: number[];
    sort_by?: string;
    order?: 'asc' | 'desc';
    statuses?: DatacenterOrderStatus[];
    status_is_expiring_soon?: boolean;
    order_billing_type?: DatacenterOrderBillingType;
}

export interface DatacenterCalculatePricingParams {
    product_id?: number;
    product_plan_id?: number;
    product_location_id?: number;
    quantity?: number;
    coupon_code?: string;
    order_id?: number;
    order_billing_type?: DatacenterOrderBillingType;
    product_question_answers?: DatacenterProductQuestionAnswers;
}

export interface DatacenterQuantityRequiredForNextDiscount {
    quantity: number;
    discount: number;
}

export interface DatacenterPricingResult {
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
    quantity_required_for_next_discount: DatacenterQuantityRequiredForNextDiscount | null;
    message: string | null;
}

export interface DatacenterCreateOrderParams {
    product_id: number;
    product_plan_id?: number;
    product_location_id?: number;
    quantity?: number;
    coupon_code?: string;
    auto_extend?: boolean;
    product_question_answers?: DatacenterProductQuestionAnswers;
    card_id?: number;
    selection?: DatacenterSelection;
}

export interface DatacenterExtendOrderParams {
    product_plan_id: number;
    card_id?: number;
    proxies?: string[];
}

export interface DatacenterToggleAutoExtendParams {
    order_id: number;
    is_enabled: boolean;
    product_plan_id?: number;
    payment_type?: 'card' | 'balance';
    card_id?: number;
}

export interface DatacenterToggleAutoExtendResult {
    order_id: number;
    is_enabled: boolean;
    product_plan_id: number;
    payment_type: string;
    card_id: number | null;
}

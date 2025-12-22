export interface ResidentialOrder {
    id: number;
    note?: string;
    product_name: string;
    status: string;
    amount: number;
    quantity: number;
    order_billing_type: string;
    created_at: string;
}

export interface ResidentialOrderList {
    data: ResidentialOrder[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export interface ResidentialOrderParams {
    quantity: number;
    coupon_code?: string;
    card_id?: number;
    order_billing_type?: 'subscription' | 'regular';
}

export interface ResidentialCalculatePricingParams {
    quantity: number;
    coupon_code?: string;
    order_billing_type?: 'subscription' | 'regular';
}

export interface ResidentialPricingResult {
    price: number;
    discount: number;
    total: number;
}

export interface ResidentialSubscription {
    quantity: number;
    amount: number;
    status: string;
    next_payment_date: string;
    payment_method: string;
    card_id?: number;
}

export interface ResidentialChangePaymentMethodParams {
    payment_method: 'balance' | 'card';
    card_id?: number;
}

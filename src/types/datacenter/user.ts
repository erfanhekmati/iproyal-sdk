export interface DatacenterBalance {
    balance: number;
}

export interface DatacenterCard {
    id: number;
    provider: string;
    custom_name: string | null;
    payment_method: string;
    card_type: string;
    currency: string;
    last_four_digits: string;
    expiry_date: string;
    update_url: string | null;
    cancel_url: string | null;
    products_with_order_ids: number[];
    has_royal_auto_extend_enabled: boolean;
    updated_at: string;
}

export interface DatacenterCardList {
    data: DatacenterCard[];
}

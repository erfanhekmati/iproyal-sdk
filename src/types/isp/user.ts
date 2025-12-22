export interface ISPCard {
    id: number;
    last4: string;
    brand: string;
    exp_month: number;
    exp_year: number;
}

export interface ISPCardList {
    data: ISPCard[];
}

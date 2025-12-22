export interface DatacenterBalance {
    balance: number;
}

export interface DatacenterCard {
    id: number;
    last4: string;
    brand: string;
    exp_month: number;
    exp_year: number;
}

export interface DatacenterCardList {
    data: DatacenterCard[];
}

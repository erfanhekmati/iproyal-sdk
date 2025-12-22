import { HttpClient } from '../core/HttpClient';
import {
    ISPCardList,
    ISPProductList,
    ISPOrderList,
    ISPOrder,
    ISPGetOrdersParams,
    ISPCalculatePricingParams,
    ISPPricingResult,
    ISPCreateOrderParams,
    ISPExtendOrderParams,
    ISPToggleAutoExtendParams,
    ISPProxyAvailabilityList,
    ISPChangeCredentialsParams,
} from '../types';

export class ISP {
    constructor(private readonly httpClient: HttpClient) { }

    async getBalance(): Promise<number> {
        return this.httpClient.get<number>('/balance');
    }

    async getCards(): Promise<ISPCardList> {
        return this.httpClient.get<ISPCardList>('/cards');
    }

    async getProducts(): Promise<ISPProductList> {
        return this.httpClient.get<ISPProductList>('/products');
    }

    async getOrders(params?: ISPGetOrdersParams): Promise<ISPOrderList> {
        return this.httpClient.get<ISPOrderList>('/orders', { params });
    }

    async getOrder(orderId: number): Promise<ISPOrder> {
        return this.httpClient.get<ISPOrder>(`/orders/${orderId}`);
    }

    async calculatePricing(params: ISPCalculatePricingParams): Promise<ISPPricingResult> {
        return this.httpClient.get<ISPPricingResult>('/orders/calculate-pricing', { params });
    }

    async createOrder(params: ISPCreateOrderParams): Promise<ISPOrder> {
        return this.httpClient.post<ISPOrder>('/orders', params);
    }

    async extendOrder(orderId: number, params: ISPExtendOrderParams): Promise<ISPOrder> {
        return this.httpClient.post<ISPOrder>(`/orders/${orderId}/extend`, params);
    }

    async toggleOrderAutoExtend(params: ISPToggleAutoExtendParams): Promise<ISPOrder> {
        return this.httpClient.post<ISPOrder>('/orders/toggle-auto-extend', params);
    }

    async getProxyAvailability(): Promise<ISPProxyAvailabilityList> {
        return this.httpClient.get<ISPProxyAvailabilityList>('/access/availability/static-residential');
    }

    async changeCredentials(params: ISPChangeCredentialsParams): Promise<void> {
        return this.httpClient.post<void>('/orders/proxies/change-credentials', params);
    }
}

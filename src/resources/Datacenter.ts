import { HttpClient } from '../core/HttpClient';
import {
    DatacenterBalance,
    DatacenterCardList,
    DatacenterProductList,
    DatacenterOrderList,
    DatacenterOrder,
    DatacenterGetOrdersParams,
    DatacenterCalculatePricingParams,
    DatacenterPricingResult,
    DatacenterCreateOrderParams,
    DatacenterExtendOrderParams,
    DatacenterToggleAutoExtendParams,
    DatacenterProxyAvailabilityList,
    DatacenterChangeCredentialsParams,
} from '../types';

export class Datacenter {
    constructor(private readonly httpClient: HttpClient) { }

    async getBalance(): Promise<number> {
        return this.httpClient.get<number>('/balance');
    }

    async getCards(): Promise<DatacenterCardList> {
        return this.httpClient.get<DatacenterCardList>('/cards');
    }

    async getProducts(): Promise<DatacenterProductList> {
        return this.httpClient.get<DatacenterProductList>('/products');
    }

    async getOrders(params?: DatacenterGetOrdersParams): Promise<DatacenterOrderList> {
        return this.httpClient.get<DatacenterOrderList>('/orders', { params });
    }

    async getOrder(orderId: number): Promise<DatacenterOrder> {
        return this.httpClient.get<DatacenterOrder>(`/orders/${orderId}`);
    }

    async calculatePricing(params: DatacenterCalculatePricingParams): Promise<DatacenterPricingResult> {
        return this.httpClient.get<DatacenterPricingResult>('/orders/calculate-pricing', { params });
    }

    async createOrder(params: DatacenterCreateOrderParams): Promise<DatacenterOrder> {
        return this.httpClient.post<DatacenterOrder>('/orders', params);
    }

    async extendOrder(orderId: number, params: DatacenterExtendOrderParams): Promise<DatacenterOrder> {
        return this.httpClient.post<DatacenterOrder>(`/orders/${orderId}/extend`, params);
    }

    async toggleOrderAutoExtend(orderId: number, params: DatacenterToggleAutoExtendParams): Promise<DatacenterOrder> {
        return this.httpClient.post<DatacenterOrder>(`/orders/${orderId}/toggle-auto-extend`, params);
    }

    async getProxyAvailability(): Promise<DatacenterProxyAvailabilityList> {
        return this.httpClient.get<DatacenterProxyAvailabilityList>('/access/availability/dc');
    }

    async changeCredentials(params: DatacenterChangeCredentialsParams): Promise<void> {
        return this.httpClient.post<void>('/orders/proxies/change-credentials', params);
    }
}

import { HttpClient } from '../core/HttpClient';
import {
    ResidentialUserInfo,
    EntryNode,
    Country,
    Region,
    CountrySet,
    GenerateProxyListParams,
    ProxyList,
    ResidentialOrderList,
    ResidentialOrder,
    ResidentialOrderParams,
    ResidentialCalculatePricingParams,
    ResidentialPricingResult,
    ResidentialSubscription,
    ResidentialChangePaymentMethodParams,
    ResidentialSubUserList,
    ResidentialSubUser,
    ResidentialCreateSubUserParams,
    ResidentialUpdateSubUserParams,
    ResidentialSubUserTrafficParams,
    ResidentialWhitelistEntryList,
    ResidentialWhitelistEntry,
    ResidentialCreateWhitelistEntryParams,
    ResidentialUpdateWhitelistEntryParams,
    ResidentialIPSkippingList,
    ResidentialCreateIPSkippingListParams,
    ResidentialUpdateIPSkippingListParams,
    ResidentialRemoveSessionsParams,
    PaginationParams,
} from '../types';

export class Residential {
    constructor(private readonly httpClient: HttpClient) { }

    async getUserInfo(): Promise<ResidentialUserInfo> {
        return this.httpClient.get<ResidentialUserInfo>('/me');
    }

    async getEntryNodes(): Promise<EntryNode[]> {
        return this.httpClient.get<EntryNode[]>('/access/entry-nodes');
    }

    async getCountries(): Promise<Country[]> {
        return this.httpClient.get<Country[]>('/access/countries');
    }

    async getRegions(): Promise<Region[]> {
        return this.httpClient.get<Region[]>('/access/regions');
    }

    async getCountrySets(): Promise<CountrySet[]> {
        return this.httpClient.get<CountrySet[]>('/access/country-sets');
    }

    async generateProxyList(params: GenerateProxyListParams): Promise<ProxyList> {
        return this.httpClient.post<ProxyList>('/access/generate-proxy-list', params);
    }

    async getOrders(params?: PaginationParams): Promise<ResidentialOrderList> {
        return this.httpClient.get<ResidentialOrderList>('/residential/orders', { params });
    }

    async createOrder(params: ResidentialOrderParams): Promise<ResidentialOrder> {
        return this.httpClient.post<ResidentialOrder>('/residential/orders', params);
    }

    async calculatePricing(params: ResidentialCalculatePricingParams): Promise<ResidentialPricingResult> {
        return this.httpClient.get<ResidentialPricingResult>('/residential/orders/calculate-pricing', { params });
    }

    async getSubscription(): Promise<ResidentialSubscription> {
        return this.httpClient.get<ResidentialSubscription>('/residential/subscription');
    }

    async deleteSubscription(): Promise<void> {
        return this.httpClient.delete<void>('/residential/subscription');
    }

    async changePaymentMethod(params: ResidentialChangePaymentMethodParams): Promise<void> {
        return this.httpClient.post<void>('/residential/subscription/change-payment-method', params);
    }

    async getSubUsers(params?: PaginationParams & { search?: string }): Promise<ResidentialSubUserList> {
        return this.httpClient.get<ResidentialSubUserList>('/residential-subusers', { params });
    }

    async getSubUser(hash: string): Promise<ResidentialSubUser> {
        return this.httpClient.get<ResidentialSubUser>(`/residential-subusers/${hash}`);
    }

    async createSubUser(params: ResidentialCreateSubUserParams): Promise<ResidentialSubUser> {
        return this.httpClient.post<ResidentialSubUser>('/residential-subusers', params);
    }

    async updateSubUser(hash: string, params: ResidentialUpdateSubUserParams): Promise<ResidentialSubUser> {
        return this.httpClient.put<ResidentialSubUser>(`/residential-subusers/${hash}`, params);
    }

    async deleteSubUser(hash: string): Promise<void> {
        return this.httpClient.delete<void>(`/residential-subusers/${hash}`);
    }

    async addTrafficToSubUser(hash: string, params: ResidentialSubUserTrafficParams): Promise<ResidentialSubUser> {
        return this.httpClient.post<ResidentialSubUser>(`/residential-subusers/${hash}/give-traffic`, params);
    }

    async takeTrafficFromSubUser(hash: string, params: ResidentialSubUserTrafficParams): Promise<ResidentialSubUser> {
        return this.httpClient.post<ResidentialSubUser>(`/residential-subusers/${hash}/take-traffic`, params);
    }

    async getWhitelistEntries(
        residentialUserHash: string,
        params?: PaginationParams
    ): Promise<ResidentialWhitelistEntryList> {
        return this.httpClient.get<ResidentialWhitelistEntryList>(
            `/residential-users/${residentialUserHash}/whitelist-entries`,
            { params }
        );
    }

    async getWhitelistEntry(residentialUserHash: string, whitelistEntryHash: string): Promise<ResidentialWhitelistEntry> {
        return this.httpClient.get<ResidentialWhitelistEntry>(
            `/residential-users/${residentialUserHash}/whitelist-entries/${whitelistEntryHash}`
        );
    }

    async createWhitelistEntry(
        residentialUserHash: string,
        params: ResidentialCreateWhitelistEntryParams
    ): Promise<ResidentialWhitelistEntry> {
        return this.httpClient.post<ResidentialWhitelistEntry>(
            `/residential-users/${residentialUserHash}/whitelist-entries`,
            params
        );
    }

    async updateWhitelistEntry(
        residentialUserHash: string,
        whitelistEntryHash: string,
        params: ResidentialUpdateWhitelistEntryParams
    ): Promise<ResidentialWhitelistEntry> {
        return this.httpClient.put<ResidentialWhitelistEntry>(
            `/residential-users/${residentialUserHash}/whitelist-entries/${whitelistEntryHash}`,
            params
        );
    }

    async deleteWhitelistEntry(residentialUserHash: string, whitelistEntryHash: string): Promise<void> {
        return this.httpClient.delete<void>(
            `/residential-users/${residentialUserHash}/whitelist-entries/${whitelistEntryHash}`
        );
    }

    async getIPSkippingLists(residentialUserHash: string): Promise<ResidentialIPSkippingList[]> {
        return this.httpClient.get<ResidentialIPSkippingList[]>(
            `/residential-users/${residentialUserHash}/ips-skipping`
        );
    }

    async createIPSkippingList(
        residentialUserHash: string,
        params: ResidentialCreateIPSkippingListParams
    ): Promise<ResidentialIPSkippingList> {
        return this.httpClient.post<ResidentialIPSkippingList>(
            `/residential-users/${residentialUserHash}/ips-skipping`,
            params
        );
    }

    async updateIPSkippingList(
        residentialUserHash: string,
        ipsSkippingHash: string,
        params: ResidentialUpdateIPSkippingListParams
    ): Promise<ResidentialIPSkippingList> {
        return this.httpClient.put<ResidentialIPSkippingList>(
            `/residential-users/${residentialUserHash}/ips-skipping/${ipsSkippingHash}`,
            params
        );
    }

    async deleteIPSkippingList(residentialUserHash: string, ipsSkippingHash: string): Promise<void> {
        return this.httpClient.delete<void>(
            `/residential-users/${residentialUserHash}/ips-skipping/${ipsSkippingHash}`
        );
    }

    async removeSessions(params: ResidentialRemoveSessionsParams): Promise<void> {
        return this.httpClient.delete<void>('/sessions', { data: params });
    }
}

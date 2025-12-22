import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { IPRoyalConfig } from '../types';
import { IHttpClient } from './IHttpClient';
import {
    IPRoyalError,
    AuthenticationError,
    NotFoundError,
    RateLimitError,
    ServerError,
    ValidationError,
} from '../errors/IPRoyalError';

export class HttpClient implements IHttpClient {
    private readonly client: AxiosInstance;
    private readonly apiToken: string;

    constructor(config: IPRoyalConfig) {
        this.apiToken = config.apiToken;

        this.client = axios.create({
            baseURL: config.baseURL || 'https://resi-api.iproyal.com/v1',
            timeout: config.timeout || 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        this.client.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                config.headers.Authorization = `Bearer ${this.apiToken}`;
                return config;
            },
            (error: unknown) => Promise.reject(error)
        );

        this.client.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosError) => {
                return Promise.reject(this.handleError(error));
            }
        );
    }

    private handleError(error: AxiosError): IPRoyalError {
        if (!error.response) {
            return new IPRoyalError(
                error.message || 'Network error occurred',
                undefined,
                'NETWORK_ERROR'
            );
        }

        const { status, data } = error.response;
        const message = (data as any)?.message || error.message || 'An error occurred';

        switch (status) {
            case 400:
                return new ValidationError(message);
            case 401:
                return new AuthenticationError(message);
            case 404:
                return new NotFoundError(message);
            case 429:
                return new RateLimitError(message);
            case 500:
            case 502:
            case 503:
            case 504:
                return new ServerError(message);
            default:
                return new IPRoyalError(message, status, 'API_ERROR', data);
        }
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.get(url, config);
        return response.data;
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.post(url, data, config);
        return response.data;
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.put(url, data, config);
        return response.data;
    }

    public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.patch(url, data, config);
        return response.data;
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.delete(url, config);
        return response.data;
    }
}

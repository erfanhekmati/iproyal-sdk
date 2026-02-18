import axios, { AxiosError } from 'axios';
import { HttpClient } from '../../../core/HttpClient';
import {
    ValidationError,
    AuthenticationError,
    NotFoundError,
    RateLimitError,
    ServerError,
    IPRoyalError,
} from '../../../errors/IPRoyalError';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('HttpClient', () => {
    let httpClient: HttpClient;
    const mockApiToken = 'test-api-token';
    const mockBaseURL = 'https://test-api.iproyal.com/v1';

    beforeEach(() => {
        jest.clearAllMocks();

        const mockAxiosInstance = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            patch: jest.fn(),
            delete: jest.fn(),
            interceptors: {
                request: {
                    use: jest.fn((onFulfilled) => {
                        return 0;
                    }),
                },
                response: {
                    use: jest.fn(),
                },
            },
        };

        mockedAxios.create.mockReturnValue(mockAxiosInstance as any);

        httpClient = new HttpClient({
            apiToken: mockApiToken,
            baseURL: mockBaseURL,
            timeout: 5000,
        });
    });

    describe('constructor', () => {
        it('should create axios instance with correct config', () => {
            expect(mockedAxios.create).toHaveBeenCalledWith({
                baseURL: mockBaseURL,
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        });

        it('should use default baseURL if not provided', () => {
            mockedAxios.create.mockClear();
            new HttpClient({ apiToken: mockApiToken });

            expect(mockedAxios.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    baseURL: 'https://resi-api.iproyal.com/v1',
                })
            );
        });

        it('should use default timeout if not provided', () => {
            mockedAxios.create.mockClear();
            new HttpClient({ apiToken: mockApiToken });

            expect(mockedAxios.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    timeout: 30000,
                })
            );
        });

        it('should use overrides baseURL when provided', () => {
            mockedAxios.create.mockClear();
            const customBaseURL = 'https://apid.iproyal.com';
            new HttpClient({ apiToken: mockApiToken }, { baseURL: customBaseURL });

            expect(mockedAxios.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    baseURL: customBaseURL,
                })
            );
        });

        it('should prefer overrides baseURL over config baseURL', () => {
            mockedAxios.create.mockClear();
            new HttpClient(
                { apiToken: mockApiToken, baseURL: 'https://config-url.com' },
                { baseURL: 'https://override-url.com' }
            );

            expect(mockedAxios.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    baseURL: 'https://override-url.com',
                })
            );
        });
    });

    describe('authentication', () => {
        it('should use Bearer auth by default', () => {
            const mockAxiosInstance = (mockedAxios.create as jest.Mock).mock.results[0].value;
            const requestInterceptor = mockAxiosInstance.interceptors.request.use.mock.calls[0][0];
            const config = { headers: {} as Record<string, string> };
            requestInterceptor(config);
            expect(config.headers.Authorization).toBe('Bearer test-api-token');
            expect(config.headers['X-Access-Token']).toBeUndefined();
        });

        it('should use X-Access-Token auth when authHeader override is x-access-token', () => {
            mockedAxios.create.mockClear();
            new HttpClient(
                { apiToken: 'my-api-key' },
                { baseURL: 'https://apid.iproyal.com', authHeader: 'x-access-token' }
            );
            const mockAxiosInstance = (mockedAxios.create as jest.Mock).mock.results[0].value;
            const useCalls = mockAxiosInstance.interceptors.request.use.mock.calls;
            const requestInterceptor = useCalls[useCalls.length - 1][0];
            const config = { headers: {} as Record<string, string> };
            requestInterceptor(config);
            expect(config.headers['X-Access-Token']).toBe('my-api-key');
            expect(config.headers.Authorization).toBeUndefined();
        });
    });

    describe('HTTP methods', () => {
        let mockAxiosInstance: any;

        beforeEach(() => {
            mockAxiosInstance = (mockedAxios.create as jest.Mock).mock.results[0].value;
        });

        describe('get', () => {
            it('should make GET request and return data', async () => {
                const mockData = { id: 1, name: 'test' };
                mockAxiosInstance.get.mockResolvedValue({ data: mockData });

                const result = await httpClient.get('/test');

                expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', undefined);
                expect(result).toEqual(mockData);
            });

            it('should pass config to axios', async () => {
                const mockData = { id: 1 };
                const config = { params: { page: 1 } };
                mockAxiosInstance.get.mockResolvedValue({ data: mockData });

                await httpClient.get('/test', config);

                expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', config);
            });
        });

        describe('post', () => {
            it('should make POST request and return data', async () => {
                const mockData = { id: 1, name: 'test' };
                const postData = { name: 'test' };
                mockAxiosInstance.post.mockResolvedValue({ data: mockData });

                const result = await httpClient.post('/test', postData);

                expect(mockAxiosInstance.post).toHaveBeenCalledWith('/test', postData, undefined);
                expect(result).toEqual(mockData);
            });
        });

        describe('put', () => {
            it('should make PUT request and return data', async () => {
                const mockData = { id: 1, name: 'updated' };
                const putData = { name: 'updated' };
                mockAxiosInstance.put.mockResolvedValue({ data: mockData });

                const result = await httpClient.put('/test/1', putData);

                expect(mockAxiosInstance.put).toHaveBeenCalledWith('/test/1', putData, undefined);
                expect(result).toEqual(mockData);
            });
        });

        describe('patch', () => {
            it('should make PATCH request and return data', async () => {
                const mockData = { id: 1, name: 'patched' };
                const patchData = { name: 'patched' };
                mockAxiosInstance.patch.mockResolvedValue({ data: mockData });

                const result = await httpClient.patch('/test/1', patchData);

                expect(mockAxiosInstance.patch).toHaveBeenCalledWith('/test/1', patchData, undefined);
                expect(result).toEqual(mockData);
            });
        });

        describe('delete', () => {
            it('should make DELETE request and return data', async () => {
                const mockData = { success: true };
                mockAxiosInstance.delete.mockResolvedValue({ data: mockData });

                const result = await httpClient.delete('/test/1');

                expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/test/1', undefined);
                expect(result).toEqual(mockData);
            });
        });
    });

    describe('error handling', () => {
        let mockAxiosInstance: any;
        let errorHandler: (error: AxiosError) => Promise<any>;

        beforeEach(() => {
            mockAxiosInstance = (mockedAxios.create as jest.Mock).mock.results[0].value;
            errorHandler = mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
        });

        it('should handle 400 validation error', async () => {
            const axiosError = {
                response: {
                    status: 400,
                    data: { message: 'Validation failed' },
                },
                message: 'Request failed',
            } as AxiosError;

            const error = await errorHandler(axiosError).catch((e: any) => e);

            expect(error).toBeInstanceOf(ValidationError);
            expect(error.message).toBe('Validation failed');
        });

        it('should handle 401 authentication error', async () => {
            const axiosError = {
                response: {
                    status: 401,
                    data: { message: 'Unauthorized' },
                },
                message: 'Request failed',
            } as AxiosError;

            const error = await errorHandler(axiosError).catch((e: any) => e);

            expect(error).toBeInstanceOf(AuthenticationError);
            expect(error.message).toBe('Unauthorized');
        });

        it('should handle 404 not found error', async () => {
            const axiosError = {
                response: {
                    status: 404,
                    data: { message: 'Resource not found' },
                },
                message: 'Request failed',
            } as AxiosError;

            const error = await errorHandler(axiosError).catch((e: any) => e);

            expect(error).toBeInstanceOf(NotFoundError);
            expect(error.message).toBe('Resource not found');
        });

        it('should handle 429 rate limit error', async () => {
            const axiosError = {
                response: {
                    status: 429,
                    data: { message: 'Too many requests' },
                },
                message: 'Request failed',
            } as AxiosError;

            const error = await errorHandler(axiosError).catch((e: any) => e);

            expect(error).toBeInstanceOf(RateLimitError);
            expect(error.message).toBe('Too many requests');
        });

        it('should handle 500 server error', async () => {
            const axiosError = {
                response: {
                    status: 500,
                    data: { message: 'Server error' },
                },
                message: 'Request failed',
            } as AxiosError;

            const error = await errorHandler(axiosError).catch((e: any) => e);

            expect(error).toBeInstanceOf(ServerError);
            expect(error.message).toBe('Server error');
        });

        it('should handle network error without response', async () => {
            const axiosError = {
                message: 'Network Error',
            } as AxiosError;

            const error = await errorHandler(axiosError).catch((e: any) => e);

            expect(error).toBeInstanceOf(IPRoyalError);
            expect(error.message).toBe('Network Error');
            expect(error.code).toBe('NETWORK_ERROR');
        });

        it('should use error message from response data', async () => {
            const axiosError = {
                response: {
                    status: 400,
                    data: { message: 'Custom error message' },
                },
                message: 'Default message',
            } as AxiosError;

            const error = await errorHandler(axiosError).catch((e: any) => e);

            expect(error.message).toBe('Custom error message');
        });
    });
});

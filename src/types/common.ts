export interface PaginationParams {
    page?: number;
    per_page?: number;
}

export interface APIError {
    message: string;
    status?: number;
    code?: string;
}

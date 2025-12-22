export class IPRoyalError extends Error {
    public readonly status?: number;
    public readonly code?: string;
    public readonly response?: any;

    constructor(message: string, status?: number, code?: string, response?: any) {
        super(message);
        this.name = 'IPRoyalError';
        this.status = status;
        this.code = code;
        this.response = response;
        Object.setPrototypeOf(this, IPRoyalError.prototype);
    }
}

export class ValidationError extends IPRoyalError {
    constructor(message: string) {
        super(message, 400, 'VALIDATION_ERROR');
        this.name = 'ValidationError';
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}

export class AuthenticationError extends IPRoyalError {
    constructor(message: string = 'Authentication failed') {
        super(message, 401, 'AUTHENTICATION_ERROR');
        this.name = 'AuthenticationError';
        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }
}

export class NotFoundError extends IPRoyalError {
    constructor(message: string = 'Resource not found') {
        super(message, 404, 'NOT_FOUND');
        this.name = 'NotFoundError';
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export class RateLimitError extends IPRoyalError {
    constructor(message: string = 'Rate limit exceeded') {
        super(message, 429, 'RATE_LIMIT_ERROR');
        this.name = 'RateLimitError';
        Object.setPrototypeOf(this, RateLimitError.prototype);
    }
}

export class ServerError extends IPRoyalError {
    constructor(message: string = 'Internal server error') {
        super(message, 500, 'SERVER_ERROR');
        this.name = 'ServerError';
        Object.setPrototypeOf(this, ServerError.prototype);
    }
}

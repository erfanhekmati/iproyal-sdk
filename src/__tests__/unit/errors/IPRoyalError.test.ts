import {
    IPRoyalError,
    ValidationError,
    AuthenticationError,
    NotFoundError,
    RateLimitError,
    ServerError,
} from '../../../errors/IPRoyalError';

describe('IPRoyalError', () => {
    describe('IPRoyalError', () => {
        it('should create an error with message', () => {
            const error = new IPRoyalError('Test error');
            expect(error.message).toBe('Test error');
            expect(error.name).toBe('IPRoyalError');
            expect(error).toBeInstanceOf(Error);
        });

        it('should create an error with status and code', () => {
            const error = new IPRoyalError('Test error', 400, 'TEST_CODE');
            expect(error.message).toBe('Test error');
            expect(error.status).toBe(400);
            expect(error.code).toBe('TEST_CODE');
        });

        it('should create an error with response data', () => {
            const response = { detail: 'Error details' };
            const error = new IPRoyalError('Test error', 400, 'TEST_CODE', response);
            expect(error.response).toEqual(response);
        });
    });

    describe('ValidationError', () => {
        it('should create a validation error', () => {
            const error = new ValidationError('Invalid input');
            expect(error.message).toBe('Invalid input');
            expect(error.name).toBe('ValidationError');
            expect(error.status).toBe(400);
            expect(error.code).toBe('VALIDATION_ERROR');
            expect(error).toBeInstanceOf(IPRoyalError);
        });
    });

    describe('AuthenticationError', () => {
        it('should create an authentication error with default message', () => {
            const error = new AuthenticationError();
            expect(error.message).toBe('Authentication failed');
            expect(error.name).toBe('AuthenticationError');
            expect(error.status).toBe(401);
            expect(error.code).toBe('AUTHENTICATION_ERROR');
        });

        it('should create an authentication error with custom message', () => {
            const error = new AuthenticationError('Invalid token');
            expect(error.message).toBe('Invalid token');
        });
    });

    describe('NotFoundError', () => {
        it('should create a not found error with default message', () => {
            const error = new NotFoundError();
            expect(error.message).toBe('Resource not found');
            expect(error.name).toBe('NotFoundError');
            expect(error.status).toBe(404);
            expect(error.code).toBe('NOT_FOUND');
        });

        it('should create a not found error with custom message', () => {
            const error = new NotFoundError('User not found');
            expect(error.message).toBe('User not found');
        });
    });

    describe('RateLimitError', () => {
        it('should create a rate limit error with default message', () => {
            const error = new RateLimitError();
            expect(error.message).toBe('Rate limit exceeded');
            expect(error.name).toBe('RateLimitError');
            expect(error.status).toBe(429);
            expect(error.code).toBe('RATE_LIMIT_ERROR');
        });
    });

    describe('ServerError', () => {
        it('should create a server error with default message', () => {
            const error = new ServerError();
            expect(error.message).toBe('Internal server error');
            expect(error.name).toBe('ServerError');
            expect(error.status).toBe(500);
            expect(error.code).toBe('SERVER_ERROR');
        });
    });
});

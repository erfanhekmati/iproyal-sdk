import { IPRoyalClient } from '../../IPRoyalClient';
import { AuthenticationError } from '../../errors/IPRoyalError';

describe('IPRoyalClient Integration Tests', () => {
    const apiToken = process.env.IPROYAL_API_TOKEN || 'test-token';
    let client: IPRoyalClient;

    beforeAll(() => {
        if (!process.env.IPROYAL_API_TOKEN) {
            console.warn('IPROYAL_API_TOKEN not set. Integration tests will be skipped.');
        }
    });

    beforeEach(() => {
        client = new IPRoyalClient({ apiToken });
    });

    describe('Residential API', () => {
        it('should fetch user information', async () => {
            if (!process.env.IPROYAL_API_TOKEN) {
                return;
            }

            const userInfo = await client.residential.getUserInfo();

            expect(userInfo).toBeDefined();
            expect(userInfo.available_traffic).toBeGreaterThanOrEqual(0);
            expect(userInfo.subusers_count).toBeGreaterThanOrEqual(0);
            expect(userInfo.residential_user_hash).toBeDefined();
        });

        it('should fail with invalid token', async () => {
            const invalidClient = new IPRoyalClient({ apiToken: 'invalid-token' });

            await expect(invalidClient.residential.getUserInfo()).rejects.toThrow(AuthenticationError);
        });

        it('should fetch entry nodes', async () => {
            if (!process.env.IPROYAL_API_TOKEN) {
                return;
            }

            const entryNodes = await client.residential.getEntryNodes();

            expect(Array.isArray(entryNodes)).toBe(true);
            if (entryNodes.length > 0) {
                expect(entryNodes[0]).toHaveProperty('dns');
                expect(entryNodes[0]).toHaveProperty('ips');
                expect(entryNodes[0]).toHaveProperty('ports');
            }
        });

        it('should fetch countries', async () => {
            if (!process.env.IPROYAL_API_TOKEN) {
                return;
            }

            const countries = await client.residential.getCountries();

            expect(Array.isArray(countries)).toBe(true);
            if (countries.length > 0) {
                expect(countries[0]).toHaveProperty('code');
                expect(countries[0]).toHaveProperty('name');
                expect(countries[0]).toHaveProperty('prefix');
            }
        });

        it('should fetch regions', async () => {
            if (!process.env.IPROYAL_API_TOKEN) {
                return;
            }

            const regions = await client.residential.getRegions();

            expect(Array.isArray(regions)).toBe(true);
        });

        it('should fetch country sets', async () => {
            if (!process.env.IPROYAL_API_TOKEN) {
                return;
            }

            const countrySets = await client.residential.getCountrySets();

            expect(Array.isArray(countrySets)).toBe(true);
        });

        it('should list subusers', async () => {
            if (!process.env.IPROYAL_API_TOKEN) {
                return;
            }

            const subUsers = await client.residential.getSubUsers();

            expect(subUsers).toBeDefined();
            expect(subUsers).toHaveProperty('data');
            expect(Array.isArray(subUsers.data)).toBe(true);
            expect(subUsers).toHaveProperty('meta');
        });

        it('should create, update, and delete a subuser', async () => {
            if (!process.env.IPROYAL_API_TOKEN) {
                return;
            }

            const username = `test_user_${Date.now()}`;
            const password = 'test_password_123';

            const created = await client.residential.createSubUser({
                username,
                password,
                traffic: 1,
                limits: {
                    daily_limit: 0.5,
                },
            });

            expect(created).toBeDefined();
            expect(created.username).toBe(username);
            expect(created.hash).toBeDefined();

            const updated = await client.residential.updateSubUser(created.hash, {
                traffic: 2,
            });

            expect(updated.traffic).toBe(2);

            await client.residential.deleteSubUser(created.hash);

            await expect(client.residential.getSubUser(created.hash)).rejects.toThrow();
        });

        it('should remove sessions', async () => {
            if (!process.env.IPROYAL_API_TOKEN) {
                return;
            }

            const userInfo = await client.residential.getUserInfo();

            await expect(
                client.residential.removeSessions({
                    residential_user_hashes: [userInfo.residential_user_hash],
                })
            ).resolves.not.toThrow();
        });
    });
});

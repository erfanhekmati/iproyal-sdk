import { IPRoyalClient } from '../../IPRoyalClient';

const apiToken = process.env.IPROYAL_API_TOKEN;

describe('IPRoyal SDK E2E', () => {
    let client: IPRoyalClient;

    beforeAll(() => {
        if (!apiToken) {
            console.warn('IPROYAL_API_TOKEN not set. E2E tests will be skipped.');
        }
        client = new IPRoyalClient({ apiToken: apiToken || 'placeholder' });
    });

    describe('Residential', () => {
        it('getUserInfo', async () => {
            if (!apiToken) return;
            const res = await client.residential.getUserInfo();
            expect(res).toBeDefined();
            expect(typeof res.available_traffic).toBe('number');
            expect(typeof res.subusers_count).toBe('number');
            expect(res.residential_user_hash).toBeDefined();
        });

        it('getEntryNodes', async () => {
            if (!apiToken) return;
            const res = await client.residential.getEntryNodes();
            expect(Array.isArray(res)).toBe(true);
            if (res.length) {
                expect(res[0]).toHaveProperty('dns');
                expect(res[0]).toHaveProperty('ips');
                expect(res[0]).toHaveProperty('ports');
            }
        });

        it('getCountries', async () => {
            if (!apiToken) return;
            const res = await client.residential.getCountries();
            expect(res).toHaveProperty('countries');
            expect(Array.isArray(res.countries)).toBe(true);
        });

        it('getRegions', async () => {
            if (!apiToken) return;
            const res = await client.residential.getRegions();
            expect(res).toHaveProperty('regions');
            expect(Array.isArray(res.regions)).toBe(true);
        });

        it('getCountrySets', async () => {
            if (!apiToken) return;
            const res = await client.residential.getCountrySets();
            const resAny = res as unknown as Record<string, unknown>;
            const sets = resAny.countrySets ?? resAny.country_sets;
            expect(sets).toBeDefined();
            expect(Array.isArray(sets)).toBe(true);
        });

        it('getSubUsers', async () => {
            if (!apiToken) return;
            const res = await client.residential.getSubUsers();
            expect(res).toHaveProperty('data');
            expect(res).toHaveProperty('meta');
            expect(Array.isArray(res.data)).toBe(true);
        });

        it('getOrders', async () => {
            if (!apiToken) return;
            const res = await client.residential.getOrders();
            expect(res).toBeDefined();
        });
    });

    describe('Datacenter', () => {
        it('getBalance', async () => {
            if (!apiToken) return;
            const res = await client.datacenter.getBalance();
            expect(typeof res).toBe('number');
            expect(res).toBeGreaterThanOrEqual(0);
        });

        it('getProducts', async () => {
            if (!apiToken) return;
            const res = await client.datacenter.getProducts();
            expect(res).toHaveProperty('data');
            expect(Array.isArray(res.data)).toBe(true);
        });

        it('getCards', async () => {
            if (!apiToken) return;
            const res = await client.datacenter.getCards();
            expect(res).toBeDefined();
        });

    });

    describe('ISP', () => {
        it('getBalance', async () => {
            if (!apiToken) return;
            const res = await client.isp.getBalance();
            expect(typeof res).toBe('number');
            expect(res).toBeGreaterThanOrEqual(0);
        });

        it('getProducts', async () => {
            if (!apiToken) return;
            const res = await client.isp.getProducts();
            expect(res).toHaveProperty('data');
            expect(Array.isArray(res.data)).toBe(true);
        });

        it('getCards', async () => {
            if (!apiToken) return;
            const res = await client.isp.getCards();
            expect(res).toBeDefined();
        });

    });

    describe('Mobile', () => {
        it('getBalance', async () => {
            if (!apiToken) return;
            const res = await client.mobile.getBalance();
            expect(typeof res).toBe('number');
            expect(res).toBeGreaterThanOrEqual(0);
        });
    });
});

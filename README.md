# IPRoyal SDK

A comprehensive TypeScript SDK for all IPRoyal Proxy APIs. Built with clean code principles, SOLID design patterns, and full TypeScript support.

## Features

- ✅ **Full API Coverage** - All IPRoyal proxy types (Residential, ISP, Datacenter, Mobile)
- 🔒 **Type-Safe** - Complete TypeScript definitions
- 🏗️ **Clean Architecture** - SOLID principles and design patterns
- 🧪 **Well Tested** - Comprehensive unit and integration tests
- 🚀 **Modern** - Built with latest TypeScript and ES modules
- 📝 **Well Documented** - JSDoc comments and examples
- 🔌 **Dual API Support** - Both Residential and Reseller APIs

## Installation

```bash
npm install iproyal-sdk
# or
yarn add iproyal-sdk
# or
pnpm add iproyal-sdk
```

## Quick Start

```typescript
import { IPRoyalClient } from 'iproyal-sdk';

const client = new IPRoyalClient({
    apiToken: 'your-api-token-here',
});

// Residential Proxies API
const userInfo = await client.residential.user.getInfo();
console.log(`Available traffic: ${userInfo.available_traffic} GB`);

const entryNodes = await client.residential.access.getEntryNodes();
console.log('Entry nodes:', entryNodes);

// Reseller API (ISP, Datacenter, Mobile)
const balance = await client.reseller.user.getBalance();
console.log(`Balance: $${balance}`);

const products = await client.reseller.products.getProducts();
console.log('Available products:', products);

const orders = await client.reseller.orders.list();
console.log('Your orders:', orders);
```

## Configuration

```typescript
const client = new IPRoyalClient({
    apiToken: 'your-api-token',
    baseURL: 'https://resi-api.iproyal.com/v1', // Optional, default value
    timeout: 30000, // Optional, default 30 seconds
});
```

## API Reference

The SDK provides access to two separate API systems:

1. **Residential API** (`client.residential.*`) - For residential proxy management
2. **Reseller API** (`client.reseller.*`) - For ISP, Datacenter, and Mobile proxies

---

## Residential Proxies API

### User API

Get information about your residential proxy account:

```typescript
const userInfo = await client.residential.user.getInfo();
// Returns: { available_traffic, subusers_count, residential_user_hash }
```

### Access API

#### Get Entry Nodes

```typescript
const entryNodes = await client.access.getEntryNodes();
```

#### Get Countries

```typescript
const countries = await client.access.getCountries();
```

#### Get Regions

```typescript
const regions = await client.access.getRegions();
```

#### Get Country Sets

```typescript
const countrySets = await client.access.getCountrySets();
```

#### Generate Proxy List

```typescript
const proxyList = await client.access.generateProxyList({
    hostname: 'geo.iproyal.com',
    port: '12321',
    username: 'your-username',
    password: 'your-password',
    location: '_country-us',
    proxy_count: 10,
    rotation: 'sticky',
    lifetime: '24h',
});
```

### SubUser API

#### Create SubUser

```typescript
const subUser = await client.subUsers.create({
    username: 'new_user',
    password: 'secure_password',
    traffic: 10, // GB
    limits: {
        daily_limit: 1,
        monthly_limit: 30,
    },
});
```

#### Get SubUser

```typescript
const subUser = await client.subUsers.get('subuser-hash');
```

#### List SubUsers

```typescript
const subUsers = await client.subUsers.list({
    page: 1,
    per_page: 20,
    search: 'username',
});
```

#### Update SubUser

```typescript
const updated = await client.subUsers.update('subuser-hash', {
    traffic: 20,
    limits: {
        daily_limit: 2,
    },
});
```

#### Delete SubUser

```typescript
await client.subUsers.delete('subuser-hash');
```

#### Add Traffic to SubUser

```typescript
const updated = await client.subUsers.addTraffic('subuser-hash', {
    amount: 5, // GB
});
```

#### Take Traffic from SubUser

```typescript
const updated = await client.subUsers.takeTraffic('subuser-hash', {
    amount: 3, // GB
});
```

### Session API

#### Remove Sessions

```typescript
await client.sessions.removeSessions({
    residential_user_hashes: ['hash1', 'hash2'],
});
```

### Whitelist API

#### Create Whitelist Entry

```typescript
const entry = await client.whitelists.create('residential-user-hash', {
    ip: '192.168.1.1',
    port: 12321,
    configuration: 'http',
    note: 'My server',
});
```

#### Get Whitelist Entry

```typescript
const entry = await client.whitelists.get(
    'residential-user-hash',
    'whitelist-entry-hash'
);
```

#### List Whitelist Entries

```typescript
const entries = await client.whitelists.list('residential-user-hash', {
    page: 1,
    per_page: 10,
});
```

#### Update Whitelist Entry

```typescript
const updated = await client.whitelists.update(
    'residential-user-hash',
    'whitelist-entry-hash',
    {
        configuration: 'socks5',
        note: 'Updated note',
    }
);
```

#### Delete Whitelist Entry

```typescript
await client.whitelists.delete('residential-user-hash', 'whitelist-entry-hash');
```

---

## Reseller API (ISP, Datacenter, Mobile Proxies)

The Reseller API provides access to ISP, Datacenter, and Mobile proxy products.

### User API

#### Get Balance

```typescript
const balance = await client.reseller.user.getBalance();
console.log(`Balance: $${balance}`);
```

#### Get Payment Cards

```typescript
const cards = await client.reseller.user.getCards();
console.log('Saved cards:', cards);
```

### Products API

#### Get All Products

```typescript
const products = await client.reseller.products.getProducts();
// Returns array of products (ISP, Datacenter, Mobile)
```

#### Get Specific Product

```typescript
const product = await client.reseller.products.getProduct(productId);
console.log('Product details:', product);
```

### Orders API

#### List Orders

```typescript
const orders = await client.reseller.orders.list({
    product_id: 123,
    page: 1,
    per_page: 20,
    status: 'active',
});
```

#### Get Order Details

```typescript
const order = await client.reseller.orders.get(orderId);
console.log('Order:', order);
```

#### Calculate Pricing

```typescript
const pricing = await client.reseller.orders.calculatePricing({
    product_id: 123,
    product_plan_id: 456,
    product_location_id: 789,
    quantity: 10,
    coupon_code: 'DISCOUNT20',
});
console.log(`Total: $${pricing.total}`);
```

#### Create Order

```typescript
// Create ISP/Datacenter/Mobile proxy order
const order = await client.reseller.orders.create({
    product_id: 123,
    product_plan_id: 456,
    product_location_id: 789,
    quantity: 10,
    auto_extend: true,
    card_id: 1, // Optional: pay with card, otherwise uses balance
});
```

#### Extend Order

```typescript
const extended = await client.reseller.orders.extend(orderId, {
    product_plan_id: 456,
    proxies: ['192.168.1.1', '192.168.1.2'], // Optional: extend specific IPs
});
```

#### Toggle Auto-Extend

```typescript
await client.reseller.orders.toggleAutoExtend(orderId, true);
```

### Proxies API

#### Get Proxy Availability

```typescript
const availability = await client.reseller.proxies.getAvailability(
    productId,
    locationId
);
console.log(`Available: ${availability.count} proxies`);
```

#### Change Proxy Credentials

```typescript
await client.reseller.proxies.changeCredentials({
    order_id: 123,
    username: 'new_username',
    password: 'new_password',
});
```

#### Rotate Mobile IP

```typescript
// For mobile proxies only
await client.reseller.proxies.rotateIP('your-proxy-key');
```

## Error Handling

The SDK provides specific error classes for different scenarios:

```typescript
import {
    IPRoyalClient,
    AuthenticationError,
    ValidationError,
    NotFoundError,
    RateLimitError,
    ServerError,
} from 'iproyal-sdk';

try {
    const userInfo = await client.user.getInfo();
} catch (error) {
    if (error instanceof AuthenticationError) {
        console.error('Invalid API token');
    } else if (error instanceof ValidationError) {
        console.error('Invalid request parameters');
    } else if (error instanceof NotFoundError) {
        console.error('Resource not found');
    } else if (error instanceof RateLimitError) {
        console.error('Rate limit exceeded');
    } else if (error instanceof ServerError) {
        console.error('Server error');
    }
}
```

## Architecture

This SDK follows clean code principles and SOLID design patterns:

- **Single Responsibility**: Each resource class handles one API domain
- **Open/Closed**: Extensible through inheritance
- **Liskov Substitution**: Resource classes extend BaseResource
- **Interface Segregation**: Focused interfaces for each resource
- **Dependency Inversion**: Depends on abstractions (HttpClient)

### Project Structure

```
src/
├── core/
│   ├── IHttpClient.ts           # HTTP client interface
│   ├── HttpClient.ts            # Residential API HTTP client
│   ├── ResellerHttpClient.ts    # Reseller API HTTP client
│   └── BaseResource.ts          # Base class for all resources
├── resources/
│   ├── UserResource.ts          # Residential User API
│   ├── AccessResource.ts        # Residential Access API
│   ├── SubUserResource.ts       # Residential SubUser API
│   ├── SessionResource.ts       # Residential Session API
│   ├── WhitelistResource.ts     # Residential Whitelist API
│   └── reseller/
│       ├── ResellerUserResource.ts     # Reseller User API
│       ├── ResellerProductResource.ts  # Reseller Products API
│       ├── ResellerOrderResource.ts    # Reseller Orders API (ISP/DC/Mobile)
│       └── ResellerProxyResource.ts    # Reseller Proxies API
├── errors/
│   └── IPRoyalError.ts          # Custom error classes
├── types/
│   └── index.ts                 # TypeScript type definitions
├── IPRoyalClient.ts             # Main client class (dual API)
└── index.ts                     # Public exports
```

## Development

### Install Dependencies

```bash
pnpm install
```

### Build

```bash
pnpm build
```

### Run Tests

```bash
# Unit tests
pnpm test

# Integration tests (requires API token)
IPROYAL_API_TOKEN=your-token pnpm test
```

### Watch Mode

```bash
pnpm dev
```

## Testing

The SDK includes comprehensive test coverage:

- **Unit Tests**: Mock-based tests for all components
- **Integration Tests**: Real API tests (requires valid API token)

Run tests with coverage:

```bash
pnpm test -- --coverage
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

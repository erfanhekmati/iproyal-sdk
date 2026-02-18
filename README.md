# IPRoyal SDK

A TypeScript SDK for IPRoyal proxy services. Manage residential, datacenter, ISP, and mobile proxies from your app. Handy for web scraping, automation, or anything that needs proxy infrastructure.

## Installation

```bash
npm install iproyal-sdk
```

Or with yarn or pnpm: `yarn add iproyal-sdk` / `pnpm add iproyal-sdk`

## Quick Start

```typescript
import { IPRoyalClient } from "iproyal-sdk";

const client = new IPRoyalClient({
  apiToken: "your-api-token",
});

const userInfo = await client.residential.getUserInfo();
console.log(`Available traffic: ${userInfo.available_traffic} GB`);

const countries = await client.residential.getCountries();

const balance = await client.datacenter.getBalance();
const products = await client.isp.getProducts();
```

## Configuration

You need an API token. Get it from your [IPRoyal dashboard](https://dashboard.iproyal.com/) under API settings.

```typescript
const client = new IPRoyalClient({
  apiToken: "your-api-token",
  baseURL: "https://resi-api.iproyal.com/v1",
  residentialBaseURL: "https://resi-api.iproyal.com/v1",
  datacenterBaseURL: "https://apid.iproyal.com",
  ispBaseURL: "https://apid.iproyal.com",
  mobileBaseURL: "https://apid.iproyal.com",
  timeout: 30000,
});
```

## What You Can Do

**Residential** (`client.residential`) — User info, countries, regions, generate proxy lists. Orders, subusers, whitelist, IP skipping.

**Datacenter** (`client.datacenter`) — Balance, products, orders. Create or extend orders, check availability, change credentials.

**ISP** (`client.isp`) — Same as datacenter, plus proxy availability per location.

**Mobile** (`client.mobile`) — Balance and rotate IPs for 4G proxies.

For method signatures and types, check the exported types in the package (full TypeScript support).

## Error Handling

The SDK throws specific errors you can catch:

```typescript
import {
  IPRoyalClient,
  AuthenticationError,
  ValidationError,
} from "iproyal-sdk";

try {
  await client.residential.getUserInfo();
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error("Invalid API token");
  } else if (error instanceof ValidationError) {
    console.error("Invalid request parameters");
  }
}
```

Available: `AuthenticationError`, `ValidationError`, `NotFoundError`, `RateLimitError`, `ServerError`.

## Development

```bash
pnpm install
pnpm build
pnpm test
```

## Links

- [IPRoyal API Docs](https://docs.iproyal.com/)
- [GitHub Issues](https://github.com/erfanhekmati/iproyal-sdk/issues)
- [IPRoyal](https://iproyal.com/)

## License

MIT. Contributions welcome.

This is an unofficial SDK. IPRoyal is a trademark of IPRoyal. Not affiliated with or endorsed by IPRoyal.

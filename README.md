# Bill.su B2B Landing

Production-ready B2B landing for Bill.su, a service for recurring payments through SBP.

## What is included

- responsive landing with light and dark themes;
- interactive product workspace with overview, payments, consents, payouts, and registries;
- animated payment-flow visualization;
- connection request form with server-side validation;
- legal pages and archived Bill.su documents;
- accessible motion fallbacks and SEO metadata.

## Stack

- TanStack Start and TanStack Router
- React 19 and TypeScript
- Tailwind CSS
- Motion
- Nitro

## Local development

Requirements: Bun 1.3+ or Node.js 22+.

```bash
bun install
cp .env.example .env
bun run dev
```

Open `http://localhost:3000`.

## Connection requests

The form validates data on the server and sends a JSON payload to `LEAD_WEBHOOK_URL`.
If the variable is empty, no personal data leaves the server and the interface explicitly reports that the delivery channel is not configured.

## Quality checks

```bash
bun run format:check
bun run lint
bun run typecheck
bun run build
```

Run the production server after a build:

```bash
bun run start
```

## Documents

Current legal pages are marked as preliminary until company details are published. Historical PDFs are kept separately under `public/documents/` and clearly labeled as archive materials.

## Attribution

Designed and developed by [TonyVecher AI Lab](https://github.com/Tonivecher).

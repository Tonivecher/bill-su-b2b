# Bill.su B2B landing — approved design

Date: 2026-08-24
Status: approved for implementation
Selected direction: Connected Field / «Связанное поле»

## Product contract

- Product: B2B recurring-payment service through SBP.
- Audience: subscription businesses, fitness and memberships, education, internet and telecom, security and service companies, and other recurring-payment models.
- Primary conversion: application for connection.
- Confirmed connection path: application, legal-entity documents, bank compliance, bank approval, technical connection, launch.
- Confirmed operating facts: technical connection takes up to one week; payouts are T+3 directly from the NCO.
- No unverified tariffs, commissions, partners, banks, licences, certificates, performance claims, client counts, legal details, or invented proof.

## Information architecture

1. Header and hero with one primary CTA.
2. Product explanation in plain B2B language.
3. Interactive use-case selector.
4. Recurring-payment rhythm visual without inventing a payment route.
5. Six-step connection sequence.
6. Application form with validation, UTM capture, submission states, and graceful fallback.
7. FAQ built only from confirmed facts.
8. Footer with Offer, Privacy Policy, Personal Data Consent, and TonyVecher AI Lab credit.

## Visual system

### Core metaphor

Recurring payment is shown as a connected field. Independent objects drift slowly, attract each other through elastic links, and assemble into a stable cycle. The metaphor develops across the page: orbit in the hero, scenario configurations in use cases, recurring rhythm in the product scene, and a linear six-step chain in connection.

### Themes

Both themes are first-class, share the same hierarchy, and initialize before paint.

- Dark: deep green-black background, layered graphite/green surfaces, warm near-white type, sparse mineral-green signals.
- Light: warm mineral paper background rather than pure white, dark ink surfaces and type, subdued green-grey layers, the same sparse mineral-green signal.
- Theme control supports explicit light/dark selection, persists locally, respects the system preference on first visit, and exposes an accessible label.

### Typography

- Primary: Manrope for clear B2B reading and interface text.
- Editorial accent: Prata, used sparingly in key display fragments.
- Large type must remain fully visible at every target viewport. No clipped letters or decorative overflow.

### Wordmark

Lowercase `bill.su`. The dot acts as the recurring signal. No standalone symbol unless it grows directly from this logic. Favicon uses a compact `b.` construction.

### Components

- Floating header and functional mobile menu.
- Theme switch.
- Connected Field hero scene.
- Section labels and editorial headings.
- Interactive use-case tabs with contextual adjacent content.
- Recurring-rhythm scene.
- Connection rail.
- Custom dimensional SVG/CSS icons.
- Accessible form with loading, success, error, and duplicate-submit protection.
- Accessible FAQ accordion.
- Dedicated legal pages.

## Hero copy

Eyebrow: `B2B · Рекуррентные платежи`

Headline: `Регулярные платежи через СБП — для бизнеса.`

Supporting copy: `Bill.su подключает подписки, абонементы и другие регулярные платежи. Техническое подключение — до недели.`

Primary CTA: `Оставить заявку на подключение`

Secondary anchor: `Как проходит подключение`

## Motion system

- Non-blocking opening choreography: approximately 0.9 seconds; content remains available immediately.
- Ambient drift: 3–6 px over 12–20 seconds with phase offsets.
- Pointer proximity radius: approximately 180 px; maximum object displacement 6 px.
- Related objects shift 2–3 px toward the active object.
- Section reveals: 650–900 ms, transform and opacity only.
- Touch paths remove cursor-dependent effects.
- `prefers-reduced-motion` disables ambient drift, proximity, travel markers, and long reveals.
- No WebGL or heavy animation libraries. Vanilla JavaScript, CSS, and SVG only.

## Form contract

- Required fields: `name`, `company`, `contact`, and personal-data consent.
- UTM fields: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`.
- Submission: `POST` JSON to one centrally configured endpoint.
- States: client-side validation, loading, success, error, duplicate-submit protection.
- With no endpoint or an unavailable backend, data is not discarded or silently transmitted. Inputs remain available, the failure is explained, retry is offered, and the user can copy the application locally.

## Legal handling

- Dedicated pages: Offer, Privacy Policy, Personal Data Consent.
- Missing operator/legal-entity details are never fabricated.
- Source comments identify the exact legal fields required before live collection.
- Until those details and the backend endpoint are supplied, the form must fail safely and state that nothing was sent.

## Delivery and acceptance

- Final runtime: static HTML, CSS, JavaScript, and local assets; no build step.
- Target widths: 320, 375, 390, 430, 768, 1024, and 1440+ px.
- Required verification: functional controls, form states, keyboard navigation, visible focus, reduced motion, both themes, mobile menu, FAQ, legal links, console/network, overflow, metadata, and static-server behavior.

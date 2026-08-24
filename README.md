# Bill.su landing

Production-ready static B2B landing for recurring payments through SBP.

## Runtime

No build step or Node.js runtime is required. Upload the repository files to the web root and serve them over HTTPS.

Primary files:

- `index.html`
- `styles.css`
- `script.js`
- `offer.html`
- `privacy.html`
- `consent.html`
- `assets/`
- `robots.txt`
- `sitemap.xml`

## Form endpoint

Set the backend endpoint in one place in `index.html`:

```html
<script>
  window.BILL_CONFIG = { formEndpoint: "https://example.com/api/leads" };
</script>
```

The form sends `POST` JSON:

```json
{
  "name": "",
  "company": "",
  "contact": "",
  "utm_source": "",
  "utm_medium": "",
  "utm_campaign": "",
  "utm_content": "",
  "utm_term": ""
}
```

The frontend treats any `2xx` response as success. With an empty or unavailable endpoint, it keeps all entered values, explains that nothing was sent, and offers retry and local copy actions.

## Legal data before launch

The legal pages contain source comments beginning with `LEGAL_REQUIRED_BEFORE_LIVE_COLLECTION`. Fill the listed operator and legal-entity details before connecting the production form endpoint. No details are fabricated in the current source.

## Local preview

Any static server works. For example:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open `http://127.0.0.1:4173/`.

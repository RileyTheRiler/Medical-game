## 2026-01-31 - Missing Content Security Policy
**Vulnerability:** The application was missing a Content Security Policy (CSP) meta tag in `index.html`, leaving it more vulnerable to XSS attacks.
**Learning:** Even when security headers are configured in deployment (vercel.json), a CSP meta tag is a crucial defense-in-depth measure, especially for SPA architectures where headers might not always be applied (e.g., local dev, static hosting fallback).
**Prevention:** Always verify the presence of CSP in the entry HTML file and ensure it aligns with the application's needs (allowing 'unsafe-inline' only when necessary).

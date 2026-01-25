# Sentinel's Journal

## 2024-02-21 - Missing Content Security Policy
**Vulnerability:** The application was missing a Content Security Policy (CSP) in `index.html`, leaving it vulnerable to Cross-Site Scripting (XSS) and data injection attacks if the deployment headers failed or were misconfigured.
**Learning:** Relying solely on deployment configuration (like `vercel.json`) can be risky if the file is served in a different environment or if headers are overridden. A meta tag provides a portable baseline of security.
**Prevention:** Always include a strict CSP meta tag in the HTML entry point of Single Page Applications as a defense-in-depth measure.

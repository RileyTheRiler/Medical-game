## 2026-01-22 - Missing CSP Header
**Vulnerability:** The Content Security Policy (CSP) meta tag was missing from `index.html`, despite documentation stating it was enforced.
**Learning:** Documentation can drift from code reality. Always verify security controls in the codebase itself.
**Prevention:** Added the CSP meta tag to `index.html` and verified it matches the expected policy (`default-src 'self' 'unsafe-inline' 'unsafe-eval' data:;`).

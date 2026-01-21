## 2025-02-14 - Missing Content Security Policy
**Vulnerability:** The application lacked a Content Security Policy (CSP), despite documentation/memory suggesting one existed. This exposed the application to XSS and data injection attacks.
**Learning:** Documentation and memory can drift from reality. Always verify the existence of security controls in the actual code.
**Prevention:** Added a `<meta>` tag with a baseline CSP to `index.html`. Future changes should verify this policy remains intact.

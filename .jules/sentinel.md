## 2024-03-24 - [CSP Added]
**Vulnerability:** Missing Content Security Policy (CSP) allowed potential XSS and data injection attacks.
**Learning:** Even static/SPA apps need CSP to mitigate risks from compromised dependencies or future XSS vulnerabilities.
**Prevention:** Added a strict CSP meta tag to `index.html` allowing only 'self', unsafe-inline/eval (required for Vite/React), and data images.

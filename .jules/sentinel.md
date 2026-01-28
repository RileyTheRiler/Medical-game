# Sentinel Journal

## 2024-03-20 - Initial Setup
**Vulnerability:** Missing security journal
**Learning:** Security learnings need a centralized place to be recorded.
**Prevention:** Created .jules/sentinel.md

## 2024-03-20 - CSP Enhancement
**Vulnerability:** Missing Content Security Policy
**Learning:** Adding CSP to index.html ensures security headers are present even if deployment config is bypassed or changed.
**Prevention:** Added strict CSP meta tag to index.html with 'unsafe-inline' and 'unsafe-eval' allowed for Vite/React compatibility.

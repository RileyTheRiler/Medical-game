# Sentinel Journal 🛡️

## 2025-01-27 - Security Enhancements
**Vulnerability:** Input fields in `WordBuilderView.jsx` lacked length limits and autocomplete disabling.
**Learning:** Even internal game inputs should have boundaries to prevent DoS or UI breaking, and autocomplete can interfere with gameplay/privacy.
**Prevention:** Added `maxLength={50}` and `autoComplete="off"` to all text inputs.

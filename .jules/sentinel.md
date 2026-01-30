## 2025-02-23 - Input Sanitization & DoS Prevention
**Vulnerability:** Unbounded text inputs in `WordBuilderView.jsx` allowed potentially infinite strings, posing a Denial of Service (DoS) risk and performance degradation.
**Learning:** React controlled components do not automatically limit input length.
**Prevention:** Always add `maxLength` attributes to text inputs and consider `autoComplete="off"` for game/sensitive inputs.

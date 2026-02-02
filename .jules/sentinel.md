## 2026-02-02 - Unsecured Manual Inputs in WordBuilder
**Vulnerability:** Input fields in `WordBuilderView.jsx` lacked `maxLength`, `autoComplete="off"`, and `spellCheck={false}` attributes.
**Learning:** Manual input implementations in this codebase (controlled components without a form library) missed standard security and privacy attributes, creating potential DoS and data leakage risks.
**Prevention:** Audit all manual `<input>` implementations to ensure `maxLength` and privacy attributes are explicitly defined.

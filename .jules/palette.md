## 2026-01-23 - Accessible Game Inputs
**Learning:** Game input fields without visible labels (for design reasons) require `aria-label` to be accessible. Feedback messages in games must use `role='alert'` to be announced.
**Action:** Always add `aria-label` to inputs in custom game UIs and wrap status messages in live regions.

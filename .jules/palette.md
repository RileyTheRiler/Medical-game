## 2024-05-23 - Accessibility in Game Logic
**Learning:** Interactive game components often neglect ARIA live regions for feedback messages, relying solely on visual cues (colors/text) which leaves screen reader users guessing.
**Action:** When auditing games, prioritize checking feedback/status updates for `role="alert"` or `aria-live` attributes. A reusable `FeedbackMessage` component is a clean way to enforce this pattern.

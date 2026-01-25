## 2025-02-18 - Standardizing Dynamic Feedback
**Learning:** Inconsistent implementation of feedback messages (using inline styles and different HTML structures) led to missing accessibility roles (`role="alert"`) in multiple game modes. Screen reader users would likely miss correct/incorrect status updates.
**Action:** Always centralize feedback UI into a shared component with `role="alert"` and `aria-live="assertive"` to ensure consistency and accessibility across all interactive states.

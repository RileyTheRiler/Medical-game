## 2024-05-22 - Accessibility Patterns in Gaming UI
**Learning:** Game interfaces often use custom icon-only buttons for immersion, but these are completely invisible to screen readers without explicit ARIA labels.
**Action:** Always check toggle buttons and close icons in game overlays for aria-label or aria-pressed attributes.

## 2024-05-22 - Toggle State Semantics in Custom UI
**Learning:** Custom "switch" components implemented as divs/buttons often rely solely on CSS classes for visual state, missing the programmatic `aria-pressed` attribute required for screen readers.
**Action:** When auditing custom toggle implementations, ensure `aria-pressed={boolean}` is present alongside conditional styling.

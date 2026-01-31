## 2025-02-20 - Accessible Custom Dropdown
**Learning:** Custom dropdown buttons using `div` overlays require explicit ARIA roles (`listbox`, `option`) and states (`aria-expanded`, `aria-selected`) to be usable by screen readers.
**Action:** Always wrap custom select-like components with proper ARIA attributes or use native `<select>` when possible.

## 2025-02-20 - Feedback Live Regions
**Learning:** Dynamic feedback messages (success/error) must use `role="alert"` or `aria-live` to ensure they are announced immediately without moving focus.
**Action:** Add `role="alert"` to conditional feedback containers.

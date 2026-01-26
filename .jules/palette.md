## 2024-05-21 - Custom Widget Accessibility
**Learning:** The app relies heavily on custom interactive elements (like dropdowns in WordBuilder) built with `div` and `button` but lacking ARIA roles. This makes them accessible by keyboard (if buttons are used) but semantically opaque to screen readers.
**Action:** Systematically identify "widget" patterns and apply ARIA design patterns (e.g., Listbox pattern for selection dropdowns) to ensure state and role are communicated.

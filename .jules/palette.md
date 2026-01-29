## 2024-05-23 - Custom Dropdown Accessibility
**Learning:** The application uses custom `div`-based dropdowns triggered by buttons (`WordBuilderView.jsx`), which completely lack semantic information for screen readers.
**Action:** When identifying custom interactive components (like dropdowns), always verify they implement the appropriate ARIA pattern (in this case, Listbox) with `role="listbox"`, `role="option"`, and state attributes like `aria-expanded` and `aria-selected`.

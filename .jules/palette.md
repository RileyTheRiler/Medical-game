## 2024-05-22 - Custom Dropdown Accessibility
**Learning:** Custom UI components like `DropdownButton` in `WordBuilderView` often rely on visual cues (CSS, structure) without corresponding semantic HTML or ARIA attributes, making them inaccessible to screen readers.
**Action:** When encountering custom "select" or "dropdown" components, immediately check for `aria-haspopup`, `aria-expanded`, and `role="listbox"` patterns. Add them if missing.

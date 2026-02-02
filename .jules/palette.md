## 2024-05-22 - Non-Semantic Interactive Elements
**Learning:** The application frequently uses `div` elements with `onClick` handlers for interactive components (e.g., flashcards, tabs) instead of semantic `<button>` elements. This creates accessibility barriers as these elements lack default keyboard focus and interaction support.
**Action:** When encountering interactive `div`s, systematically upgrade them by adding `role="button"`, `tabIndex="0"`, `aria-label`, and `onKeyDown` handlers (for Space/Enter support), or replace them with native `<button>` elements where styling permits.

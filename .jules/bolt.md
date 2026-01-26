# Bolt's Performance Journal

## 2024-05-21 - Initial Bundle Size Bottleneck
**Learning:** The application was importing all game screens (GameScreen, WordBuilderView, etc.) statically in `App.jsx`. This caused the initial bundle to be ~394kB (gzip), forcing users to download code for games they might not even play immediately.
**Action:** Implemented code splitting using `React.lazy` and `Suspense` for all top-level game routes. This reduced the main entry point to ~257kB (35% reduction), improving initial load time.

## 2024-05-21 - React Runtime Anti-Patterns
**Learning:** `WordBuilderView.jsx` defined the `DropdownButton` component *inside* the `BuilderMode` render function. This causes the child component to be redefined on every render, leading to unnecessary unmounting and remounting of the DOM subtree, losing focus and state.
**Action:** Extracted static components outside of the parent component or into their own files. Always check for nested component definitions during performance audits.

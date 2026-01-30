# Bolt's Journal

## 2024-05-22 - Initial Setup
**Learning:** Performance tracking requires a persistent journal.
**Action:** Created .jules/bolt.md to track critical learnings.

## 2024-05-22 - Route-based Code Splitting
**Learning:** React 19 with Vite handles dynamic imports cleanly. Splitting top-level screens in `App.jsx` reduced initial bundle size by ~34% (gzip).
**Action:** Use `React.lazy` for all non-critical initial routes. Ensure `Suspense` has a fallback.

## 2025-02-18 - Code Splitting in Manual Routing
**Learning:** In a manual routing setup (using conditional rendering in App.jsx instead of a router library), static imports cause all route components to be bundled in the main chunk, significantly impacting LCP.
**Action:** Always use `React.lazy` and `Suspense` for "route" components even if they are just conditionally rendered components. Keep the initial view (e.g., TitleScreen) static to avoid layout shifts or loading states on first paint.

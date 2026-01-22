## 2024-05-22 - Missing Code Splitting in Main App
**Learning:** Despite memory indicating that `React.lazy` and `Suspense` were used for heavy screens, `src/App.jsx` contained only static imports. This resulted in the entire application bundle being loaded upfront, degrading initial load performance.
**Action:** Always verify "known" architectural patterns by inspecting the actual code (`src/App.jsx` or router configuration) before assuming they are implemented. Implemented `React.lazy` for all non-critical screens to improve LCP.

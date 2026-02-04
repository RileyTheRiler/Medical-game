## 2024-02-04 - Missing Code Splitting Discrepancy
**Learning:** The codebase memory stated that code splitting was implemented for heavy screens, but the actual code used standard imports. This resulted in a larger than necessary initial bundle (~400kB vs ~240kB). The `GameScreen` component alone added ~93kB to the initial bundle.
**Action:** Always verify architectural claims in memory/documentation against the actual codebase, especially for performance-critical features like lazy loading.

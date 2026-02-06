## 2025-02-18 - Heavy Data Co-location
**Learning:** The `GameScreen` component eagerly imports large data files (`LESSONS`, `QUIZ_DATA`). Because these data files are *only* used in `GameScreen`, lazy-loading the component automatically code-split the data files out of the main bundle.
**Action:** Maintain this isolation. Do not import `LESSONS` or `QUIZ_DATA` in the root `App.jsx` or other initial-load components to preserve the bundle size savings.

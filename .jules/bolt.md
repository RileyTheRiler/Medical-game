## 2025-01-29 - Monolithic Bundle Bottleneck
**Learning:** The application architecture defaulted to eager loading all screens (Game, Menu, WordBuilder, etc.) in `App.jsx`, causing a massive initial bundle (393kB). Since `TitleScreen` is the only thing needed immediately, this was a major inefficiency.
**Action:** Always check `App.jsx` or the main router for eager imports of heavy page components. Use `React.lazy` and `Suspense` to split these chunks.

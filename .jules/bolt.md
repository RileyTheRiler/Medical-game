## 2025-02-21 - GameScreen Monolithic Chunk
**Learning:** `GameScreen` is a significant chunk (~92kB gzip) because it eagerly imports all sub-views (`LessonView`, `QuizView`, `ScenarioView`, etc.).
**Action:** In future optimizations, consider lazy loading sub-views within `GameScreen` to further reduce the initial load of the game mode, or split based on game mode.

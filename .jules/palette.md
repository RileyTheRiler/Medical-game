## 2024-05-23 - Global Keyboard Listeners vs Native Focus
**Learning:** Global `window.addEventListener('keydown')` in React components (like `FlashcardView`) captures all key presses, including 'Space' and 'Enter' meant for focused buttons. This causes double-actions (e.g., button click + card flip) or unexpected behavior.
**Action:** Always add a guard clause in global keydown handlers to ignore events when `document.activeElement` is an interactive element (BUTTON, INPUT, TEXTAREA), unless the specific shortcut is intended to override native behavior globally.

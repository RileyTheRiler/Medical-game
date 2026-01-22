# Palette's Journal

## 2025-02-19 - The Case of the Silent Overlays
**Learning:** Custom modal overlays (like game feedback screens) often trap visual users but lose keyboard/screen reader users who remain focused on the underlying content.
**Action:** Always add `role="dialog"`, `aria-modal="true"`, and manage focus (e.g., `autoFocus` on the primary button) for any full-screen overlay.

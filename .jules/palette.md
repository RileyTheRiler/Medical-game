## 2025-02-18 - Global Keyboard Listeners vs Interactive Elements
**Learning:** Global keydown listeners for shortcuts (like Space/Enter) must explicitly ignore interactive elements (Buttons, Inputs) to avoid double-activation or conflict with native accessibility behaviors. However, navigation shortcuts (Arrows) should generally remain active unless specifically consumed.
**Action:** Always add a guard clause checking `document.activeElement.tagName` for 'BUTTON', 'INPUT', 'TEXTAREA' in global keydown handlers for activation keys.

## 2025-02-18 - Component Definition Inside Render Loop
**Learning:** Defining components like `DropdownButton` inside the parent component's render function causes remounting on every state change, leading to focus loss on the trigger element.
**Action:** Always define components outside the render loop or use `useCallback`/`useMemo` to stabilize them. For simple cases, call them as functions `{renderDropdown()}` instead of `<DropdownButton />` to avoid reconciliation issues.

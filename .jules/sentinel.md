## 2024-03-24 - [DoS Prevention] Enforce Input Length Limits
**Vulnerability:** Unlimited input length in game modes allowed potential UI freezing/crash via massive strings.
**Learning:** Even in client-side games, unrestricted inputs can lead to performance degradation or DoS.
**Prevention:** Always apply `maxLength` attributes to text inputs based on expected data size.

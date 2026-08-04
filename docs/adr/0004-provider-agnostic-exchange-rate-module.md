---
status: accepted
---

# Provider-agnostic exchange-rate module

Callers request a normalized quote from one TypeScript exchange-rate module without selecting a provider; the module owns application-defined routing rules, provider fallback, currency triangulation, caching, and normalized failures. External sources sit behind internal provider adapters, beginning with NBP plus an in-memory test adapter, and every returned quote identifies its provider, effective date, and any triangulation path so additional sources can be added without changing callers or historical operations; user-configurable provider routing is deferred beyond the POC.

# Transaction date and time model

Research date: 2026-08-04

## Question

Should a transaction store a calendar date, an exact date-time, or both—especially when the user travels between time zones and when data is synchronized or imported?

## Recommendation

Store both concepts, but give them different responsibilities:

- `effectiveDate` is required: a user-editable `Temporal.PlainDate`. Reports, daily balances, category totals, transaction grouping, and the initial exchange-rate lookup use this field.
- `occurredAt` is optional: a `Temporal.ZonedDateTime` when the source knows a meaningful time and origin zone or offset. Manual entry may default it to “now”; date-only imports leave it absent rather than inventing midnight.
- `createdAt` and `modifiedAt` are `Temporal.Instant` audit/synchronization values. They describe record lifecycle, not when the financial event belongs in the ledger.

This keeps the time information the product may want while preventing travel, device settings, or sync timing from moving a transaction into a different reporting day.

The domain uses the ECMAScript Temporal API rather than legacy JavaScript `Date`. Persisted values use Temporal's standardized RFC 9557-compatible string representations. If the selected Expo/Hermes runtime does not provide Temporal natively, the application must install a conforming polyfill behind the same API.

## Evidence

### A calendar date and an instant are different domain values

[RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6) defines `full-date` separately from `date-time`; the latter includes a time and UTC offset. The [TC39 Temporal documentation](https://tc39.es/proposal-temporal/docs/plaindate.html) likewise defines `Temporal.PlainDate` as a calendar date independent of time zone, while [`Temporal.ZonedDateTime`](https://tc39.es/proposal-temporal/docs/zoneddatetime.html) represents an event at a particular instant together with a time zone.

Apple's [`Date`](https://developer.apple.com/documentation/foundation/date) represents a point in time independent of calendar or time zone. Apple's [`Calendar`](https://developer.apple.com/documentation/foundation/calendar) converts such points into date components using a calendar time zone. Therefore, if an app derives the ledger day from one stored instant using the device's current time zone, changing zones can change the derived day. That consequence is an inference from Apple's documented types.

Example: `2026-08-04T00:30:00+02:00` in Warsaw is the same instant as `2026-08-03T18:30:00-04:00` in New York. The instant has not changed, but the local calendar date has. A persisted `effectiveDate` avoids silently regrouping that purchase when the user travels.

### Financial systems need date-only data to be first-class

The official [YNAB API](https://api.ynab.com/v1) models a transaction's `date` as an ISO `date`, for example `2016-12-01`, and uses that date in import identifiers and matching.

[Actual Budget's API](https://actualbudget.org/docs/api/reference/) also accepts transactions with a `YYYY-MM-DD` date. Its [import documentation](https://actualbudget.org/docs/transactions/importing/) supports CSV, QIF, OFX/QFX, and CAMT and explains that bank-imported dates are important for comparing balances at a point in time.

QuickBooks makes the lifecycle distinction explicit: Intuit documents [`TxnDate`](https://static.developer.intuit.com/sdkdocs/qbv3doc/ippdotnetdevkitv3/html/0b0314cb-d56b-27b4-dd01-36e5ad5dbc9e.htm) as the nominal user-entered date and, for posting transactions, the date affecting financial statements. Its official [API example](https://developer.intuit.com/app/developer/qbo/docs/workflows/manage-projects/use-cases) returns that date separately from offset-bearing `MetaData.CreateTime` and `MetaData.LastUpdatedTime` timestamps.

The primary banking interchange specifications allow sources to omit exact time:

- [OFX 2.2](https://www.financialdataexchange.org/common/Uploaded%20files/OFX%20files/OFX%202.2.pdf), section 3.2.8, permits date/time fields with components omitted from the right and requires clients to accept those forms. It notes that daily-only results work using dates without times.
- [ISO 20022 Bank-to-Customer Cash Management](https://www.iso20022.org/sites/default/files/documents/messages/mdr_part_2/ISO20022_MDRPart2_BankToCustomerCashManagement_2018_2019_v1_0.pdf) models both booking date and value date as a choice between `Date` and `DateTime` (for example, `BookgDt` and `ValDt` in `camt.053`).

Consequently, making an exact instant mandatory would require fabricated times for valid imports. A fake midnight is especially risky because converting it between zones can produce the preceding date.

### Exchange-rate selection is date-based

The official [NBP Web API](https://api.nbp.pl/en.html) accepts exchange-rate query dates in ISO `YYYY-MM-DD` form and returns rates published for a date. The transaction's stable `effectiveDate` is therefore the appropriate input to the exchange-rate module. The quote's own provider effective date and the final embedded operation rate remain separate provenance, as already decided for this project.

No stale-rate or holiday fallback rule is proposed here; that policy remains deferred.

### Sync timestamps answer a different question

CloudKit sets [`CKRecord.creationDate`](https://developer.apple.com/documentation/cloudkit/ckrecord/creationdate) when the server first saves a record and [`CKRecord.modificationDate`](https://developer.apple.com/documentation/cloudkit/ckrecord/modificationdate) when it most recently saves it. [`CKRecord`](https://developer.apple.com/documentation/cloudkit/ckrecord) metadata and change tags support local-database synchronization.

Those values can be later than the financial event because the app is offline, and edits can change them without changing the transaction's financial date. They should not drive reporting, FX lookup, or the transaction date shown to the user.

## Proposed behavior

### Manual entry

When the user records a transaction now:

1. Set `effectiveDate` from the device's local calendar date at capture time.
2. Set `occurredAt` to the current `Temporal.ZonedDateTime`, including the current IANA time-zone identifier.
3. Let the user edit the financial date and, if exposed in the UI, the occurrence time.

Later travel or a device time-zone change must not mutate any of these stored values. Reports continue to use `effectiveDate`. If the UI shows an occurrence time, it should show it in the captured zone by default, not reinterpret it in the viewer's current zone without an explicit label.

### Imports

- Map a bank booking/posting date to `effectiveDate` by default.
- If the source supplies a meaningful occurrence or booking date-time with an offset, retain it as `occurredAt`, using its IANA zone when known or its fixed-offset zone otherwise.
- If the source supplies only a date, leave `occurredAt` absent. Do not synthesize midnight.
- Preserve the source's booking date, value date, and raw temporal value in import provenance if later reconciliation requires them; do not overload one field with all three meanings.

### Reports, ordering, and FX

- Group and filter by `effectiveDate`.
- Use `effectiveDate` as the requested operation date for exchange-rate lookup.
- Within one date, use `occurredAt` for chronological display only when it exists. Use a deterministic fallback for entries without a time; do not treat `createdAt` as financial chronology.
- Keep the exchange-rate quote's effective date distinct because the selected provider may publish no quote on the requested date.

## TypeScript temporal model

The names remain illustrative; the Temporal types are the accepted domain boundary, not a storage-schema decision.

```ts
type TransactionTemporalData = {
  effectiveDate: Temporal.PlainDate;
  occurredAt?: Temporal.ZonedDateTime;
  createdAt: Temporal.Instant;
  modifiedAt: Temporal.Instant;
};
```

At persistence boundaries, serialize with each Temporal value's standardized `toString()` representation and parse back into the same Temporal type. For CloudKit, store `effectiveDate` as the serialized `Temporal.PlainDate`, not as an Apple `Date` set to midnight. CloudKit's [`CKRecord`](https://developer.apple.com/documentation/cloudkit/ckrecord) supports both strings and `Date` values; only the latter necessarily means a day and time.

## Validation scenarios

1. Create a purchase at 00:30 in Warsaw, then open the Book in New York. Its `effectiveDate`, report period, and embedded FX choice remain unchanged.
2. Import a date-only OFX/CAMT transaction. No occurrence time is fabricated, and the imported ledger date survives any device time-zone change.
3. Create a transaction offline and sync it two days later. `createdAt`/CloudKit metadata may reflect synchronization timing, while `effectiveDate` still reflects the intended ledger day.
4. Edit only a memo. `modifiedAt` changes; `effectiveDate`, `occurredAt`, and financial reports do not.
5. Edit the transaction's financial date. Reports and any newly requested rate lookup use the new `effectiveDate`; an already embedded operation rate is not silently rewritten.

## POC interaction decision

For new manual entries, the application captures `occurredAt` automatically. Quick entry keeps time controls collapsed; transaction details show the occurrence time and allow editing when needed. Date-only imports leave `occurredAt` absent.

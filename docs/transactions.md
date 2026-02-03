# Transactions Data Model

## Currency

Enum of supported currencies.

| Code  | Symbol | Locale    |
|-------|--------|-----------|
| `USD` | `$`    | `en-US`   |
| `EUR` | `EUR`  | `de-DE`   |
| `PLN` | `zl`   | `pl-PL`   |
| `RUB` | `rub.` | `ru-RU`   |

## Category

Hierarchical transaction categories with infinite nesting via `parentId`.

| Field      | Type     | Required | Description                              |
|------------|----------|----------|------------------------------------------|
| `id`       | `string` | Yes      | Unique identifier (nanoid)               |
| `name`     | `string` | Yes      | Display name                             |
| `parentId` | `string` | No       | Parent category ID for nested categories |

### Example hierarchy

```
Food
  Groceries
  Restaurants
Transport
  Gas
  Transit
Housing
Entertainment
Income
  Salary
  Freelance
```

## Account

User-owned financial accounts (checking, savings, credit cards, etc.).

| Field  | Type     | Required | Description                |
|--------|----------|----------|----------------------------|
| `id`   | `string` | Yes      | Unique identifier (nanoid) |
| `name` | `string` | Yes      | Display name               |

## Payee

External entities that send or receive money (merchants, employers, services).

| Field  | Type     | Required | Description                |
|--------|----------|----------|----------------------------|
| `id`   | `string` | Yes      | Unique identifier (nanoid) |
| `name` | `string` | Yes      | Display name               |

## Transaction

A financial movement between a source and a target. The combination of `sourceType`/`targetType` implicitly determines the transaction type:

- **Expense**: account -> payee
- **Income**: payee -> account
- **Transfer**: account -> account

| Field        | Type              | Required | Default | Description                                      |
|--------------|-------------------|----------|---------|--------------------------------------------------|
| `id`         | `string`          | Yes      |         | Unique identifier (nanoid)                       |
| `amount`     | `number`          | Yes      |         | Transaction amount (always positive)             |
| `currency`   | `Currency`        | Yes      | `USD`   | Currency code                                    |
| `sourceType` | `ParticipantType` | Yes      |         | Type of the source: `'account'` or `'payee'`     |
| `sourceId`   | `string`          | Yes      |         | ID of the source account or payee                |
| `targetType` | `ParticipantType` | Yes      |         | Type of the target: `'account'` or `'payee'`     |
| `targetId`   | `string`          | Yes      |         | ID of the target account or payee                |
| `date`       | `string`          | Yes      | now     | ISO date string (`YYYY-MM-DD`)                   |
| `categoryId` | `string`          | No       |         | Associated category ID                           |
| `description`| `string`          | No       |         | Free-text note or memo                           |

### ParticipantType

Union type: `'account' | 'payee'`

### Transaction type derivation

```
sourceType === 'account' && targetType === 'payee'    -> Expense (red)
sourceType === 'payee'   && targetType === 'account'  -> Income (green)
sourceType === 'account' && targetType === 'account'  -> Transfer (neutral)
```

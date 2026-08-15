import {
	ActionLink,
	ChoiceRow,
	Field,
	Note,
	PrototypeScreen,
	StaticRow
} from '~/components/prototype-ui.tsx'
import {
	accountHref,
	accountsHref,
	bookHref,
	reserveHref,
	reservesHref,
	sampleAccountId,
	sampleReserveId,
	sampleTransactionId,
	transactionHref
} from '~/screens/prototype-routes.ts'

interface BookFormScreenProps {
	bookId: string
}

interface EntityFormScreenProps extends BookFormScreenProps {
	id?: string
}

export function TransactionFormScreen({ bookId, id }: EntityFormScreenProps) {
	return (
		<PrototypeScreen
			description='Only amount and Account are required for an ordinary purchase. The remaining context stays optional.'
			eyebrow={id ? 'EDIT TRANSACTION' : 'AMOUNT FIRST'}
			title={id ? 'Edit transaction' : 'Record transaction'}
		>
			<ChoiceRow
				choices={['Expense', 'Income']}
				label='Type'
			/>
			<Field
				defaultValue={id ? '186.40' : undefined}
				label='Amount'
				placeholder='0.00 PLN'
			/>
			<Field
				defaultValue='mBank'
				label='Account'
			/>
			<Field
				defaultValue={id ? 'Biedronka' : undefined}
				label='Counterparty · optional'
				placeholder='Choose or leave empty'
			/>
			<Field
				defaultValue={id ? 'Food › Groceries' : undefined}
				label='Category · optional'
				placeholder='Choose or leave empty'
			/>
			<Field
				label='Reserve · optional'
				placeholder='Do not use a Reserve'
			/>
			<Field
				defaultValue='Today'
				label='Date'
			/>
			<Field
				label='Note · optional'
				multiline
				placeholder='Add context'
			/>
			<ActionLink
				href={transactionHref(bookId, id ?? sampleTransactionId)}
				label='Save transaction'
			/>
			<ActionLink
				href={bookHref(bookId)}
				label='Cancel'
				secondary
			/>
		</PrototypeScreen>
	)
}

export function AccountFormScreen({ bookId, id }: EntityFormScreenProps) {
	return (
		<PrototypeScreen
			description='Choose how value is tracked before deciding whether it contributes to spending money or net worth.'
			title={id ? 'Edit Account' : 'Create Account'}
		>
			<Field
				defaultValue={id ? 'mBank' : undefined}
				label='Name'
				placeholder='Account name'
			/>
			<ChoiceRow
				choices={['Transactional', 'Valuation']}
				label='Tracking mode'
			/>
			<Field
				defaultValue='PLN'
				label='Currency'
			/>
			<ChoiceRow
				choices={['In net worth', 'Excluded']}
				label='Net worth'
			/>
			<ChoiceRow
				choices={['Available money', 'Not available']}
				label='Spending scope'
			/>
			<Note>
				Valuation Accounts are excluded from available money. This fixture does not enforce the rule
				yet.
			</Note>
			<ActionLink
				href={accountHref(bookId, id ?? sampleAccountId)}
				label='Save Account'
			/>
			<ActionLink
				href={accountsHref(bookId)}
				label='Cancel'
				secondary
			/>
		</PrototypeScreen>
	)
}

export function TransferFormScreen({ bookId }: BookFormScreenProps) {
	return (
		<PrototypeScreen
			description='One operation preserves both real amounts and never creates false income or expense.'
			title='Transfer'
		>
			<Field
				defaultValue='mBank'
				label='From Account'
			/>
			<Field
				defaultValue='1,005 PLN'
				label='Amount sent'
			/>
			<Field
				defaultValue='Revolut'
				label='To Account'
			/>
			<Field
				defaultValue='230 EUR'
				label='Amount received'
			/>
			<StaticRow
				label='Implied rate'
				value='4.3478 PLN/EUR'
			/>
			<Field
				defaultValue='5 PLN'
				label='Fee · optional'
			/>
			<Field
				defaultValue='Today'
				label='Date'
			/>
			<ActionLink
				href={bookHref(bookId)}
				label='Save transfer'
			/>
			<ActionLink
				href={accountsHref(bookId)}
				label='Cancel'
				secondary
			/>
		</PrototypeScreen>
	)
}

export function ReserveFormScreen({ bookId, id }: EntityFormScreenProps) {
	return (
		<PrototypeScreen
			description='A Reserve names a concrete commitment and can optionally allocate existing free money immediately.'
			title={id ? 'Edit Reserve' : 'Create Reserve'}
		>
			<Field
				defaultValue={id ? 'Tax' : undefined}
				label='Name'
				placeholder='What is the commitment?'
			/>
			<Field
				defaultValue={id ? '2,400 PLN' : undefined}
				label='Allocate now · optional'
				placeholder='0 PLN'
			/>
			<Field
				label='Note · optional'
				multiline
				placeholder='Why is this money set aside?'
			/>
			<ActionLink
				href={reserveHref(bookId, id ?? sampleReserveId)}
				label='Save Reserve'
			/>
			<ActionLink
				href={reservesHref(bookId)}
				label='Cancel'
				secondary
			/>
		</PrototypeScreen>
	)
}

export function CategoryFormScreen({ bookId, id }: EntityFormScreenProps) {
	return (
		<PrototypeScreen
			description='Categories form an arbitrary-depth tree and remain assignable even when they have children.'
			title={id ? 'Edit Category' : 'Create Category'}
		>
			<Field
				defaultValue={id ? 'Groceries' : undefined}
				label='Name'
				placeholder='Category name'
			/>
			<Field
				defaultValue={id ? 'Food' : undefined}
				label='Parent · optional'
				placeholder='No parent'
			/>
			<ChoiceRow
				choices={['Active', 'Archived']}
				label='Status'
			/>
			<Note>
				Archiving a parent affects its subtree. The prototype only shows the decision point.
			</Note>
			<ActionLink
				href={{ pathname: '/books/[book-id]/categories', params: { 'book-id': bookId } }}
				label='Save Category'
			/>
		</PrototypeScreen>
	)
}

export function CounterpartyFormScreen({ bookId, id }: EntityFormScreenProps) {
	return (
		<PrototypeScreen
			description='The same vocabulary covers the person or organization on either side of income and expenses.'
			title={id ? 'Edit Counterparty' : 'Create Counterparty'}
		>
			<Field
				defaultValue={id ? 'Biedronka' : undefined}
				label='Name'
				placeholder='Person or organization'
			/>
			<Field
				label='Note · optional'
				multiline
				placeholder='Useful context'
			/>
			<ActionLink
				href={{ pathname: '/books/[book-id]/counterparties', params: { 'book-id': bookId } }}
				label='Save Counterparty'
			/>
		</PrototypeScreen>
	)
}

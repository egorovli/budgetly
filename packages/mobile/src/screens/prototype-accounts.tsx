import {
	ActionLink,
	Metric,
	MetricGrid,
	Note,
	PrototypeScreen,
	RowLink,
	Section,
	StaticRow
} from '~/components/prototype-ui.tsx'
import {
	accountHref,
	accountsHref,
	sampleAccountId,
	sampleTransactionId,
	sampleValuationAccountId,
	transactionHref
} from '~/screens/prototype-routes.ts'

interface AccountListScreenProps {
	bookId: string
}

interface AccountDetailScreenProps extends AccountListScreenProps {
	accountId: string
}

export function AccountsScreen({ bookId }: AccountListScreenProps) {
	return (
		<PrototypeScreen
			description='Transactional accounts explain cash movement; valuation accounts contribute only dated total values.'
			title='Accounts'
		>
			<Section title='Transactional'>
				<RowLink
					detail='PLN · available money and net worth'
					href={accountHref(bookId, sampleAccountId)}
					label='mBank'
					value='8,740 PLN'
				/>
				<RowLink
					detail='EUR · rate 4.3256'
					href={accountHref(bookId, 'revolut')}
					label='Revolut'
					value='860 EUR'
				/>
			</Section>
			<Section title='Valuation'>
				<RowLink
					detail='EUR · net worth only'
					href={accountHref(bookId, sampleValuationAccountId)}
					label='Trade Republic'
					value='8,440 EUR'
				/>
			</Section>
			<ActionLink
				href={{ pathname: '/books/[book-id]/accounts/new', params: { 'book-id': bookId } }}
				label='Create Account'
			/>
			<ActionLink
				href={{ pathname: '/books/[book-id]/transfers/new', params: { 'book-id': bookId } }}
				label='Transfer between Accounts'
				secondary
			/>
		</PrototypeScreen>
	)
}

export function AccountDetailScreen({ accountId, bookId }: AccountDetailScreenProps) {
	const isValuation = accountId === sampleValuationAccountId
	let name = 'mBank'
	if (isValuation) {
		name = 'Trade Republic'
	} else if (accountId === 'revolut') {
		name = 'Revolut'
	}

	return (
		<PrototypeScreen
			description={
				isValuation
					? 'Valuation Account · EUR · net worth only'
					: 'Transactional Account · PLN · available money'
			}
			title={name}
		>
			<MetricGrid>
				<Metric
					label={isValuation ? 'Latest valuation' : 'Current balance'}
					value={isValuation ? '8,440 EUR' : '8,740 PLN'}
				/>
				<Metric
					label='In base currency'
					value={isValuation ? '36,510 PLN' : '8,740 PLN'}
				/>
			</MetricGrid>
			<ActionLink
				href={{
					pathname: '/books/[book-id]/accounts/[id]/edit',
					params: { 'book-id': bookId, id: accountId }
				}}
				label='Edit Account'
			/>
			{isValuation ? (
				<ActionLink
					href={{
						pathname: '/books/[book-id]/accounts/[id]/valuation-snapshots/new',
						params: { 'book-id': bookId, id: accountId }
					}}
					label='Update valuation'
					secondary
				/>
			) : (
				<>
					<ActionLink
						href={{ pathname: '/books/[book-id]/transactions/new', params: { 'book-id': bookId } }}
						label='Record transaction'
						secondary
					/>
					<ActionLink
						href={{
							pathname: '/books/[book-id]/accounts/[id]/balance-adjustments/new',
							params: { 'book-id': bookId, id: accountId }
						}}
						label='Adjust balance'
						secondary
					/>
				</>
			)}
			<Section title={isValuation ? 'Valuation history' : 'Recent activity'}>
				{isValuation ? (
					<>
						<StaticRow
							detail='Today'
							label='Manual valuation'
							value='8,440 EUR'
						/>
						<StaticRow
							detail='1 Jul'
							label='Manual valuation'
							value='8,110 EUR'
						/>
					</>
				) : (
					<RowLink
						detail='Today · Groceries'
						href={transactionHref(bookId, sampleTransactionId)}
						label='Biedronka'
						value='−186.40 PLN'
					/>
				)}
			</Section>
			<ActionLink
				href={accountsHref(bookId)}
				label='Back to Accounts'
				secondary
			/>
		</PrototypeScreen>
	)
}

export function BalanceAdjustmentScreen({ accountId, bookId }: AccountDetailScreenProps) {
	return (
		<PrototypeScreen
			description='An explicit correction in account history—not income, expense, or a direct balance edit.'
			title='Balance adjustment'
		>
			<StaticRow
				label='Account'
				value='mBank'
			/>
			<StaticRow
				label='Current balance'
				value='8,740 PLN'
			/>
			<Note>Prototype inputs: new balance 8,700 PLN · today · “Statement reconciliation”.</Note>
			<ActionLink
				href={accountHref(bookId, accountId)}
				label='Save adjustment'
			/>
		</PrototypeScreen>
	)
}

export function ValuationSnapshotScreen({ accountId, bookId }: AccountDetailScreenProps) {
	return (
		<PrototypeScreen
			description='A dated total value changes net worth without creating fake income or expenses.'
			title='Update valuation'
		>
			<StaticRow
				label='Account'
				value='Trade Republic'
			/>
			<StaticRow
				label='Previous value'
				value='8,110 EUR'
			/>
			<Note>Prototype inputs: total value 8,440 EUR · today · “Monthly update”.</Note>
			<ActionLink
				href={accountHref(bookId, accountId)}
				label='Save valuation'
			/>
		</PrototypeScreen>
	)
}

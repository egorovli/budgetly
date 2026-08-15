import {
	ActionLink,
	InlineLink,
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
	activityHref,
	reserveHref,
	reservesHref,
	sampleAccountId,
	sampleReserveId,
	sampleTransactionId,
	transactionHref
} from '~/screens/prototype-routes.ts'

interface BookScreenProps {
	bookId: string
}

interface TransactionScreenProps extends BookScreenProps {
	transactionId: string
}

export function HomeScreen({ bookId }: BookScreenProps) {
	return (
		<PrototypeScreen
			description='The pre-purchase answer, followed by the financial context that explains it.'
			eyebrow='FAMILY · PLN'
			navigationTitle='Overview'
			title='9,260 PLN free'
		>
			<MetricGrid>
				<Metric
					label='Available money'
					value='12,460 PLN'
				/>
				<Metric
					label='In Reserves'
					value='3,200 PLN'
				/>
				<Metric
					label='Net worth'
					note='Includes investments'
					value='48,920 PLN'
				/>
				<Metric
					label='This month'
					note='Expenses so far'
					value='2,460 PLN'
				/>
			</MetricGrid>

			<ActionLink
				href={{
					pathname: '/books/[book-id]/transactions/new',
					params: { 'book-id': bookId }
				}}
				label='Record transaction'
			/>

			<Section
				action={
					<InlineLink
						href={reservesHref(bookId)}
						label='See all'
					/>
				}
				title='Reserves'
			>
				<RowLink
					detail='Tax payment'
					href={reserveHref(bookId, sampleReserveId)}
					label='Tax'
					value='2,400 PLN'
				/>
				<RowLink
					detail='Travel commitment'
					href={reserveHref(bookId, 'asturias')}
					label='Asturias'
					value='800 PLN'
				/>
			</Section>

			<Section
				action={
					<InlineLink
						href={accountsHref(bookId)}
						label='See all'
					/>
				}
				title='Accounts'
			>
				<RowLink
					detail='Transactional · PLN'
					href={accountHref(bookId, sampleAccountId)}
					label='mBank'
					value='8,740 PLN'
				/>
				<RowLink
					detail='Transactional · EUR'
					href={accountHref(bookId, 'revolut')}
					label='Revolut'
					value='860 EUR'
				/>
			</Section>

			<Section
				action={
					<InlineLink
						href={activityHref(bookId)}
						label='See all'
					/>
				}
				title='Recent activity'
			>
				<TransactionRows
					bookId={bookId}
					limit={2}
				/>
			</Section>
		</PrototypeScreen>
	)
}

export function ActivityScreen({ bookId }: BookScreenProps) {
	return (
		<PrototypeScreen
			description='A chronological view of expenses, income, transfers, and explicit corrections.'
			title='Activity'
		>
			<Note>Search · All accounts · All types · This month</Note>
			<Section title='Today'>
				<TransactionRows
					bookId={bookId}
					limit={2}
				/>
			</Section>
			<Section title='Yesterday'>
				<TransactionRows bookId={bookId} />
			</Section>
			<ActionLink
				href={{ pathname: '/books/[book-id]/reports', params: { 'book-id': bookId } }}
				label='Open reports'
				secondary
			/>
		</PrototypeScreen>
	)
}

export function TransactionDetailScreen({ bookId, transactionId }: TransactionScreenProps) {
	return (
		<PrototypeScreen
			description={`Transaction fixture: ${transactionId}`}
			eyebrow='EXPENSE · TODAY'
			title='−186.40 PLN'
		>
			<Section title='Details'>
				<StaticRow
					label='Account'
					value='mBank'
				/>
				<StaticRow
					label='Counterparty'
					value='Biedronka'
				/>
				<StaticRow
					label='Category'
					value='Food › Groceries'
				/>
				<StaticRow
					label='Original amount'
					value='43.20 EUR'
				/>
				<StaticRow
					label='Exchange rate'
					value='4.3148 · manual'
				/>
				<StaticRow
					label='Reserve used'
					value='None'
				/>
			</Section>
			<ActionLink
				href={{
					pathname: '/books/[book-id]/transactions/[id]/edit',
					params: { 'book-id': bookId, id: transactionId }
				}}
				label='Edit transaction'
			/>
			<ActionLink
				href={activityHref(bookId)}
				label='Back to activity'
				secondary
			/>
		</PrototypeScreen>
	)
}

export function MoreScreen({ bookId }: BookScreenProps) {
	return (
		<PrototypeScreen
			description='Less frequent Book tools stay one level away from the core daily flow.'
			title='More'
		>
			<Section title='Money'>
				<RowLink
					href={accountsHref(bookId)}
					label='Accounts'
					value='3 active'
				/>
				<RowLink
					href={{ pathname: '/books/[book-id]/reports', params: { 'book-id': bookId } }}
					label='Reports'
				/>
			</Section>
			<Section title='Organization'>
				<RowLink
					href={{ pathname: '/books/[book-id]/categories', params: { 'book-id': bookId } }}
					label='Categories'
					value='8 active'
				/>
				<RowLink
					href={{ pathname: '/books/[book-id]/counterparties', params: { 'book-id': bookId } }}
					label='Counterparties'
					value='14 active'
				/>
			</Section>
			<Section title='Book'>
				<RowLink
					href={{ pathname: '/books/[book-id]/settings', params: { 'book-id': bookId } }}
					label='Book settings'
				/>
				<RowLink
					href='/books'
					label='Switch Book'
				/>
			</Section>
		</PrototypeScreen>
	)
}

function TransactionRows({ bookId, limit = 4 }: BookScreenProps & { limit?: number }) {
	const transactions = [
		['Biedronka', 'Today · Groceries', '−186.40 PLN', sampleTransactionId],
		['Salary', 'Today · Income', '+8,200 PLN', 'salary'],
		['mBank → Revolut', 'Yesterday · Transfer', '1,000 PLN', 'transfer'],
		['Electricity', 'Yesterday · Home', '−420 PLN', 'electricity']
	] as const

	return transactions.slice(0, limit).map(([label, detail, value, id]) => (
		<RowLink
			detail={detail}
			href={transactionHref(bookId, id)}
			key={id}
			label={label}
			value={value}
		/>
	))
}

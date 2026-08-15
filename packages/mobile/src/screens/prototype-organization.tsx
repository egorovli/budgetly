import {
	ActionLink,
	Bar,
	Metric,
	MetricGrid,
	Note,
	PrototypeScreen,
	RowLink,
	Section,
	StaticRow
} from '~/components/prototype-ui.tsx'
import {
	accountsHref,
	moreHref,
	reservesHref,
	sampleCategoryId,
	sampleCounterpartyId
} from '~/screens/prototype-routes.ts'

interface BookScreenProps {
	bookId: string
}

export function CategoriesScreen({ bookId }: BookScreenProps) {
	return (
		<PrototypeScreen
			description='Parent and child Categories share one tree; every active node can classify activity directly.'
			title='Categories'
		>
			<Section title='Active'>
				<CategoryRow
					bookId={bookId}
					depth='▾'
					id='food'
					label='Food'
					value='1,240 PLN'
				/>
				<CategoryRow
					bookId={bookId}
					depth='  ▾'
					id={sampleCategoryId}
					label='Groceries'
					value='860 PLN'
				/>
				<CategoryRow
					bookId={bookId}
					depth='    •'
					id='weekly-shop'
					label='Weekly shop'
					value='520 PLN'
				/>
				<CategoryRow
					bookId={bookId}
					depth='  •'
					id='dining-out'
					label='Dining out'
					value='380 PLN'
				/>
				<CategoryRow
					bookId={bookId}
					depth='▾'
					id='home'
					label='Home'
					value='720 PLN'
				/>
				<CategoryRow
					bookId={bookId}
					depth='  •'
					id='utilities'
					label='Utilities'
					value='420 PLN'
				/>
			</Section>
			<ActionLink
				href={{ pathname: '/books/[book-id]/categories/new', params: { 'book-id': bookId } }}
				label='Create Category'
			/>
			<ActionLink
				href={moreHref(bookId)}
				label='Back to More'
				secondary
			/>
		</PrototypeScreen>
	)
}

export function CounterpartiesScreen({ bookId }: BookScreenProps) {
	return (
		<PrototypeScreen
			description='One compact directory supports both payees and payers without separate entity types.'
			title='Counterparties'
		>
			<Section title='Recent'>
				<CounterpartyRow
					bookId={bookId}
					id={sampleCounterpartyId}
					label='Biedronka'
					value='12 transactions'
				/>
				<CounterpartyRow
					bookId={bookId}
					id='employer'
					label='Employer'
					value='4 transactions'
				/>
				<CounterpartyRow
					bookId={bookId}
					id='enea'
					label='Enea'
					value='8 transactions'
				/>
				<CounterpartyRow
					bookId={bookId}
					id='landlord'
					label='Landlord'
					value='6 transactions'
				/>
			</Section>
			<ActionLink
				href={{ pathname: '/books/[book-id]/counterparties/new', params: { 'book-id': bookId } }}
				label='Create Counterparty'
			/>
			<ActionLink
				href={moreHref(bookId)}
				label='Back to More'
				secondary
			/>
		</PrototypeScreen>
	)
}

export function ReportsScreen({ bookId }: BookScreenProps) {
	return (
		<PrototypeScreen
			description='Simple period summaries explain movement without turning the POC into accounting software.'
			title='Reports'
		>
			<Note>This month · PLN · all Accounts</Note>
			<MetricGrid>
				<Metric
					label='Income'
					value='8,200 PLN'
				/>
				<Metric
					label='Expenses'
					value='2,460 PLN'
				/>
				<Metric
					label='Net change'
					value='+5,740 PLN'
				/>
				<Metric
					label='Net worth'
					value='48,920 PLN'
				/>
			</MetricGrid>
			<Section title='Expenses by Category'>
				<Bar
					label='Food'
					value='1,240'
					width={72}
				/>
				<Bar
					label='Groceries'
					value='860'
					width={50}
				/>
				<Bar
					label='Home'
					value='720'
					width={42}
				/>
				<Bar
					label='Dining out'
					value='380'
					width={22}
				/>
			</Section>
			<ActionLink
				href={moreHref(bookId)}
				label='Back to More'
				secondary
			/>
		</PrototypeScreen>
	)
}

export function BookSettingsScreen({ bookId }: BookScreenProps) {
	return (
		<PrototypeScreen
			description='Settings respect the Book boundary; family sharing and provider controls remain deferred.'
			title='Book settings'
		>
			<Section title='Book'>
				<StaticRow
					detail='Current Book'
					label='Name'
					value='Family'
				/>
				<StaticRow
					detail='Cannot change in the POC'
					label='Base currency'
					value='PLN'
				/>
				<RowLink
					href={accountsHref(bookId)}
					label='Accounts'
					value='3 active'
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
				<RowLink
					href={reservesHref(bookId)}
					label='Reserves'
					value='2 active'
				/>
			</Section>
			<Section title='Data'>
				<RowLink
					detail='Synced'
					href={{
						pathname: '/books/[book-id]/settings/data-and-sync',
						params: { 'book-id': bookId }
					}}
					label='iCloud, export, and backup'
				/>
				<RowLink
					href='/books'
					label='Books on this device'
					value='2'
				/>
			</Section>
			<Note>Deferred: family sharing and user-configurable exchange-rate provider routing.</Note>
		</PrototypeScreen>
	)
}

export function DataAndSyncScreen({ bookId }: BookScreenProps) {
	return (
		<PrototypeScreen
			description='Synchronization health and data portability are visible even though the buttons have no behavior in this walkthrough.'
			title='Data and sync'
		>
			<MetricGrid>
				<Metric
					label='iCloud'
					note='No pending changes'
					value='Synced'
				/>
				<Metric
					label='Last update'
					value='Just now'
				/>
			</MetricGrid>
			<Section title='Devices'>
				<StaticRow
					detail='Active now'
					label='This iPhone'
					value='Synced'
				/>
				<StaticRow
					detail='4 minutes ago'
					label='MacBook Pro'
					value='Synced'
				/>
			</Section>
			<Section title='Portability'>
				<StaticRow
					detail='For spreadsheets and review'
					label='Export Transactions as CSV'
				/>
				<StaticRow
					detail='All Book data and history'
					label='Create complete backup'
				/>
				<StaticRow
					detail='Into an empty Book'
					label='Restore from backup'
				/>
			</Section>
			<Note>
				No conventional backend. Personal devices synchronize through the same iCloud account.
			</Note>
			<ActionLink
				href={{ pathname: '/books/[book-id]/settings', params: { 'book-id': bookId } }}
				label='Back to Book settings'
				secondary
			/>
		</PrototypeScreen>
	)
}

function CategoryRow({
	bookId,
	depth,
	id,
	label,
	value
}: BookScreenProps & { depth: string; id: string; label: string; value: string }) {
	return (
		<RowLink
			href={{
				pathname: '/books/[book-id]/categories/[id]/edit',
				params: { 'book-id': bookId, id }
			}}
			label={`${depth} ${label}`}
			value={value}
		/>
	)
}

function CounterpartyRow({
	bookId,
	id,
	label,
	value
}: BookScreenProps & { id: string; label: string; value: string }) {
	return (
		<RowLink
			href={{
				pathname: '/books/[book-id]/counterparties/[id]/edit',
				params: { 'book-id': bookId, id }
			}}
			label={label}
			value={value}
		/>
	)
}

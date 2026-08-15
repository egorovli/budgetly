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
	reserveHref,
	reservesHref,
	sampleReserveId,
	transactionHref
} from '~/screens/prototype-routes.ts'

interface ReserveListScreenProps {
	bookId: string
}

interface ReserveDetailScreenProps extends ReserveListScreenProps {
	reserveId: string
}

export function ReservesScreen({ bookId }: ReserveListScreenProps) {
	return (
		<PrototypeScreen
			description='Commitments are Book-wide allocations, not bank accounts and not expenses.'
			title='Reserves'
		>
			<MetricGrid>
				<Metric
					label='Free amount'
					value='9,260 PLN'
				/>
				<Metric
					label='Total reserved'
					value='3,200 PLN'
				/>
			</MetricGrid>
			<Section title='Active Reserves'>
				<RowLink
					detail='3 adjustments · last used 31 Jul'
					href={reserveHref(bookId, sampleReserveId)}
					label='Tax'
					value='2,400 PLN'
				/>
				<RowLink
					detail='Created 2 Aug'
					href={reserveHref(bookId, 'asturias')}
					label='Asturias'
					value='800 PLN'
				/>
			</Section>
			<ActionLink
				href={{ pathname: '/books/[book-id]/reserves/new', params: { 'book-id': bookId } }}
				label='Create Reserve'
			/>
		</PrototypeScreen>
	)
}

export function ReserveDetailScreen({ bookId, reserveId }: ReserveDetailScreenProps) {
	const name = reserveId === 'asturias' ? 'Asturias' : 'Tax'

	return (
		<PrototypeScreen
			description='The current commitment is explained by its own auditable adjustment history.'
			title={name}
		>
			<MetricGrid>
				<Metric
					label='Reserved'
					value={name === 'Tax' ? '2,400 PLN' : '800 PLN'}
				/>
				<Metric
					label='Free after Reserves'
					value='9,260 PLN'
				/>
			</MetricGrid>
			<ActionLink
				href={{
					pathname: '/books/[book-id]/reserves/[id]/adjustments/new',
					params: { 'book-id': bookId, id: reserveId }
				}}
				label='Adjust Reserve'
			/>
			<ActionLink
				href={{
					pathname: '/books/[book-id]/reserves/[id]/edit',
					params: { 'book-id': bookId, id: reserveId }
				}}
				label='Edit Reserve'
				secondary
			/>
			<Section title='History'>
				<StaticRow
					detail='2 Aug · allocated'
					label='Initial allocation'
					value='+2,600 PLN'
				/>
				<RowLink
					detail='31 Jul · linked expense'
					href={transactionHref(bookId, 'tax-payment')}
					label='Tax payment'
					value='−200 PLN'
				/>
			</Section>
			<ActionLink
				href={reservesHref(bookId)}
				label='Back to Reserves'
				secondary
			/>
		</PrototypeScreen>
	)
}

export function ReserveAdjustmentScreen({ bookId, reserveId }: ReserveDetailScreenProps) {
	return (
		<PrototypeScreen
			description='Allocate money, return it to the free amount, or explicitly use it.'
			title='Adjust Reserve'
		>
			<StaticRow
				label='Reserve'
				value={reserveId === 'asturias' ? 'Asturias' : 'Tax'}
			/>
			<Note>Prototype controls: Allocate / Release / Use · 200 PLN · today · optional note.</Note>
			<ActionLink
				href={reserveHref(bookId, reserveId)}
				label='Save adjustment'
			/>
		</PrototypeScreen>
	)
}

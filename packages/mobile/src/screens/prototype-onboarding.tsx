import {
	ActionLink,
	Metric,
	MetricGrid,
	Note,
	PrototypeScreen,
	RowLink,
	Section
} from '~/components/prototype-ui.tsx'
import { bookHref, sampleBookId } from '~/screens/prototype-routes.ts'

export function WelcomeScreen() {
	return (
		<PrototypeScreen
			description='A private, iCloud-first place for everyday money, commitments, and the amount that is actually free to spend.'
			eyebrow='BUDGETLY'
			navigationTitle='Budgetly'
			title='Know what is really free'
		>
			<ActionLink
				href='/books/new'
				label='Create my first Book'
			/>
			<ActionLink
				href='/books'
				label='Open an existing Book'
				secondary
			/>
			{process.env.NODE_ENV === 'production' ? null : (
				<ActionLink
					href={{ pathname: '/prototype/native-ui', params: { variant: 'A' } }}
					label='Open native UI prototype'
					secondary
				/>
			)}
			<Note>
				No app account in the POC. Personal-device synchronization uses your Apple iCloud account.
			</Note>
		</PrototypeScreen>
	)
}

export function BooksScreen() {
	return (
		<PrototypeScreen
			description='Books are independent financial datasets. Their accounts, activity, and commitments never mix.'
			title='Books'
		>
			<Section title='On this device'>
				<RowLink
					detail='PLN · synced just now'
					href={bookHref(sampleBookId)}
					label='Family'
					value='9,260 PLN free'
				/>
				<RowLink
					detail='EUR · synced yesterday'
					href={bookHref('personal-eur')}
					label='Personal EUR'
					value='2,130 EUR free'
				/>
			</Section>
			<ActionLink
				href='/books/new'
				label='Create another Book'
				secondary
			/>
		</PrototypeScreen>
	)
}

export function BookFormScreen() {
	return (
		<PrototypeScreen
			description='A Book owns one financial picture and is the future sharing boundary.'
			eyebrow='SETUP · 1 OF 1'
			title='Create Book'
		>
			<Section title='Book details'>
				<MetricGrid>
					<Metric
						label='Suggested name'
						value='Family'
					/>
					<Metric
						label='Base currency'
						note='Fixed in the POC'
						value='PLN'
					/>
				</MetricGrid>
			</Section>
			<Note>
				Accounts, transactions, categories, counterparties, Reserves, and reports belong to this
				Book.
			</Note>
			<ActionLink
				href={bookHref(sampleBookId)}
				label='Create Book'
			/>
			<ActionLink
				href={bookHref(sampleBookId)}
				label='Skip setup in prototype'
				secondary
			/>
		</PrototypeScreen>
	)
}

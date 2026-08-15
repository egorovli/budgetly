import { useLocalSearchParams } from 'expo-router'

import { CounterpartyFormScreen } from '~/screens/prototype-forms.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
	id: string
}

export default function EditCounterpartyRoute() {
	const { 'book-id': bookId, id } = useLocalSearchParams<RouteParams>()

	return (
		<CounterpartyFormScreen
			bookId={bookId}
			id={id}
		/>
	)
}

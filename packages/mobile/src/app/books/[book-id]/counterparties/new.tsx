import { useLocalSearchParams } from 'expo-router'

import { CounterpartyFormScreen } from '~/screens/prototype-forms.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
}

export default function NewCounterpartyRoute() {
	const { 'book-id': bookId } = useLocalSearchParams<RouteParams>()

	return <CounterpartyFormScreen bookId={bookId} />
}

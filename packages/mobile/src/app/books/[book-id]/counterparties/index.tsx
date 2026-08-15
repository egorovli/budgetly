import { useLocalSearchParams } from 'expo-router'

import { CounterpartiesScreen } from '~/screens/prototype-organization.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
}

export default function CounterpartiesRoute() {
	const { 'book-id': bookId } = useLocalSearchParams<RouteParams>()

	return <CounterpartiesScreen bookId={bookId} />
}

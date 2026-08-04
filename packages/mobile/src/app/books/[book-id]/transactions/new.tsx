import { useLocalSearchParams } from 'expo-router'

import { RoutePlaceholder } from '@/screens/route-placeholder'

interface RouteParams extends Record<string, string> {
	'book-id': string
}

export default function NewTransactionRoute() {
	const { 'book-id': bookId } = useLocalSearchParams<RouteParams>()

	return (
		<RoutePlaceholder
			params={{ bookId }}
			title='Record transaction'
		/>
	)
}

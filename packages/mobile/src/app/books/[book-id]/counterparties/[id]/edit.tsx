import { useLocalSearchParams } from 'expo-router'

import { RoutePlaceholder } from '@/screens/route-placeholder'

interface RouteParams extends Record<string, string> {
	'book-id': string
	id: string
}

export default function EditCounterpartyRoute() {
	const { 'book-id': bookId, id } = useLocalSearchParams<RouteParams>()

	return (
		<RoutePlaceholder
			params={{ bookId, counterpartyId: id }}
			title='Edit Counterparty'
		/>
	)
}

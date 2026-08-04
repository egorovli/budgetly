import { useLocalSearchParams } from 'expo-router'

import { RoutePlaceholder } from '@/screens/route-placeholder'

interface RouteParams extends Record<string, string> {
	'book-id': string
	id: string
}

export default function NewBalanceAdjustmentRoute() {
	const { 'book-id': bookId, id } = useLocalSearchParams<RouteParams>()

	return (
		<RoutePlaceholder
			params={{ accountId: id, bookId }}
			title='Balance adjustment'
		/>
	)
}

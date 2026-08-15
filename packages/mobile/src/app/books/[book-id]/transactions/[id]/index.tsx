import { useLocalSearchParams } from 'expo-router'

import { TransactionDetailScreen } from '~/screens/prototype-overview.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
	id: string
}

export default function TransactionRoute() {
	const { 'book-id': bookId, id } = useLocalSearchParams<RouteParams>()

	return (
		<TransactionDetailScreen
			bookId={bookId}
			transactionId={id}
		/>
	)
}

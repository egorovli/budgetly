import { useLocalSearchParams } from 'expo-router'

import { ReserveDetailScreen } from '~/screens/prototype-reserves.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
	id: string
}

export default function ReserveRoute() {
	const { 'book-id': bookId, id } = useLocalSearchParams<RouteParams>()

	return (
		<ReserveDetailScreen
			bookId={bookId}
			reserveId={id}
		/>
	)
}

import { useLocalSearchParams } from 'expo-router'

import { ReserveAdjustmentScreen } from '~/screens/prototype-reserves.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
	id: string
}

export default function NewReserveAdjustmentRoute() {
	const { 'book-id': bookId, id } = useLocalSearchParams<RouteParams>()

	return (
		<ReserveAdjustmentScreen
			bookId={bookId}
			reserveId={id}
		/>
	)
}

import { useLocalSearchParams } from 'expo-router'

import { ReservesScreen } from '~/screens/prototype-reserves.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
}

export default function ReservesRoute() {
	const { 'book-id': bookId } = useLocalSearchParams<RouteParams>()

	return <ReservesScreen bookId={bookId} />
}

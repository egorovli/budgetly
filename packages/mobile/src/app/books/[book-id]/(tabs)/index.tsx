import { useLocalSearchParams } from 'expo-router'

import { HomeScreen } from '~/screens/prototype-overview.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
}

export default function BookHomeRoute() {
	const { 'book-id': bookId } = useLocalSearchParams<RouteParams>()

	return <HomeScreen bookId={bookId} />
}

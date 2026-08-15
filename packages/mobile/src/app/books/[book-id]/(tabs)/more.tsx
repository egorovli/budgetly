import { useLocalSearchParams } from 'expo-router'

import { MoreScreen } from '~/screens/prototype-overview.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
}

export default function MoreRoute() {
	const { 'book-id': bookId } = useLocalSearchParams<RouteParams>()

	return <MoreScreen bookId={bookId} />
}

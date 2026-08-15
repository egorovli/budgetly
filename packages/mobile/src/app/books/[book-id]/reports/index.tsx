import { useLocalSearchParams } from 'expo-router'

import { ReportsScreen } from '~/screens/prototype-organization.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
}

export default function ReportsRoute() {
	const { 'book-id': bookId } = useLocalSearchParams<RouteParams>()

	return <ReportsScreen bookId={bookId} />
}

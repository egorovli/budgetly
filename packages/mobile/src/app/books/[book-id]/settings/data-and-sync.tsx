import { useLocalSearchParams } from 'expo-router'

import { DataAndSyncScreen } from '~/screens/prototype-organization.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
}

export default function DataAndSyncRoute() {
	const { 'book-id': bookId } = useLocalSearchParams<RouteParams>()

	return <DataAndSyncScreen bookId={bookId} />
}

import { useLocalSearchParams } from 'expo-router'

import { BookSettingsScreen } from '~/screens/prototype-organization.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
}

export default function BookSettingsRoute() {
	const { 'book-id': bookId } = useLocalSearchParams<RouteParams>()

	return <BookSettingsScreen bookId={bookId} />
}

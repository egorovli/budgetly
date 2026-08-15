import { useLocalSearchParams } from 'expo-router'

import { AccountFormScreen } from '~/screens/prototype-forms.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
}

export default function NewAccountRoute() {
	const { 'book-id': bookId } = useLocalSearchParams<RouteParams>()

	return <AccountFormScreen bookId={bookId} />
}

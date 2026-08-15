import { useLocalSearchParams } from 'expo-router'

import { ReserveFormScreen } from '~/screens/prototype-forms.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
}

export default function NewReserveRoute() {
	const { 'book-id': bookId } = useLocalSearchParams<RouteParams>()

	return <ReserveFormScreen bookId={bookId} />
}

import { useLocalSearchParams } from 'expo-router'

import { ReserveFormScreen } from '~/screens/prototype-forms.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
	id: string
}

export default function EditReserveRoute() {
	const { 'book-id': bookId, id } = useLocalSearchParams<RouteParams>()

	return (
		<ReserveFormScreen
			bookId={bookId}
			id={id}
		/>
	)
}

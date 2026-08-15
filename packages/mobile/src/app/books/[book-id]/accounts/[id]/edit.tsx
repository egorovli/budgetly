import { useLocalSearchParams } from 'expo-router'

import { AccountFormScreen } from '~/screens/prototype-forms.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
	id: string
}

export default function EditAccountRoute() {
	const { 'book-id': bookId, id } = useLocalSearchParams<RouteParams>()

	return (
		<AccountFormScreen
			bookId={bookId}
			id={id}
		/>
	)
}

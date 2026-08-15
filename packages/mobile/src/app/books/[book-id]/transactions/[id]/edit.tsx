import { useLocalSearchParams } from 'expo-router'

import { TransactionFormScreen } from '~/screens/prototype-forms.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
	id: string
}

export default function EditTransactionRoute() {
	const { 'book-id': bookId, id } = useLocalSearchParams<RouteParams>()

	return (
		<TransactionFormScreen
			bookId={bookId}
			id={id}
		/>
	)
}

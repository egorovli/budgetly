import { useLocalSearchParams } from 'expo-router'

import { TransactionFormScreen } from '~/screens/prototype-forms.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
}

export default function NewTransactionRoute() {
	const { 'book-id': bookId } = useLocalSearchParams<RouteParams>()

	return <TransactionFormScreen bookId={bookId} />
}

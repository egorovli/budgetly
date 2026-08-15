import { useLocalSearchParams } from 'expo-router'

import { TransferFormScreen } from '~/screens/prototype-forms.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
}

export default function NewTransferRoute() {
	const { 'book-id': bookId } = useLocalSearchParams<RouteParams>()

	return <TransferFormScreen bookId={bookId} />
}

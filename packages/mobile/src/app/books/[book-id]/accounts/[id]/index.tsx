import { useLocalSearchParams } from 'expo-router'

import { AccountDetailScreen } from '~/screens/prototype-accounts.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
	id: string
}

export default function AccountRoute() {
	const { 'book-id': bookId, id } = useLocalSearchParams<RouteParams>()

	return (
		<AccountDetailScreen
			accountId={id}
			bookId={bookId}
		/>
	)
}

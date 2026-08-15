import { useLocalSearchParams } from 'expo-router'

import { AccountsScreen } from '~/screens/prototype-accounts.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
}

export default function AccountsRoute() {
	const { 'book-id': bookId } = useLocalSearchParams<RouteParams>()

	return <AccountsScreen bookId={bookId} />
}

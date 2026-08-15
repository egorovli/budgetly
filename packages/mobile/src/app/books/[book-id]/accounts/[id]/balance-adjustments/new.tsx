import { useLocalSearchParams } from 'expo-router'

import { BalanceAdjustmentScreen } from '~/screens/prototype-accounts.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
	id: string
}

export default function NewBalanceAdjustmentRoute() {
	const { 'book-id': bookId, id } = useLocalSearchParams<RouteParams>()

	return (
		<BalanceAdjustmentScreen
			accountId={id}
			bookId={bookId}
		/>
	)
}

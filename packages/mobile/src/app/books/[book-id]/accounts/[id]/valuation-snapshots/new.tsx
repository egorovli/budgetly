import { useLocalSearchParams } from 'expo-router'

import { ValuationSnapshotScreen } from '~/screens/prototype-accounts.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
	id: string
}

export default function NewValuationSnapshotRoute() {
	const { 'book-id': bookId, id } = useLocalSearchParams<RouteParams>()

	return (
		<ValuationSnapshotScreen
			accountId={id}
			bookId={bookId}
		/>
	)
}

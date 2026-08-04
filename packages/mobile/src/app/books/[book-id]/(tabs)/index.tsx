import { useLocalSearchParams } from 'expo-router'

import { RoutePlaceholder } from '@/screens/route-placeholder'

interface RouteParams extends Record<string, string> {
	'book-id': string
}

export default function BookHomeRoute() {
	const { 'book-id': bookId } = useLocalSearchParams<RouteParams>()

	return (
		<RoutePlaceholder
			description='Show Free amount, Available money, Reserves, net worth, Accounts, and recent activity.'
			params={{ bookId }}
			title='Home'
		/>
	)
}

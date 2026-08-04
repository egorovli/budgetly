import { useLocalSearchParams } from 'expo-router'

import { RoutePlaceholder } from '@/screens/route-placeholder'

interface RouteParams extends Record<string, string> {
	'book-id': string
}

export default function MoreRoute() {
	const { 'book-id': bookId } = useLocalSearchParams<RouteParams>()

	return (
		<RoutePlaceholder
			description='Open Accounts, Categories, Counterparties, Reports, Book settings, and data tools.'
			params={{ bookId }}
			title='More'
		/>
	)
}

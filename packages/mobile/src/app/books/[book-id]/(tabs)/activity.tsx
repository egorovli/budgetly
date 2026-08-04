import { useLocalSearchParams } from 'expo-router'

import { RoutePlaceholder } from '@/screens/route-placeholder'

interface RouteParams extends Record<string, string> {
	'book-id': string
}

export default function ActivityRoute() {
	const { 'book-id': bookId } = useLocalSearchParams<RouteParams>()

	return (
		<RoutePlaceholder
			description='Browse and filter all operations in the Book.'
			params={{ bookId }}
			title='Activity'
		/>
	)
}

import { useLocalSearchParams } from 'expo-router'

import { CategoriesScreen } from '~/screens/prototype-organization.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
}

export default function CategoriesRoute() {
	const { 'book-id': bookId } = useLocalSearchParams<RouteParams>()

	return <CategoriesScreen bookId={bookId} />
}

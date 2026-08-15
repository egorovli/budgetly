import { useLocalSearchParams } from 'expo-router'

import { CategoryFormScreen } from '~/screens/prototype-forms.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
}

export default function NewCategoryRoute() {
	const { 'book-id': bookId } = useLocalSearchParams<RouteParams>()

	return <CategoryFormScreen bookId={bookId} />
}

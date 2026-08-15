import { useLocalSearchParams } from 'expo-router'

import { CategoryFormScreen } from '~/screens/prototype-forms.tsx'

interface RouteParams extends Record<string, string> {
	'book-id': string
	id: string
}

export default function EditCategoryRoute() {
	const { 'book-id': bookId, id } = useLocalSearchParams<RouteParams>()

	return (
		<CategoryFormScreen
			bookId={bookId}
			id={id}
		/>
	)
}

import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export default function NotFoundRoute() {
	return (
		<View>
			<Text>Page not found</Text>
			<Link href='/'>Return to Budgetly</Link>
		</View>
	)
}

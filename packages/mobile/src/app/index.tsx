import { StyleSheet, Text, View } from 'react-native'

export default function HomeScreen() {
	return (
		<View style={styles.container}>
			<Text>Budgetly</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center'
	}
})

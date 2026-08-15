import { Stack } from 'expo-router/stack'

export default function NativeUIPrototypeLayout() {
	return (
		<Stack
			screenOptions={{
				headerBackButtonDisplayMode: 'minimal',
				headerLargeTitle: true,
				headerShadowVisible: false,
				headerTransparent: true
			}}
		>
			<Stack.Screen
				name='index'
				options={{ title: 'Native UI Lab' }}
			/>
			<Stack.Screen
				name='controls'
				options={{
					contentStyle: { backgroundColor: 'transparent' },
					headerLargeTitle: false,
					presentation: 'formSheet',
					sheetAllowedDetents: [0.72, 1],
					sheetGrabberVisible: true,
					title: 'Native Controls'
				}}
			/>
		</Stack>
	)
}

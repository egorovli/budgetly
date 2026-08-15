import { useRouter } from 'expo-router'
import { Stack } from 'expo-router/stack'

// biome-ignore lint/correctness/useImportExtensions: Metro selects the .ios.tsx or .tsx implementation.
import { NativeControlsSheet } from '~/components/native-ui-prototype/native-controls-sheet'

export default function NativeControlsRoute() {
	const router = useRouter()

	return (
		<>
			<Stack.Title>Native Controls</Stack.Title>
			<Stack.Toolbar placement='right'>
				<Stack.Toolbar.Button
					accessibilityLabel='Close native controls sheet'
					onPress={() => router.back()}
					variant='done'
				>
					Done
				</Stack.Toolbar.Button>
			</Stack.Toolbar>
			<NativeControlsSheet />
		</>
	)
}

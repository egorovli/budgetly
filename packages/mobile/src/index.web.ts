import '@expo/metro-runtime'

import { LoadSkiaWeb } from '@shopify/react-native-skia/lib/module/web'

import './theme'

void LoadSkiaWeb().then(async () => {
	const [{ App }, { renderRootComponent }] = await Promise.all([
		import('expo-router/build/qualified-entry'),
		import('expo-router/build/renderRootComponent')
	])

	renderRootComponent(App)
})

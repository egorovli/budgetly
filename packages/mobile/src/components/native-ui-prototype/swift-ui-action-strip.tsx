import { Pressable, Text, View } from 'react-native'

import { prototypeColors } from '~/components/native-ui-prototype/prototype-colors.ts'

interface SwiftUIActionStripProps {
	onAction: (action: string) => void
}

export function SwiftUIActionStrip({ onAction }: SwiftUIActionStripProps) {
	return (
		<View style={{ flexDirection: 'row', gap: 10 }}>
			{['Record', 'Transfer'].map((label, index) => (
				<Pressable
					accessibilityRole='button'
					key={label}
					onPress={() => onAction(`Fallback action: ${label}`)}
					style={({ pressed }) => ({
						backgroundColor: index === 0 ? prototypeColors.accent : prototypeColors.surface,
						borderColor: prototypeColors.separator,
						borderCurve: 'continuous',
						borderRadius: 999,
						borderWidth: index === 0 ? 0 : 1,
						opacity: pressed ? 0.7 : 1,
						paddingHorizontal: 18,
						paddingVertical: 12
					})}
				>
					<Text
						style={{ color: index === 0 ? '#ffffff' : prototypeColors.label, fontWeight: '700' }}
					>
						{label}
					</Text>
				</Pressable>
			))}
		</View>
	)
}

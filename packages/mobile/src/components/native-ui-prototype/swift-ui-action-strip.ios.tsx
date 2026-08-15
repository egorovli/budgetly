import { Host } from '@expo/ui'
import { Button, GlassEffectContainer, HStack } from '@expo/ui/swift-ui'
import {
	accessibilityHint,
	accessibilityLabel,
	buttonStyle,
	controlSize,
	glassEffect,
	padding
} from '@expo/ui/swift-ui/modifiers'

interface SwiftUIActionStripProps {
	onAction: (action: string) => void
}

export function SwiftUIActionStrip({ onAction }: SwiftUIActionStripProps) {
	return (
		<Host matchContents>
			<GlassEffectContainer spacing={12}>
				<HStack
					spacing={10}
					modifiers={[padding({ all: 4 })]}
				>
					<Button
						label='Record'
						modifiers={[
							buttonStyle('glassProminent'),
							controlSize('large'),
							accessibilityLabel('Record transaction'),
							accessibilityHint('Opens transaction entry')
						]}
						onPress={() => onAction('SwiftUI glass prominent: Record')}
						systemImage='plus'
					/>
					<Button
						label='Transfer'
						modifiers={[
							glassEffect({
								glass: { interactive: true, variant: 'regular' },
								shape: 'capsule'
							}),
							controlSize('large'),
							accessibilityLabel('Record transfer')
						]}
						onPress={() => onAction('SwiftUI glass effect: Transfer')}
						systemImage='arrow.left.arrow.right'
					/>
				</HStack>
			</GlassEffectContainer>
		</Host>
	)
}

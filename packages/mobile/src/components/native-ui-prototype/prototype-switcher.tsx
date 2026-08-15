import { useRouter } from 'expo-router'
import { useCallback, useEffect } from 'react'
import { Platform, Pressable, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { prototypeColors } from '~/components/native-ui-prototype/prototype-colors.ts'

export const prototypeVariants = {
	A: 'System first',
	B: 'Selective glass',
	C: 'SwiftUI controls'
} as const

export type PrototypeVariant = keyof typeof prototypeVariants

const variantKeys = Object.keys(prototypeVariants) as PrototypeVariant[]

interface PrototypeSwitcherProps {
	current: PrototypeVariant
}

export function PrototypeSwitcher({ current }: PrototypeSwitcherProps) {
	const insets = useSafeAreaInsets()
	const router = useRouter()

	const move = useCallback(
		(offset: number) => {
			const currentIndex = variantKeys.indexOf(current)
			const nextIndex = (currentIndex + offset + variantKeys.length) % variantKeys.length
			const next = variantKeys[nextIndex] ?? 'A'

			router.replace({ pathname: '/prototype/native-ui', params: { variant: next } })
		},
		[current, router]
	)

	useEffect(() => {
		if (Platform.OS !== 'web') {
			return
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			const target = event.target
			if (
				target instanceof HTMLElement &&
				(target.matches('input, textarea, [contenteditable="true"]') || target.isContentEditable)
			) {
				return
			}

			if (event.key === 'ArrowLeft') {
				move(-1)
			}
			if (event.key === 'ArrowRight') {
				move(1)
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [move])

	if (process.env.NODE_ENV === 'production') {
		return null
	}

	return (
		<View
			style={{
				bottom: process.env.EXPO_OS === 'web' ? 24 : insets.bottom + 76,
				left: 0,
				pointerEvents: 'box-none',
				position: 'absolute',
				right: 0
			}}
		>
			<View
				style={{
					alignItems: 'center',
					alignSelf: 'center',
					backgroundColor: '#111318',
					borderCurve: 'continuous',
					borderRadius: 999,
					boxShadow: '0 8px 30px rgba(0, 0, 0, 0.28)',
					flexDirection: 'row',
					gap: 4,
					padding: 5
				}}
			>
				<SwitcherButton
					accessibilityLabel='Previous prototype variant'
					label='‹'
					onPress={() => move(-1)}
				/>
				<View style={{ alignItems: 'center', minWidth: 150, paddingHorizontal: 8 }}>
					<Text style={{ color: '#ffffff', fontSize: 13, fontWeight: '700' }}>
						{current} — {prototypeVariants[current]}
					</Text>
					<Text style={{ color: '#aeb4bf', fontSize: 10 }}>PROTOTYPE · ← →</Text>
				</View>
				<SwitcherButton
					accessibilityLabel='Next prototype variant'
					label='›'
					onPress={() => move(1)}
				/>
			</View>
		</View>
	)
}

function SwitcherButton({
	accessibilityLabel,
	label,
	onPress
}: {
	accessibilityLabel: string
	label: string
	onPress: () => void
}) {
	return (
		<Pressable
			accessibilityLabel={accessibilityLabel}
			accessibilityRole='button'
			onPress={onPress}
			style={({ pressed }) => ({
				alignItems: 'center',
				backgroundColor: pressed ? '#343944' : '#24272f',
				borderCurve: 'continuous',
				borderRadius: 999,
				height: 38,
				justifyContent: 'center',
				width: 38
			})}
		>
			<Text style={{ color: prototypeColors.background, fontSize: 27, lineHeight: 29 }}>
				{label}
			</Text>
		</Pressable>
	)
}

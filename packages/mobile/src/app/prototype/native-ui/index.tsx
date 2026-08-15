import * as Haptics from 'expo-haptics'
import { useLocalSearchParams } from 'expo-router'
import { Stack } from 'expo-router/stack'
import { useEffect, useState } from 'react'
import { AccessibilityInfo } from 'react-native'

import { NativeUIShowcase } from '~/components/native-ui-prototype/native-ui-showcase.tsx'
import {
	PrototypeSwitcher,
	type PrototypeVariant,
	prototypeVariants
} from '~/components/native-ui-prototype/prototype-switcher.tsx'

// Three adoption levels for native iOS UI, switchable with ?variant=A|B|C on /prototype/native-ui.
export default function NativeUIPrototypeRoute() {
	const params = useLocalSearchParams<{ variant?: string | string[] }>()
	const requestedVariant = Array.isArray(params.variant) ? params.variant[0] : params.variant
	const variant: PrototypeVariant =
		requestedVariant && requestedVariant in prototypeVariants
			? (requestedVariant as PrototypeVariant)
			: 'A'
	const [lastAction, setLastAction] = useState('No action yet')
	const [accessibilityState, setAccessibilityState] = useState('checking')

	useEffect(() => {
		let active = true
		const reduceMotionPromise =
			typeof AccessibilityInfo.isReduceMotionEnabled === 'function'
				? AccessibilityInfo.isReduceMotionEnabled()
				: Promise.resolve(false)
		const reduceTransparencyPromise =
			typeof AccessibilityInfo.isReduceTransparencyEnabled === 'function'
				? AccessibilityInfo.isReduceTransparencyEnabled()
				: Promise.resolve(false)

		void Promise.all([reduceMotionPromise, reduceTransparencyPromise])
			.then(([reduceMotion, reduceTransparency]) => {
				if (!active) {
					return
				}
				setAccessibilityState(
					`reduceMotion=${reduceMotion}, reduceTransparency=${reduceTransparency}`
				)
			})
			.catch(() => {
				if (active) {
					setAccessibilityState('unavailable')
				}
			})

		return () => {
			active = false
		}
	}, [])

	const handleAction = (action: string) => {
		if (process.env.EXPO_OS === 'ios') {
			void Haptics.selectionAsync()
		}
		setLastAction(action)
	}

	return (
		<>
			<Stack.Title>Native UI Lab</Stack.Title>
			<Stack.Toolbar placement='right'>
				<Stack.Toolbar.Menu
					accessibilityHint='Shows prototype actions'
					accessibilityLabel='More prototype actions'
					icon='ellipsis.circle'
					separateBackground
				>
					<Stack.Toolbar.MenuAction
						icon='doc.on.doc'
						onPress={() => handleAction('Header menu: Duplicate')}
					>
						Duplicate preview
					</Stack.Toolbar.MenuAction>
					<Stack.Toolbar.MenuAction
						destructive
						icon='trash'
						onPress={() => handleAction('Header menu: Delete preview')}
					>
						Delete preview
					</Stack.Toolbar.MenuAction>
				</Stack.Toolbar.Menu>
			</Stack.Toolbar>

			{variant === 'A' ? (
				<Stack.Toolbar placement='bottom'>
					<Stack.Toolbar.Button
						accessibilityLabel='Filter transactions'
						icon='line.3.horizontal.decrease'
						onPress={() => handleAction('Bottom toolbar: Filter')}
					/>
					<Stack.Toolbar.Spacer />
					<Stack.Toolbar.Button
						accessibilityHint='Starts a new expense or income entry'
						accessibilityLabel='Record transaction'
						icon='plus'
						onPress={() => handleAction('Bottom toolbar: Record transaction')}
						variant='prominent'
					/>
				</Stack.Toolbar>
			) : null}

			<NativeUIShowcase
				accessibilityState={accessibilityState}
				lastAction={lastAction}
				onAction={handleAction}
				variant={variant}
			/>
			<PrototypeSwitcher current={variant} />
		</>
	)
}

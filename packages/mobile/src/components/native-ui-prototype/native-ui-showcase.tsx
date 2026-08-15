import { Image } from 'expo-image'
import {
	GlassContainer,
	GlassView,
	isGlassEffectAPIAvailable,
	isLiquidGlassAvailable
} from 'expo-glass-effect'
import { Link, useRouter } from 'expo-router'
import type { ReactNode } from 'react'
import { Pressable, ScrollView, Text, useColorScheme, View } from 'react-native'

import { prototypeColors } from '~/components/native-ui-prototype/prototype-colors.ts'
// biome-ignore lint/correctness/useImportExtensions: Metro selects the .ios.tsx or .tsx implementation.
import { SwiftUIActionStrip } from '~/components/native-ui-prototype/swift-ui-action-strip'
import type { PrototypeVariant } from '~/components/native-ui-prototype/prototype-switcher.tsx'

interface NativeUIShowcaseProps {
	accessibilityState: string
	lastAction: string
	onAction: (action: string) => void
	variant: PrototypeVariant
}

export function NativeUIShowcase({
	accessibilityState,
	lastAction,
	onAction,
	variant
}: NativeUIShowcaseProps) {
	useColorScheme()
	const glassAvailable = isLiquidGlassAvailable() && isGlassEffectAPIAvailable()

	return (
		<ScrollView
			contentContainerStyle={{
				alignSelf: 'center',
				gap: 24,
				maxWidth: 980,
				padding: 20,
				paddingBottom: 190,
				paddingTop: process.env.EXPO_OS === 'web' ? 92 : 20,
				width: '100%'
			}}
			contentInsetAdjustmentBehavior='automatic'
			style={{ backgroundColor: prototypeColors.background }}
		>
			<PrototypeHeading variant={variant} />
			{variant === 'A' ? <SystemFirst onAction={onAction} /> : null}
			{variant === 'B' ? (
				<SelectiveGlass
					glassAvailable={glassAvailable}
					onAction={onAction}
				/>
			) : null}
			{variant === 'C' ? <SwiftUIControls onAction={onAction} /> : null}
			<StateInspector
				accessibilityState={accessibilityState}
				glassAvailable={glassAvailable}
				lastAction={lastAction}
				variant={variant}
			/>
		</ScrollView>
	)
}

function PrototypeHeading({ variant }: { variant: PrototypeVariant }) {
	const copy = {
		A: [
			'System first',
			'System navigation and content stay separate. Glass belongs to native chrome.'
		],
		B: ['Selective glass', 'A custom floating action layer sits above normal financial content.'],
		C: [
			'SwiftUI controls',
			'Expo hosts real SwiftUI controls behind a small iOS-only component seam.'
		]
	} as const

	return (
		<View style={{ gap: 7 }}>
			<Text
				style={{ color: prototypeColors.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1 }}
			>
				THROWAWAY PROTOTYPE · {variant}
			</Text>
			<Text
				style={{
					color: prototypeColors.label,
					fontSize: 30,
					fontWeight: '700',
					letterSpacing: -0.7
				}}
			>
				{copy[variant][0]}
			</Text>
			<Text style={{ color: prototypeColors.secondaryLabel, fontSize: 15, lineHeight: 21 }}>
				{copy[variant][1]}
			</Text>
		</View>
	)
}

function SystemFirst({ onAction }: { onAction: (action: string) => void }) {
	return (
		<>
			<View style={{ gap: 2, paddingVertical: 12 }}>
				<Text style={{ color: prototypeColors.secondaryLabel, fontSize: 13 }}>Free to spend</Text>
				<Text
					selectable
					style={{
						color: prototypeColors.label,
						fontSize: 40,
						fontVariant: ['tabular-nums'],
						fontWeight: '700'
					}}
				>
					9,260 PLN
				</Text>
				<Text style={{ color: '#238636', fontSize: 14, fontWeight: '600' }}>
					+1,420 PLN this month
				</Text>
			</View>

			<View style={{ flexDirection: 'row', gap: 10 }}>
				<Metric
					label='Available'
					value='12,460'
				/>
				<Metric
					label='In Reserves'
					value='3,200'
				/>
			</View>

			<Section title='Recent activity'>
				<NativeLinkRow
					detail='Today · Groceries'
					href='/books/family/transactions/groceries'
					label='Biedronka'
					onAction={onAction}
					value='−186.40 PLN'
				/>
				<StaticRow
					detail='Today · Income'
					label='Salary'
					value='+8,200 PLN'
				/>
			</Section>

			<OpenControlsButton
				onPress={() => onAction('Open controls sheet from system-first layout')}
			/>
			<Caption>
				Use the native header menu and bottom toolbar too. On iOS 26, the system owns their Liquid
				Glass.
			</Caption>
		</>
	)
}

function SelectiveGlass({
	glassAvailable,
	onAction
}: {
	glassAvailable: boolean
	onAction: (action: string) => void
}) {
	return (
		<>
			<View
				style={{
					backgroundColor: '#d8e8ff',
					borderCurve: 'continuous',
					borderRadius: 30,
					height: 330,
					overflow: 'hidden',
					padding: 22,
					position: 'relative'
				}}
			>
				<View
					style={{
						backgroundColor: '#7e57ff',
						borderRadius: 120,
						height: 210,
						position: 'absolute',
						right: -38,
						top: -45,
						width: 210
					}}
				/>
				<View
					style={{
						backgroundColor: '#ff9e80',
						borderRadius: 80,
						bottom: 12,
						height: 140,
						left: -26,
						position: 'absolute',
						width: 140
					}}
				/>
				<View style={{ flex: 1, justifyContent: 'space-between' }}>
					<View style={{ gap: 5 }}>
						<Text style={{ color: '#141820', fontSize: 14, fontWeight: '600' }}>Family Book</Text>
						<Text
							selectable
							style={{
								color: '#0d1118',
								fontSize: 38,
								fontVariant: ['tabular-nums'],
								fontWeight: '700'
							}}
						>
							9,260 PLN
						</Text>
						<Text style={{ color: '#303744', fontSize: 14 }}>
							Normal content. Glass is only the action layer.
						</Text>
					</View>
					<GlassActionDock
						available={glassAvailable}
						onAction={onAction}
					/>
				</View>
			</View>

			<View style={{ gap: 8 }}>
				<Text style={{ color: prototypeColors.label, fontSize: 18, fontWeight: '700' }}>
					What this tests
				</Text>
				<CheckLine text='Regular, clear, tinted, and interactive GlassView controls' />
				<CheckLine text='GlassContainer grouping and morphing distance' />
				<CheckLine text='A semantic solid fallback on web, Android, and earlier iOS' />
			</View>

			<OpenControlsButton
				onPress={() => onAction('Open controls sheet from custom-glass layout')}
			/>
		</>
	)
}

function SwiftUIControls({ onAction }: { onAction: (action: string) => void }) {
	return (
		<>
			<View style={{ gap: 12, paddingVertical: 8 }}>
				<Text style={{ color: prototypeColors.label, fontSize: 18, fontWeight: '700' }}>
					Native action comparison
				</Text>
				<SwiftUIActionStrip onAction={onAction} />
				<Caption>
					On iOS this is a SwiftUI GlassEffectContainer with glass and glassProminent buttons. Other
					platforms get normal semantic controls.
				</Caption>
			</View>

			<Section title='Native control inventory'>
				<InventoryRow
					fallback='≋'
					icon='sf:slider.horizontal.3'
					label='Inputs'
					value='Picker · Slider · Stepper'
				/>
				<InventoryRow
					fallback='◷'
					icon='sf:calendar'
					label='Date and time'
					value='Compact DatePicker'
				/>
				<InventoryRow
					fallback='•••'
					icon='sf:ellipsis.circle'
					label='Actions'
					value='Menu · ControlGroup'
				/>
				<InventoryRow
					fallback='A'
					icon='sf:accessibility'
					label='System behavior'
					value='Dynamic Type · VoiceOver'
				/>
			</Section>

			<OpenControlsButton onPress={() => onAction('Open full SwiftUI controls sheet')} />
		</>
	)
}

function GlassActionDock({
	available,
	onAction
}: {
	available: boolean
	onAction: (action: string) => void
}) {
	if (!available) {
		return (
			<View style={{ flexDirection: 'row', gap: 10 }}>
				<FallbackDockButton
					label='Record'
					onPress={() => onAction('Fallback: Record')}
					prominent
				/>
				<FallbackDockButton
					label='Transfer'
					onPress={() => onAction('Fallback: Transfer')}
				/>
				<FallbackDockButton
					label='More'
					onPress={() => onAction('Fallback: More')}
				/>
			</View>
		)
	}

	return (
		<GlassContainer
			spacing={12}
			style={{ flexDirection: 'row', gap: 10 }}
		>
			<GlassDockButton
				accessibilityLabel='Record transaction'
				icon='sf:plus'
				label='Record'
				onPress={() => onAction('Liquid Glass: Record')}
				prominent
			/>
			<GlassDockButton
				accessibilityLabel='Record transfer'
				icon='sf:arrow.left.arrow.right'
				label='Transfer'
				onPress={() => onAction('Liquid Glass: Transfer')}
			/>
			<GlassDockButton
				accessibilityLabel='More actions'
				clear
				icon='sf:ellipsis'
				label='More'
				onPress={() => onAction('Liquid Glass: More')}
			/>
		</GlassContainer>
	)
}

function GlassDockButton({
	accessibilityLabel,
	clear = false,
	icon,
	label,
	onPress,
	prominent = false
}: {
	accessibilityLabel: string
	clear?: boolean
	icon: `sf:${string}`
	label: string
	onPress: () => void
	prominent?: boolean
}) {
	return (
		<GlassView
			{...(prominent ? { tintColor: '#1769ff' } : {})}
			glassEffectStyle={clear ? 'clear' : 'regular'}
			isInteractive
			style={{ borderCurve: 'continuous', borderRadius: 999 }}
		>
			<Pressable
				accessibilityLabel={accessibilityLabel}
				accessibilityRole='button'
				onPress={onPress}
				style={{
					alignItems: 'center',
					flexDirection: 'row',
					gap: 7,
					minHeight: 48,
					paddingHorizontal: 14
				}}
			>
				<Image
					source={icon}
					style={{ height: 17, width: 17 }}
					tintColor={prominent ? '#ffffff' : '#12151b'}
				/>
				<Text style={{ color: prominent ? '#ffffff' : '#12151b', fontSize: 13, fontWeight: '700' }}>
					{label}
				</Text>
			</Pressable>
		</GlassView>
	)
}

function FallbackDockButton({
	label,
	onPress,
	prominent = false
}: {
	label: string
	onPress: () => void
	prominent?: boolean
}) {
	return (
		<Pressable
			accessibilityRole='button'
			onPress={onPress}
			style={({ pressed }) => ({
				backgroundColor: prominent ? '#1769ff' : 'rgba(255, 255, 255, 0.88)',
				borderColor: 'rgba(255, 255, 255, 0.7)',
				borderCurve: 'continuous',
				borderRadius: 999,
				borderWidth: 1,
				opacity: pressed ? 0.75 : 1,
				paddingHorizontal: 14,
				paddingVertical: 14
			})}
		>
			<Text style={{ color: prominent ? '#ffffff' : '#12151b', fontSize: 13, fontWeight: '700' }}>
				{label}
			</Text>
		</Pressable>
	)
}

function NativeLinkRow({
	detail,
	href,
	label,
	onAction,
	value
}: {
	detail: string
	href: '/books/family/transactions/groceries'
	label: string
	onAction: (action: string) => void
	value: string
}) {
	return (
		<Link
			asChild
			href={href}
		>
			<Link.Trigger>
				<Pressable>
					<RowContent
						detail={detail}
						label={label}
						value={value}
					/>
				</Pressable>
			</Link.Trigger>
			<Link.Preview />
			<Link.Menu>
				<Link.MenuAction
					icon='doc.on.doc'
					onPress={() => onAction('Context menu: Duplicate Biedronka')}
					title='Duplicate'
				/>
				<Link.MenuAction
					destructive
					icon='trash'
					onPress={() => onAction('Context menu: Delete preview')}
					title='Delete preview'
				/>
			</Link.Menu>
		</Link>
	)
}

function StaticRow({ detail, label, value }: { detail: string; label: string; value: string }) {
	return (
		<RowContent
			detail={detail}
			label={label}
			value={value}
		/>
	)
}

function RowContent({ detail, label, value }: { detail: string; label: string; value: string }) {
	return (
		<View
			style={{
				alignItems: 'center',
				borderBottomColor: prototypeColors.separator,
				borderBottomWidth: 0.5,
				flexDirection: 'row',
				gap: 12,
				minHeight: 62,
				paddingVertical: 9
			}}
		>
			<View style={{ flex: 1, gap: 2 }}>
				<Text style={{ color: prototypeColors.label, fontSize: 16, fontWeight: '600' }}>
					{label}
				</Text>
				<Text style={{ color: prototypeColors.secondaryLabel, fontSize: 13 }}>{detail}</Text>
			</View>
			<Text
				selectable
				style={{
					color: prototypeColors.label,
					fontSize: 14,
					fontVariant: ['tabular-nums'],
					fontWeight: '600'
				}}
			>
				{value}
			</Text>
		</View>
	)
}

function Metric({ label, value }: { label: string; value: string }) {
	return (
		<View
			style={{
				backgroundColor: prototypeColors.surface,
				borderCurve: 'continuous',
				borderRadius: 18,
				flex: 1,
				gap: 5,
				padding: 16
			}}
		>
			<Text style={{ color: prototypeColors.secondaryLabel, fontSize: 12 }}>{label}</Text>
			<Text
				selectable
				style={{
					color: prototypeColors.label,
					fontSize: 19,
					fontVariant: ['tabular-nums'],
					fontWeight: '700'
				}}
			>
				{value}
			</Text>
		</View>
	)
}

function Section({ children, title }: { children: ReactNode; title: string }) {
	return (
		<View style={{ gap: 6 }}>
			<Text style={{ color: prototypeColors.label, fontSize: 18, fontWeight: '700' }}>{title}</Text>
			<View>{children}</View>
		</View>
	)
}

function InventoryRow({
	fallback,
	icon,
	label,
	value
}: {
	fallback: string
	icon: `sf:${string}`
	label: string
	value: string
}) {
	return (
		<View
			style={{
				alignItems: 'center',
				borderBottomColor: prototypeColors.separator,
				borderBottomWidth: 0.5,
				flexDirection: 'row',
				gap: 12,
				minHeight: 58
			}}
		>
			<View
				style={{
					alignItems: 'center',
					backgroundColor: prototypeColors.surface,
					borderCurve: 'continuous',
					borderRadius: 10,
					height: 34,
					justifyContent: 'center',
					width: 34
				}}
			>
				{process.env.EXPO_OS === 'ios' ? (
					<Image
						source={icon}
						style={{ height: 18, width: 18 }}
						tintColor='#0a66ff'
					/>
				) : (
					<Text style={{ color: '#0a66ff', fontSize: 14, fontWeight: '800' }}>{fallback}</Text>
				)}
			</View>
			<View style={{ flex: 1 }}>
				<Text style={{ color: prototypeColors.label, fontSize: 15, fontWeight: '600' }}>
					{label}
				</Text>
				<Text style={{ color: prototypeColors.secondaryLabel, fontSize: 13 }}>{value}</Text>
			</View>
		</View>
	)
}

function CheckLine({ text }: { text: string }) {
	return (
		<View style={{ alignItems: 'flex-start', flexDirection: 'row', gap: 8 }}>
			<Text style={{ color: '#238636', fontSize: 15, fontWeight: '800' }}>✓</Text>
			<Text
				style={{ color: prototypeColors.secondaryLabel, flex: 1, fontSize: 14, lineHeight: 20 }}
			>
				{text}
			</Text>
		</View>
	)
}

function OpenControlsButton({ onPress }: { onPress: () => void }) {
	const router = useRouter()

	return (
		<Pressable
			accessibilityHint='Opens the native controls form sheet'
			accessibilityRole='button'
			onPress={() => {
				onPress()
				router.push('/prototype/native-ui/controls')
			}}
			style={({ pressed }) => ({
				alignItems: 'center',
				backgroundColor: prototypeColors.accent,
				borderCurve: 'continuous',
				borderRadius: 15,
				opacity: pressed ? 0.75 : 1,
				paddingHorizontal: 18,
				paddingVertical: 15
			})}
		>
			<Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '700' }}>
				Open native controls sheet
			</Text>
		</Pressable>
	)
}

function Caption({ children }: { children: ReactNode }) {
	return (
		<Text style={{ color: prototypeColors.secondaryLabel, fontSize: 12, lineHeight: 17 }}>
			{children}
		</Text>
	)
}

function StateInspector({
	accessibilityState,
	glassAvailable,
	lastAction,
	variant
}: {
	accessibilityState: string
	glassAvailable: boolean
	lastAction: string
	variant: PrototypeVariant
}) {
	return (
		<View
			style={{
				backgroundColor: prototypeColors.surface,
				borderColor: prototypeColors.separator,
				borderCurve: 'continuous',
				borderRadius: 16,
				borderWidth: 1,
				gap: 5,
				padding: 14
			}}
		>
			<Text style={{ color: prototypeColors.label, fontSize: 13, fontWeight: '800' }}>
				LIVE PROTOTYPE STATE
			</Text>
			<Text
				selectable
				style={{ color: prototypeColors.secondaryLabel, fontFamily: 'monospace', fontSize: 12 }}
			>
				variant: {variant}
				{'\n'}
				liquidGlass: {glassAvailable ? 'available' : 'fallback'} {'\n'}
				accessibility: {accessibilityState}
				{'\n'}
				lastAction: {lastAction}
			</Text>
		</View>
	)
}

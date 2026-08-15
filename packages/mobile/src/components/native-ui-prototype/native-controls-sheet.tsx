import { Button, Column, Host, Picker, Slider, Switch } from '@expo/ui'
import { useState } from 'react'
import { ScrollView, Text as ReactNativeText, View } from 'react-native'

import { prototypeColors } from '~/components/native-ui-prototype/prototype-colors.ts'

export function NativeControlsSheet() {
	const [currency, setCurrency] = useState('PLN')
	const [amount, setAmount] = useState(186)
	const [haptics, setHaptics] = useState(true)
	const [lastAction, setLastAction] = useState('No action yet')

	return (
		<ScrollView
			contentContainerStyle={{ gap: 20, padding: 20, paddingBottom: 80 }}
			contentInsetAdjustmentBehavior='automatic'
			style={{ backgroundColor: prototypeColors.background }}
		>
			<TextBlock
				body='This platform uses Expo UI universal controls. The iOS route renders the SwiftUI-specific version.'
				title='Native controls fallback'
			/>
			<Host
				matchContents
				seedColor={prototypeColors.accent}
			>
				<Column spacing={18}>
					<Switch
						label='Haptic feedback'
						onValueChange={setHaptics}
						value={haptics}
					/>
					<Picker
						onValueChange={setCurrency}
						selectedValue={currency}
					>
						<Picker.Item
							label='PLN'
							value='PLN'
						/>
						<Picker.Item
							label='EUR'
							value='EUR'
						/>
						<Picker.Item
							label='USD'
							value='USD'
						/>
					</Picker>
					<Slider
						max={1000}
						min={0}
						onValueChange={value => setAmount(Math.round(value))}
						step={1}
						value={amount}
					/>
					<Button
						label='Save transaction'
						onPress={() => setLastAction('Saved in memory')}
					/>
				</Column>
			</Host>
			<TextBlock
				body={`Currency: ${currency}\nAmount: ${amount}\nHaptics: ${haptics ? 'on' : 'off'}\nLast action: ${lastAction}`}
				title='Live prototype state'
			/>
		</ScrollView>
	)
}

function TextBlock({ body, title }: { body: string; title: string }) {
	return (
		<View style={{ gap: 6 }}>
			<ReactNativeText style={{ color: prototypeColors.label, fontSize: 20, fontWeight: '700' }}>
				{title}
			</ReactNativeText>
			<ReactNativeText
				selectable
				style={{ color: prototypeColors.secondaryLabel, fontSize: 14, lineHeight: 20 }}
			>
				{body}
			</ReactNativeText>
		</View>
	)
}

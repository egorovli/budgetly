import { Host } from '@expo/ui'
import {
	Button,
	ControlGroup,
	DatePicker,
	Form,
	Menu,
	Picker,
	ProgressView,
	Section,
	Slider,
	Stepper,
	Text,
	Toggle,
	VStack
} from '@expo/ui/swift-ui'
import {
	buttonStyle,
	controlSize,
	datePickerStyle,
	monospacedDigit,
	pickerStyle,
	progressViewStyle,
	tag,
	tint
} from '@expo/ui/swift-ui/modifiers'
import { useState } from 'react'

export function NativeControlsSheet() {
	const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense')
	const [currency, setCurrency] = useState<'PLN' | 'EUR' | 'USD'>('PLN')
	const [amount, setAmount] = useState(186)
	const [date, setDate] = useState(new Date())
	const [haptics, setHaptics] = useState(true)
	const [copies, setCopies] = useState(1)
	const [lastAction, setLastAction] = useState('No action yet')

	return (
		<Host style={{ flex: 1 }}>
			<Form>
				<Section
					footer={<Text>These controls are real SwiftUI views hosted by Expo UI.</Text>}
					title='Transaction'
				>
					<Picker
						label='Type'
						modifiers={[pickerStyle('segmented')]}
						onSelectionChange={value => setTransactionType(value as 'expense' | 'income')}
						selection={transactionType}
					>
						<Text modifiers={[tag('expense')]}>Expense</Text>
						<Text modifiers={[tag('income')]}>Income</Text>
					</Picker>
					<DatePicker
						displayedComponents={['date', 'hourAndMinute']}
						modifiers={[datePickerStyle('compact')]}
						onDateChange={setDate}
						selection={date}
						title='Date'
					/>
					<VStack alignment='leading'>
						<Text modifiers={[monospacedDigit()]}>Amount: {amount} PLN</Text>
						<Slider
							max={1000}
							min={0}
							onValueChange={value => setAmount(Math.round(value))}
							step={1}
							value={amount}
						/>
					</VStack>
					<Stepper
						label='Repeat copies'
						max={5}
						min={1}
						onValueChange={setCopies}
						value={copies}
					/>
				</Section>

				<Section title='System controls'>
					<Toggle
						isOn={haptics}
						label='Haptic feedback'
						onIsOnChange={setHaptics}
						systemImage='waveform'
					/>
					<Menu
						label={`Currency: ${currency}`}
						systemImage='coloncurrencysign'
					>
						{(['PLN', 'EUR', 'USD'] as const).map(value => (
							<Button
								key={value}
								label={value}
								onPress={() => setCurrency(value)}
							/>
						))}
					</Menu>
					<ProgressView
						modifiers={[progressViewStyle('linear')]}
						value={amount / 1000}
					>
						<Text>Monthly discretionary limit</Text>
					</ProgressView>
				</Section>

				<Section
					footer={
						<Text>
							On earlier iOS versions, Expo keeps the controls and removes the glass style.
						</Text>
					}
					title='Liquid Glass actions'
				>
					<Button
						label='Save transaction'
						modifiers={[buttonStyle('glassProminent'), controlSize('large'), tint('#0a66ff')]}
						onPress={() => setLastAction('Saved in memory')}
						systemImage='checkmark'
					/>
					<ControlGroup label='More actions'>
						<Button
							label='Duplicate'
							onPress={() => setLastAction('Duplicated in memory')}
							systemImage='doc.on.doc'
						/>
						<Button
							{...{ role: 'destructive' as const }}
							label='Delete'
							onPress={() => setLastAction('Delete preview only')}
							systemImage='trash'
						/>
					</ControlGroup>
				</Section>

				<Section title='Live prototype state'>
					<Text>Type: {transactionType}</Text>
					<Text>Currency: {currency}</Text>
					<Text>Date: {date.toLocaleString()}</Text>
					<Text>Amount: {amount}</Text>
					<Text>Repeat copies: {copies}</Text>
					<Text>Haptics: {haptics ? 'on' : 'off'}</Text>
					<Text>Last action: {lastAction}</Text>
				</Section>
			</Form>
		</Host>
	)
}

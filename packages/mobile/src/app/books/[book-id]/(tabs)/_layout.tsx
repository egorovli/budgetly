import { NativeTabs } from 'expo-router/unstable-native-tabs'

export default function BookTabsLayout() {
	return (
		<NativeTabs>
			<NativeTabs.Trigger name='index'>
				<NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name='activity'>
				<NativeTabs.Trigger.Label>Activity</NativeTabs.Trigger.Label>
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name='reserves'>
				<NativeTabs.Trigger.Label>Reserves</NativeTabs.Trigger.Label>
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name='more'>
				<NativeTabs.Trigger.Label>More</NativeTabs.Trigger.Label>
			</NativeTabs.Trigger>
		</NativeTabs>
	)
}

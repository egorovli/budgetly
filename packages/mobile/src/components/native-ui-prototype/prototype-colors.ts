import { Color } from 'expo-router'
import { Platform } from 'react-native'

export const prototypeColors = {
	accent:
		Platform.select({
			ios: Color.ios.systemBlue,
			android: Color.android.dynamic.primary,
			default: '#0a66ff'
		}) ?? '#0a66ff',
	background:
		Platform.select({
			ios: Color.ios.systemBackground,
			android: Color.android.dynamic.surface,
			default: '#f7f8fb'
		}) ?? '#f7f8fb',
	label:
		Platform.select({
			ios: Color.ios.label,
			android: Color.android.dynamic.onSurface,
			default: '#101114'
		}) ?? '#101114',
	secondaryLabel:
		Platform.select({
			ios: Color.ios.secondaryLabel,
			android: Color.android.dynamic.onSurfaceVariant,
			default: '#656a73'
		}) ?? '#656a73',
	separator:
		Platform.select({
			ios: Color.ios.separator,
			android: Color.android.dynamic.outlineVariant,
			default: '#d8dbe2'
		}) ?? '#d8dbe2',
	surface:
		Platform.select({
			ios: Color.ios.secondarySystemBackground,
			android: Color.android.dynamic.surfaceContainer,
			default: '#ffffff'
		}) ?? '#ffffff'
} as const

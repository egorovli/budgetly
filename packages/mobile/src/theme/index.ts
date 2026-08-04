import { StyleSheet } from 'react-native-unistyles'

const sharedTheme = {
	spacing: (step: number) => step * 4
} as const

const lightTheme = {
	...sharedTheme,
	colors: {
		background: '#ffffff',
		surface: '#f2f2f7',
		label: '#000000',
		secondaryLabel: '#6c6c70',
		separator: '#c6c6c8',
		accent: '#007aff'
	}
} as const

const darkTheme = {
	...sharedTheme,
	colors: {
		background: '#000000',
		surface: '#1c1c1e',
		label: '#ffffff',
		secondaryLabel: '#98989d',
		separator: '#38383a',
		accent: '#0a84ff'
	}
} as const

const themes = {
	light: lightTheme,
	dark: darkTheme
}

const breakpoints = {
	compact: 0,
	regular: 430,
	wide: 768
} as const

type Themes = typeof themes
type Breakpoints = typeof breakpoints

declare module 'react-native-unistyles' {
	export interface UnistylesThemes extends Themes {}
	export interface UnistylesBreakpoints extends Breakpoints {}
}

StyleSheet.configure({
	themes,
	breakpoints,
	settings: {
		adaptiveThemes: true
	}
})

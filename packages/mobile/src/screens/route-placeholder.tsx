import { Text, View } from 'react-native'

interface RoutePlaceholderProps {
	description?: string
	params?: Record<string, string | undefined>
	title: string
}

export function RoutePlaceholder({ description, params, title }: RoutePlaceholderProps) {
	return (
		<View>
			<Text>{title}</Text>
			{description ? <Text>{description}</Text> : null}
			{params
				? Object.entries(params).map(([name, value]) => (
						<Text key={name}>
							{name}: {value}
						</Text>
					))
				: null}
		</View>
	)
}
